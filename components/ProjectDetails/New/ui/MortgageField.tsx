"use client";

import { motion } from "framer-motion";

interface Props {
  label: string;
  value: number;
  suffix: string;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
}

export default function MortgageField({
  label,
  value,
  suffix,
  min,
  max,
  step = 1,
  onChange,
}: Props) {
  return (
    <div className="space-y-1">
      <p className="font-medium pb-1 font-poppins text-sm text-black">
        {label}
      </p>

      <div className="flex items-center gap-6">
        {/* Input */}
        <div className="flex items-center border border-[#DFDFDF] rounded-lg px-4 h-14 w-[220px]">
          <input
            type="text"
            value={Number(value).toLocaleString("en-US")}
            onChange={(e) => {
              const raw = Number(e.target.value.replace(/,/g, ""));
              if (!isNaN(raw)) onChange(raw);
            }}
            className="w-full outline-none font-poppins text-xl font-semibold"
            inputMode="numeric"
          />
          <span className="text-black font-poppins text-sm ml-2">
            {suffix}
          </span>
        </div>

        {/* Slider */}
        <motion.input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 accent-black"
          whileTap={{ scale: 0.98 }}
        />
      </div>
    </div>
  );
}
