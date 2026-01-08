import React from 'react';
import AllOpenHouseCard from './AllOpenHouseCard';

interface AllOpenHousesSectionProps {
  allHouses: any[];
  onBookSlot: (item: any) => void;
}

function AllOpenHousesSection({ allHouses, onBookSlot }: AllOpenHousesSectionProps) {
  return (
    <div className="mb-10">
      <h2 className="font-poppins font-semibold text-[16px] text-black mb-4">
        All Openhouses Scheduled
      </h2>

      <div className="space-y-2">
        {allHouses.map((item: any, index: number) => (
          <AllOpenHouseCard
            key={index}
            item={item}
            onBookSlot={onBookSlot}
          />
        ))}
      </div>
    </div>
  );
}

export default AllOpenHousesSection;
