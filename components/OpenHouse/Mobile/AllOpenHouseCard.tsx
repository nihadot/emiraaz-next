import React from 'react';
import Image from 'next/image';
import { formatDate } from '../../atom/button/formatDate';
import openhouseTicket from '@/app/assets/openhouseTicket.svg';
import openHouseLoc from '@/app/assets/openhouseloc.svg';
import openHouseTime from '@/app/assets/openhousetime.svg';

interface AllOpenHouseCardProps {
  item: any;
  onBookSlot: (item: any) => void;
}

function AllOpenHouseCard({ item, onBookSlot }: AllOpenHouseCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-[16px] flex gap-4 max-w-md mb-4">
      <div className="relative w-[160px] rounded-[12px] overflow-hidden flex-shrink-0">
        <img
          src={item?.image?.webp?.url || '/placeholder.jpg'}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
          <span className="text-[10px] text-gray-500 font-normal block mt-1 mb-1">
            {item.developer || 'Damaa'}
          </span>

          <h3 className="font-bold text-base text-gray-900 leading-tight mb-2">
            {item.title}
          </h3>

          <div className="flex items-center gap-2 text-gray-700 text-xs mb-2">
            <Image
              src={openHouseLoc}
              alt="Location"
              width={16}
              height={16}
              className="opacity-70"
            />
            <span>{item.location}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-700 text-xs mb-3">
            <Image
              src={openHouseTime}
              alt="Time"
              width={16}
              height={16}
              className="opacity-70"
            />
            <span>{formatDate(item.date)} @ {item.time}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-700 text-[10px] mt-2">
            <Image
              src={openhouseTicket}
              alt="Slots"
              width={15}
              height={15}
            />
            <span>{item.spots_left || '31'} Spots Left</span>
          </div>
        </div>

        <button
          onClick={() => onBookSlot(item)}
          className="
            mt-2
            h-[35px]
            w-[140px]
            px-2
            mb-2
            rounded-[8px]
            border border-[#DEDEDE]
            bg-[#F5F5F5]
            text-[14px]
            font-medium
            text-[#111827]
            hover:bg-[#F9FAFB]
            transition
          "
        >
          Book Your Slot
        </button>
      </div>
    </div>
  );
}

export default AllOpenHouseCard;
