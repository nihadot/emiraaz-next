'use client';

import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

type OptionType = {
  label: string;
  value: string;
};

interface SwitchSelectorProps {
  options: OptionType[];
  defaultValue?: string;
  clearSelection?: boolean;
  onSelect: (value: string) => void;
  containerClassName?: string
  buttonClassName?: string
}

function SwitchSelector({
  options,
  defaultValue,
  onSelect,
  clearSelection,
  buttonClassName,
  containerClassName
}: SwitchSelectorProps) {
  const [selected, setSelected] = useState<string>('');

  // console.log(defaultValue,'filters.productTypeOptionFirst')
  const handleSelect = (value: string) => {
    setSelected(value);
    onSelect(value);
  };

  useEffect(() => {
    if (defaultValue) {
      handleSelect(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    if (clearSelection) {
      setSelected('all')
      onSelect('all')
    }
  }, [clearSelection])

  return (
    <div className={clsx('', "flex h-full  overflow-x-auto sm:flex-row no-scrollbar items-center px-1 py-1  text-sm gap-0 sm:gap-2 rounded-[3px] w-full  outline outline-[#DEDEDE]", containerClassName)}>
      {options.map((option) => (
        <button
          key={option.value}
          // className={clsx('',
          //    `text-[12px] font-poppins font-normal text-[#333333] text-nowrap  h-full rounded px-3 py-1 flex items-center justify-center w-full transition-all  duration-200 ${selected === option.value
          //   ? 'bg-red-600/10 text-red-600'
          //   : 'bg-white text-black hover:text-red-600 hover:bg-red-100'
          //   }`), buttonClassName}
          className={clsx('',
            `text-[12px] font-poppins cursor-pointer font-normal text-[#333333] text-nowrap  h-full rounded px-3 py-1 flex items-center justify-center w-full transition-all  duration-200 ${selected === option.value ? 'bg-red-600/10 text-red-600'
              : 'bg-white text-black hover:text-red-600 hover:bg-red-100'
            }`, buttonClassName
          )}
          onClick={() => handleSelect(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default SwitchSelector;
