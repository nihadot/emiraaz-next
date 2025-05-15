import { useMemo } from 'react';

interface UsePaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  maxVisiblePages?: number;
}

export const usePagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  maxVisiblePages = 8,
}: UsePaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pages = useMemo(() => {
    let start = Math.max(currentPage - 1, 1);
    let end = start + maxVisiblePages - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - maxVisiblePages + 1, 1);
    }

    const range: number[] = [];
    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  }, [totalItems, itemsPerPage, currentPage, maxVisiblePages]);

  return {
    pages,
    totalPages,
  };
};
