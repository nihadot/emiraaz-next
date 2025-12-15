'use client'
import React, { useState, useMemo, useRef, useEffect } from 'react';
import currencyCodes from 'currency-codes';
import { IoChevronDown, IoSearch } from 'react-icons/io5';
import clsx from 'clsx';
import { usePathname, useSearchParams } from 'next/navigation';
// import { ChevronDownIcon, SearchIcon } from '@heroicons/react/solid';

// Define interfaces for type safety
interface Currency {
  code: string;
  name: string;
}

interface CurrencySelectProps {
  defaultCurrency?: string;
  onChange?: (currency: Currency | null) => void;
  disabled?: boolean;
  dropdownMainContainerClassName?: string;
  dropdownContainerClassName?: string;
  selectedCurrencyClassName?: string;
  IoChevronDownColor?: string;
}

const CurrencySelect: React.FC<CurrencySelectProps> = ({ defaultCurrency = 'AED', onChange, disabled = false,
  dropdownMainContainerClassName,
  dropdownContainerClassName,
  selectedCurrencyClassName,
  IoChevronDownColor,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

   const pathname = usePathname(); // "/blog/post-1"
  const searchParams = useSearchParams(); 

  // Get all params as an object
  const query = Object.fromEntries(searchParams.entries());


  // Memoize currencies to prevent unnecessary recalculations
  const currencies = useMemo<Currency[]>(() => {
    // console.log(currencyCodes,'currencyCodes')
    const UAECurrency = currencyCodes.data.find((curr) => curr.code === 'AED');

    if(!UAECurrency) return [];
    

    const data = currencyCodes.data.filter((curr) => curr.code !== 'AED')
      .map((curr) => ({
        code: curr.code,
        name: curr.currency,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

       const finalData = query?.currency !== "AED"
    ? [{ code: UAECurrency.code, name: UAECurrency.currency }, ...data]
    : data;

    setIsLoading(false);
    return finalData;
  }, [currencyCodes]);


  // Initialize default currency if provided
  useEffect(() => {
    if (defaultCurrency && !selectedCurrency) {
      const defaultCurr = currencies.find((curr) => curr.code === defaultCurrency);
      if (defaultCurr) {
        setSelectedCurrency(defaultCurr);
        onChange?.(defaultCurr);
      }
    }
  }, [defaultCurrency, currencies, onChange, selectedCurrency]);

  // Filter currencies based on search input
  const filteredCurrencies = useMemo<Currency[]>(() => {
    const searchLower = search.toLowerCase();
    return currencies.filter(
      (curr) =>
        curr.name.toLowerCase().includes(searchLower) ||
        curr.code.toLowerCase().includes(searchLower)
    );
  }, [search, currencies]);

  // Toggle dropdown visibility
  const handleToggle = () => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
      if (!isOpen) {
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    }
  };

  // Handle currency selection
  const handleSelect = (currency: Currency) => {

    const url = new URL(window.location.href);

    if (selectedCurrency?.code === currency.code) {
      setSelectedCurrency(null);
      setIsOpen(false);
      setSearch('');
      onChange?.(null);
      url.searchParams.delete('currency');

    } else {
      url.searchParams.set('currency', currency.code ?? '');

      setSelectedCurrency(currency);
      setIsOpen(false);
      setSearch('');
      onChange?.(currency);
    }


    // if (e?.value) {
    // } else {
    // url.searchParams.delete('emirate');
    // }
    const newUrl = `${url.pathname}?${url.searchParams.toString()}`;
    window.history.pushState({}, '', newUrl);
    window.location.reload();


  };

  // Handle keyboard events
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setSearch('');
    } else if (e.key === 'Enter' && !isOpen) {
      handleToggle();
    }
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearch('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      className={clsx('', `relative w-full max-w-md font-sans ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`, dropdownMainContainerClassName)}
      ref={dropdownRef}
    >
      <div
        className={clsx('', `flex gap-0 items-center justify-between w-full px-3 py-[6.5px] bg-white border text-sm border-gray-200 rounded transition-all cursor-pointer duration-200 ${disabled
          ? 'bg-gray-100'
          : ''
          } `, dropdownContainerClassName)}
        onClick={handleToggle}
        role="combobox"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-disabled={disabled}
        aria-controls="currency-dropdown-list"  // <-- Add this
      >
        <span className={(clsx('', `text-gray-800 text-[12px] font-medium ${selectedCurrency ? '' : 'text-gray-400'}`, selectedCurrencyClassName))}>
          {isLoading
            ? 'Loading currencies...'
            : selectedCurrency
              ? `${selectedCurrency.code}`
              : 'Currency'}
        </span>
        <div className="">

        <IoChevronDown
          color={IoChevronDownColor}
          className={`w-4 h-[18px] text-gray-500 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
          } ${disabled ? 'text-gray-400' : ''}`}
          />
          </div>
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-[250px] lg:w-[300px] -right-[0px] md:-left-[50] lg:-left-[135] xl:-left-[133px] mt-1 bg-white border border-gray-200 rounded-[5px] shadow-lg max-h-80 overflow-y-auto animate-slide-down">
          <div className="p-2 sticky top-0 bg-white border-b border-gray-100">
            <div className="relative">
              <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search currencies..."
                className="w-full pl-10 pr-4 py-2 text-sm text-gray-800 border border-gray-200 rounded-[5px] focus:outline-none focus:ring-1 focus:ring-gray-50"
                aria-label="Search currencies"
              />
            </div>
          </div>
          <ul role="listbox" className="p-1">
            {isLoading ? (
              <li className="p-2 text-sm text-gray-500 text-center">Loading...</li>
            ) : filteredCurrencies.length > 0 ? (
              filteredCurrencies.map((curr) => (
                <li
                  key={curr.code}
                  className={`flex items-center p-2 text-sm text-gray-800 rounded-md hover:bg-blue-50 cursor-pointer transition-colors duration-150 ${selectedCurrency?.code === curr.code ? 'bg-blue-100 font-semibold' : ''
                    }`}
                  onClick={() => handleSelect(curr)}
                  role="option"
                  aria-selected={selectedCurrency?.code === curr.code}
                >
                  <span className="font-medium">{curr.name}</span>
                  <span className="ml-2 text-gray-500">({curr.code})</span>
                </li>
              ))
            ) : (
              <li className="p-2 text-sm text-gray-500 text-center">No currencies found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CurrencySelect;