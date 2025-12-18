// ui/SegmentToggleUI.tsx
'use client';

import clsx from "clsx";
import { motion } from "framer-motion";

type Props = {
  options: { label: string; value: string }[];
  selected: string;
  onSelect: (v: string) => void;
};

export default function SegmentToggleUI({ options, selected, onSelect }: Props) {
  return (
    <div className="w-full border px-2 border-[#DEDEDE] rounded-[12px] flex bg-white overflow-hidden">
      {options.map((opt) => {
        const isActive = selected === opt.value;

        return (
          <motion.button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className="flex-1 py-1.5  text-center text-sm font-poppins  font-normal"
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{
                backgroundColor: isActive ? "#F5F5F5" : "#ffffff",

              }}
              transition={{ duration: 0.25 }}
              className={clsx("w-full h-full rounded-[8px] text-sm font-normal font-poppins px-2.5 py-2",
                {
                    "border border-[#DEDEDE]": isActive,
                }
              )}
            >
              {opt.label}
            </motion.div>
          </motion.button>
        );
      })}
    </div>
  );
}
