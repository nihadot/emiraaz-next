"use client";

import Link from "next/link";
import { FaRegCalendar } from "react-icons/fa";
import { NewsItem } from "@/types/news/mobile/newsListApiTypes";



interface NewsCardsProps{
    items:NewsItem[],
    heading:string
}





 function BreakingNews({items,heading}:NewsCardsProps) {
    console.log('the breaking new data :',items)
  return (
    <section className="px-4 mt-6 font-poppins">
      {/* Section title */}
      <h2 className="text-base font-semibold mb-3">{heading}</h2>

      {/* Horizontal list */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar">
        {items?.map((news) => (
          <Link
            key={news?._id}
            href={`/news/${news?.slug}`}
            className="min-w-[260px] max-w-[260px] shrink-0"
          >
            {/* Image */}
            <div className="w-full h-[150px] rounded-xl overflow-hidden">
              <img
                src={news?.image?.webp?.url ?? ""}
                alt={news?.newsTitle ?? ""}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Category */}
            <div className="mt-3">
              <span className="inline-block px-3 py-1 text-xs rounded-md border border-gray-200 text-gray-600">
                {news?.newCategoryDetails?.name??""}
              </span>
            </div>

            {/* Title */}
            <h3 className="mt-2 text-sm font-semibold leading-snug line-clamp-2">
              {news?.newsTitle}
            </h3>

            {/* Date */}
            <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
              {/* <span>📅</span> */}
              <FaRegCalendar  size={14} className="text-gray-400" />
              <span>{news.date}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default BreakingNews;
