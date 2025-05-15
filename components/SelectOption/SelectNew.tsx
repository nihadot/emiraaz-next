'use client';

import { close_icon, drop_down__red_icon, drop_up_red_icon } from '@/app/assets';
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { IoMdArrowDropdown } from 'react-icons/io';
import { FaCaretDown } from 'react-icons/fa';

interface OptionType {
  label: string;
  count?: number;
  value: string;
}

interface SelectOptionProps {
  options: OptionType[];
  onSelect: (value: OptionType | null) => void;
  label?: string;
  search?: boolean;
  className?: string;
  clearSelection?: boolean;
}

function SelectNew({ className, options, search, onSelect, clearSelection, label = 'Select' }: SelectOptionProps) {
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
    console.log('Selected Values is:', option);
    console.log('Condition is the user selected one is equal to the all option', selected?.value === 'all');
    
    if (option?.value === 'all' || selected?.value === option?.value) {
      setSelected(null);
      onSelect(null);
    } else {
      setSelected(option);
      onSelect(option);
    }
    
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm)
  );

  // Find the selected option and the 'all' option
  const findTheSelectedOption = filteredOptions.find((option) => option.value === selected?.value) || null;
  const findAllSelectedOption = filteredOptions.find((option) => option.value === 'all') || null;

  // Create resultData array, filtering out null values
  const resultData = [findAllSelectedOption, findTheSelectedOption, ...filteredOptions.filter(
    (option) => option.value !== 'all' && option.value !== selected?.value
  )].filter((option): option is OptionType => option !== null);

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
      <div className='flex flex-1 justify-start gap-[13px] sm:justify-between items-center'>
        <label className='text-ellipsis no-scrollbar line-clamp-1 overflow-x-auto capitalize text-[12px] font-normal font-poppins'>
          {selected ? selected.label : label}
        </label>

        <motion.div
          key={isOpen ? 'up' : 'down'}
          initial={{ rotate: 0, opacity: 0 }}
          animate={{ rotate: isOpen ? 180 : 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* <Image
            src={isOpen ? drop_up_red_icon : drop_down__red_icon}
            alt='dropdown icon'
            width={15}
            height={15}
            className={clsx('object-cover', isOpen ? 'rotate-180' : '')}
          /> */}
          <FaCaretDown className='w-[20px] h-[20px]' color='#FF1645'/>
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
                      console.log(option, 'option');
                      handleSelect(option);
                    }}
                    className={clsx(
                      'px-2 py-[8px] rounded-[5px] border border-[#DEDEDE] cursor-pointer flex justify-between items-center text-[12px]',
                      selected?.value === option.value ? 'bg-red-700/10' : 'hover:bg-red-700/10'
                    )}
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

export default SelectNew;