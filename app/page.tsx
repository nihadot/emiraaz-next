
import React from 'react'
import { baseUrl } from '@/api';
import HomePage from '@/components/Home/Home';
import { getSiteMapData } from '@/utils/getSiteMapData';
import { getPortraitBanners } from '@/utils/getPortraitBanners';
import { Metadata } from 'next';
import Head from 'next/head';
import Script from 'next/script';
import { propertyCategoryStatus, propertyCategoryType } from '@/data';



// Enable ISR with 10-second revalidation
export const revalidate = 60;


export async function generateMetadata(): Promise<Metadata> {

  try {
    // Fetch metadata with cache-busting timestamp to ensure fresh data
    const responseData = await fetch(
      `${baseUrl}/meta-data?referencePage=home-page`,
      {
        next: {
          revalidate: 60 // Revalidate every 10 seconds
        },
      }
    ).then((res) => res.json())

    const data = responseData?.data?.[0] || {};

    return {
      title: data.metaTitle || "Trusted Real Estate Partner in UAE | PropertySeller Dubai",
      description: data.metaDescription || "Buy properties direct from developers & owners on PropertySeller. ✔Verified listings ✔ transparent pricing ✔ Properties for sale in Dubai, Abu Dhabi &  Sharjah.",
      keywords: data.keywords || [
        "propertyseller",
        "property seller",
        "appartments for sale",
        "villas for sale",
        "townhouses for sale",
        "penthouses for sale",
        "apartments for sale",
        "property for sale",
        "property for sale in dubai",
        "property for sale in uae",
        "property for sale in abu dhabi",
        "property for sale in sharjah",
        "property for sale in ras al khimah",
        "property for sale in al marjan island",

      ],
      openGraph: {
        title: data.openGraphTitle || "PropertySeller UAE | Apartments, Villas, Townhouses, Penthouses",
        description: data?.openGraphDescription || "PropertySeller is your partner for the latest off-plan projects and new developments across the UAE. If you're a investor or homebuyer all in one place with reliable and hassle-free.",
        url: data?.openGraphUrl || "https://www.propertyseller.com/",
        siteName: data?.siteName || "Property Seller",
        images: [
          {
            url: data?.metaImage?.url || "https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png",
            width: 1200,
            height: 630,
            alt: data?.metaImage?.openGraphTitle || "Dubai Property - Property Seller",
          },
        ],
        locale: "en_US",
        type: data?.type || "website",
      },
      twitter: {
        card: "summary_large_image",
        title: data.twitterTitle || "Propertyseller UAE | Apartments, Villas, Townhouses, Penthouses",
        description: data.twitterDescription || "Explore premium off-plan properties and apartments for sale in Dubai.",
        images: data.twitterImage ? [data.twitterImage.url] : ["https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png"]
      },
      alternates: {
        canonical: data?.canonical || "https://www.propertyseller.com/",
      },

    }
  } catch (error) {

    // Return fallback metadata
    return {
      title: "Trusted Real Estate Partner in UAE | PropertySeller Dubai",
      description: "Buy properties direct from developers & owners on PropertySeller. ✔Verified listings ✔ transparent pricing ✔ Properties for sale in Dubai, Abu Dhabi &  Sharjah",
      keywords: [
        "propertyseller",
        "property seller",
        "appartments for sale",
        "villas for sale",
        "townhouses for sale",
        "penthouses for sale",
        "apartments for sale",
        "property for sale",
        "property for sale in dubai",
        "property for sale in uae",
        "property for sale in abu dhabi",
        "property for sale in sharjah",
        "property for sale in ras al khimah",
        "property for sale in al marjan island",

      ], openGraph: {
        title: "PropertySeller UAE | Apartments, Villas, Townhouses, Penthouses",
        description: "PropertySeller is your partner for the latest off-plan projects and new developments across the UAE. If you're a investor or homebuyer all in one place with reliable and hassle-free.",
        url: "https://www.propertyseller.com/",
        siteName: "Property Seller",
        images: [
          {
            url: "https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png",
            width: 1200,
            height: 630,
            alt: "Dubai Property - Property Seller",
          },
        ],
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "Propertyseller UAE | Apartments, Villas, Townhouses, Penthouses",
        description: "Explore premium off-plan properties and apartments for sale in Dubai.",
        images: ["https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png"],
        site: "@PropertySeller",
      },
      alternates: {
        canonical: "https://www.propertyseller.com/",
      },
    };

  }
}

interface PageProps {
  params: Promise<{ urls: string[] }>;

  searchParams: Promise<{ cities?: string | string[], page?: number, pt?: string, ct?: string, y: number | '', q?: string, pp?: string, ds?: string, ft?: string }>;
}
export default async function Page({ searchParams, params }: PageProps) {

  const { urls } = await params;
  const { cities, page, pt, ct, y, q, ds, ft, pp } = await searchParams;

  // const params = await searchParams;
  // const page = params?.page; // "2"      
  try {

    const responseData = await fetch(
      `${baseUrl}/meta-data?referencePage=home-page`,
      {
        next: {
          revalidate: 60 // Revalidate every 10 seconds
        },
      }
    ).then((res) => res.json())
    const dataForMeta = responseData?.data?.[0] || {};

    // ✅ Fetch emirates data
    const res = await fetch(`${baseUrl}/emirate/names`, { cache: "no-store" });
    const emirateData = await res.json();


    // ✅ Fetch counts data
    const resFetchCount = await fetch(`${baseUrl}/news/all/counts`, { cache: "no-store" });
    const dataFetchCount = await resFetchCount.json();

    // ✅ Fetch counts data
    const resFetchCities = await fetch(`${baseUrl}/city/names`, { cache: "no-store" });
    const dataFetchCities = await resFetchCities.json();


    // ✅ Fetch counts data
    const resFetchVideoAds = await fetch(`${baseUrl}/projects/small-video-ads`, { cache: "no-store" });
    const dataFetchVideoAds = await resFetchVideoAds.json();


    // ✅ Fetch counts data
    const resFetchProjects = await fetch(`${baseUrl}/projects?limit=24&${page ? `page=${page}` : ''}`, { cache: "no-store" });
    const dataFetchProjects = await resFetchProjects.json();

    // ✅ Fetch counts data
    const dataFetchRandomSiteMap = await getSiteMapData(); // fetches only once, then cached


    // ✅ Portrait banners with cache
    const dataFetchPortraitBanners = await getPortraitBanners();




    const scripts = dataForMeta?.richSnippets?.match(
      /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
    ) || [];

    // console.log(cities,'citiescities')
    const isEmirate = emirateData?.data?.find((item: {
      _id: string;
      name: string;
      count: number;
      slug: string;
    }) => urls?.includes(item.slug)) || ''


    const isPropertyCategoryType = urls?.find((seg) =>
      propertyCategoryType.some((item: any) => item.value === seg)
    );

    const isPropertyCategoryStatus = urls?.find((seg) =>
      propertyCategoryStatus.some((item: any) => item.value === seg)
    );

    const initialValues = {
      emirate: isEmirate?.slug,
      cities: Array.isArray(cities)
        ? cities
        : cities
          ? [cities]
          : [],
      propertyCategoryType: isPropertyCategoryType || 'off-plan-projects', // default string
      propertyCategoryStatus: isPropertyCategoryStatus || 'all',
      propertyType: pt,
      completionType: ct,
      qtr: q,
      year: y,
      discount: ds,
      furnishied: ft,
      paymentPlan: pp,
    }



    return (<>

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

      <Head>
        {dataFetchVideoAds.data.map((video: any) => (
          <script
            key={video._id}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "VideoObject",
                name: video.name,
                thumbnailUrl: video.thumbnail?.webp?.url,
                contentUrl: video.videoFil?.url?.url,
              }),
            }}
          // {console.log(video,'VIdel')}
          />
        ))}
      </Head>

      <HomePage
      initialValues={initialValues}
        content={responseData?.data[0]?.content}
        initialData={dataFetchProjects}
        initialCities={dataFetchCities?.data}
        emiratesData={emirateData?.data}
        videoAds={dataFetchVideoAds?.data}
        siteMap={dataFetchRandomSiteMap?.data}
        portraitBanners={dataFetchPortraitBanners?.data}
        allCounts={dataFetchCount?.data}
      />

    </>)
  } catch (err) {
    console.error('Error fetching projects:', err);
    return <div>Failed to load projects.</div>;
  }
}
