import React from 'react'
import CategoryButton from './CategoryButton'
import { Building, ChevronRight } from 'lucide-react';

function MobileFilter() {

  const [activeCategory, setActiveCategory] = React.useState('Apartment');

  const categories = [
    { icon: <Building />, label: 'Apartment',value: 'apartment' },
    { icon: <Building />, label: 'Villa',value: 'villa' },
    { icon: <Building />, label: 'Townhouse',value: 'townhouse' },
    { icon: <Building />, label: 'Penthouse',value: 'penthouse' },
    { icon: <Building />, label: 'Penthouse',value: 'penthouse' },
  ];

  const filterButtons = [
    { label: 'New Projects', link: '#' },
    { label: 'Residential', link: '#' },
  ];

  return (
    <div className="bg-white rounded-[13px] p-3  border border-[#DEDEDE] mb-4">
      <div className="flex gap-4 no-scrollbar overflow-x-auto pb-2 mb-4 scrollbar-hide">
        {categories.map(c => (
          <CategoryButton
            key={c.label}
            icon={c.icon}
            label={c.label}
            value={c.value}
            active={activeCategory === c.value}
            onClick={() => setActiveCategory(c.value)}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {filterButtons.map((button) => (
          <button
            key={button.label}
            className="flex border border-[#DEDEDE] items-center justify-between bg-[#F5F5F5] hover:bg-gray-100 px-3 py-2.5 rounded-[6px] transition-colors"
          >
            <span className="text-xs font-poppins font-normal text-gray-700">{button.label}</span>
            <ChevronRight 
            width={18}
            height={18}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default MobileFilter