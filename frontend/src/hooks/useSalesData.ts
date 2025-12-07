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

  // Debounce the search input to avoid firing on every keystroke.
  const debouncedSearch = useDebouncedValue(search, 300);

  // Trigger load when debounced search changes — only when search is empty
  // (cleared) or has at least 3 characters. This prevents firing
  // requests for short queries.
  useEffect(() => {
    if (debouncedSearch && debouncedSearch.length < 3) return;
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  // Trigger load for other controls (filters, sorting, pagination).
  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, sortBy, sortOrder, page]);

  const loadData = async () => {
    const params: SalesParams = {
      search,
      ...filters,
      sortBy,
      sortOrder,
      page,
      pageSize: 10,
    };

    const res = await fetchSales(params);
    setData(res.items);
    setPageInfo(res.pageInfo);
  };

  return {
    search, setSearch,
    filters, setFilters,
    sortBy, setSortBy,
    sortOrder, setSortOrder,
    page, setPage,
    data,
    pageInfo,
  };
}
