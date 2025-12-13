import useSalesData from "../hooks/useSalesData";
import Header from "../components/Header";
import MetricCards from "../components/MetricCards";
import Filters from "../components/Filters";
//import SortBar from "../components/SortBar";
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
    pageInfo,
    loading
  } = useSalesData();

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-x-hidden">

      <div className="flex-1 transition-all duration-300 overflow-x-hidden">

        <Header search={search} setSearch={setSearch} />


        <div className="p-6 max-w-screen-2xl mx-auto">

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
