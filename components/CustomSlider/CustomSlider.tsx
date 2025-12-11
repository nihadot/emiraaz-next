/**
 * CustomSlider Component
 * Displays a rotating banner of images with animations
 * Optimized with React.memo and useCallback
 */

'use client';

import React, { useEffect, useState, memo, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { PortraitBanner } from '@/redux/portraitBannerAd/types';
import { getOrCreateDeviceId } from '@/utils/uniquId';
import { sentUniqueId } from '@/api/auth';

interface CustomSliderProps {
  images: PortraitBanner[];
  containerClassName?: string;
  imageClassName?: string;
  autoSlideInterval?: number;
}

// ⚡ Memoized Image Slide Component
const SlideImage = memo(({
  image,
  imageClassName
}: {
  image: PortraitBanner;
  imageClassName: string;
}) => (
  <div className="absolute top-0 left-0 h-full w-full">
    {/* Mobile Image */}
    <Image
      alt={image.name || 'ads image'}
      fill
      src={image?.mobileImage?.webp?.url || ''}
      className={`object-cover sm:hidden ${imageClassName}`}
      priority={true} // Prioritize loading current slide
      sizes="(max-width: 640px) 100vw, 50vw"
    />

    {/* Desktop Image */}
    <Image
      alt={image.name || 'ads image'}
      fill
      src={image?.desktopImage?.webp?.url || ''}
      className={`object-cover hidden sm:block ${imageClassName}`}
      priority={true}
      sizes="(min-width: 640px) 100vw, 50vw"
    />
  </div>
));
SlideImage.displayName = 'SlideImage';

const CustomSliderComponent = ({
  images,
  containerClassName = '',
  imageClassName = '',
  autoSlideInterval = 5000,
}: CustomSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // ⚡ Auto-slide logic
  useEffect(() => {
    if (!images || images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [images.length, autoSlideInterval]); // Only depend on length, not the array itself

  // ⚡ Memoized Click Handler
  const handleClick = useCallback(async (id: string) => {
    try {
      const myDeviceId: string = getOrCreateDeviceId();
      await sentUniqueId({ uniqueId: myDeviceId, type: 'banner-ads', id });
    } catch (error) {
      console.error('Failed to track banner click:', error);
    }
  }, []);

  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex];
  if (!currentImage) return null;

  return (
    <Link
      prefetch
      onClick={() => handleClick(currentImage._id)}
      href={`/projects/${currentImage.projectDetails?.slug}`}
      className={`relative flex w-full overflow-hidden ${containerClassName}`}
    >
      <div className="relative h-[95px] sm:h-[550px] w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.3 }}
            transition={{
              duration: 0.6,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 w-full h-full"
          >
            <SlideImage
              image={currentImage}
              imageClassName={imageClassName}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </Link>
  );
};

// ⚡ Export memoized component
export default memo(CustomSliderComponent);
