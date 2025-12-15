// components/ToggleChips/ui/ToggleChipsUI.tsx
'use client';

import { motion } from "framer-motion";

type Chip = {
  label: string;
  value: string;
};

type Props = {
  chips: Chip[];
  selected: string | null;
  onSelect: (value: string) => void;
};

export default function ToggleChipsUI({ chips, selected, onSelect }: Props) {
  return (
    <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
      {chips.map((chip) => {
        const isActive = selected === chip.value;

        return (
          <motion.button
            key={chip.value}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(chip.value)}
            animate={{
              backgroundColor: isActive ? "#f1f1f1" : "",
              borderColor: isActive ? "#d0d0d0" : "#e5e5e5",
            }}
            className="
              px-4 py-2 rounded-xl border transition 
              whitespace-nowrap text-sm  font-poppins font-normal
            "
          >
            {chip.label}
          </motion.button>
        );
      })}
    </div>
  );
}
