interface Props {
  data: any[];
}

export default function Table({ data }: Props) {
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
            {data.length === 0 ? (
              <tr>
                <td colSpan={13} className="px-6 py-12 text-center text-gray-500">
                  No data found
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

