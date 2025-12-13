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

  const [tagFocus, setTagFocus] = useState(false);

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* First Row - Main Filters */}
      <div className="flex items-center gap-2 flex-wrap">
      {/* Customer Region */}
      <div className="relative">
        <select
          className="h-9 px-3 pr-8 bg-white border border-gray-300 rounded text-sm text-gray-700 focus:outline-none focus:border-gray-400 cursor-pointer appearance-none hover:border-gray-400 transition-colors min-w-[160px]"
          value={filters.region}
          onChange={(e) => update("region", e.target.value)}
        >
          <option value="">Customer Region</option>
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="East">East</option>
          <option value="West">West</option>
        </select>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs">▼</div>
      </div>

      {/* Gender */}
      <div className="relative">
        <select
          className="h-9 px-3 pr-8 bg-white border border-gray-300 rounded text-sm text-gray-700 focus:outline-none focus:border-gray-400 cursor-pointer appearance-none hover:border-gray-400 transition-colors min-w-[120px]"
          value={filters.gender}
          onChange={(e) => update("gender", e.target.value)}
        >
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs">▼</div>
      </div>

      {/* Age Range */}
      <div className="relative">
        <select
          className="h-9 px-3 pr-8 bg-white border border-gray-300 rounded text-sm text-gray-700 focus:outline-none focus:border-gray-400 cursor-pointer appearance-none hover:border-gray-400 transition-colors min-w-[130px]"
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
        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs">▼</div>
      </div>

      {/* Product Category */}
      <div className="relative">
        <select
          className="h-9 px-3 pr-8 bg-white border border-gray-300 rounded text-sm text-gray-700 focus:outline-none focus:border-gray-400 cursor-pointer appearance-none hover:border-gray-400 transition-colors min-w-[160px]"
          value={filters.category}
          onChange={(e) => update("category", e.target.value)}
        >
          <option value="">Product Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Beauty">Beauty</option>
          <option value="Clothing">Clothing</option>
        </select>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs">▼</div>
      </div>

      {/* Tags */}
      <div className="relative group">
        <style>{`@keyframes marquee{0%{transform:translateX(100%);}100%{transform:translateX(-100%);}} .group:hover .marquee{animation-play-state:paused;}`}</style>
        <input
          type="text"
          className="h-9 px-3 bg-white border border-gray-300 rounded text-sm text-gray-700 focus:outline-none focus:border-gray-400 hover:border-gray-400 transition-colors min-w-[120px]"
          placeholder=""
          value={filters.tags}
          onChange={(e) => update("tags", e.target.value)}
          onFocus={() => setTagFocus(true)}
          onBlur={() => setTagFocus(false)}
        />
        {!filters.tags && !tagFocus && (
          <div className="absolute inset-0 pl-3 flex items-center pointer-events-none overflow-hidden">
            <div style={{ whiteSpace: "nowrap", animation: "marquee 12s linear infinite" }}
              className="text-sm text-gray-400 marquee">
              Tags (e.g. portable, gadgets, wireless)&nbsp;&nbsp;&nbsp;
            </div>
          </div>
        )}
      </div>

      {/* Payment Method */}
      <div className="relative">
        <select
          className="h-9 px-3 pr-8 bg-white border border-gray-300 rounded text-sm text-gray-700 focus:outline-none focus:border-gray-400 cursor-pointer appearance-none hover:border-gray-400 transition-colors w-[160px]"
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
        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs">▼</div>
      </div>
    </div>

    {/* Second Row - Date From/To (Left), Sort By, Order By (Right) */}
    <div className="flex items-center justify-between gap-2">
      {/* Left Side - Date From and To */}
      <div className="flex items-center gap-2">
        {/* Date From */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 whitespace-nowrap">Date from:</label>
          <input
            type="date"
            className="h-9 px-3 bg-white border border-gray-300 rounded text-sm text-gray-700 focus:outline-none focus:border-gray-400 hover:border-gray-400 transition-colors min-w-[140px]"
            value={filters.dateFrom}
            onChange={(e) => update("dateFrom", e.target.value)}
          />
        </div>

        {/* Date To */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 whitespace-nowrap">to:</label>
          <input
            type="date"
            className="h-9 px-3 bg-white border border-gray-300 rounded text-sm text-gray-700 focus:outline-none focus:border-gray-400 hover:border-gray-400 transition-colors min-w-[140px]"
            value={filters.dateTo}
            onChange={(e) => update("dateTo", e.target.value)}
          />
        </div>
      </div>

      {/* Right Side - Sort By and Order */}
      <div className="flex items-center gap-2">
        {/* Sort By */}
        {setSortBy && sortBy !== undefined && (
          <>
            <span className="text-sm text-gray-700 whitespace-nowrap">Sort by:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-9 px-3 pr-8 bg-white border border-gray-300 rounded text-sm text-gray-700 focus:outline-none focus:border-gray-400 cursor-pointer appearance-none hover:border-gray-400 transition-colors w-[200px]"
              >
                <option value="">None</option>
                <option value="CustomerName">Customer Name (A-Z)</option>
                <option value="Date">Date</option>
                <option value="Quantity">Quantity</option>
              </select>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs">▼</div>
            </div>
          </>
        )}

        {/* Order By */}
        {setSortOrder && (
          <div className="relative">
            <select
              value={(sortOrder ?? "") as string}
              onChange={(e) => setSortOrder(e.target.value)}
              className="h-9 px-3 pr-8 bg-white border border-gray-300 rounded text-sm text-gray-700 focus:outline-none focus:border-gray-400 cursor-pointer appearance-none hover:border-gray-400 transition-colors w-[100px]"
            >
              <option value="">Order</option>
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
            </select>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs">▼</div>
          </div>
        )}
      </div>
    </div>
  </div>
  );
}
