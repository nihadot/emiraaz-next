import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getVisiblePages = () => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4">
      <button
        className="px-3 py-1 text-sm h-9 min-w-[64px] text-red-600 bg-red-600/10 rounded disabled:opacity-50"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </button>

      <div className="flex overflow-x-auto max-w-full gap-2 px-2 scrollbar-hide">
        {visiblePages.map((page, index) =>
          page === "..." ? (
            <span
              key={index}
              className="w-9 h-9 flex items-center justify-center text-gray-400"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              className={`w-9 h-9 min-w-[36px] px-2 py-1 text-sm rounded text-[#767676] ${
                currentPage === page
                  ? "bg-red-600/10 text-red-600 font-medium"
                  : "bg-[#F5F5F5]"
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        className="px-3 py-1 text-sm h-9 min-w-[64px] text-red-600 bg-red-600/10 rounded disabled:opacity-50"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
