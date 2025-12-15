// ImageCarouselMobile.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Indicators from './Indicators';

interface Props {
  images: string[];
  onImageClick: (index: number) => void;
}

export default function ImageCarouselMobile({ images, onImageClick }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 4500);
    return () => clearInterval(id);
  }, [images.length]);



  return (
    <div className="relative w-full h-[300px] overflow-hidden">
      {/* Cross-fade layers (no unmount → no black flash) */}
      {images.map((src, i) => (
        <motion.img
          key={i}
          src={src}
          onClick={() => onImageClick(i)}
          className="absolute inset-0 w-full h-full object-cover cursor-pointer"
          animate={{ opacity: i === index ? 1 : 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          style={{ pointerEvents: i === index ? 'auto' : 'none' }}
          draggable={false}
        />
      ))}

       <Indicators
        total={images.length}
        active={index}
        onChange={setIndex}
        maxDots={4}
      />
    </div>
  );
}