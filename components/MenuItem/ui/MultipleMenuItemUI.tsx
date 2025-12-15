"use client";

import { ChevronRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MenuItemUI({
  label,
  open,
  selected,
  toggleOpen,
  options,
  toggleOption,
  ref,
}: any) {
  return (
    <div className="w-full" ref={ref}>
      <button
        onClick={toggleOpen}
        className="
          w-full flex items-center justify-between 
          bg-[#F5F5F5] 
          px-4 py-3 rounded-xl
          text-[16px] 
          text-[#1A1A1A]
          hover:bg-[#EDEDED] 
          transition-colors
        "
      >
        <span>{label}</span>

        <motion.div animate={{ rotate: open ? 90 : 0 }}>
          <ChevronRight size={20} strokeWidth={2} />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="mt-2 bg-[#FAFAFA] rounded-xl border border-[#E8E8E8] overflow-hidden"
          >
            {options.map((opt: string) => {
              const active = selected.includes(opt);

              return (
                <button
                  key={opt}
                  onClick={() => toggleOption(opt)}
                  className="
                    w-full flex items-center justify-between
                    px-4 py-3 text-left
                    hover:bg-[#F1F1F1] 
                    transition-colors
                  "
                >
                  <span className="text-[15px] text-black">{opt}</span>

                  {active && (
                    <Check size={18} strokeWidth={2} className="text-black" />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
