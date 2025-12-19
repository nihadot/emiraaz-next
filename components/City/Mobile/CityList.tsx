'use client';

import CityCard from './CityCard';

export default function CityList({ cities }: any) {
  return (
    <>
      <h3 className="font-semibold mb-3">All Cities</h3>

      <div className="space-y-2">
        {cities.map((city: any) => (
          <CityCard
            key={city._id}
            item={city}
            variant="horizontal"
          />
        ))}
      </div>
    </>
  );
}
