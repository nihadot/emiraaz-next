import clsx from 'clsx';
import React, { HTMLAttributes, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { FaCaretDown } from 'react-icons/fa';

export interface OptionType {
  label: string;
  count?: number;
  value: string;
  slug?: string;
}

interface SelectOptionProps {
  // is used to pass the options to the parent component, as type is already mentioned in the interface as OptionType
  options: OptionType[];
  // is used to pass the value to the parent component, as type is already mentioned in the interface as OptionType
  onSelect?: (value: OptionType | null) => void;
  // is used to pass the value as multiple to the parent component, as type is already mentioned in the interface as OptionType[]
  onSelectMultiple?: (value: OptionType[] | null) => void;
  // is used to show as default label in the dropdown box
  label?: string;
  // use with optionally if ture then can search option enable otherwise not search feature in the dropdonw container
  search?: boolean;
  // is used to clear the selection
  clearSelection?: boolean;
  // is used to set the default value of the dropdown
  defaultValue?: OptionType ;
  // is used to set the default value of the dropdown as multiple
  defaultValueMultiple?: OptionType[] ;
  // is used to set the multiple value of the dropdown (user can pick mutiple values)
  multiple?: boolean;
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
  defaultValueMultiple,
  clearSelection,
  multiple,
  onSelectMultiple,
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

  const [selectedMultiple, setSelectedMultiple] = useState<OptionType[] | []>([]);

  // is used to search a option with 'Label' in the dropdown , if search value is exist show other wise show 'No result found'
  const [searchTerm, setSearchTerm] = useState('');

  // for toggle the dropdonw is shown or not
  const [isOpen, setIsOpen] = useState(false);

const [hasInitializedDefault, setHasInitializedDefault] = useState(false);






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

    let updatedSelected: OptionType[] = [];

    if (multiple && option && onSelectMultiple) {
      // console.log(option, 'option')
      if (option?.value === 'all') {
        updatedSelected = []; // Clear all selections for 'all' option
      } else if (selectedMultiple?.some((item) => item.value === option?.value)) {
        updatedSelected = selectedMultiple.filter((item) => item.value !== option?.value); // Remove only the clicked option

      } else {
        // console.log(option, 'option last', 3)
        // console.log(selectedMultiple, 'selectedMultiple')
        updatedSelected = [...selectedMultiple, option]; // Add new option
      }

      // console.log(updatedSelected, 'updatedSelected last')
      onSelectMultiple(updatedSelected);
      setSelectedMultiple(updatedSelected)

    } else if (onSelect && option) {
      if (option?.value === 'all' || selected?.value === option?.value) {
        setSelected(null);
        onSelect(null);
      } else {
        setSelected(option);
        onSelect(option);
      }
    }
    setSearchTerm('');
    setIsOpen(false);
  }, [selected?.value, onSelect, defaultValue, setSelectedMultiple, selectedMultiple]);

  // here handle the search value
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  // here handle If user search , then filter search , If not searched then show all options in the filteredOptions
  const filteredOptions = useMemo(() =>
    options.filter((option) =>
      option?.label?.toLowerCase().includes(searchTerm?.toLowerCase())
    ), [options, searchTerm]
  );

  // here handle after got the filtered option (if search then return search matched otherwise return all options)
  // then reorder the option to show 'All' option at the top and 'Selected' option second and
  // the last show all other options
  const resultData = useMemo(() => {

   if (multiple) {
    const selectedValues = selectedMultiple?.map(item => item?.value);

    const findAllOption = filteredOptions?.find(option => option?.value === 'all') || null;

    const selectedOptions = filteredOptions?.filter(option =>
      option.value !== 'all' && selectedValues?.includes(option?.value)
    );

    const unselectedOptions = filteredOptions?.filter(option =>
      option.value !== 'all' && !selectedValues?.includes(option?.value)
    );

    return [
      findAllOption,
      ...selectedOptions,
      ...unselectedOptions
    ].filter((option): option is OptionType => option !== null);
  }

  // single select logic
  const findSelectedOption = filteredOptions.find(option => option.value === selected?.value) || null;
  const findAllOption = filteredOptions.find(option => option.value === 'all') || null;

  const otherOptions = filteredOptions.filter(option =>
    option.value !== 'all' && option.value !== selected?.value
  );

  return [findAllOption, findSelectedOption, ...otherOptions]
    .filter((option): option is OptionType => option !== null);

  }, [filteredOptions, selected?.value,selectedMultiple,]);








  // to observer user click outside of the container then close
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [handleOutsideClick]);

  useEffect(() => {
    if(defaultValue){
          handleSelect(defaultValue);
    }
  },[defaultValue]);

  
  useEffect(() => {
  if (defaultValueMultiple && defaultValueMultiple?.length > 0 && !hasInitializedDefault) {

    let updatedSelected: OptionType[] = [];

    if (defaultValueMultiple.find(item => item.value === 'all')) {
      updatedSelected = [];
    } else {
      updatedSelected = [...defaultValueMultiple];
    }

    onSelectMultiple?.(updatedSelected);
    setSelectedMultiple(updatedSelected);
    setHasInitializedDefault(true);
  }
}, [defaultValueMultiple, hasInitializedDefault]);


  useEffect(() => {
    if (clearSelection) {
if (onSelect) onSelect(null);
      setSelected(null);
      setIsOpen(false);
      setSearchTerm('');
    if (onSelectMultiple) onSelectMultiple([]);
      setSelectedMultiple([]);
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
      <div className={clsx('', 'flex flex-1 gap-[13px] justify-between items-center', dropdownContainerClassName)}>
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
            className={clsx('', 'w-5 h-5', dropdownIconClassName)}
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
            className={clsx('', `absolute z-50 flex flex-col top-full left-0 mt-2 bg-white border-[#DEDEDE] border rounded-[5px] shadow-md p-2 text-sm text-black max-h-[300px] overflow-hidden`, listContainerClassName)}
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
                      'px-2 py-2 rounded-[5px] border border-[#DEDEDE] cursor-pointer flex justify-between items-center text-[12px]',
                      dropdownListClassName,
                      selected?.value === option.value ? 'bg-red-700/10' : 'hover:bg-red-700/10',
                      selectedMultiple?.some((item) => item.value === option.value) ? 'bg-red-700/10' : 'hover:bg-red-700/10'

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