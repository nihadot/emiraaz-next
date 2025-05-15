'use client';

import clsx from 'clsx';
import React, { useState } from 'react';

type OptionType = {
  label: string;
  value: string;
};

interface SwitchSelectorProps {
  options: OptionType[];
  defaultValue?: string;
  className?:string;
  onSelect: (value: string) => void;
}

function SwitchSelectorMobile({ options, defaultValue, onSelect,className }: SwitchSelectorProps) {
  const [selected, setSelected] = useState<string>(defaultValue || '');

  const handleSelect = (value: string) => {
    setSelected(value);
    onSelect(value);
  };

  return (
    <div className={clsx("grid grid-cols-2 h-full  overflow-x-auto sm:flex-row no-scrollbar items-center px-1 py-1  text-sm gap-0 sm:gap-2 rounded w-full  border border-[#DEDEDE]",className)}>
      {options.map((option) => (
        <button
          key={option.value}
          className={`text-[12px] font-poppins font-normal text-[#333333] text-nowrap  h-full rounded-[5px] px-2 sm:px-3 py-1 flex items-center justify-center w-full transition-all  duration-200 ${
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

export default SwitchSelectorMobile;
