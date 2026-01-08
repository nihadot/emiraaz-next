import React from 'react';
import { FiChevronDown } from 'react-icons/fi';

interface FilterButtonsProps {
  emirateValue: string;
  developerValue: string;
  onEmirateClick: () => void;
  onDeveloperClick: () => void;
}

function FilterButtons({
  emirateValue,
  developerValue,
  onEmirateClick,
  onDeveloperClick
}: FilterButtonsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        onClick={onEmirateClick}
        className="
          h-[48px]
          px-4
          rounded-xl
          border border-[#E5E7EB]
          bg-white
          flex items-center justify-between
          text-[15px] text-[#6B7280]
        "
      >
        <span>
          {emirateValue || 'Emirates'}
        </span>
        <FiChevronDown size={18} className="text-[#111827]" />
      </button>

      <button
        onClick={onDeveloperClick}
        className="
          h-[48px]
          px-4
          rounded-xl
          border border-[#E5E7EB]
          bg-white
          flex items-center justify-between
          text-[15px] text-[#6B7280]
        "
      >
        <span>
          {developerValue || 'Developers'}
        </span>
        <FiChevronDown size={18} className="text-[#111827]" />
      </button>
    </div>
  );
}

export default FilterButtons;
