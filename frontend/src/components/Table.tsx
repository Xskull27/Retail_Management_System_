interface Props {
  data: any[];
  loading?: boolean;
}

export default function Table({ data, loading = false }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
      <div className="overflow-x-auto">
        <table className="w-full min-w-max">
          <thead className="bg-gray-800 border-b border-gray-700">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider whitespace-nowrap">
                Transaction ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider whitespace-nowrap">
                Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider whitespace-nowrap">
                Customer ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider whitespace-nowrap">
                Customer name
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider whitespace-nowrap">
                Phone Number
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider whitespace-nowrap">
                Gender
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider whitespace-nowrap">
                Age
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider whitespace-nowrap">
                Product Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider whitespace-nowrap">
                Quantity
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider whitespace-nowrap">
                Total Amount
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider whitespace-nowrap">
                Customer region
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider whitespace-nowrap">
                Product ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider whitespace-nowrap">
                Employee name
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={13} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
                    <span className="text-sm text-gray-500">Loading data...</span>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={13} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-gray-500 font-medium">No data found</span>
                    <span className="text-sm text-gray-400">Try adjusting your search or filters</span>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap font-medium">
                    {row.TransactionID || row.transactionId || '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                    {row.Date || '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                    {row.CustomerID || row.customerId || '-'}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {row.CustomerName || '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                    {row.PhoneNumber || '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                    {row.Gender || '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                    {row.Age || '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                    <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {row.ProductCategory || '-'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap font-semibold">
                    {row.Quantity?.toString().padStart(2, '0') || '00'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap font-semibold">
                    ₹{row.TotalAmount?.toLocaleString() || '1,000'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                    {row.CustomerRegion || row.Region || 'South'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap font-mono">
                    {row.ProductID || row.productId || 'PRD00001'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                    {row.EmployeeName || row.employeeName || 'Harsh Agrawal'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

