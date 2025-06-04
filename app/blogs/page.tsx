import { baseUrl } from '@/api';
import Blog from '@/components/Blog/Blog'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "How to Sell Your Property Fast in 2025 | Property Seller",
  description: "Learn proven strategies to sell your property quickly in today's competitive real estate market.",
  openGraph: {
    title: "How to Sell Your Property Fast in 2025 | Property Seller",
    description: "Explore expert advice and actionable tips to speed up your property sale in 2025.",
    url: "https://www.propertyseller.com/blog/how-to-sell-your-property-fast-2025",
    siteName: "Property Seller",
    images: [
      {
        url: "https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/blog-how-to-sell-fast.png",
        width: 1200,
        height: 630,
        alt: "How to Sell Your Property Fast in 2025",
      },
    ],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Sell Your Property Fast in 2025 | Property Seller",
    description: "Quick and effective ways to close your property deal faster in 2025.",
    images: ["https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/blog-how-to-sell-fast.png"],
  },
};

export default async function Page() {
       const res = await fetch(`${baseUrl}/blogs?limit=24`);
        const data = await res.json();
    
  return (
    <Blog initialData={data.data}/>
  )
}
