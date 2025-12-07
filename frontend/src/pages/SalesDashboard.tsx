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
      {/* Main Content */}
      <div className="flex-1 transition-all duration-300 overflow-x-hidden">
        {/* Header */}
        <Header search={search} setSearch={setSearch} />

        {/* Content Area */}
        <div className="p-6 max-w-screen-xl mx-auto">
          {/* Filters and Sort */}
          <div className="flex items-center justify-between mb-6">
            <Filters filters={filters} setFilters={setFilters} />
            <SortBar
              sortBy={sortBy}
              setSortBy={setSortBy}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
          </div>

          {/* Metric Cards */}
          <MetricCards data={data} />

          {/* Table */}
          <Table data={data} />

          {/* Pagination */}
          <Pagination page={page} setPage={setPage} pageInfo={pageInfo} />
        </div>
      </div>
    </div>
  );
}
