import React, { useState } from "react";
import type { FilterState } from "../hooks/useSalesData";

interface Props {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

export default function Filters({ filters, setFilters }: Props) {
  const update = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // track focus state for the tags input so the animated placeholder hides on focus
  const [tagFocus, setTagFocus] = useState(false);

  return (
    <div className="flex items-center gap-4 flex-wrap">
      {/* Customer Region */}
      <div className="relative mt-4">
        <select
          className="h-10 px-4 pr-8 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent cursor-pointer appearance-none shadow-sm hover:border-gray-300 transition-colors w-[180px]"
          value={filters.region}
          onChange={(e) => update("region", e.target.value)}
        >
          <option value="">Customer Region</option>
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="East">East</option>
          <option value="West">West</option>
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">▼</div>
      </div>

      {/* Gender */}
      <div className="relative mt-4">
        <select
          className="h-10 px-4 pr-8 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent cursor-pointer appearance-none shadow-sm hover:border-gray-300 transition-colors w-[140px]"
          value={filters.gender}
          onChange={(e) => update("gender", e.target.value)}
        >
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">▼</div>
      </div>

      {/* Age Range */}
      <div className="relative mt-4">
        <select
          className="h-10 px-4 pr-8 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent cursor-pointer appearance-none shadow-sm hover:border-gray-300 transition-colors w-[140px]"
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
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">▼</div>
      </div>

      {/* Product Category */}
      <div className="relative mt-4">
        <select
          className="h-10 px-4 pr-8 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent cursor-pointer appearance-none shadow-sm hover:border-gray-300 transition-colors w-[180px]"
          value={filters.category}
          onChange={(e) => update("category", e.target.value)}
        >
          <option value="">Product Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Clothing">Clothing</option>
          <option value="Home Appliances">Home Appliances</option>
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">▼</div>
      </div>

      {/* Tags */}
      <div className="flex flex-col">
        <div className="flex flex-col relative group">
          {/* simple marquee keyframes injected locally; animation pauses when parent (group) is hovered */}
          <style>{`@keyframes marquee{0%{transform:translateX(100%);}100%{transform:translateX(-100%);}} .group:hover .marquee{animation-play-state:paused;}`}</style>
          {/* helper label above the input (accessibly linked) */}
          <label htmlFor="tags-input" className="text-xs text-gray-500 mb-1">Separate tags with commas — <span className="text-gray-700"></span></label>

          <div className="relative w-[160px]">
            <input
              id="tags-input"
              type="text"
              className="w-full h-10 px-4 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent shadow-sm hover:border-gray-300 transition-colors"
              placeholder=""
              value={filters.tags}
              onChange={(e) => update("tags", e.target.value)}
              onFocus={() => setTagFocus(true)}
              onBlur={() => setTagFocus(false)}
            />

            {/* Animated placeholder shown only when input empty and not focused; overlay positioned within input box */}
            {!filters.tags && !tagFocus && (
              <div className="absolute inset-0 pl-4 flex items-center pointer-events-none overflow-hidden">
                <div style={{ whiteSpace: "nowrap", animation: "marquee 12s linear infinite" }} className="text-sm text-gray-400 marquee">
                  Tags (e.g. portable, gadgets, wireless)&nbsp;&nbsp;&nbsp;
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="relative mt-4">
        <select
          className="h-10 px-4 pr-8 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent cursor-pointer appearance-none shadow-sm hover:border-gray-300 transition-colors w-[180px]"
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
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">▼</div>
      </div>

      {/* Date From */}
      <div className="flex flex-col">
        <label className="text-xs text-gray-600 mb-1">Date From</label>
        <input
          type="date"
          className="h-10 px-4 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent shadow-sm hover:border-gray-300 transition-colors"
          value={filters.dateFrom}
          onChange={(e) => update("dateFrom", e.target.value)}
        />
      </div>

      {/* Date To */}
      <div className="flex flex-col">
        <label className="text-xs text-gray-600 mb-1">Date To</label>
        <input
          type="date"
          aria-invalid={
            filters.dateFrom && filters.dateTo && filters.dateFrom > filters.dateTo
          }
          className="h-10 px-4 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent shadow-sm hover:border-gray-300 transition-colors"
          value={filters.dateTo}
          onChange={(e) => update("dateTo", e.target.value)}
        />
      </div>

      {/* Validation: show error if From > To */}
      {filters.dateFrom && filters.dateTo && filters.dateFrom > filters.dateTo && (
        <div className="w-full text-xs text-red-600 mt-1">Date From must be before or equal to Date To.</div>
      )}
    </div>
  );
}

