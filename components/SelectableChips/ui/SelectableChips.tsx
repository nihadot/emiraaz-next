'use client';

import { useSelectableChips } from "../logic/useSelectableChips";
import { motion } from "framer-motion";

type ChipOption = {
  label: string;
  value: string;
  count?: number;
};

type Props = {
  options: ChipOption[];
  defaultValue?: string | null;
  onChange?: (value: string | null) => void;
};

export default function SelectableChips({ options, defaultValue = null, onChange }: Props) {
  const { selected, actions } = useSelectableChips(defaultValue);

  const handleClick = (value: string) => {
    actions.toggleSelect(value);
    onChange?.(selected === value ? null : value);
  };

  return (
    <div className="flex gap-3 overflow-x-auto no-scrollbar">
      {options.map((opt) => {
        const isActive = selected === opt.value;

        return (
          <motion.button
            key={opt.value}
            whileTap={{ scale: 0.92 }}
            animate={{
              backgroundColor: isActive ? "#f3f3f3" : "#ffffff",
              borderColor: isActive ? "#d1d1d1" : "#e5e5e5",
            }}
            transition={{ duration: 0.18 }}
            onClick={() => handleClick(opt.value)}
            className="px-4 py-2 rounded border whitespace-nowrap"
          >
            <motion.span
              animate={{ opacity: isActive ? 1 : 0.7 }}
              transition={{ duration: 0.18 }}
              className="text-[15px] font-medium text-gray-800"
            >
              {opt.label} {opt.count ? `(${opt.count})` : ""}
            </motion.span>
          </motion.button>
        );
      })}
    </div>
  );
}
