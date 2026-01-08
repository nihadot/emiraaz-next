import React from 'react';
import Image from 'next/image';
import { formatDate } from '../../atom/button/formatDate';
import openhouseTicket from '@/app/assets/openhouseTicket.svg';
import openHouseLoc from '@/app/assets/openhouseloc.svg';
import openHouseTime from '@/app/assets/openhousetime.svg';

interface UpcomingOpenHouseCardProps {
  item: any;
  onBookSlot: (item: any) => void;
}

function UpcomingOpenHouseCard({ item, onBookSlot }: UpcomingOpenHouseCardProps) {
  return (
    <div className="flex-shrink-0 w-[340px]">
      <div className="bg-white rounded-[24px] overflow-hidden border border-[#DEDEDE]">
        <div className="relative w-full h-[220px]">
          <Image
            src={item?.image?.webp?.url || '/placeholder.jpg'}
            alt={item.title}
            fill
            className="object-cover rounded-[15px]"
            priority
          />
        </div>

        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-gray-500 font-normal">
              {item.developer || 'Damaa'}
            </span>

            <div className="flex items-center gap-1.5 text-gray-500 text-[10px]">
              <span className="font-normal">{item.spots_left || '31'} Spots Left</span>
              <Image
                src={openhouseTicket}
                alt="Slots"
                width={15}
                height={15}
              />
            </div>
          </div>

          <h3 className="text-[18px] font-semibold text-gray-900 leading-tight mb-2 line-clamp-2">
            {item.title}
          </h3>

          <div className="flex items-center gap-2 mb-2">
            <Image
              src={openHouseLoc}
              alt="Location"
              width={18}
              height={18}
              className="opacity-70"
            />
            <p className="text-[15px] text-gray-600">
              {item.location}
            </p>
          </div>

          <div className="flex items-center gap-2 mb-5">
            <Image
              src={openHouseTime}
              alt="Time"
              width={18}
              height={18}
              className="opacity-70"
            />
            <p className="text-[15px] text-gray-600">
              {formatDate(item.date)} @ {item.time}
            </p>
          </div>

          <button
            onClick={() => onBookSlot(item)}
            className="
              px-6
              py-2.5
              rounded-[8px]
              border
              text-[15px]
              font-medium
              text-gray-900
              hover:bg-gray-50
              transition-colors
              duration-200
              border-[#DEDEDE]
              bg-[#F5F5F5]
            "
          >
            Book Your Slot
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpcomingOpenHouseCard;
