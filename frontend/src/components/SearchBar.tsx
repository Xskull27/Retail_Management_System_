
interface Props {
  search: string;
  setSearch: (v: string) => void;
}

export default function SearchBar({ search, setSearch }: Props) {
  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
        placeholder="Name, Phone no..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

