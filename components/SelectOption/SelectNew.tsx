// 'use client';

// import { close_icon, drop_down__red_icon, drop_up_red_icon } from '@/app/assets';
// import Image from 'next/image';
// import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import clsx from 'clsx';
// import { IoMdArrowDropdown } from 'react-icons/io';
// import { FaCaretDown } from 'react-icons/fa';

// interface OptionType {
//   label: string;
//   count?: number;
//   value: string;
// }

// interface SelectOptionProps {
//   options: OptionType[];
//   onSelect: (value: OptionType | null) => void;
//   label?: string;
//   search?: boolean;
//   className?: string;
//   clearSelection?: boolean;
//   defaultValue?: string;
//   disableOnDefault?: boolean; // New prop to disable when default value is set
// }

// function SelectNew({ 
//   className, 
//   options, 
//   search, 
//   onSelect, 
//   clearSelection, 
//   label = 'Select',
//   defaultValue,
//   disableOnDefault = false // Default to false to maintain backward compatibility
// }: SelectOptionProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selected, setSelected] = useState<OptionType | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isInitialized, setIsInitialized] = useState(false);
//   const ref = useRef<HTMLDivElement>(null);

//   // Check if component should be disabled
//   const isDisabled = useMemo(() => {
//     return disableOnDefault && defaultValue && selected?.value === defaultValue;
//   }, [disableOnDefault, defaultValue, selected?.value]);
//   const filteredOptions = useMemo(() => 
//     options.filter((option) =>
//       option.label.toLowerCase().includes(searchTerm.toLowerCase())
//     ), [options, searchTerm]
//   );

//   // Memoize result data
//   const resultData = useMemo(() => {
//     const findTheSelectedOption = filteredOptions.find((option) => option.value === selected?.value) || null;
//     const findAllSelectedOption = filteredOptions.find((option) => option.value === 'all') || null;

//     return [findAllSelectedOption, findTheSelectedOption, ...filteredOptions.filter(
//       (option) => option.value !== 'all' && option.value !== selected?.value
//     )].filter((option): option is OptionType => option !== null);
//   }, [filteredOptions, selected?.value]);

//   // Initialize default value only once
//   useEffect(() => {
//     if (!isInitialized && defaultValue && options.length > 0) {
//       const defaultOption = options.find(option => option.value === defaultValue);
//       if (defaultOption) {
//         setSelected(defaultOption);
//         // Only call onSelect if it's different from current selection
//         onSelect(defaultOption);
//       }
//       setIsInitialized(true);
//     } else if (!isInitialized && options.length > 0) {
//       setIsInitialized(true);
//     }
//   }, [defaultValue, options, isInitialized, onSelect]);

//   // Handle clear selection
//   useEffect(() => {
//     if (clearSelection && selected) {
//       setSelected(null);
//       onSelect(null);
//       setIsOpen(false);
//       setSearchTerm('');
//     }
//   }, [clearSelection, selected, onSelect]);

//   // Memoized callbacks
//   const toggleDropdown = useCallback(() => {
//     if (!isDisabled) {
//       setIsOpen((prev) => !prev);
//     }
//   }, [isDisabled]);

//   const handleOutsideClick = useCallback((e: MouseEvent) => {
//     if (ref.current && !ref.current.contains(e.target as Node)) {
//       setIsOpen(false);
//     }
//   }, []);

//   const handleSelect = useCallback((option: OptionType | null) => {
//     console.log('Selected Values is:', option);
//     console.log('Condition is the user selected one is equal to the all option', selected?.value === 'all');
    
//     if (option?.value === 'all' || selected?.value === option?.value) {
//       setSelected(null);
//       onSelect(null);
//     } else {
//       setSelected(option);
//       onSelect(option);
//     }
    
//     setIsOpen(false);
//     setSearchTerm('');
//   }, [selected?.value, onSelect]);

//   const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value);
//   }, []);

//   // Event listener setup
//   useEffect(() => {
//     document.addEventListener('mousedown', handleOutsideClick);
//     return () => document.removeEventListener('mousedown', handleOutsideClick);
//   }, [handleOutsideClick]);

//   return (
//     <div
//       ref={ref}
//       onClick={toggleDropdown}
//       className={clsx(
//         'outline flex-1 py-3 rounded-[3px] w-full px-3 gap-3 text-[13px] outline-[#DEDEDE] h-full flex select-none relative',
//         isDisabled 
//           ? 'cursor-not-allowed bg-gray-50 opacity-75' 
//           : 'cursor-pointer'
//       )}
//     >
//       <div className='flex flex-1 justify-start gap-[13px] sm:justify-between items-center'>
//         <label className={clsx(
//           'text-ellipsis no-scrollbar line-clamp-1 overflow-x-auto capitalize text-[12px] font-normal font-poppins',
//           isDisabled ? 'text-gray-500' : ''
//         )}>
//           {selected ? selected.label : label}
//           {isDisabled && <span className='ml-2 text-[10px] text-gray-400'>(Fixed)</span>}
//         </label>

//         <motion.div
//           key={isOpen ? 'up' : 'down'}
//           initial={{ rotate: 0, opacity: 0 }}
//           animate={{ rotate: isOpen ? 180 : 0, opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.25 }}
//         >
//           <FaCaretDown 
//             className='w-[20px] h-[20px]' 
//             color={isDisabled ? '#9CA3AF' : '#FF1645'}
//           />
//         </motion.div>
//       </div>

//       <AnimatePresence>
//         {isOpen && !isDisabled && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ duration: 0.2 }}
//             className={`absolute z-40 flex flex-col top-full left-0 mt-2 bg-white border-[#DEDEDE] border rounded-[5px] shadow-md p-2 text-sm text-black max-h-[300px] overflow-hidden ${className || ''}`}
//           >
//             {search && (
//               <input
//                 type='text'
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//                 onClick={(e) => e.stopPropagation()}
//                 placeholder='Search...'
//                 className='w-full px-2 py-2 text-sm border rounded-[5px] border-[#DEDEDE] focus:outline-none mb-2'
//               />
//             )}

//             <ul className='flex flex-col gap-1 overflow-y-auto scrollbar-thin scrollbar-red max-h-[230px]'>
//               {resultData.length > 0 ? (
//                 resultData.map((option, idx) => (
//                   <li
//                     key={`${option.value}-${idx}`}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleSelect(option);
//                     }}
//                     className={clsx(
//                       'px-2 py-[8px] rounded-[5px] border border-[#DEDEDE] cursor-pointer flex justify-between items-center text-[12px]',
//                       selected?.value === option.value ? 'bg-red-700/10' : 'hover:bg-red-700/10'
//                     )}
//                   >
//                     <span className='capitalize'>{option.label}</span>
//                     {option.count !== undefined && (
//                       <span className='text-[#FF1645]'>{`(${option.count})`}</span>
//                     )}
//                   </li>
//                 ))
//               ) : (
//                 <div className='text-gray-400 text-xs px-2 py-2'>No results found</div>
//               )}
//             </ul>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// export default SelectNew;



'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
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
  onSelect: (value: OptionType | null) => void;
  label?: string;
  search?: boolean;
  className?: string;
  clearSelection?: boolean;
  defaultValue?: string;
  disableOnDefault?: boolean; // New prop to disable when default value is set
}

function SelectNew({ 
  className, 
  options, 
  search, 
  onSelect, 
  clearSelection, 
  label = 'Select',
  defaultValue,
  disableOnDefault = false // Default to false to maintain backward compatibility
}: SelectOptionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<OptionType | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Check if component should be disabled
  const isDisabled = useMemo(() => {
    return disableOnDefault && defaultValue && selected?.value === defaultValue;
  }, [disableOnDefault, defaultValue, selected?.value]);

  const filteredOptions = useMemo(() => 
    options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    ), [options, searchTerm]
  );

  // Memoize result data
  const resultData = useMemo(() => {
    const findTheSelectedOption = filteredOptions.find((option) => option.value === selected?.value) || null;
    const findAllSelectedOption = filteredOptions.find((option) => option.value === 'all') || null;

    return [findAllSelectedOption, findTheSelectedOption, ...filteredOptions.filter(
      (option) => option.value !== 'all' && option.value !== selected?.value
    )].filter((option): option is OptionType => option !== null);
  }, [filteredOptions, selected?.value]);

  // Initialize default value only once - simulate user selection
  useEffect(() => {
    if (!isInitialized && options.length > 0) {
      if (defaultValue) {
        const defaultOption = options.find(option => option.value === defaultValue);
        if (defaultOption) {
          // Simulate exact user selection behavior
          // console.log('Default Selected Values is:', defaultOption);
          // console.log('Default selection initialized');
          setSelected(defaultOption);
          onSelect(defaultOption);
        }
      }
      setIsInitialized(true);
    }
  }, [defaultValue, options, isInitialized, onSelect]);

  // Handle dynamic default value changes (if defaultValue prop changes)
  useEffect(() => {
    if (isInitialized && defaultValue && options.length > 0) {
      const newDefaultOption = options.find(option => option.value === defaultValue);
      if (newDefaultOption && selected?.value !== defaultValue) {
        // console.log('Default value changed, updating selection:', newDefaultOption);
        setSelected(newDefaultOption);
        onSelect(newDefaultOption);
      }
    }
  }, [defaultValue, options, selected?.value, isInitialized, onSelect]);
  // Handle clear selection
  
  useEffect(() => {
    if (clearSelection && selected) {
      // console.log('Clearing selection');
      setSelected(null);
      onSelect(null);
      setIsOpen(false);
      setSearchTerm('');
    }
  }, [clearSelection, selected, onSelect]);

  // Memoized callbacks
  const toggleDropdown = useCallback(() => {
    if (!isDisabled) {
      setIsOpen((prev) => !prev);
    }
  }, [isDisabled]);

  const handleOutsideClick = useCallback((e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  const handleSelect = useCallback((option: OptionType | null) => {
    // console.log('Selected Values is:', option);
    // console.log('Condition is the user selected one is equal to the all option', selected?.value === 'all');
    
    if (option?.value === 'all' || selected?.value === option?.value) {
      setSelected(null);
      onSelect(null);
    } else {
      setSelected(option);
      onSelect(option);
    }
    
    setIsOpen(false);
    setSearchTerm('');
  }, [selected?.value, onSelect]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  // Event listener setup
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [handleOutsideClick]);

  return (
    <div
      ref={ref}
      onClick={toggleDropdown}
      className={clsx(
        'outline flex-1 py-3 rounded-[3px] w-full px-3 gap-3 text-[13px] outline-[#DEDEDE] h-full flex select-none relative',
        isDisabled 
          ? 'cursor-not-allowed bg-gray-50 opacity-75' 
          : 'cursor-pointer'
      )}
    >
      <div className='flex flex-1 justify-start gap-[13px] sm:justify-between items-center'>
        <label className={clsx(
          'text-ellipsis no-scrollbar line-clamp-1 overflow-x-auto capitalize text-[12px] font-normal font-poppins',
          isDisabled ? 'text-gray-500' : ''
        )}>
          {selected ? selected.label : label}
          {isDisabled && <span className='ml-2 text-[10px] text-gray-400'>(Fixed)</span>}
        </label>

        <motion.div
          key={isOpen ? 'up' : 'down'}
          initial={{ rotate: 0, opacity: 0 }}
          animate={{ rotate: isOpen ? 180 : 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <FaCaretDown 
            className='w-[20px] h-[20px]' 
            color={isDisabled ? '#9CA3AF' : '#FF1645'}
          />
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && !isDisabled && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute z-40 flex flex-col top-full left-0 mt-2 bg-white border-[#DEDEDE] border rounded-[5px] shadow-md p-2 text-sm text-black max-h-[300px] overflow-hidden ${className || ''}`}
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
                    key={`${option.value}-${idx}`}
                    onClick={(e) => {
                      e.stopPropagation();
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