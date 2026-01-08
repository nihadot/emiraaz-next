'use client';

import { X } from 'lucide-react';

interface FilterBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

export default function FilterBottomSheet({
  isOpen,
  onClose,
  title,
  options,
  selectedValue,
  onSelect,
}: FilterBottomSheetProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div className="relative w-full bg-white rounded-t-[20px] animate-sheet-up">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-[#DEDEDE]">
          <h3 className="text-[16px] font-semibold text-[#111827]">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F3F4F6]"
          >
            <X size={18} className="text-[#6B7280]" />
          </button>
        </div>

        {/* Options */}
        <div className="px-4 pt-4 pb-6 max-h-[60vh] overflow-y-auto">
          <div className="flex flex-wrap gap-3">
            {options.map((option) => {
              const isSelected = selectedValue === option;

              return (
                <button
                  key={option}
                  onClick={() => {
                    onSelect(option);
                    onClose();
                  }}
                  className={`
                    px-4 py-2 rounded-[10px] text-[14px] font-medium
                    border transition
                    ${
                      isSelected
                        ? 'bg-[#F5F5F5] border-[#DEDEDE] text-[#111827]'
                        : 'bg-white border-[#DEDEDE] text-[#374151]'
                    }
                  `}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
