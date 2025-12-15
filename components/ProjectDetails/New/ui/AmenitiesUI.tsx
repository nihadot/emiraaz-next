// AmenitiesUI.tsx
"use client";

import { motion } from "framer-motion";
import { Amenity } from "../logic/useAmenities";
import Image from "next/image";
import { CiMaximize1 } from "react-icons/ci";

export default function AmenitiesUI({
  amenities,
  onViewAll,
}: {
  amenities: Amenity[];
  onViewAll: () => void;
}) {
  return (
    <div className="w-full space-y-4">
      {/* Horizontal scroll */}
      <motion.div
        className="flex gap-3 overflow-x-auto no-scrollbar"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {amenities.map((item, index) => (
          <motion.div
            key={item.id}
            whileTap={{ scale: 0.92 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25}}
            className="
              min-w-[120px]
              h-[110px]
              bg-white
              rounded-2xl
              flex flex-col items-center justify-center
              gap-2
              shrink-0
            "
          >
            {/* <div className="text-black">{item.icon}</div> */}
            <Image
            src={item.link}
            width={34}
            height={34}
            alt="Amenity"
            // className="rounded-full"
            />
            <p className="text-[13px] px-4 text-gray-600 text-center leading-tight">
              {item.label}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* View All */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={onViewAll}
        className="
          w-full
          h-[55px]
          rounded-[10px]
          bg-white
          flex items-center justify-center gap-2
          font-medium
          text-base font-poppins text-nowrap 
        "
      >
        View All
        <span className="text-red-500 ms-1 ">
            <CiMaximize1
            size={20}
            />
        </span>
      </motion.button>
    </div>
  );
}
