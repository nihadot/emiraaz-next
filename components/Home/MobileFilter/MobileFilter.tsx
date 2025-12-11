import React from 'react'
import CategoryButton from './CategoryButton'
import { apartment, penthouse, rightArrowBlackMobile, townhouse, villa } from '@/app/assets';
import Image from 'next/image';

type Props = {}

function MobileFilter({}: Props) {

  const [activeCategory, setActiveCategory] = React.useState('Apartment');

    const categories = [
    { svg: apartment, label: 'Apartment' },
    { svg: villa, label: 'Villa' },
    { svg: townhouse, label: 'Townhouse' },
    { svg: penthouse, label: 'Penthouse' },
  ];

    const filterButtons = [
    { label: 'New Projects', link: '#' },
    { label: 'Residential', link: '#' },
  ];

  return (
     <div className="bg-white rounded-3xl mx-4 p-6 shadow-sm border border-gray-100 mb-4">
        <div className="flex gap-4 overflow-x-auto pb-2 mb-4 scrollbar-hide">
          {categories.map(c => (
            <CategoryButton
              key={c.label}
              src={c.svg}
              label={c.label}
              active={activeCategory === c.label}
              onClick={() => setActiveCategory(c.label)}
            />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {filterButtons.map((button) => (
            <button
              key={button.label}
              className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 px-4 py-3 rounded-xl transition-colors"
            >
              <span className="text-sm font-medium text-gray-700">{button.label}</span>
              <Image src={rightArrowBlackMobile} alt={`right icon`} className={`w-7 h-7 ${true ? 'filter-none' : 'opacity-80'}`} />
              {/* <ChevronRight size={18} className="text-gray-400" /> */}
            </button>
          ))}
        </div>
      </div>
  )
}

export default MobileFilter