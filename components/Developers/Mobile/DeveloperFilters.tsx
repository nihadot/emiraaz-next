'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useFetchAllEmirateNamesQuery } from '@/redux/emirates/emiratesApi';

type Filters = {
  page: number;
  search: string;
  emirate: string;
};

interface DeveloperFiltersProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

type OpenFilter = 'emirate' | 'city' | 'category' | null;

export default function DeveloperFilters({
  filters,
  setFilters,
}: DeveloperFiltersProps) {
  const [open, setOpen] = useState<OpenFilter>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: emiratesData } = useFetchAllEmirateNamesQuery();
  const emirates =
    emiratesData?.data?.map((item) => item.name) || [];

  /* 🔒 Close dropdown on outside click */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectEmirate = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      emirate: value,
      page: 1,
    }));
    setOpen(null);
  };

  return (
    <div ref={containerRef} className="mb-2">
      <div className="flex gap-1 scrollbar-hide">
        {/* Emirates */}
        <div className="relative">
          <button
            onClick={() =>
              setOpen(open === 'emirate' ? null : 'emirate')
            }
            className="flex items-center justify-between min-w-[120px] h-11 px-3 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700"
          >
            <span>{filters.emirate || 'Emirates'}</span>
            <ChevronDown size={16} />
          </button>

          {open === 'emirate' && (
            <div className="absolute left-0 z-50 mt-2 w-[220px] rounded-xl border border-gray-200 bg-white shadow-lg max-h-[260px] overflow-y-auto scrollbar-hide">
              <button
                onClick={() => handleSelectEmirate('')}
                className="w-full px-4 py-3 text-left text-sm text-gray-600 hover:bg-gray-50"
              >
                All Emirates
              </button>

              {emirates.map((item) => (
                <button
                  key={item}
                  onClick={() => handleSelectEmirate(item)}
                  className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* City */}
        <div className="relative">
          <button
            onClick={() =>
              setOpen(open === 'city' ? null : 'city')
            }
            className="flex items-center justify-between min-w-[120px] h-11 px-3 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700"
          >
            City
            <ChevronDown size={16} />
          </button>

          {open === 'city' && (
            <div className="absolute left-0 z-50 mt-2 w-[180px] rounded-xl border border-gray-200 bg-white shadow-lg">
              <button className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50">
                Dubai
              </button>
              <button className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50">
                Abu Dhabi
              </button>
            </div>
          )}
        </div>

        {/* Category */}
        <div className="relative">
          <button
            onClick={() =>
              setOpen(open === 'category' ? null : 'category')
            }
            className="flex items-center justify-between min-w-[130px] h-11 px-3 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700"
          >
            Category
            <ChevronDown size={16} />
          </button>

          {open === 'category' && (
            <div className="absolute left-0 z-50 mt-2 w-[200px] rounded-xl border border-gray-200 bg-white shadow-lg">
              <button className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50">
                Residential
              </button>
              <button className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50">
                Commercial
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
