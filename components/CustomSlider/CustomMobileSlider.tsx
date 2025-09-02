import { PortraitBanner } from '@/redux/portraitBannerAd/types';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

interface CustomMobileSliderProps {
  images: PortraitBanner[];
  containerClassName?: string;
  imageClassName?: string;
  buttonClassName?: string;
  autoSlideInterval?: number; // optional: auto slide every x ms
}

export default function CustomMobileSlider({
  images,
  containerClassName = '',
  imageClassName = '',
  autoSlideInterval = 3000, // 3 seconds by default
}: CustomMobileSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
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
        // swipe left → next
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      } else {
        // swipe right → previous
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      }
    }

    // reset
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
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, index) => (
          <div  key={index} className="relative h-[604.5px] w-full">
          
          <Image
           
          alt=''
          fill
            src={img.mobileImage?.webp?.url || ''}
            className={` object-cover ${imageClassName}`}
            draggable={false}
          />
          </div>
        ))}
      </div>
    </div>
  );
}
