"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Props {
  images: string[];
  onImageClick?: (index: number) => void;
}

export default function VerticalImageScroll({
  images,
  onImageClick,
}: Props) {
  return (
    <div className="h-full py-2 overflow-y-auto px-2 no-scrollbar space-y-3">
      {images.map((src, index) => (
        <motion.div
          key={index}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={() => onImageClick?.(index)}
          className="w-full relative h-56 rounded-2xl overflow-hidden cursor-pointer"
        >
          <Image
            src={src}
            fill
            alt={`image-${index}`}
            className="w-full h-full object-cover rounded-2xl"
          />
        </motion.div>
      ))}
    </div>
  );
}
