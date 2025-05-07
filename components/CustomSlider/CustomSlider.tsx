'use client';

import { PortraitBanner } from '@/redux/portraitBannerAd/types';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CustomSliderProps {
  images: PortraitBanner[];
  containerClassName?: string;
  imageClassName?: string;
  autoSlideInterval?: number;
}

export default function CustomSlider({
  images,
  containerClassName = '',
  imageClassName = '',
  autoSlideInterval = 15000,
}: CustomSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [images, autoSlideInterval]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (
      touchStartX.current !== null &&
      touchEndX.current !== null &&
      Math.abs(touchStartX.current - touchEndX.current) > 50
    ) {
      if (touchStartX.current > touchEndX.current) {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      } else {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (images.length === 0) return null;

  return (
    <div
      className={`relative w-full overflow-hidden ${containerClassName}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative h-[600px] w-full">
        <AnimatePresence>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.3 }}
            transition={{
              duration: 0.6,
              ease: 'easeInOut',
            }}
            className="absolute top-0 left-0 h-full w-full"
          >
            <Image
              alt=""
              fill
              src={images[currentIndex]?.desktopImage?.secure_url || ''}
              className={`object-cover ${imageClassName}`}
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
