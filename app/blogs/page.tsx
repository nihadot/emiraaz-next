import { baseUrl } from '@/api';
import Blog from '@/components/Blog/Blog'
import { Metadata } from 'next';
import React from 'react'


export const metadata: Metadata = {
  title: "Real Estate Blog | Property Seller - Off-Plan Insights & Investment Tips",
  description: "Read expert real estate blogs from Property Seller. Explore off-plan property insights, market trends, buying guides, and investment strategies tailored for smart buyers.",
  openGraph: {
    title: "Real Estate Blog | Property Seller",
    description: "Stay ahead in the property market with expert blogs from Property Seller. Learn about off-plan properties, developer updates, market trends, and real estate tips.",
    url: "https://www.propertyseller.com/blogs",
    siteName: "Property Seller",
    images: [
      {
        url: "https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png",
        width: 1200,
        height: 630,
        alt: "Property Seller Blog - Real Estate Insights & Off-Plan Trends",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Estate Blog | Property Seller",
    description: "Discover in-depth real estate articles, off-plan buying guides, and investment tips on the Property Seller blog—your source for smart property decisions.",
    images: ["https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png"],
  },
};


export default async function Page() {
       const res = await fetch(`${baseUrl}/blogs?limit=24`);
        const data = await res.json();
    
  return (
    <Blog initialData={data.data}/>
  )
}
