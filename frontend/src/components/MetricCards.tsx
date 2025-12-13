interface Props {
    data: any[];
}

export default function logiMetricCards({ data }: Props) {
    // Calculate metrics from data
    const totalUnits = data.reduce((sum, item) => sum + (Number(item.Quantity) || 0), 0);
    const parseNumber = (v: any) => {
        if (v == null) return 0;
        const s = String(v).replace(/[^0-9.-]+/g, "");
        const n = Number(s);
        return Number.isFinite(n) ? n : 0;
    };
    // Sum only the rows currently present in `data` (current page)
    const totalAmount = data.reduce((sum, item) => sum + parseNumber(item.TotalAmount), 0);
    
    // Calculate total discount - sum all discount amounts from DiscountPercentage field
    // Formula: (TotalAmount * DiscountPercentage) / 100
    const totalDiscount = data.reduce((sum, item) => {
        const amount = parseNumber(item.TotalAmount);
        const discountPercent = parseNumber(item.DiscountPercentage || item['Discount Percentage']);
        const discountAmount = (amount * discountPercent) / 100;
        return sum + discountAmount;
    }, 0);
    
    // Count how many records have discounts
    const recordsWithDiscount = data.filter(item => {
        const discountPercent = parseNumber(item.DiscountPercentage || item['Discount Percentage']);
        return discountPercent > 0;
    }).length;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
            <MetricCard
                title="Total units sold"
                tooltip="Sum of unit quantities for the currently visible rows (current page)."
                value={totalUnits.toLocaleString()}
                textColor="text-gray-900"
            />
            <MetricCard
                title="Total Amount"
                tooltip="Sum of the Total Amount values for the currently visible rows (current page)."
                value={`₹${totalAmount.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}`}
                subtitle={`(${data.length} SR${data.length === 1 ? '' : 's'})`}
                textColor="text-gray-900"
            />
            <MetricCard
                title="Total Discount"
                tooltip="Total discount amount calculated from discount percentages on the currently visible rows (current page)."
                value={`₹${Math.round(totalDiscount).toLocaleString()}`}
                subtitle={`(${recordsWithDiscount} SR${recordsWithDiscount === 1 ? '' : 's'})`}
                textColor="text-green-600"
            />
        </div>
    );
}

interface MetricCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    textColor: string;
    tooltip?: string;
}

function MetricCard({ title, value, subtitle, textColor, tooltip }: MetricCardProps) {
    return (
        <div className="bg-white w-full rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 transition-all hover:shadow-md">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-1.5">
                        <span className="text-xs sm:text-sm font-medium text-gray-600">{title}</span>
                      
                        {tooltip && (
                            <div className="relative ml-0.5 sm:ml-1">
                                <div className="group">
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <path d="M12 16v-4"></path>
                                        <path d="M12 8h.01"></path>
                                    </svg>
                                    <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="w-56 text-xs text-white bg-gray-800 rounded px-2 py-1 shadow-md text-center">
                                            {tooltip}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={`text-lg sm:text-xl md:text-2xl font-bold ${textColor} mb-0.5`}>
                        {value}
                    </div>
                    {subtitle && (
                        <div className="text-[10px] sm:text-xs text-gray-500">{subtitle}</div>
                    )}
                </div>
            </div>
        </div>
    );
}
