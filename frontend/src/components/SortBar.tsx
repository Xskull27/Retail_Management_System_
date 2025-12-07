interface Props {
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  
  sortOrder?: string | null;
  
  setSortOrder?: (o: string) => void;
}

export default function SortBar({ sortBy, setSortBy, sortOrder, setSortOrder }: Props) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Sort by</span>
      <div className="relative">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="h-10 pl-4 pr-10 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent cursor-pointer appearance-none shadow-sm hover:border-gray-300 transition-colors"
        >
          <option value="">None</option>
          <option value="CustomerName">Customer Name (A-Z)</option>
          <option value="Date">Date</option>
          <option value="Quantity">Quantity</option>
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">▼</div>
      </div>

      {setSortOrder && (
        <select
          value={(sortOrder ?? "") as string}
          onChange={(e) => setSortOrder(e.target.value)}
          className="h-10 pl-3 pr-8 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 font-medium"
        >
          <option value="">Order</option>
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      )}
    </div>
  );
}
