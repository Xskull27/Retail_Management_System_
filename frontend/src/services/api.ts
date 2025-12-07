import axios from "axios";

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export type SalesParams = {
  search?: string;
  region?: string;
  gender?: string;
  ageMin?: string;
  ageMax?: string;
  category?: string;
  tags?: string;
  paymentMethod?: string;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: string;
  sortOrder?: string;
  page?: number;
  pageSize?: number;
  startToken?: string | null;
}

export const fetchSales = async (params: SalesParams) => {
  const response = await API.get("/sales", { params });
  return response.data;
};
