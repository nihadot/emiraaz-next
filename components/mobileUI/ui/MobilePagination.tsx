"use client";

import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function MobilePagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="w-full px-4 py-4 bg-white font-poppins">
      {/* Page indicator */}
      <div className="text-center text-sm text-gray-500 mb-3">
        Page <span className="font-medium text-gray-900">{currentPage}</span> of{" "}
        <span className="font-medium text-gray-900">{totalPages}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-3">
        {/* Prev */}
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="flex-1 h-11 rounded-lg border bg-neutral-50 border-gray-200 text-gray-700 font-medium disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        {/* Next */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="flex-1 h-11 rounded-lg bg-gray-900 text-white font-medium disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default MobilePagination;
