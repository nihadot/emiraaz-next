import React from 'react';
import UpcomingOpenHouseCard from './UpcomingOpenHouseCard';

interface UpcomingOpenHousesSectionProps {
  upcomingHouses: any[];
  onBookSlot: (item: any) => void;
}

function UpcomingOpenHousesSection({ upcomingHouses, onBookSlot }: UpcomingOpenHousesSectionProps) {
  if (upcomingHouses.length === 0) return null;

  return (
    <div className="mb-2">
      <h2 className="font-semibold text-[18px] text-black mb-2 mt-2">
        Upcoming
      </h2>

      <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
        {upcomingHouses.map((item: any, index: number) => (
          <UpcomingOpenHouseCard
            key={index}
            item={item}
            onBookSlot={onBookSlot}
          />
        ))}
      </div>
    </div>
  );
}

export default UpcomingOpenHousesSection;
