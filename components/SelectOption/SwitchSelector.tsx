'use client';

import React, { useState } from 'react';

type OptionType = {
  label: string;
  value: string;
};

interface SwitchSelectorProps {
  options: OptionType[];
  defaultValue?: string;
  onSelect: (value: string) => void;
}

function SwitchSelector({ options, defaultValue, onSelect }: SwitchSelectorProps) {
  const [selected, setSelected] = useState<string>(defaultValue || '');

  const handleSelect = (value: string) => {
    setSelected(value);
    onSelect(value);
  };

  return (
    <div className="flex h-full  overflow-x-auto sm:flex-row  items-center px-1 py-1  text-sm gap-0 sm:gap-2 rounded w-full  border border-[#DEDEDE]">
      {options.map((option) => (
        <button
          key={option.value}
          className={`font-normal text-nowrap font-poppins text-[12px] mobile-sm:text-[12px] sm:text-[13px] h-full rounded px-2 sm:px-4 py-1 flex items-center justify-center w-full transition-all  duration-200 ${
            selected === option.value
              ? 'bg-red-600/10 text-red-600'
              : 'bg-white text-black hover:text-red-600 hover:bg-red-100'
          }`}
          onClick={() => handleSelect(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default SwitchSelector;
