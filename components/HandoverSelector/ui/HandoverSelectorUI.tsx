// components/HandoverSelector/ui/HandoverSelectorUI.tsx
"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function HandoverSelectorUI({
  year,
  quarter,
  onPrevYear,
  onNextYear,
  onSelectQuarter,
}: {
  year: number;
  quarter: string | null;
  onPrevYear: () => void;
  onNextYear: () => void;
  onSelectQuarter: (q: string) => void;
}) {
  const quarters = ["Q1", "Q2", "Q3", "Q4"];

  return (
    <div className="w-full flex flex-col items-center">
      {/* Year Title */}
      <p className="text-sm font-poppins font-normal text-black mb-2">
        Choose Year
      </p>

      {/* Year Controls */}
      <div className="flex items-center  w-full justify-between gap-4 mb-5">
        <button
          onClick={onPrevYear}
          className="w-16 h-12 flex items-center justify-center rounded-[12px] border border-[#DFDFDF]"
        >
         <Play
         width={18}
         height={18}
         />
        </button>

        <div className="px-6 py-3 rounded-[12px] text-black border border-[#DFDFDF] text-2xl font-medium">
          {year}
        </div>

     <button
          onClick={onNextYear}
          className="w-16 h-12 flex items-center justify-center rounded-[12px] border border-[#DFDFDF]"
        >
         <Play
         width={18}
         height={18}
         />
        </button>
      </div>

      {/* Quarter Title */}
      <p className="text-sm font-poppins font-normal text-black mb-3">
        Choose Quarter
      </p>

      {/* Quarter Chips */}
      <div className="flex gap-3  w-full justify-between">
        {quarters.map((q) => {
          const isActive = quarter === q;

          return (
            <motion.button
              key={q}
              whileTap={{ scale: 0.92 }}
              animate={{
                backgroundColor: isActive ? "#f2f2f2" : "#ffffff",
                borderColor: isActive ? "#cfcfcf" : "#e7e7e7",
              }}
              transition={{ duration: 0.25 }}
              onClick={() => onSelectQuarter(q)}
              className="
                flex-1 rounded-xl py-3 border 
                text-base font-normal text-gray-800
              "
            >
              {q}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
