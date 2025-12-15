'use client';

import { useState } from "react";
import { useFetchAllCityNamesQuery } from "@/redux/cities/citiesApi";
import useDebounce from "@/hooks/useDebounce";

export function useLocationFilterLogic(defaultEmirate: string = "dubai") {
    const [selectedEmirate, setSelectedEmirate] = useState<string | null>(defaultEmirate);
    const [localLoading, setLocalLoading] = useState(false);

    // NEW ➤ search term for city search
    const [searchTerm, setSearchTerm] = useState("");

    // NEW → debounced search
    const debouncedSearch = useDebounce(searchTerm, 400);

    // only start search after 2 chars (optional but recommended)
    const hasSearch = debouncedSearch.trim().length >= 2;
    const isSearching = hasSearch;
    const apiParams = isSearching
        ? { search: debouncedSearch }
        : { emirate: selectedEmirate || "" };

    const { data: emirateCities, isLoading } = useFetchAllCityNamesQuery(apiParams);
    console.log(apiParams, 'API params')

    const handleEmirateSelect = (value: string | null) => {
        setSelectedEmirate(value);
        setLocalLoading(true);
          setSearchTerm(""); // IMPORTANT → reset search when emirate changes

        setTimeout(() => setLocalLoading(false), 250);
    };

   // search input
const handleSearch = (value: string) => {
  setSearchTerm(value);

  // IMPORTANT → disable emirate mode when searching
  if (value.trim().length >= 1) {
    setSelectedEmirate(null);
  }
};

    console.log(searchTerm, 'searchTerm')

    return {
        selectedEmirate,
        emirateCities,
        isLoading,
        localLoading,
        handleEmirateSelect,
        handleSearch,
        searchTerm,
        isSearching,
    };
}
