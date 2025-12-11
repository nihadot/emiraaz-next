import { locationPin, menuIconBlack } from '@/app/assets';
import { MapPin, Menu } from 'lucide-react'
import Image from 'next/image';
import React from 'react'

type Props = {
    location: string;
    onClickOnMenuButton: () => void;
}

function MobileHeader({
    location,
    onClickOnMenuButton,
}: Props) {
  return (
     <div className="bg-red-500 w-full px-[16px] py-3 flex items-center justify-between">
      <button className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm">
        {/* <MapPin size={18} className="text-black" /> */}
        <Image
        
        className=''
        src={locationPin}
        alt='location'
        width={20}
        height={20}
        />
        <span className="text-sm font-medium text-gray-800">{location}</span>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="ml-1">
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <button
        onClick={onClickOnMenuButton}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
          <Image
        
        className=''
        src={menuIconBlack}
        alt='location'
        width={20}
        height={20}
        />
        {/* <Menu size={24} className="text-gray-700" /> */}
      </button>
    </div>
  )
}

export default MobileHeader