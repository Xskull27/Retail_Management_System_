import React, { useState } from "react";

interface HeaderProps {
    search: string;
    setSearch: (search: string) => void;
}

export default function Header({ search, setSearch }: HeaderProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative bg-white border-b border-gray-200 px-4 sm:px-8 py-4 flex items-center justify-between shadow-sm">
            <h1 className="text-lg sm:text-xl font-semibold text-gray-800">Sales Management System</h1>

            <div className="flex items-center gap-4">
                {/* Mobile menu button */}
                <button
                    aria-label="Toggle menu"
                    onClick={() => setOpen((s) => !s)}
                    className="sm:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none"
                >
                    {open ? (
                        <svg className="w-6 h-6 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                    )}
                </button>

                {/* Desktop controls */}
                <div className="hidden sm:flex items-center gap-4">
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

            {/* Mobile dropdown */}
            {open && (
                <div className="sm:hidden absolute right-4 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-md p-3 z-40">
                    <div className="relative mb-3">
                        <input
                            type="text"
                            placeholder="Name, Phone no..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md">
                            R
                        </div>
                        <div className="ml-3 text-sm text-gray-700">Profile</div>
                    </div>
                </div>
            )}
        </div>
    );
}
