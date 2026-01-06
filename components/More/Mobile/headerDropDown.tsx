'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface HeaderDropdownProps {
  label: string;
  options: string[];
}

export default function HeaderDropdown({
  label,
  options,
}: HeaderDropdownProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(label);

  return (
    <div className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-4 py-2 border rounded-lg text-sm font-medium bg-white"
      >
        {selected}
        <ChevronDown className="w-4 h-4" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-24 bg-white border rounded-xl shadow-md z-50 overflow-hidden">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                setSelected(option);
                setOpen(false);
              }}
              className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
