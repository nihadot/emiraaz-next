import { PortraitBanner } from '@/redux/portraitBannerAd/types';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

interface CustomSliderProps {
  images: PortraitBanner[];
  containerClassName?: string;
  imageClassName?: string;
  buttonClassName?: string;
  autoSlideInterval?: number; // optional: auto slide every x ms
}

export default function CustomSlider({
  images,
  containerClassName = '',
  imageClassName = '',
  autoSlideInterval = 3000, // 3 seconds by default
}: CustomSliderProps) {
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
          <Image
          alt=''
            key={index}
            src={img.desktopImage?.secure_url || ''}
            className={`min-w-full object-cover ${imageClassName}`}
            draggable={false}
          />
        ))}
      </div>

      {/* If you want to keep manual buttons, uncomment below:
      <button
        onClick={() =>
          setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
        }
        className={`absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 px-3 py-1 rounded ${buttonClassName}`}
      >
        ‹
      </button>
      <button
        onClick={() =>
          setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
        }
        className={`absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 px-3 py-1 rounded ${buttonClassName}`}
      >
        ›
      </button>
      */}
    </div>
  );
}
