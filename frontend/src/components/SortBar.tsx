interface Props {
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  
  sortOrder?: string | null;
  
  setSortOrder?: (o: string) => void;
}

export default function SortBar({ sortBy, setSortBy, sortOrder, setSortOrder }: Props) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full">
      <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Sort by</span>
      <div className="relative w-full sm:w-[220px]">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full h-10 pl-4 pr-10 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent cursor-pointer appearance-none shadow-sm hover:border-gray-300 transition-colors"
        >
          <option value="">None</option>
          <option value="CustomerName">Customer Name (A-Z)</option>
          <option value="Date">Date</option>
          <option value="Quantity">Quantity</option>
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">▼</div>
      </div>

      {setSortOrder && (
        <div className="w-full sm:w-[120px] mt-2 sm:mt-0 relative">
          <select
            value={(sortOrder ?? "") as string}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full h-10 pl-3 pr-8 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 font-medium appearance-none"
          >
            <option value="">Order</option>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">▼</div>
        </div>
      )}
    </div>
  );
}
