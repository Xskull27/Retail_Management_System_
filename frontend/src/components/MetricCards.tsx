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

    return (
        <div className="flex flex-row gap-8 mb-8">
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
        <div className="bg-white w-1/4 rounded-lg shadow-sm border border-gray-200 p-6 transition-all hover:shadow-md">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-gray-600">{title}</span>
                      
                        {tooltip && (
                            <div className="relative ml-1">
                                <div className="group">
                                    <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                    <div className={`text-2xl font-bold ${textColor} mb-1`}>
                        {value}
                    </div>
                    {subtitle && (
                        <div className="text-xs text-gray-500">{subtitle}</div>
                    )}
                </div>
            </div>
        </div>
    );
}
