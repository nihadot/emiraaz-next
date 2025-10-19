import { baseUrl } from '@/api';
import AiAgent from '@/components/AiAgent/AiAgent'
import { Metadata } from 'next';
import React from 'react'


// Enable ISR with 60-second revalidation
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {

  try {
    // Fetch metadata with cache-busting timestamp to ensure fresh data
    const responseData = await fetch(
      `${baseUrl}/meta-data?referencePage=ai-agent`,
      {
        next: {
          revalidate: 60 // Revalidate every 10 seconds
        },
      }
    ).then((res) => res.json())

    const data = responseData?.data?.[0] || {};

    return {
      title: data.metaTitle || "Ai Agent | Property Seller - Trusted Off-Plan Real Estate Marketplace",
      description: data.metaDescription || "Learn how Property Seller is transforming real estate with verified listings, expert support, and exclusive off-plan property opportunities in Dubai and beyond.",
      keywords: data.keywords || 'property, real estate, ai agent',
      openGraph: {
        title: data.openGraphTitle || "Ai Agent | Simplifying Real Estate Investments",
        description: data?.openGraphDescription || "Discover Property Seller’s mission to simplify real estate, connect buyers with top developers, and offer transparent, hassle-free property investments.",
        url: data?.openGraphUrl || "https://www.propertyseller.com/ai-agent",
        siteName: data?.siteName || "Property Seller",
        images: [
          {
            url: data?.metaImage?.url || "https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png",
            width: 1200,
            height: 630,
            alt: data?.metaImage?.openGraphTitle || "Ai Agent - Connecting Buyers with Trusted Developers",
          },
        ],
        type: data?.type || "website",
      },
      twitter: {
        title: data.twitterTitle || 'About Us | Property Seller',
        description: data.twitterDescription || 'Learn about PropertySeller',
        images: data.twitterImage ? [data.twitterImage.url] : ["https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png"],
      },
      alternates: {
        canonical: data.canonical || "https://www.propertyseller.com/ai-agent"
      }
    }
  } catch (error) {

    // Return fallback metadata
    return {
      description: "Learn how Property Seller is transforming real estate with verified listings, expert support, and exclusive off-plan property opportunities in Dubai and beyond.",
      openGraph: {
        title: "Ai Agent | Simplifying Real Estate Investments",
        description: "Discover Property Seller’s mission to simplify real estate, connect buyers with top developers, and offer transparent, hassle-free property investments.",
        url: "https://www.propertyseller.com/ai-agent",
        siteName: "Property Seller",
        images: [
          {
            url: "https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png",
            width: 1200,
            height: 630,
            alt: "Ai Agent - Connecting Buyers with Trusted Developers",
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "About Us | Property Seller - Trusted Real Estate Platform",
        description: "At Property Seller, we connect you with the best off-plan property investments—offering expert guidance, verified projects, and complete transparency.",
        images: ["https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png"],
      },
      alternates: {
        canonical: "https://www.propertyseller.com/ai-agent",
      },
    }
  }
}


function page() {
  return (
    <AiAgent
    />
  )
}

export default page