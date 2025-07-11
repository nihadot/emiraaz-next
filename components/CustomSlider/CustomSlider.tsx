'use client';

import { PortraitBanner } from '@/redux/portraitBannerAd/types';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface CustomSliderProps {
  images: PortraitBanner[];
  containerClassName?: string;
  imageClassName?: string;
  autoSlideInterval?: number;
}

// ✅ Name the function component
const CustomSliderComponent = ({
  images,
  containerClassName = '',
  imageClassName = '',
  autoSlideInterval = 5000,
}: CustomSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [images, autoSlideInterval]);


  console.log(images, 'images')
  if (images.length === 0) return null;


  return (
    <Link href={`/projects/${images[currentIndex].projectDetails?.slug}`} className={`relative flex w-full overflow-hidden ${containerClassName}`}>
      <div className="relative h-[95px] sm:h-[550px] w-full">
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
              alt={'ads image'}
              fill
              src={images[currentIndex]?.mobileImage?.secure_url || ''}
              className={`object-cover sm:hidden ${imageClassName}`}
            />

             <Image
              alt={'ads image'}
              fill
              src={images[currentIndex]?.desktopImage?.secure_url || ''}
              className={`object-cover hidden sm:block ${imageClassName}`}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </Link>
  );
};

// ✅ Wrap the named component with React.memo
const CustomSlider = React.memo(CustomSliderComponent);

export default CustomSlider;
