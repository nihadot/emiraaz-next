"use client";

import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";
import { Calendar } from "lucide-react";
import { NewsItem } from "@/types/news/mobile/newsListApiTypes";

interface NewsCarouselProps {
  items: NewsItem[];
}

function NewsCarousel({ items }: NewsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div className="w-full font-poppins">
      <div
        className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 no-scrollbar"
        onScroll={(e: React.UIEvent<HTMLDivElement>) => {
          const scrollLeft = e.currentTarget.scrollLeft;
          const width = e.currentTarget.offsetWidth;
          setActiveIndex(Math.round(scrollLeft / width));
        }}
      >
        {items?.map((news) => (
          <Link
            key={news?._id}
            href={`/news/${news?.slug}`}
            className="relative min-w-full snap-center"
          >
            <div className="relative h-[260px] rounded-xl overflow-hidden">
              <img
                src={news?.image?.webp?.url ?? ""}
                alt={news?.newsTitle ?? ""}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/35" />

              <span className="absolute top-3 right-3 bg-neutral-500 text-white font-semibold  text-xs px-3 py-1 rounded">
                {news.newCategoryDetails?.name ?? ""}
              </span>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-lg font-semibold leading-snug line-clamp-2">
                  {news?.newsTitle ?? ""}
                </h3>

                <div className="mt-2 mb-3 text-xs opacity-80 flex gap-2 items-center">
                  <Calendar className="w-3.5" />
                  <p className="text-sm mt-0.5">{news?.date}</p>
                </div>
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {items?.map((_, i) => (
                  <span
                    key={i}
                    className={clsx(
                      "h-[3px] rounded-full transition-all",
                      activeIndex === i ? "w-4 bg-white" : "w-4 bg-white/60"
                    )}
                  />
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
export default NewsCarousel;
