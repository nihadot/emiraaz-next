import { baseUrl } from '@/api';
import RentalIncome from '@/components/RentalIncome/RentalIncome'
import { getPortraitBanners } from '@/utils/getPortraitBanners';
import { Metadata } from 'next';
import Script from 'next/script';
import React from 'react'




// Enable ISR with 60-second revalidation
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {

  try {
    // Fetch metadata with cache-busting timestamp to ensure fresh data
    const responseData = await fetch(
      `${baseUrl}/meta-data?referencePage=rental-income`,
      {
        next: {
          revalidate: 60 // Revalidate every 10 seconds
        },
      }
    ).then((res) => res.json())

    const data = responseData?.data?.[0] || {};

    return {
      title: data.metaTitle || "Property Seller - Trusted Off-Plan Real Estate Marketplace",
      description: data.metaDescription || "Learn how Property Seller is transforming real estate with verified listings, expert support, and exclusive off-plan property opportunities in Dubai and beyond.",
      keywords: data.keywords || 'Property Seller, Real Estate, PropertySeller, Dubai, UAE, Trusted Real Estate Platform, Off-Plan Property, Rental Income, Rental Income Calculator',
      openGraph: {
        title: data.openGraphTitle || " Simplifying Real Estate Investments",
        description: data?.openGraphDescription || "Discover Property Seller’s mission to simplify real estate, connect buyers with top developers, and offer transparent, hassle-free property investments.",
        url: data?.openGraphUrl || "https://www.propertyseller.com/rental-income",
        siteName: data?.siteName || "Property Seller",
        images: [
          {
            url: data?.metaImage?.url || "https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png",
            width: 1200,
            height: 630,
            alt: data?.metaImage?.openGraphTitle || "Connecting Buyers with Trusted Developers",
          },
        ],
        type: data?.type || "website",
      },
      twitter: {
        title: data.twitterTitle || 'Property Seller',
        description: data.twitterDescription || 'Learn about PropertySeller',
        images: data.twitterImage ? [data.twitterImage.url] : ["https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png"],
      },
      alternates: {
        canonical: data.canonical || "https://www.propertyseller.com/rental-income"
      }
    }
  } catch (error) {

    // Return fallback metadata
    return {
      description: "Learn how Property Seller is transforming real estate with verified listings, expert support, and exclusive off-plan property opportunities in Dubai and beyond.",
      openGraph: {
        title: "About Property Seller | Simplifying Real Estate Investments",
        description: "Discover Property Seller’s mission to simplify real estate, connect buyers with top developers, and offer transparent, hassle-free property investments.",
        url: "https://www.propertyseller.com/rental-income",
        siteName: "Property Seller",
        images: [
          {
            url: "https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png",
            width: 1200,
            height: 630,
            alt: "About Property Seller - Connecting Buyers with Trusted Developers",
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
        canonical: "https://www.propertyseller.com/rental-income",
      },
    }
  }
}

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const page = async ({ searchParams }: PageProps) => {

  const params = await searchParams;

  // console.log(params, 'Params')

  // ✅ Portrait banners with cache
  const dataFetchPortraitBanners = await getPortraitBanners();

  // ✅ Fetch counts data
  // const resFetchRentalIncome = await fetch(`${baseUrl}/rental-income`, { cache: "no-store" });
  // const dataFetchRentalIncome = await resFetchRentalIncome.json();

  // ✅ Fetch emirates data
  const res = await fetch(`${baseUrl}/emirate/names`, { cache: "no-store" });
  const responseEmirateData = await res.json();

  // ✅ Fetch counts data
  const resFetchCities = await fetch(`${baseUrl}/city/names`, { cache: "no-store" });
  const dataFetchCities = await resFetchCities.json();

  // const params = await searchParams;
  const emirate = Array.isArray(params.emirate) ? params.emirate[0] : params.emirate || '';
  const cities =
    Array.isArray(params.cities) ? params.cities.flatMap(c => c.split(',')) :
      params.cities ? params.cities.split(',') : [];

  const queryParams = new URLSearchParams({ page: '1', limit: '14', search: '' });
  if (emirate) queryParams.append('emirate', emirate);
  cities.forEach(c => queryParams.append('cities', c));

  const resFetchRentalIncome = await fetch(`${baseUrl}/rental-income?${queryParams.toString()}`, { cache: 'no-store' });
  const dataFetchRentalIncome = await resFetchRentalIncome.json();


      const responseData = await fetch(
      `${baseUrl}/meta-data?referencePage=rental-income`,
      {
        next: {
          revalidate: 60 // Revalidate every 10 seconds
        },
      }
    ).then((res) => res.json())

    const dataForMeta = responseData?.data?.[0] || {};

        const scripts = dataForMeta?.richSnippets?.match(
      /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
    )
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


    <RentalIncome
      emirates={responseEmirateData.data}
      dataFetchRentalIncome={dataFetchRentalIncome}
      portraitBanners={dataFetchPortraitBanners?.data}
      citiesValue={dataFetchCities?.data}
      />
      </>
  )
}

export default page