import { useState, useEffect } from "react";
import useSalesData from "../hooks/useSalesData";
import Header from "../components/Header";
import MetricCards from "../components/MetricCards";
import Filters from "../components/Filters";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import Sidebar from "../components/Sidebar";

export default function SalesDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const {
    search, setSearch,
    filters, setFilters,
    sortBy, setSortBy,
    sortOrder, setSortOrder,
    page, setPage,
    data,
    pageInfo,
    loading
  } = useSalesData();

  const handleSearch = () => {
    setSearch(searchInput);
    setPage(1); // Reset to page 1 when search changes
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <div className={`flex-1 min-w-0 transition-all duration-300 ${sidebarOpen ? 'lg:ml-60' : 'lg:ml-0'}`}>
        <Header
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          onSearch={handleSearch}
          onMenuClick={() => setSidebarOpen(true)}
          showMenuButton={!sidebarOpen}
        />


        <div className="p-3 sm:p-4 md:p-6 max-w-screen-2xl mx-auto">

          <div className="mb-4">
            <Filters
              filters={filters}
              setFilters={setFilters}
              sortBy={sortBy}
              setSortBy={setSortBy}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
          </div>


          <MetricCards data={data} />


          <Table data={data} loading={loading} />


          <Pagination page={page} setPage={setPage} pageInfo={pageInfo} />
        </div>
      </div>
    </div>
  );
}
