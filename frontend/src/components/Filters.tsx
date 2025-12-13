import { useState } from "react";
import type { FilterState } from "../hooks/useSalesData";

interface Props {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  sortBy?: string;
  setSortBy?: (sortBy: string) => void;
  sortOrder?: string | null;
  setSortOrder?: (o: string) => void;
}

export default function Filters({ filters, setFilters, sortBy, setSortBy, sortOrder, setSortOrder }: Props) {
  const update = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
  const [tempDateFrom, setTempDateFrom] = useState("");
  const [tempDateTo, setTempDateTo] = useState("");

  const openDateDropdown = () => {
    setTempDateFrom(filters.dateFrom);
    setTempDateTo(filters.dateTo);
    setDateDropdownOpen(true);
  };

  const applyDateFilter = () => {
    update("dateFrom", tempDateFrom);
    update("dateTo", tempDateTo);
    setDateDropdownOpen(false);
  };

  const clearDateFilter = () => {
    setTempDateFrom("");
    setTempDateTo("");
    update("dateFrom", "");
    update("dateTo", "");
    setDateDropdownOpen(false);
  };

  const clearAllFilters = () => {
    setFilters({
      region: "",
      gender: "",
      ageMin: "",
      ageMax: "",
      category: "",
      tags: "",
      paymentMethod: "",
      dateFrom: "",
      dateTo: ""
    });
    if (setSortBy) setSortBy("");
    if (setSortOrder) setSortOrder("");
  };

  return (
    <div className="flex flex-col gap-2 sm:gap-3 w-full">
      {/* First Row - Main Filters */}
      <div className="grid grid-cols-2 sm:flex sm:items-center gap-1.5 sm:gap-2 sm:flex-wrap">
      {/* Clear Filters Button */}
      <button
        onClick={clearAllFilters}
        className="h-8 sm:h-9 w-8 sm:w-9 col-span-2 sm:col-span-1 bg-gray-100 border border-gray-300 rounded text-xs sm:text-sm text-gray-600 hover:bg-gray-200 hover:border-gray-400 transition-colors flex items-center justify-center"
        title="Clear all filters"
      >
        <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>

      {/* Customer Region */}
      <div className="relative col-span-2 sm:col-span-1">
        <select
          className="h-8 sm:h-9 px-2 sm:px-3 pr-6 sm:pr-8 bg-gray-100 border border-gray-300 rounded text-xs sm:text-sm text-gray-700 focus:outline-none focus:border-gray-400 cursor-pointer appearance-none hover:border-gray-400 transition-colors w-full sm:min-w-[160px]"
          value={filters.region}
          onChange={(e) => update("region", e.target.value)}
        >
          <option value="">Customer Region</option>
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="East">East</option>
          <option value="West">West</option>
        </select>
        <div className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs">▼</div>
      </div>

      {/* Gender */}
      <div className="relative col-span-2 sm:col-span-1">
        <select
          className="h-8 sm:h-9 px-2 sm:px-3 pr-6 sm:pr-8 bg-gray-100 border border-gray-300 rounded text-xs sm:text-sm text-gray-700 focus:outline-none focus:border-gray-400 cursor-pointer appearance-none hover:border-gray-400 transition-colors w-full sm:min-w-[120px]"
          value={filters.gender}
          onChange={(e) => update("gender", e.target.value)}
        >
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <div className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs">▼</div>
      </div>

      {/* Age Range */}
      <div className="relative col-span-2 sm:col-span-1">
        <select
          className="h-8 sm:h-9 px-2 sm:px-3 pr-6 sm:pr-8 bg-gray-100 border border-gray-300 rounded text-xs sm:text-sm text-gray-700 focus:outline-none focus:border-gray-400 cursor-pointer appearance-none hover:border-gray-400 transition-colors w-full sm:min-w-[130px]"
          value={filters.ageMin && filters.ageMax ? `${filters.ageMin}-${filters.ageMax}` : ""}
          onChange={(e) => {
            if (e.target.value === "") {
              update("ageMin", "");
              update("ageMax", "");
            } else {
              const [min, max] = e.target.value.split("-");
              update("ageMin", min);
              update("ageMax", max);
            }
          }}
        >
          <option value="">Age Range</option>
          <option value="18-25">18-25</option>
          <option value="26-35">26-35</option>
          <option value="36-50">36-50</option>
          <option value="51-100">51+</option>
        </select>
        <div className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs">▼</div>
      </div>

      {/* Product Category */}
      <div className="relative col-span-2 sm:col-span-1">
        <select
          className="h-8 sm:h-9 px-2 sm:px-3 pr-6 sm:pr-8 bg-gray-100 border border-gray-300 rounded text-xs sm:text-sm text-gray-700 focus:outline-none focus:border-gray-400 cursor-pointer appearance-none hover:border-gray-400 transition-colors w-full sm:min-w-[160px]"
          value={filters.category}
          onChange={(e) => update("category", e.target.value)}
        >
          <option value="">Product Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Beauty">Beauty</option>
          <option value="Clothing">Clothing</option>
        </select>
        <div className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs">▼</div>
      </div>

      {/* Tags */}
      <div className="relative col-span-2 sm:col-span-1">
        <select
          className="h-8 sm:h-9 px-2 sm:px-3 pr-6 sm:pr-8 bg-gray-100 border border-gray-300 rounded text-xs sm:text-sm text-gray-700 focus:outline-none focus:border-gray-400 cursor-pointer appearance-none hover:border-gray-400 transition-colors w-full sm:min-w-[120px]"
          value={filters.tags}
          onChange={(e) => update("tags", e.target.value)}
        >
          <option value="">Tags</option>
          <option value="portable">Portable</option>
          <option value="gadgets">Gadgets</option>
          <option value="wireless">Wireless</option>
          <option value="fashion">Fashion</option>
          <option value="skincare">Skincare</option>
          <option value="cotton">Cotton</option>
        </select>
        <div className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs">▼</div>
      </div>

      {/* Payment Method */}
      <div className="relative col-span-2 sm:col-span-1">
        <select
          className="h-8 sm:h-9 px-2 sm:px-3 pr-6 sm:pr-8 bg-gray-100 border border-gray-300 rounded text-xs sm:text-sm text-gray-700 focus:outline-none focus:border-gray-400 cursor-pointer appearance-none hover:border-gray-400 transition-colors w-full sm:w-[160px]"
          value={filters.paymentMethod}
          onChange={(e) => update("paymentMethod", e.target.value)}
        >
          <option value="">Payment Method</option>
          <option value="UPI">UPI</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Debit Card">Debit Card</option>
          <option value="Wallet">Wallet</option>
          <option value="Cash">Cash</option>
        </select>
        <div className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs">▼</div>
      </div>

      {/* Date Filter with Dropdown */}
      <div className="relative col-span-2 sm:col-span-1">
        <button
          onClick={openDateDropdown}
          className="h-8 sm:h-9 px-2 sm:px-3 pr-6 sm:pr-8 bg-gray-100 border border-gray-300 rounded text-xs sm:text-sm text-gray-700 hover:border-gray-400 transition-colors w-full sm:w-auto text-left"
        >
          {filters.dateFrom || filters.dateTo ? `${filters.dateFrom || '...'} - ${filters.dateTo || '...'}` : 'Date'}
        </button>
        <div className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs">▼</div>
        
        {dateDropdownOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setDateDropdownOpen(false)}></div>
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50 min-w-[280px]">
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">From</label>
                  <input
                    type="date"
                    className="w-full h-8 px-2 bg-white border border-gray-300 rounded text-xs text-gray-700 focus:outline-none focus:border-blue-500"
                    value={tempDateFrom}
                    onChange={(e) => setTempDateFrom(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">To</label>
                  <input
                    type="date"
                    className="w-full h-8 px-2 bg-white border border-gray-300 rounded text-xs text-gray-700 focus:outline-none focus:border-blue-500"
                    value={tempDateTo}
                    onChange={(e) => setTempDateTo(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={clearDateFilter}
                    className="flex-1 px-3 py-1.5 text-xs text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                  >
                    Clear
                  </button>
                  <button
                    onClick={applyDateFilter}
                    className="flex-1 px-3 py-1.5 text-xs text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>

    {/* Second Row - Sort By, Order By */}
    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
      {/* Sort By */}
      {setSortBy && sortBy !== undefined && (
          <>
            <span className="text-xs sm:text-sm text-gray-700 whitespace-nowrap">Sort by:</span>
            <div className="relative flex-1 sm:flex-initial">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-8 sm:h-9 px-2 sm:px-3 pr-6 sm:pr-8 bg-gray-100 border border-gray-300 rounded text-xs sm:text-sm text-gray-700 focus:outline-none focus:border-gray-400 cursor-pointer appearance-none hover:border-gray-400 transition-colors w-full sm:w-[180px]"
              >
                <option value="">None</option>
                <option value="CustomerName">Customer Name</option>
                <option value="Date">Date</option>
                <option value="Quantity">Quantity</option>
              </select>
              <div className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs">▼</div>
            </div>
          </>
        )}

        {/* Order By */}
        {setSortOrder && (
          <div className="relative">
            <select
              value={(sortOrder ?? "") as string}
              onChange={(e) => setSortOrder(e.target.value)}
              className="h-8 sm:h-9 px-2 sm:px-3 pr-6 sm:pr-8 bg-gray-100 border border-gray-300 rounded text-xs sm:text-sm text-gray-700 focus:outline-none focus:border-gray-400 cursor-pointer appearance-none hover:border-gray-400 transition-colors w-[90px] sm:w-[100px]"
            >
              <option value="">Order</option>
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
            </select>
            <div className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs">▼</div>
          </div>
        )}
      </div>
  </div>
  );
}
