interface Props {
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  
  sortOrder?: string | null;
  
  setSortOrder?: (o: string) => void;
}

export default function SortBar({ sortBy, setSortBy, sortOrder, setSortOrder }: Props) {
  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      <span className="text-sm text-gray-700">Sort by:</span>
      <div className="relative">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="h-9 px-3 pr-8 bg-white border border-gray-300 rounded text-sm text-gray-700 focus:outline-none focus:border-gray-400 cursor-pointer appearance-none hover:border-gray-400 transition-colors min-w-[200px]"
        >
          <option value="">None</option>
          <option value="CustomerName">Customer Name (A-Z)</option>
          <option value="Date">Date</option>
          <option value="Quantity">Quantity</option>
        </select>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs">▼</div>
      </div>

      {setSortOrder && (
        <div className="relative">
          <select
            value={(sortOrder ?? "") as string}
            onChange={(e) => setSortOrder(e.target.value)}
            className="h-9 px-3 pr-8 bg-white border border-gray-300 rounded text-sm text-gray-700 focus:outline-none focus:border-gray-400 cursor-pointer appearance-none hover:border-gray-400 transition-colors min-w-[100px]"
          >
            <option value="">Order</option>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs">▼</div>
        </div>
      )}
    </div>
  );
}
