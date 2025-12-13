import { useState } from "react";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const [servicesOpen, setServicesOpen] = useState(true);
  const [invoicesOpen, setInvoicesOpen] = useState(true);

  return (
    <>
      {/* Mobile Overlay - only on small screens */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-60 bg-gray-100 border-r border-gray-200 h-screen overflow-y-auto flex-shrink-0 transform transition-all duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
      {/* Logo and User Section */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-semibold text-gray-900 truncate">TruEstate</h2>
            <p className="text-xs text-gray-500 truncate">Priyanshu Mishra</p>
          </div>
          <button onClick={onToggle} className="text-gray-400 hover:text-gray-600 flex-shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="px-3 py-4">
        {/* Dashboard */}
        <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors mb-1">
          <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="truncate">Dashboard</span>
        </button>

        {/* Nexus */}
        <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors mb-1">
          <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="truncate">Nexus</span>
        </button>

        {/* Intake */}
        <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors mb-1">
          <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="truncate">Intake</span>
        </button>

        {/* Services */}
        <div className="mb-1">
          <button
            onClick={() => setServicesOpen(!servicesOpen)}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="flex-1 text-left truncate">Services</span>
            <svg
              className={`w-3.5 h-3.5 text-gray-400 transition-transform flex-shrink-0 ${servicesOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Services Submenu */}
          {servicesOpen && (
            <div className="ml-7 mt-1 space-y-0.5">
              <button className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeWidth={2} />
                </svg>
                <span className="truncate">Pre-active</span>
              </button>
              <button className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="truncate">Active</span>
              </button>
              <button className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeWidth={2} />
                </svg>
                <span className="truncate">Blocked</span>
              </button>
              <button className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeWidth={2} />
                </svg>
                <span className="truncate">Closed</span>
              </button>
            </div>
          )}
        </div>

        {/* Invoices */}
        <div>
          <button
            onClick={() => setInvoicesOpen(!invoicesOpen)}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="flex-1 text-left truncate">Invoices</span>
            <svg
              className={`w-3.5 h-3.5 text-gray-400 transition-transform flex-shrink-0 ${invoicesOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Invoices Submenu */}
          {invoicesOpen && (
            <div className="ml-7 mt-1 space-y-0.5">
              <button className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="font-medium truncate">Proforma Invoices</span>
              </button>
              <button className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="truncate">Final Invoices</span>
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
    </>
  );
}
