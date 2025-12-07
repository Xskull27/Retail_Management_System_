interface HeaderProps {
    search: string;
    setSearch: (search: string) => void;
}

export default function Header({ search, setSearch }: HeaderProps) {
    return (
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between shadow-sm">
           
            <h1 className="text-xl font-semibold text-gray-800">Sales Management System</h1>

           
            <div className="flex items-center gap-4">
                {/* Search Bar */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Name, Phone no..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-64 pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <svg
                        className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>

                
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md">
                        R
                    </div>
                </div>
            </div>
        </div>
    );
}
