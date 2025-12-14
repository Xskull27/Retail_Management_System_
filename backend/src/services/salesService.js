// backend/src/services/salesService.js

import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "../utils/dynamoClient.js";

const TABLE_NAME = process.env.DYNAMO_TABLE_NAME;

// how many items max we are willing to scan per request
const MAX_SCANNED_ITEMS = 1000000; // Handle up to 1M database
const CHUNK_SIZE = 10000; // Items to scan per DynamoDB request (with filters)
const SEARCH_ONLY_CHUNK = 100000; // Large chunks when only searching (faster full scan)
const QUICK_RETURN_THRESHOLD = 100; // Return quickly with at least 100 matches
const SCAN_AHEAD_PAGES = 50; // Scan ahead enough for 50 pages (500 items if pageSize=10)

// Simple in-memory cache with TTL - stores partial scan results
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Track active background scans so we can cancel them
const activeScans = new Map(); // cacheKey -> { cancel: boolean }

// Cache key for search only (filters applied client-side)
const getSearchCacheKey = (query) => {
  const { search, sortBy, sortOrder } = query;
  return JSON.stringify({ search, sortBy, sortOrder });
};

// For backward compatibility
const getCacheKey = getSearchCacheKey;

// BUILD FILTER EXPRESSIONS (server-side DynamoDB filters)
// NOTE: Search (name/phone) is NOT here - DynamoDB contains() is case-sensitive
// Search is applied client-side for case-insensitive matching

const buildFilterExpression = (params, filters) => {
  const {
    region,
    gender,
    ageMin,
    ageMax,
    category,
    tags,
    paymentMethod,
    dateFrom,
    dateTo,
  } = filters;

  let parts = [];
  let names = {};
  let values = {};

  const add = (exp, nk, nv, vk, vv) => {
    parts.push(exp);
    if (nk) names[nk] = nv;
    if (vk) values[vk] = vv;
  };

  // Apply server-side filters (most selective first)
  if (region) add("#region = :region", "#region", "CustomerRegion", ":region", region);
  if (gender) add("#gender = :gender", "#gender", "Gender", ":gender", gender);
  if (category) add("#category = :category", "#category", "ProductCategory", ":category", category);
  if (paymentMethod) add("#pm = :pm", "#pm", "PaymentMethod", ":pm", paymentMethod);

  if (dateFrom) add("#date >= :dateFrom", "#date", "Date", ":dateFrom", dateFrom);
  if (dateTo) add("#date <= :dateTo", "#date", "Date", ":dateTo", dateTo);

  if (tags) {
    const arr = tags.split(",").map(t => t.trim()).filter(Boolean);
    arr.forEach((tag, i) => {
      add(`contains(#tags, :tag${i})`, "#tags", "Tags", `:tag${i}`, tag);
    });
  }

  if (parts.length > 0) {
    params.FilterExpression = parts.join(" AND ");
    params.ExpressionAttributeNames = names;
    params.ExpressionAttributeValues = values;
  }

  return params;
};

// Helper: Check if item matches search (case-insensitive name or phone)
const matchesSearch = (item, searchText) => {
  if (!searchText) return true;
  
  const name = item.CustomerName ? String(item.CustomerName).toLowerCase() : "";
  const phone = item.PhoneNumber ? String(item.PhoneNumber) : "";
  
  return name.includes(searchText) || phone.includes(searchText);
};

// Helper: Apply filters client-side to data array
const applyFiltersToData = (data, query) => {
  const { region, gender, ageMin, ageMax, category, tags, paymentMethod, dateFrom, dateTo } = query;
  
  let filtered = [...data];
  
  if (region) filtered = filtered.filter(item => item.CustomerRegion === region);
  if (gender) filtered = filtered.filter(item => item.Gender === gender);
  if (category) filtered = filtered.filter(item => item.ProductCategory === category);
  if (paymentMethod) filtered = filtered.filter(item => item.PaymentMethod === paymentMethod);
  
  const minAge = ageMin ? Number(ageMin) : null;
  const maxAge = ageMax ? Number(ageMax) : null;
  if (minAge !== null) {
    filtered = filtered.filter(item => {
      const age = item.Age != null ? Number(item.Age) : NaN;
      return !Number.isNaN(age) && age >= minAge;
    });
  }
  if (maxAge !== null) {
    filtered = filtered.filter(item => {
      const age = item.Age != null ? Number(item.Age) : NaN;
      return !Number.isNaN(age) && age <= maxAge;
    });
  }
  
  if (dateFrom) {
    filtered = filtered.filter(item => {
      const itemDate = item.Date ? new Date(item.Date) : null;
      return itemDate && itemDate >= new Date(dateFrom);
    });
  }
  if (dateTo) {
    filtered = filtered.filter(item => {
      const itemDate = item.Date ? new Date(item.Date) : null;
      return itemDate && itemDate <= new Date(dateTo);
    });
  }
  
  if (tags) {
    const tagList = tags.split(",").map(t => t.trim()).filter(Boolean);
    filtered = filtered.filter(item => {
      const itemTags = item.Tags ? String(item.Tags) : "";
      return tagList.every(tag => itemTags.includes(tag));
    });
  }
  
  return filtered;
};

/* ---------------------------------------------------------
   MAIN FUNCTION: SEARCH + FILTER + SORT + PAGINATE
--------------------------------------------------------- */
export const fetchSales = async (query) => {
  const {
    search = "",
    region,
    gender,
    ageMin,
    ageMax,
    category,
    tags,
    paymentMethod,
    dateFrom,
    dateTo,
    sortBy = "Date",
    sortOrder = "desc",
    page = 1,
    pageSize = 10,
  } = query;

  const pageNum = Number(page) || 1;
  const size = Number(pageSize) || 10;

  const searchText = search.trim().toLowerCase();
  const hasSearch = searchText.length > 0;
  const hasFilters = !!(region || gender || category || tags || paymentMethod || dateFrom || dateTo);

  console.log(`📊 Fetching sales - page: ${pageNum}, search: "${searchText}" (original: "${search}"), filters: ${hasFilters}`);

  // Cache key based on search + sort only (filters applied client-side)
  const cacheKey = getSearchCacheKey(query);
  
  // Cancel only scans with DIFFERENT search terms (not different filters)
  for (const [key, scanControl] of activeScans.entries()) {
    if (key !== cacheKey) {
      console.log(`❌ Canceling old search scan: ${key.substring(0, 50)}...`);
      scanControl.cancel = true;
      activeScans.delete(key);
    }
  }

  // Check cache first (search results only)
  let cached = cache.get(cacheKey);
  
  if (cached) {
    // Apply filters client-side to cached search results
    let filteredData = applyFiltersToData(cached.data, query);
    const itemsNeeded = pageNum * size;
    
    console.log(`🔍 Filtering cached data: ${cached.data.length} items → ${filteredData.length} after filters (region=${region}, gender=${gender})`);
    
    // If we have enough filtered data for this page
    if (filteredData.length >= itemsNeeded || cached.scanComplete) {
      console.log(`✅ Using cached search data: ${cached.data.length} items → ${filteredData.length} after filters (complete: ${cached.scanComplete})`);
      const start = (pageNum - 1) * size;
      const end = start + size;
      const pageItems = filteredData.slice(start, end);
      const hasNextPage = end < filteredData.length;

      // If not complete, continue background scan for search
      if (!cached.scanComplete && cached.lastKey) {
        continueBackgroundScan(cacheKey, query, cached);
      }

      return {
        items: pageItems,
        pageInfo: {
          page: pageNum,
          pageSize: size,
          hasNextPage,
          totalFiltered: filteredData.length,
        },
      };
    } else {
      // Need to scan more
      console.log(`🔄 Cache exists but need more filtered data. Have: ${filteredData.length}, Need: ${itemsNeeded}`);
    }
  }

  
  // This allows search cache to be reused when filters change
  const chunkSize = SEARCH_ONLY_CHUNK;
  
  let params = {
    TableName: TABLE_NAME,
    Limit: chunkSize,
  };

  let all = cached ? [...cached.data] : [];
  let scannedCount = cached ? cached.scannedCount : 0;
  let lastKey = cached ? cached.lastKey : undefined;

  do {
    if (lastKey) {
      params.ExclusiveStartKey = lastKey;
    }

    const result = await ddbDocClient.send(new ScanCommand(params));
    const items = result.Items || [];

    // Only apply search filter (name/phone) - all other filters done client-side
    let processed = items;
    if (hasSearch) {
      processed = processed.filter(item => matchesSearch(item, searchText));
    }

    all.push(...processed);
    scannedCount += items.length;
    lastKey = result.LastEvaluatedKey;

    // For page 1, return quickly when we have enough search matches
    // Then apply filters client-side to these matches
    const minItemsForQuickReturn = pageNum * size + (SCAN_AHEAD_PAGES * size);
    if (pageNum === 1 && all.length >= minItemsForQuickReturn && lastKey) {
      console.log(`⚡ Quick return for page 1 with ${all.length} search matches, filters apply client-side`);
      break;
    }

    // Stop if we've hit the scan limit or no more data
    if (scannedCount >= MAX_SCANNED_ITEMS) {
      console.log(`⚠️ Reached max scan limit: ${MAX_SCANNED_ITEMS}`);
      break;
    }
  } while (lastKey);

  console.log(`✅ Scan complete: ${all.length} items matched from ${scannedCount} scanned`);

  // Sort the results
  all.sort((a, b) => {
    let av, bv;

    if (sortBy === "Date") {
      av = new Date(a.Date).getTime();
      bv = new Date(b.Date).getTime();
    } else if (sortBy === "Quantity") {
      av = Number(a.Quantity || 0);
      bv = Number(b.Quantity || 0);
    } else if (sortBy === "CustomerName") {
      av = (a.CustomerName || "").toLowerCase();
      bv = (b.CustomerName || "").toLowerCase();
    } else {
      av = new Date(a.Date).getTime();
      bv = new Date(b.Date).getTime();
    }

    if (av < bv) return sortOrder === "asc" ? -1 : 1;
    if (av > bv) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Cache the search results
  cache.set(cacheKey, { 
    data: all, 
    timestamp: Date.now(),
    lastKey: lastKey,
    scannedCount: scannedCount,
    scanComplete: !lastKey
  });
  
  // Start background scan if not complete
  if (lastKey) {
    continueBackgroundScan(cacheKey, query, cache.get(cacheKey));
  }
  
  cleanCache();

  // Apply filters client-side to search results
  const filteredData = applyFiltersToData(all, query);

  // PAGINATE the filtered results
  const start = (pageNum - 1) * size;
  const end = start + size;

  const pageItems = filteredData.slice(start, end);
  const hasNextPage = end < filteredData.length;

  return {
    items: pageItems,
    pageInfo: {
      page: pageNum,
      pageSize: size,
      hasNextPage,
      totalFiltered: filteredData.length,
    },
  };
};

// Background scan to complete the dataset
const continueBackgroundScan = (cacheKey, query, cachedData) => {
  // Only start one background scan per cache key
  if (cachedData.backgroundScanRunning) {
    return;
  }
  
  cachedData.backgroundScanRunning = true;
  
  // Create scan control for this cache key
  const scanControl = { cancel: false };
  activeScans.set(cacheKey, scanControl);
  
  setImmediate(async () => {
    try {
      const { sortBy = "Date", sortOrder = "desc", search = "" } = query;
      
      const searchText = search.trim().toLowerCase();
      const hasSearch = searchText.length > 0;
      const chunkSize = SEARCH_ONLY_CHUNK; // Always large chunks for search
      
      console.log(`🔄 Background scan continuing from ${cachedData.scannedCount} scanned items`);
      
      let params = {
        TableName: TABLE_NAME,
        Limit: chunkSize,
      };
      
      // NO server-side filters - we only scan for search matches
      // Filters applied client-side when data is returned

      let all = [...cachedData.data];
      let currentLastKey = cachedData.lastKey;
      let currentScanned = cachedData.scannedCount;

      while (currentLastKey && currentScanned < MAX_SCANNED_ITEMS) {
        // Check if scan was cancelled
        if (scanControl.cancel) {
          console.log(`🛑 Background scan cancelled`);
          cachedData.backgroundScanRunning = false;
          activeScans.delete(cacheKey);
          return;
        }

        params.ExclusiveStartKey = currentLastKey;
        const result = await ddbDocClient.send(new ScanCommand(params));
        const items = result.Items || [];

        // Only apply search filter - all other filters done client-side
        let processed = items;
        if (hasSearch) {
          processed = processed.filter(item => matchesSearch(item, searchText));
        }

        all.push(...processed);
        currentScanned += items.length;
        currentLastKey = result.LastEvaluatedKey;

        // Update cache after EVERY chunk for progressive loading (both search & filters)
        if (all.length > cachedData.data.length) {
          console.log(`  📊 Background progress: ${all.length} matches from ${currentScanned} scanned`);
          
          // Sort and update cache incrementally
          all.sort((a, b) => {
            let av, bv;
            if (sortBy === "Date") {
              av = new Date(a.Date).getTime();
              bv = new Date(b.Date).getTime();
            } else if (sortBy === "Quantity") {
              av = Number(a.Quantity || 0);
              bv = Number(b.Quantity || 0);
            } else if (sortBy === "CustomerName") {
              av = (a.CustomerName || "").toLowerCase();
              bv = (b.CustomerName || "").toLowerCase();
            } else {
              av = new Date(a.Date).getTime();
              bv = new Date(b.Date).getTime();
            }
            if (av < bv) return sortOrder === "asc" ? -1 : 1;
            if (av > bv) return sortOrder === "asc" ? 1 : -1;
            return 0;
          });
          
          cache.set(cacheKey, { 
            data: all, 
            timestamp: Date.now(),
            lastKey: currentLastKey,
            scannedCount: currentScanned,
            scanComplete: !currentLastKey,
            backgroundScanRunning: true
          });
        }
      }

      // Sort the complete dataset
      all.sort((a, b) => {
        let av, bv;
        if (sortBy === "Date") {
          av = new Date(a.Date).getTime();
          bv = new Date(b.Date).getTime();
        } else if (sortBy === "Quantity") {
          av = Number(a.Quantity || 0);
          bv = Number(b.Quantity || 0);
        } else if (sortBy === "CustomerName") {
          av = (a.CustomerName || "").toLowerCase();
          bv = (b.CustomerName || "").toLowerCase();
        } else {
          av = new Date(a.Date).getTime();
          bv = new Date(b.Date).getTime();
        }
        if (av < bv) return sortOrder === "asc" ? -1 : 1;
        if (av > bv) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });

      cache.set(cacheKey, { 
        data: all, 
        timestamp: Date.now(),
        lastKey: currentLastKey,
        scannedCount: currentScanned,
        scanComplete: !currentLastKey,
        backgroundScanRunning: false
      });
      
      console.log(`✅ Background scan complete: ${all.length} total items, scanned ${currentScanned}`);
      activeScans.delete(cacheKey);
    } catch (error) {
      console.error(`❌ Background scan error:`, error);
      cachedData.backgroundScanRunning = false;
      activeScans.delete(cacheKey);
    }
  });
};

const cleanCache = () => {
  const now = Date.now();
  for (const [key, value] of cache.entries()) {
    if (now - value.timestamp > CACHE_TTL) {
      cache.delete(key);
    }
  }
};
