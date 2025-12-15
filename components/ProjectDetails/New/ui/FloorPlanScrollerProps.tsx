"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Plan = {
  id: string;
  src: string;
  alt?: string;
};

interface FloorPlanScrollerProps {
  plans: Plan[];
  onSelect: () => void;
}

export default function FloorPlanScroller({
  plans,
  onSelect,
}: FloorPlanScrollerProps) {
  return (
    <>
    <motion.div
      className="flex gap-3  overflow-x-auto no-scrollbar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      >
      {plans.map((plan) => (
          <motion.button
          key={plan.id}
          // whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.96 }}
          className="shrink-0 rounded-2xl border border-gray-200 bg-white p-3"
          >
          <div className="relative w-[260px] h-[180px] rounded-xl overflow-hidden">
            <Image
              src={plan.src}
              alt={plan.alt || "Floor plan"}
              fill
              className="object-contain"
              />
          </div>
        </motion.button>
      ))}

     
    </motion.div>
       <button
          onClick={onSelect}
      
      className="w-full py-2.5 border border-[#DEDEDD] rounded-lg text-base font-poppins font-medium mt-3">+1 More</button>
      </>
  );
}
