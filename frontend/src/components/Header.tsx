interface HeaderProps {
    search: string;
    setSearch: (search: string) => void;
    onMenuClick?: () => void;
    showMenuButton?: boolean;
}

export default function Header({ search, setSearch, onMenuClick, showMenuButton = false }: HeaderProps) {
    return (
        <div className="bg-white border-b border-gray-200 px-3 sm:px-4 md:px-8 py-3 sm:py-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                {showMenuButton && (
                    <button
                        onClick={onMenuClick}
                        className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                    >
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                )}
                <h1 className="text-sm sm:text-lg md:text-xl font-semibold text-gray-800 truncate">Sales Management System</h1>
            </div>

            <div className="flex items-center flex-1 max-w-md ml-2 sm:ml-4">
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Name, Phone no..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-8 sm:pl-10 pr-8 sm:pr-9 py-1.5 sm:py-2 bg-gray-100 border border-gray-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <svg
                        className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    {search && (
                        <button
                            onClick={() => setSearch("")}
                            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
