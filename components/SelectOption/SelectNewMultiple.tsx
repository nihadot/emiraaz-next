'use client';

import { close_icon, drop_down__red_icon, drop_up_red_icon } from '@/app/assets';
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { FaCaretDown } from 'react-icons/fa';

interface OptionType {
  label: string;
  count?: number;
  value: string;
}

interface SelectOptionProps {
  options: OptionType[];
  onSelect: (value: OptionType[]) => void;
  label?: string;
  search?: boolean;
  className?: string;
  clearSelection?: boolean;
}

function SelectNewMultiple({ className, options, search, onSelect, clearSelection, label = 'Select' }: SelectOptionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<OptionType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  // Clear selection when clearSelection prop changes to true
  useEffect(() => {
    if (clearSelection) {
      setSelected([]);
      onSelect([]);
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

  const handleSelect = (option: OptionType) => {
    let updatedSelected: OptionType[];

    if (option.value === 'all') {
      updatedSelected = []; // Clear all selections for 'all' option
    } else if (selected.some((item) => item.value === option.value)) {
      updatedSelected = selected.filter((item) => item.value !== option.value); // Remove only the clicked option
    } else {
      updatedSelected = [...selected, option]; // Add new option
    }

    setSelected(updatedSelected);
    onSelect(updatedSelected);
    setSearchTerm('');
    setIsOpen(false); // Close dropdown after selection
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm)
  );

  // Find the 'all' option
  const findAllSelectedOption = options.find((option) => option.value === 'all') || null;

  // Create resultData: selected options first, then 'all' option, then remaining non-selected options
  const resultData = [
    // Include 'all' option if present and matches search term
    findAllSelectedOption && (searchTerm ? findAllSelectedOption.label.toLowerCase().includes(searchTerm) : true) ? findAllSelectedOption : null,
    // Include selected options that match the search term
    ...selected.filter((selectedOption) =>
      searchTerm ? filteredOptions.some((option) => option.value === selectedOption.value) : true
    ),

    // Include remaining non-selected, non-'all' options
    ...filteredOptions.filter(
      (option) => option.value !== 'all' && !selected.some((item) => item.value === option.value)
    ),
  ].filter((option): option is OptionType => option !== null);

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div
      ref={ref}
      onClick={toggleDropdown}
      className='outline flex-1 py-3 rounded-[3px] w-full px-3 gap-3 text-[13px] outline-[#DEDEDE] cursor-pointer h-full flex select-none relative'
    >
      <div className='flex flex-1 justify-start sm:justify-center gap-[13px] items-center'>
        <label className='text-ellipsis  no-scrollbar line-clamp-1 overflow-x-auto capitalize text-[12px] font-normal font-poppins'>
          {selected.length > 0 ? selected.map((item) => item.label).join(', ') : label}
        </label>

        <motion.div
          key={isOpen ? 'up' : 'down'}
          initial={{ rotate: 0, opacity: 0 }}
          animate={{ rotate: isOpen ? 180 : 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <FaCaretDown className='w-[20px] h-[20px]' color='#FF1645' />

        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute z-40 flex flex-col top-full left-0 mt-2 bg-white border-[#DEDEDE] border rounded-[5px] shadow-md p-2 text-sm text-black max-h-[300px] overflow-hidden ${className}`}
          >
            {search && (
              <input
                type='text'
                value={searchTerm}
                onChange={handleSearchChange}
                onClick={(e) => e.stopPropagation()}
                placeholder='Search...'
                className='w-full px-2 py-2 text-sm border rounded-[5px] border-[#DEDEDE] focus:outline-none mb-2'
              />
            )}

            <ul className='flex flex-col gap-1 overflow-y-auto scrollbar-thin scrollbar-red max-h-[230px]'>
              {resultData.length > 0 ? (
                resultData.map((option, idx) => (
                  <li
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(option);
                    }}
                    className={clsx(
                      'px-2 py-[8px] rounded-[5px] border border-[#DEDEDE] cursor-pointer flex justify-between items-center text-[12px]',
                      selected.some((item) => item.value === option.value) ? 'bg-red-700/10' : 'hover:bg-red-700/10'
                    )}
                  >
                    <span className='capitalize'>{option.label}</span>
                    {option.count !== undefined && (
                      <span className='text-[#FF1645]'>{`(${option.count})`}</span>
                    )}
                  </li>
                ))
              ) : (
                <div className='text-gray-400 text-xs px-2 py-2'>Events not found</div>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SelectNewMultiple;