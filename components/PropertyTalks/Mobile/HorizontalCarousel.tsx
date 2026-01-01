'use client';

import { useRef, useState } from 'react';
import TalkCardHorizontal from './TalkCardHorizontal';
import { Talk } from './types';

export default function HorizontalCarousel({ talks }: { talks: Talk[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const CARD_WIDTH = 280; // must match card width
  const GAP = 20; // gap-5 = 20px

  const handleScroll = () => {
    if (!containerRef.current) return;

    const scrollLeft = containerRef.current.scrollLeft;
    const index = Math.round(scrollLeft / (CARD_WIDTH + GAP));
    setActiveIndex(index);
  };

  return (
    <div className="relative">
      {/* Carousel */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="overflow-x-auto scrollbar-hide -mx-4 px-4"
      >
        <div className="flex gap-5 pb-2">
          {talks.map((talk) => (
            <TalkCardHorizontal key={talk.id} talk={talk} />
          ))}
        </div>
      </div>

      {/* Pagination dots */}
      <div className="mt-6 flex justify-center gap-2">
        {talks.map((_, index) => (
          <span
            key={index}
            className={`h-2 w-2 rounded-full transition-colors ${
              activeIndex === index ? 'bg-black' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
