// backend/src/services/salesService.js

import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "../utils/dynamoClient.js";

const TABLE_NAME = process.env.DYNAMO_TABLE_NAME;

// how many items max we are willing to scan per request
const MAX_SCANNED_ITEMS = 50000;
const CHUNK_SIZE = 2000;


   //BUILD FILTER EXPRESSIONS HERE (region, gender, age, etc.)

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
  const isSearchActive = searchText.length > 0;

  // 1) We SCAN WITH FILTERS 
  let params = {
    TableName: TABLE_NAME,
    Limit: CHUNK_SIZE,
  };

  params = buildFilterExpression(params, {
    region,
    gender,
    ageMin,
    ageMax,
    category,
    tags,
    paymentMethod,
    dateFrom,
    dateTo,
  });

  let all = [];
  let scannedCount = 0;
  let lastKey = undefined;

  do {
    if (lastKey) {
      params.ExclusiveStartKey = lastKey;
    }

    
    
    const result = await ddbDocClient.send(new ScanCommand(params));
    const items = result.Items || [];

    
    let processed = items;

    
    const minAge = ageMin ? Number(ageMin) : null;
    const maxAge = ageMax ? Number(ageMax) : null;
    if (minAge !== null) {
      processed = processed.filter((it) => {
        const a = it.Age != null ? Number(it.Age) : NaN;
        return !Number.isNaN(a) && a >= minAge;
      });
    }
    if (maxAge !== null) {
      processed = processed.filter((it) => {
        const a = it.Age != null ? Number(it.Age) : NaN;
        return !Number.isNaN(a) && a <= maxAge;
      });
    }

    // If search is active, filter items by name/phone
    if (isSearchActive) {
      processed = processed.filter(item => {
        const name = item.CustomerName ? String(item.CustomerName).toLowerCase() : "";
        const phone = item.PhoneNumber ? String(item.PhoneNumber) : "";
        return name.includes(searchText) || phone.includes(searchText);
      });
    }

    console.log(`Chunk items=${items.length} -> processed=${processed.length}`);
    if (processed.length > 0) {
      console.log("Sample ages:", processed.slice(0,3).map(i => i.Age));
    }

    all.push(...processed);
    
    scannedCount += items.length;

    lastKey = result.LastEvaluatedKey;

    const needed = pageNum * size;
    if (all.length >= needed) break;

    if (scannedCount >= MAX_SCANNED_ITEMS) break;
  } while (lastKey);


  let filtered = all;

  // 2) we will SORT here
  filtered.sort((a, b) => {
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

  // PAGINATE 
  const start = (pageNum - 1) * size;
  const end = start + size;

  const pageItems = filtered.slice(start, end);
  const hasNextPage = end < filtered.length;

  return {
    items: pageItems,
    pageInfo: {
      page: pageNum,
      pageSize: size,
      hasNextPage,
      totalFiltered: filtered.length, 
    },
  };
};
