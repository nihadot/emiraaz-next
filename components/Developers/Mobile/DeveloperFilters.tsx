"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useFetchAllEmirateNamesQuery } from "@/redux/emirates/emiratesApi";

type Filters = {
  page: number;
  search: string;
  emirate: string;
};

interface DeveloperFiltersProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

type OpenFilter = "emirate" | "city" | "category" | null;

export default function DeveloperFilters({
  filters,
  setFilters,
}: DeveloperFiltersProps) {
  const [open, setOpen] = useState<OpenFilter>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: emiratesData } = useFetchAllEmirateNamesQuery();
  const emirates = emiratesData?.data?.map((item) => item.name) || [];

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

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
    <div ref={containerRef} className="mb-3 px-1 font-poppins">
      <div className="flex gap-2 scrollbar-hide">
        {/* Emirates */}
        <div className="relative">

          <button
            onClick={() => setOpen(open === "emirate" ? null : "emirate")}
            className="flex items-center justify-between gap-2  min-w-40 h-9 px-3 rounded-[5px] border border-[#DEDEDE] bg-white text-sm font-normal text-gray-500"
          >
            <span className="truncate">{filters.emirate || "Emirates"}</span>
            <ChevronDown size={20} />
          </button>

          {open === "emirate" && (
            <div className="absolute left-0 z-50 mt-2 w-[220px] rounded-sm border border-gray-200 bg-white shadow-lg max-h-[260px] overflow-y-auto scrollbar-hide">
              <button
                onClick={() => handleSelectEmirate("")}
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
            onClick={() => setOpen(open === "city" ? null : "city")}
            className="flex items-center justify-between gap-2 min-w-[110px] h-9 px-3 rounded-[5px] border border-[#DEDEDE] bg-white text-sm font-normal text-gray-500"
          >
            City
            <ChevronDown size={20} />
          </button>

          {open === "city" && (
            <div className="absolute left-0 z-50 mt-2 w-[180px] rounded-sm border border-gray-200 bg-white shadow-lg">
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
            onClick={() => setOpen(open === "category" ? null : "category")}
            className="flex items-center justify-between gap-2   min-w-38 h-9 px-3  rounded-[5px] border border-[#DEDEDE] bg-white text-sm font-normal text-gray-500"
          >
            Category
            <ChevronDown size={20} />
          </button>

          {open === "category" && (
            <div className="absolute left-0 z-50 mt-2 w-[200px] rounded-sm border border-gray-200 bg-white shadow-lg">
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
