'use client';

import { useMemo, useState } from 'react';
import { useFetchAllCitiesQuery } from '@/redux/cities/citiesApi';
import { useFetchAllEmirateNamesQuery } from '@/redux/emirates/emiratesApi';
import CityFilters from './CityFilters';
import EmiratesScroller from './EmiratesScroller';
import NearbyCities from './NearbyCities';
import CityList from './CityList';

type CityMobileFilters = {
  page: number;
  search: string;
  emirate: string;
};

export default function CityMobile() {
  const [filters, setFilters] = useState<CityMobileFilters>({
    page: 1,
    search: '',
    emirate: '',
  });

  const queryParams = useMemo(
    () => ({
      limit: 20,
      page: filters.page,
      search: filters.search,
      emirate: filters.emirate,
    }),
    [filters]
  );

  const { data: citiesData } = useFetchAllCitiesQuery(queryParams);
  const { data: emiratesData } = useFetchAllEmirateNamesQuery();

  const cities = citiesData?.data || [];
  const emirates = emiratesData?.data || [];

  return (
    <div className="bg-white min-h-screen px-4 py-4 font-poppins">
      <CityFilters filters={filters} setFilters={setFilters} />

      <EmiratesScroller
        emirates={emirates}
        active={filters.emirate}
        onSelect={(name: string) =>
          setFilters((p) => ({ ...p, emirate: name, page: 1 }))
        }
      />

      <NearbyCities cities={cities.slice(0, 4)} />

      <CityList cities={cities} />
    </div>
  );
}
