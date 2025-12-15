"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Props {
  images: {
    name: string;
    _id: string;
    image: {
      webp: {
        url: string;
      };
    }
  }[];
  onImageClick?: (index: number) => void;
}

export default function FacilitiesVerticalImageScroll({
  images,
  onImageClick,
}: Props) {
  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-1 py-2 overflow-y-auto px-2 no-scrollbar">
      {images.map((item, index) => (
        <motion.div
          key={index}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={() => onImageClick?.(index)}
          className="w-full gap-2 bg-[#F5F5F5] h-[120px] rounded  flex flex-col justify-center items-center border-[#DFDFDF] overflow-hidden cursor-pointer"
        >
         <div className="w-10 h-10 relative">
           <Image
            src={item?.image?.webp?.url || ""}
            alt={`image-${index}`}
            fill
            className="w-full h-full object-cover "
          />
         </div>

          <label htmlFor="" className="text-xs flex font-poppins font-normal text-center">{item?.name}</label>
        </motion.div>
      ))}
    </div>
  );
}
