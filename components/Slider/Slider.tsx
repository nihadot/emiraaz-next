import React, { useEffect, useRef, useState, ReactNode } from 'react';

interface SliderProps<T> {
  items: T[];
  children: (item: T, index: number) => ReactNode;
  autoSlideInterval?: number;
  containerClassName?: string;
  transitionDuration?: number; // in ms
}

export default function Slider<T>({
  items,
  children,
  autoSlideInterval = 3000,
  containerClassName = '',
  transitionDuration = 500,
}: SliderProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    if (items.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [items, autoSlideInterval]);

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
        setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
      } else {
        setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (items.length === 0) return null;

  return (
    <div
      className={`relative w-full overflow-hidden ${containerClassName}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: `transform ${transitionDuration}ms ease-in-out`,
          width: `${items.length * 100}%`,
        }}
      >
        {items.map((item, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {children(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
}
