import { baseUrl } from '@/api';
import Blog from '@/components/Blog/Blog'
import { Metadata } from 'next';
import Script from 'next/script';
import React from 'react'


// Enable ISR with 60-second revalidation
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {

  try {
    // Fetch metadata with cache-busting timestamp to ensure fresh data
    const responseData = await fetch(
      `${baseUrl}/meta-data?referencePage=blog-page`,
      {
        next: {
          revalidate: 60 // Revalidate every 10 seconds
        },
      }
    ).then((res) => res.json())

    const data = responseData?.data?.[0] || {};

    return {
      title: data.metaTitle || "Real Estate Blog | Property Seller - Off-Plan Insights & Investment Tips.",
      description: data.metaDescription || "Read expert real estate blogs from Property Seller. Explore off-plan property insights, market trends, buying guides, and investment strategies tailored for smart buyers.",
      keywords: data.keywords || 'property, real estate, about us',
      openGraph: {
        title: data.openGraphTitle || "Real Estate Blog | Property Seller",
        description: data?.openGraphDescription || "Stay ahead in the property market with expert blogs from Property Seller. Learn about off-plan properties, developer updates, market trends, and real estate tips.",
        url: data?.openGraphUrl || "https://www.propertyseller.com/blogs",
        siteName: data?.siteName || "Property Seller",
        images: [
          {
            url: data?.metaImage?.url || "https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png",
            width: 1200,
            height: 630,
            alt: data?.metaImage?.openGraphTitle || "Property Seller Blog - Real Estate Insights & Off-Plan Trends",
          },
        ],
        type: data?.type || "website",
      },
      twitter: {
        title: data.twitterTitle || 'Real Estate Blog | Property Seller',
        description: data.twitterDescription || 'Discover in-depth real estate articles, off-plan buying guides, and investment tips on the Property Seller blog—your source for smart property decisions.',
        images: data.twitterImage ? [data.twitterImage.url] : ["https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png"],
      },
      alternates: {
        canonical: data.canonical || "https://www.propertyseller.com/blogs"
      }
    }
  } catch (error) {

    // Return fallback metadata
    return {
      title: "Real Estate Blog | Property Seller - Off-Plan Insights & Investment Tips.",
      description: "Read expert real estate blogs from Property Seller. Explore off-plan property insights, market trends, buying guides, and investment strategies tailored for smart buyers.",
      keywords: 'property, real estate, about us',
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
        title: 'Real Estate Blog | Property Seller',
        description: 'Discover in-depth real estate articles, off-plan buying guides, and investment tips on the Property Seller blog—your source for smart property decisions.',
        images: ["https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png"],
      },
      alternates: {
        canonical: "https://www.propertyseller.com/blogs"
      }
    }
  }
}


export default async function Page() {
  try {
    const res = await fetch(`${baseUrl}/blogs?limit=24`);

    if (!res.ok) {
      throw new Error(`API returned ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

        const responseData = await fetch(
      `${baseUrl}/meta-data?referencePage=blog-page`,
      {
        next: {
          revalidate: 60 // Revalidate every 10 seconds
        },
      }
    ).then((res) => res.json())

    const dataForMeta = responseData?.data?.[0] || {};

   const scripts = dataForMeta?.richSnippets?.match(
      /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
    ) || [];
    return (
      <>


      {scripts?.map((script: string, index: number) => {
        // Remove outer <script> tags to use innerHTML
        const innerJson = script
          .replace(/<script[^>]*>/g, "")
          .replace(/<\/script>/g, "")
          .trim();

        return (
          <Script
            key={index}
            id={`json-ld-schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: innerJson }}
            strategy="afterInteractive" // "beforeInteractive" if needed
          />
        );
      })}

      <Blog initialData={data.data} />
      </>
    );
  } catch (err) {
    console.error('Error fetching blogs:', err);
    return <div>Failed to load blogs.</div>;
  }
}
