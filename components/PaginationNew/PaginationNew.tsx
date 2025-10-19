import React, { useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";

interface PaginationNewProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
  setTotalPages?: (pages: number) => void;
}

const PaginationNew: React.FC<PaginationNewProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 6,
  setTotalPages,
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

  const handlePageClick = (page: number) => {
    if (page === 7 && setTotalPages) {
      setTotalPages(10);
      onPageChange(8);
    } else {
      onPageChange(page);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageClick(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageClick(currentPage + 1);
    }
  };

  // // 🟨 Here's the useEffect that reacts to currentPage changes
  // useEffect(() => {
  //   // Example: Scroll to top smoothly on page change
  //   // window.scrollTo({ top: 0, behavior: "smooth" });

  //   // You could also use this to store page state to session/localStorage
  //   // sessionStorage.setItem('current-page', currentPage.toString());
  // }, [currentPage]); // 👈 Dependency added here

  const visiblePages = getVisiblePages();

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4">
      <div className="flex overflow-x-auto max-w-full gap-2 px-2 scrollbar-hide">
        {currentPage > 1 && (
          <div
            className="w-9 h-9 flex justify-center items-center min-w-[36px] px-2 py-1 text-sm rounded text-[#767676] bg-[#F5F5F5]"
            onClick={handlePrevPage}
            aria-label="Previous page"
          >

            {/* <HiOutlineChevronLeft */}
            <HiOutlineChevronLeft
            size={20}
            />
          </div>
        )}
        {visiblePages.map((page) => (
          <button
            key={page}
            className={`w-9 h-9 cursor-pointer min-w-[36px] px-2 py-1 text-sm rounded text-[#767676] ${
              currentPage === page
                ? "bg-red-600/10 text-red-600 font-medium"
                : "bg-[#F5F5F5]"
            }`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        ))}
        {currentPage < totalPages && (
          // <button
          //   className="w-9 h-9 min-w-[36px] px-2 py-1 text-sm rounded text-[#767676] bg-[#F5F5F5]"
          //   onClick={handleNextPage}
          //   aria-label="Next page"
          // >
          //   →
          // </button>
          <div 
          
            className="w-9 h-9 flex justify-center items-center min-w-[36px] px-2 py-1 text-sm rounded text-[#767676] bg-[#F5F5F5]"
            onClick={handleNextPage}
            aria-label="Next page"
          >

          <HiOutlineChevronRight
            size={20}
            />
            </div>
        )}
      </div>
    </div>
  );
};

export default PaginationNew;
