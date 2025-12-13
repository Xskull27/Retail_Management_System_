import { useEffect, useState } from "react";
import { fetchSales } from "../services/api";
import type { SalesParams } from "../services/api";
import useDebouncedValue from "./useDebouncedValue";

export type FilterState = {
  region: string;
  gender: string;
  ageMin: string;
  ageMax: string;
  category: string;
  tags: string;
  paymentMethod: string;
  dateFrom: string;
  dateTo: string;
}

export default function useSalesData() {
  const [search, setSearch] = useState<string>("");

  const [filters, setFilters] = useState<FilterState>({
    region: "",
    gender: "",
    ageMin: "",
    ageMax: "",
    category: "",
    tags: "",
    paymentMethod: "",
    dateFrom: "",
    dateTo: "",
  });

  const [sortBy, setSortBy] = useState<string>("Date");
  const [sortOrder, setSortOrder] = useState<string>("desc");
  const [page, setPage] = useState<number>(1);

  const [data, setData] = useState<any[]>([]);
  const [pageInfo, setPageInfo] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  // Debounce the search input
  const debouncedSearch = useDebouncedValue(search, 600);

  // Reset page to 1 when search or filters change (not when page changes)
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, filters, sortBy, sortOrder]);

  // Load data when any dependency changes
  useEffect(() => {
    if (debouncedSearch && debouncedSearch.length < 3) return;
    loadData();
  }, [debouncedSearch, filters, sortBy, sortOrder, page]);

  const loadData = async () => {
    setLoading(true);
    try {
      const params: SalesParams = {
        search: debouncedSearch,
        ...filters,
        sortBy,
        sortOrder,
        page,
        pageSize: 10,
      };

      const res = await fetchSales(params);
      setData(res.items);
      setPageInfo(res.pageInfo);
    } catch (error) {
      console.error('Error fetching sales:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    search, setSearch,
    filters, setFilters,
    sortBy, setSortBy,
    sortOrder, setSortOrder,
    page, setPage,
    data,
    pageInfo,
    loading,
  };
}
