import React from 'react';
import { FiSearch } from 'react-icons/fi';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="mb-4">
      <div className="relative">
        <FiSearch
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
        />
        <input
          type="text"
          placeholder="Search.."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            w-full h-[48px]
            pl-11 pr-4
            rounded-xl
            border border-[#E5E7EB]
            bg-white
            text-[15px] text-[#6B7280]
            placeholder:text-[#9CA3AF]
            focus:outline-none
          "
        />
      </div>
    </div>
  );
}

export default SearchBar;
