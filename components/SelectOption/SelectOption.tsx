'use client';

import { close_icon, drop_down__red_icon, drop_up_red_icon } from '@/app/assets';
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OptionType {
  label: string;
  count?: number;
}

interface SelectOptionProps {
  options: OptionType[];
  onSelect: (value: OptionType | null) => void;
  label?: string;
  search?: boolean;
  className?:string;
  clearSelection?: boolean; // New prop to trigger clearing

}

function SelectOption({ className,options,search, onSelect, clearSelection,label = 'Select' }: SelectOptionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<OptionType | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const ref = useRef<HTMLDivElement>(null);

    // Clear selection when clearSelection prop changes to true
    useEffect(() => {
      if (clearSelection) {
        setSelected(null);
        onSelect(null);
        setIsOpen(false);
        setSearchTerm('');
      }
    }, [clearSelection, onSelect]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOutsideClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleSelect = (option: OptionType | null) => {
    setSelected(option);
    onSelect(option);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm)
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div
      ref={ref}
      onClick={toggleDropdown}
      className='border flex-1 py-3 rounded w-full px-3 gap-3 text-[13px] border-[#DEDEDE] cursor-pointer h-full flex select-none relative '
    >
      <div className='flex flex-1 justify-between items-center'>
        <label className='text-nowrap capitalize'>{selected ? selected.label : label}</label>

        <motion.div
          key={isOpen ? 'up' : 'down'}
          initial={{ rotate: 0, opacity: 0 }}
          animate={{ rotate: isOpen ? 180 : 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {!selected ? (
            <Image
              src={isOpen ? drop_up_red_icon : drop_down__red_icon}
              alt='dropdown icon'
              width={24}
            />
          ) : (
            <div
              className='ml-2 text-xs text-red-500 underline cursor-pointer'
              onClick={(e) => {
                e.stopPropagation(); // Prevent dropdown toggle
                handleSelect(null); // Clear selection
              }}
            >
              <Image src={close_icon} alt='clear icon' width={10} />
            </div>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute flex flex-col top-full left-0 mt-2 bg-white border-[#DEDEDE] border rounded shadow-md z-10 p-2 text-sm text-black max-h-[300px] overflow-hidden ${className}`}
          >
            { search && <input
              type='text'
              value={searchTerm}
              onChange={handleSearchChange}
              onClick={(e) => e.stopPropagation()}
              placeholder='Search...'
              className='w-full px-2 py-2 text-sm border rounded border-[#DEDEDE] focus:outline-none mb-2'
            />}

            <ul className='flex flex-col gap-1 overflow-y-auto scrollbar-thin scrollbar-red max-h-[230px]'>
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, idx) => (
                  <li
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(option);
                    }}
                    className='px-2 py-[8px] hover:bg-red-700/10 rounded border border-[#DEDEDE] cursor-pointer flex justify-between items-center text-[12px]'
                  >
                    <span className='capitalize'>{option.label}</span>
                    {option.count !== undefined && (
                      <span className='text-[#FF1645]'>{`(${option.count})`}</span>
                    )}
                  </li>
                ))
              ) : (
                <div className='text-gray-400 text-xs px-2 py-2'>No results found</div>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SelectOption;
