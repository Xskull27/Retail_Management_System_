interface Props {
  page: number;
  setPage: (v: number) => void;
  pageInfo: any;
}

export default function Pagination({ page, setPage, pageInfo }: Props) {
  // Compute total pages from pageInfo if available
  const totalPages = pageInfo && pageInfo.totalFiltered && pageInfo.pageSize
    ? Math.max(1, Math.ceil(pageInfo.totalFiltered / pageInfo.pageSize))
    : 6;

  // Pagination window: show current page with one sibling on each side,
  // always show first and last pages, and use ellipses when skipping.
  const siblings = 1;
  const pages: (number | string)[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);

    const left = Math.max(2, page - siblings);
    const right = Math.min(totalPages - 1, page + siblings);

    if (left > 2) {
      pages.push("...");
    }

    for (let i = left; i <= right; i++) pages.push(i);

    // If there are more pages beyond the right window, show a trailing ellipsis
    // but do not show the final page buttons after it (per request).
    if (right < totalPages - 1) {
      pages.push("...");
    } else {
      // If the window already reaches the tail, show remaining pages normally
      for (let i = right + 1; i <= totalPages; i++) pages.push(i);
    }
  }

  return (
    <div className="flex items-center justify-center gap-2">
      {/* Previous Button */}
      <button
        disabled={page <= 1}
        onClick={() => setPage(page - 1)}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        Previous
      </button>

      {/* Page Numbers */}
      {pages.map((p, idx) => (
        typeof p === "number" ? (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`w-10 h-10 text-sm font-medium rounded-lg transition-all ${page === p
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
          >
            {p}
          </button>
        ) : (
          <span key={`ellipsis-${idx}`} className="w-10 h-10 inline-flex items-center justify-center text-sm text-gray-500">{p}</span>
        )
      ))}

      {/* Next Button */}
      <button
        disabled={page >= totalPages}
        onClick={() => setPage(Math.min(totalPages, page + 1))}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        Next
      </button>
    </div>
  );
}

