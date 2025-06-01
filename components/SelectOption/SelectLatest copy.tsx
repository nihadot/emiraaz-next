import clsx from 'clsx';
import React, { HTMLAttributes, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { FaCaretDown } from 'react-icons/fa';

interface OptionType {
  label: string;
  count?: number;
  value: string;
}

interface SelectOptionProps {
  // is used to pass the options to the parent component, as type is already mentioned in the interface as OptionType
  options: OptionType[];
  // is used to pass the value to the parent component, as type is already mentioned in the interface as OptionType
  onSelect: (value: OptionType | null) => void;
  // is used to show as default label in the dropdown box
  label?: string;
  // use with optionally if ture then can search option enable otherwise not search feature in the dropdonw container
  search?: boolean;
  // is used to clear the selection
  clearSelection?: boolean;
  // is used to set the default value of the dropdown
  defaultValue?: OptionType;
  // is used to set the className of the top container
  dropdownTopContainerClassName?: HTMLAttributes<HTMLDivElement>['className']
  // is used to set the className of the dropdown container
  dropdownContainerClassName?: HTMLAttributes<HTMLDivElement>['className']
  // is used to set the className of the dropdown label
  dropdownLabelClassName?: HTMLAttributes<HTMLLabelElement>['className']
  // is used to set the className of the dropdown icon container
  dropdownIconContainerClassName?: HTMLAttributes<HTMLDivElement>['className']
  // is used to set the className of the dropdown icon 
  dropdownIconClassName?: HTMLAttributes<HTMLDivElement>['className']
  // is used to set the className of the dropdown list container
  listContainerClassName?: HTMLAttributes<HTMLDivElement>['className']
  // is used to set the className of the search input
  searchInputClassName?: HTMLAttributes<HTMLInputElement>['className']
  // is used to set the className of the list container ul list container
  listContainerUlListContainerClassName?: HTMLAttributes<HTMLUListElement>['className']
  // is used to set the className of the list container li
  dropdownListClassName?: HTMLAttributes<HTMLLIElement>['className']
  // is used to set the className of the list container li label
  dropdownListLabelClassName?: HTMLAttributes<HTMLSpanElement>['className']
  // is used to set the className of the list container li count
  dropdownListCountClassName?: HTMLAttributes<HTMLSpanElement>['className']

}



function SelectLatest({
  onSelect,
  label = 'Select',
  search = false,
  options,
  defaultValue,
  clearSelection,
  dropdownTopContainerClassName,
  dropdownContainerClassName,
  dropdownLabelClassName,
  dropdownIconContainerClassName,
  dropdownIconClassName,
  listContainerClassName,
  searchInputClassName,
  listContainerUlListContainerClassName,
  dropdownListClassName,
  dropdownListLabelClassName,
  dropdownListCountClassName
}: SelectOptionProps) {

  // refference for container ro observer user click outside of the container then close
  const ref = useRef<HTMLDivElement>(null);

  // is this using for select if user select a option form the dropdonw , tpye alredy mentioned in the interface as OptionType
  const [selected, setSelected] = useState<OptionType | null>(null);

  // is used to search a option with 'Label' in the dropdown , if search value is exist show other wise show 'No result found'
  const [searchTerm, setSearchTerm] = useState('');

  // for toggle the dropdonw is shown or not
  const [isOpen, setIsOpen] = useState(false);







  // here handle the toggle the dropdonw is shown or not
  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // hadnle fucntion if user click outside of the container then close
  const handleOutsideClick = useCallback((e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  // here handle the user select option from the dropdown 
  // Features:
  // 1. if user select alredy existing option then set 'null' , 
  // 2. if user select 'All' option same as above then set 'null',
  // 3. if user select other option then set the option
  // 4. after selecting clear the search value
  // 5. close the dropdown
  // 6. Used here if the selected.value or onSelect value props has change then only trigger the handleSelect function
  const handleSelect = useCallback((option: OptionType | null) => {
    if (option?.value === 'all' || selected?.value === option?.value) {
      setSelected(null);
      onSelect(null);
    } else {
      setSelected(option);
      onSelect(option);
    }
    setSearchTerm('');
    setIsOpen(false);
  }, [selected?.value, onSelect, defaultValue]);

  // here handle the search value
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  // here handle If user search , then filter search , If not searched then show all options in the filteredOptions
  const filteredOptions = useMemo(() =>
    options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    ), [options, searchTerm]
  );

  // here handle after got the filtered option (if search then return search matched otherwise return all options)
  // then reorder the option to show 'All' option at the top and 'Selected' option second and
  // the last show all other options
  const resultData = useMemo(() => {
    const findTheSelectedOption = filteredOptions.find((option) => option.value === selected?.value) || null;
    const findAllSelectedOption = filteredOptions.find((option) => option.value === 'all') || null;

    return [findAllSelectedOption, findTheSelectedOption, ...filteredOptions.filter(
      (option) => option.value !== 'all' && option.value !== selected?.value
    )].filter((option): option is OptionType => option !== null);
  }, [filteredOptions, selected?.value]);








  // to observer user click outside of the container then close
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [handleOutsideClick]);

  // if 'defaultValue' prop is set, initialize the selected value with it
  useEffect(() => {
    if (defaultValue) {
      handleSelect(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    if (clearSelection) {
      onSelect(null);
      setSelected(null);
      setIsOpen(false);
      setSearchTerm('');
      label = 'Select';
    }
  }, [clearSelection])





  return (
    <div
      ref={ref}
      onClick={toggleDropdown}
      className={clsx('',
        'outline flex-1 py-3 cursor-pointer rounded-[3px] w-full px-3 gap-3 text-[13px] outline-[#DEDEDE] h-full flex select-none relative',
        dropdownTopContainerClassName
      )}
    >
      <div className={clsx('', 'flex flex-1 justify-start gap-[13px] sm:justify-between items-center', dropdownContainerClassName)}>
        <label className={clsx('',
          'text-ellipsis no-scrollbar line-clamp-1 overflow-x-auto capitalize text-[12px] font-normal font-poppins',
          dropdownLabelClassName
        )}>
          {selected ? selected.label : label}
        </label>

        <motion.div
          key={isOpen ? 'up' : 'down'}
          initial={{ rotate: 0, opacity: 0 }}
          animate={{ rotate: isOpen ? 180 : 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className={clsx('', dropdownIconContainerClassName)}
        >
          <FaCaretDown
            className={clsx('', 'w-[20px] h-[20px]', dropdownIconClassName)}
            color={'#FF1645'}
          />
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={clsx('', `absolute z-40 flex flex-col top-full left-0 mt-2 bg-white border-[#DEDEDE] border rounded-[5px] shadow-md p-2 text-sm text-black max-h-[300px] overflow-hidden`, listContainerClassName)}
          >
            {search && (
              <input
                type='text'
                value={searchTerm}
                onChange={handleSearchChange}
                onClick={(e) => e.stopPropagation()}
                placeholder='Search...'
                className={clsx('', 'w-full px-2 py-2 text-sm border rounded-[5px] border-[#DEDEDE] focus:outline-none mb-2', searchInputClassName)}
              />
            )}

            <ul className={clsx('flex flex-col gap-1 overflow-y-auto scrollbar-thin scrollbar-red max-h-[230px]', listContainerUlListContainerClassName)}>
              {resultData.length > 0 ? (
                resultData.map((option, idx) => (
                  <li
                    key={`${option.value}-${idx}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(option);
                    }}
                    className={clsx('',
                      'px-2 py-[8px] rounded-[5px] border border-[#DEDEDE] cursor-pointer flex justify-between items-center text-[12px]',
                      dropdownListClassName,
                      selected?.value === option.value ? 'bg-red-700/10' : 'hover:bg-red-700/10'
                    )}
                  >
                    <span className={clsx('', 'capitalize', dropdownListLabelClassName)}>{option.label}</span>
                    {option.count !== undefined && (
                      <span className={clsx('', 'text-[#FF1645]', dropdownListCountClassName)}>{`(${option.count})`}</span>
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
  )
}

export default SelectLatest