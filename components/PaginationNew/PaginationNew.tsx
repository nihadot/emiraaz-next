import React, { useEffect } from "react";

interface PaginationNewProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number; // e.g., 6
}

const PaginationNew: React.FC<PaginationNewProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 6,
}) => {
  const getVisiblePages = () => {
    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(currentPage - half, 1);
    let end = start + maxVisiblePages - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - maxVisiblePages + 1, 1);
    }

    const pages: number[] = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };


  const visiblePages = getVisiblePages();

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4">
      <div className="flex overflow-x-auto max-w-full gap-2 px-2 scrollbar-hide">
        {visiblePages.map((page) => (
          <button
            key={page}
            className={`w-9 h-9 min-w-[36px] px-2 py-1 text-sm rounded text-[#767676] ${
              currentPage === page
                ? "bg-red-600/10 text-red-600 font-medium"
                : "bg-[#F5F5F5]"
            }`}
            onClick={() => {
              onPageChange(page)
                window.scrollTo({ top: 0, behavior: 'smooth' });
            
            }}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaginationNew;
