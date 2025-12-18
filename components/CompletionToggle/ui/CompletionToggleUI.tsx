// components/CompletionToggle/ui/CompletionToggleUI.tsx
"use client";

import Subtitle from "@/components/atom/Subtitle/Subtitle";
import { motion } from "framer-motion";

type Option = {
  label: string;
  value: string;
};

export default function CompletionToggleUI({
  title,
  options,
  selected,
  onSelect,
}: {
  title?: string;
  options: Option[];
  selected: string | null;
  onSelect: (value: string) => void;
}) {
  return (
   <div className="w-full py-2 flex flex-col gap-3">
        { title && <Subtitle text={title} />}

  {/* Single line, auto-adjust spacing */}
  <div className="flex flex-nowrap justify-between items-center gap-2 w-full">
    {options.map((opt) => {
      const isActive = selected === opt.value;

      return (
        <motion.button
          key={opt.value}
          whileTap={{ scale: 0.95 }}
          animate={{
            backgroundColor: isActive ? "#f1f1f1" : "#ffffff",
            borderColor: isActive ? "#d4d4d4" : "#e5e5e5",
          }}
          transition={{ duration: 0.25 }}
          onClick={() => onSelect(opt.value)}
          className="
            flex-1 min-w-0 px-3 py-2 rounded-lg border  border-[#DEDEDE]
            text-sm text-gray-800  font-poppins font-normal text-center truncate
          "
        >
          {opt.label}
        </motion.button>
      );
    })}
  </div>
</div>

  );
}
    