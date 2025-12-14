"use client";

import { ChevronLeft, Share } from "lucide-react";
import { FaRegCalendar } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { NewsItem } from "@/types/news/mobile/newsListApiTypes";

interface MobileNewsDetailProps {
  news?: NewsItem;
}
function MobileNewsDetail({ news }: MobileNewsDetailProps) {
  const router = useRouter();

  return (
    <main className="bg-white font-poppins">
      {/* HERO SECTION */}
      <section className="relative h-[420px] w-full">
        {/* Image */}
        <img
          src={news?.image?.webp?.url ?? ""}
          alt={news?.altText ?? news?.newsTitle ?? "News image"}
          className="w-full h-full object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/35" />

        {/* Top Actions */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 rounded-full bg-white/80 flex items-center justify-center"
          >
            <ChevronLeft size={18} />
          </button>

          <button className="w-9 h-9 rounded-full bg-white/80 flex items-center justify-center">
            <Share size={16} />
          </button>
        </div>

        {/* Bottom overlay content */}
        <div className="absolute bottom-15 left-4 right-4 text-white">
          {/* Category */}
          {news?.newCategoryDetails?.name && (
            <span className="inline-block mb-2 px-3 py-1 text-xs rounded-md bg-black/60">
              {news?.newCategoryDetails?.name}
            </span>
          )}

          {/* Title */}
          <h1 className="text-xl font-semibold leading-snug">
            {news?.newsTitle}
          </h1>

          {/* Date */}
          {news?.date && (
            <div className="flex items-center gap-2 mt-2 text-xs text-white/90">
              <FaRegCalendar size={13} />
              <span>{news?.date}</span>
            </div>
          )}
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="relative -mt-6 bg-white rounded-t-3xl px-4 pt-6 pb-10">
        <article
          className="text-sm text-gray-700 leading-relaxed space-y-4"
          dangerouslySetInnerHTML={{
            __html: news?.newsBody?.html ?? "",
          }}
        />
      </section>
    </main>
  );
}

export default MobileNewsDetail;
