'use client';

import CityCard from './CityCard';

export default function NearbyCities({ cities }: any) {
  return (
    <>
      <h3 className="font-semibold mb-3">Nearby Cities</h3>

      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
        {cities.map((city: any) => (
          <CityCard
            key={city._id}
            item={city}
            variant="vertical"
          />
        ))}
      </div>
    </>
  );
}
