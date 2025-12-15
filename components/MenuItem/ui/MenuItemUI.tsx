"use client";

import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

export default function MenuItemUI({
  label,
  open,
  selected,
  toggleOpen,
  options,
  selectOption,
  ref,
}: any) {
  const selectedLabel = options?.find((o: any) => o?.value === selected)?.label;

  console.log(selectedLabel,'selectedLabel')

  return (
<div className="w-full relative" ref={ref}>
      {/* Main Button */}
      <button
        onClick={toggleOpen}
        className="
          w-full flex items-center justify-between 
          bg-[#F5F5F5] 
          px-3 py-2.5 rounded-[6px]
          border border-[#DEDEDE]
          text-xs font-poppins font-normal 
          text-[#1A1A1A]
          gap-2
          hover:bg-[#EDEDED] 
          transition-colors truncate
        "
      >
        <div className="font-poppins font-normal text-sm">{selectedLabel || label}</div>

        <motion.div animate={{ rotate: open ? 90 : 0 }}>
          <ChevronRight size={20} strokeWidth={2} />
        </motion.div>
      </button>

     <AnimatePresence>
  {open && (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18 }}
      className="
        absolute left-0 right-0 
        bg-[#FAFAFA] 
        rounded-lg 
        border border-[#E8E8E8] 
        overflow-hidden
        z-50
        mt-1
      "
    >
      {options.map((opt: any) => {
        const active = selected === opt.value;

        return (
          <button
            key={opt.value}
            onClick={() => selectOption(opt.value)}
            className={clsx(`
              w-full flex items-center justify-between
              px-[16px] py-2 text-left
              hover:bg-[#F1F1F1]
              ${active && "bg-[#F1F1F1]"}
              transition-colors
            `)}
          >
            <span className="text-xs font-poppins font-normal text-black">
              {opt.label}
            </span>
          </button>
        );
      })}
    </motion.div>
  )}
</AnimatePresence>

    </div>
  );
}
