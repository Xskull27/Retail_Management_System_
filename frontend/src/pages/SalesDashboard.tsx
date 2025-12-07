import useSalesData from "../hooks/useSalesData";
import Header from "../components/Header";
import MetricCards from "../components/MetricCards";
import Filters from "../components/Filters";
import SortBar from "../components/SortBar";
import Table from "../components/Table";
import Pagination from "../components/Pagination";

export default function SalesDashboard() {

  const {
    search, setSearch,
    filters, setFilters,
    sortBy, setSortBy,
    sortOrder, setSortOrder,
    page, setPage,
    data,
    pageInfo
  } = useSalesData();

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-x-hidden">

      <div className="flex-1 transition-all duration-300 overflow-x-hidden">

        <Header search={search} setSearch={setSearch} />


        <div className="p-6 max-w-screen-xl mx-auto">

          <div className="flex items-center justify-between mb-6">
            <Filters filters={filters} setFilters={setFilters} />
            <SortBar
              sortBy={sortBy}
              setSortBy={setSortBy}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
          </div>

          {/* Mobile-only search below filters; visible on screens smaller than lg */}
          <div className="lg:hidden mb-6">
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
          </div>


          <MetricCards data={data} />


          <Table data={data} />


          <Pagination page={page} setPage={setPage} pageInfo={pageInfo} />
        </div>
      </div>
    </div>
  );
}
