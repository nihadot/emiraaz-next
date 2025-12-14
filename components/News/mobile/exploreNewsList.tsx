"use client";

import { NewsItem } from "@/types/news/mobile/newsListApiTypes";
import ContentCard from "@/components/shared/Mobile/cards/ContentCards";

interface NewsCardsProps {
  items: NewsItem[];
}

const NewsCards = ({ items }: NewsCardsProps) => {
  return (
    <div className="px-4 pb-8 space-y-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 mt-6">Explore</h1>
         {items.map((news) => (
        <ContentCard
          key={news._id}
          image={news.image?.webp?.url ?? ""}
          category={news.newCategoryDetails?.name ?? ""}
          title={news.newsTitle ?? ""}
          description={news.newsBody?.text}
          date={news.date}
          href={`/news/${news.slug}`}
        />
      ))}
    </div>
  );
};

export default NewsCards;
