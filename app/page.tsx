
import React, { Suspense } from 'react'
import { baseUrl } from '@/api';
import dynamic from 'next/dynamic';
import { getSiteMapData } from '@/utils/getSiteMapData';
import { getPortraitBanners } from '@/utils/getPortraitBanners';
import { Metadata } from 'next';
import Script from 'next/script';
import { propertyCategoryStatus, propertyCategoryType } from '@/data';

// ⚡ Code splitting - HomePage loads only when needed
const HomePage = dynamic(() => import('@/components/Home/Home'), {
  loading: () => <HomePageSkeleton />,
  ssr: true, // Still server-render for SEO
});

// Lightweight loading skeleton
function HomePageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      <div className="h-16 bg-gray-200 mb-4" />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}

// Enable ISR with 60-second revalidation
export const revalidate = 60;

// ⚡ Optimize metadata generation
export async function generateMetadata(): Promise<Metadata> {

  try {
    // Fetch metadata with ISR caching + timeout for slow networks
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

    const responseData = await fetch(
      `${baseUrl}/meta-data?referencePage=home-page`,
      {
        next: {
          revalidate: 60
        },
        signal: controller.signal,
      }
    ).then((res) => res.json()).finally(() => clearTimeout(timeoutId));

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

// ⚡ Helper function to fetch with timeout and compression
async function fetchWithTimeout(url: string, options: RequestInit & { timeout?: number } = {}) {
  const { timeout = 8000, ...fetchOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
      // Request compressed responses
      headers: {
        'Accept-Encoding': 'gzip, deflate, br',
        ...fetchOptions.headers,
      },
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

export default async function Page({ searchParams, params }: PageProps) {

  const { urls } = await params;
  const { cities, page, pt, ct, y, q, ds, ft, pp } = await searchParams;

  try {
    // ⚡ OPTIMIZED PARALLEL FETCH with timeouts and error handling
    // Only fetch critical data first, defer non-critical
    const criticalDataPromises = [
      // Critical: Metadata (with timeout)
      fetchWithTimeout(`${baseUrl}/meta-data?referencePage=home-page`, {
        next: { revalidate: 60 },
        timeout: 5000,
      }).then(res => res.json()).catch(() => ({ data: [{}] })),

      // Critical: Emirates
      fetchWithTimeout(`${baseUrl}/emirate/names`, {
        next: { revalidate: 300 },
        timeout: 5000,
      }).then(res => res.json()).catch(() => ({ data: [] })),

      // Critical: Projects (main content)
      fetchWithTimeout(`${baseUrl}/projects?limit=24${page ? `&page=${page}` : ''}`, {
        next: { revalidate: 60 },
        timeout: 8000,
      }).then(res => res.json()).catch(() => ({ data: [], pagination: {} })),
    ];

    // Non-critical data (can load after)
    const nonCriticalDataPromises = [
      // Non-critical: Counts
      fetchWithTimeout(`${baseUrl}/news/all/counts`, {
        next: { revalidate: 120 },
        timeout: 5000,
      }).then(res => res.json()).catch(() => ({ data: {} })),

      // Non-critical: Cities
      fetchWithTimeout(`${baseUrl}/city/names`, {
        next: { revalidate: 300 },
        timeout: 5000,
      }).then(res => res.json()).catch(() => ({ data: [] })),

      // Non-critical: Video ads
      fetchWithTimeout(`${baseUrl}/projects/small-video-ads`, {
        next: { revalidate: 600 },
        timeout: 5000,
      }).then(res => res.json()).catch(() => ({ data: [] })),

      // Non-critical: Sitemap
      getSiteMapData().catch(() => ({ data: [] })),

      // Non-critical: Portrait banners
      getPortraitBanners().catch(() => ({ data: [] })),
    ];

    // ⚡ Load critical data first
    const [responseData, emirateData, dataFetchProjects] = await Promise.all(criticalDataPromises);

    // ⚡ Load non-critical data in parallel (won't block render)
    const [
      dataFetchCount,
      dataFetchCities,
      dataFetchVideoAds,
      dataFetchRandomSiteMap,
      dataFetchPortraitBanners
    ] = await Promise.all(nonCriticalDataPromises);

    const dataForMeta = responseData?.data?.[0] || {};

    // ⚡ Optimize regex parsing - only parse if data exists
    const scripts = dataForMeta?.richSnippets?.match(
      /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
    ) || [];

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
      propertyCategoryType: isPropertyCategoryType || 'off-plan-projects',
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

      {/* Schema markup - load after page interactive, only if exists */}
      {scripts.length > 0 && scripts.map((script: string, index: number) => {
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
            strategy="lazyOnload" // ⚡ Load after page is interactive
          />
        );
      })}

      {/* Video schema markup - load after page interactive, only if exists */}
      {dataFetchVideoAds?.data?.length > 0 && dataFetchVideoAds.data.map((video: any) => (
        <Script
          key={video._id}
          id={`video-schema-${video._id}`}
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
          strategy="lazyOnload" // ⚡ Load after page is interactive
        />
      ))}

      <Suspense fallback={<HomePageSkeleton />}>
        <HomePage
          initialValues={initialValues}
          content={responseData?.data?.[0]?.content}
          initialData={dataFetchProjects}
          initialCities={dataFetchCities?.data}
          emiratesData={emirateData?.data}
          videoAds={dataFetchVideoAds?.data}
          siteMap={dataFetchRandomSiteMap?.data}
          portraitBanners={dataFetchPortraitBanners?.data}
          allCounts={dataFetchCount?.data}
        />
      </Suspense>

    </>)
  } catch (err) {
    console.error('Error fetching projects:', err);
    return <div>Failed to load projects.</div>;
  }
}
