'use client';

import { useState, useMemo } from 'react';
import { useViewAllDevelopersQuery } from '@/redux/developers/developersApi';
import DeveloperFilters from './DeveloperFilters';
import DeveloperList from './DeveloperList';
import PaginationNew from '@/components/PaginationNew/PaginationNew';

export default function DeveloperMobile() {
  const [filters, setFilters] = useState({
    page: 1,
    search: '',
    emirate: '',
  });

  const queryParams = useMemo(
    () => ({
      limit: 10, // mobile-friendly
      page: filters.page,
      search: filters.search,
      emirate: filters.emirate,
    }),
    [filters]
  );

  const { data, isLoading } = useViewAllDevelopersQuery(queryParams);

  const developers = data?.data || [];
  const totalPages = data?.pagination?.totalPages || 1;

  return (
    <div className="px-4 py-4 bg-gray-50 min-h-screen">
      <DeveloperFilters
        filters={filters}
        setFilters={setFilters}
      />

      {isLoading ? (
        <p className="text-center mt-10 text-sm">Loading...</p>
      ) : (
        <DeveloperList developers={developers} />
      )}

      {totalPages > 1 && (
        <div className="mt-6">
          <PaginationNew
            currentPage={filters.page}
            totalPages={totalPages}
            onPageChange={(page) =>
              setFilters((prev) => ({ ...prev, page }))
            }
            maxVisiblePages={5}
          />
        </div>
      )}
    </div>
  );
}
