
import React from 'react'
import { baseUrl } from '@/api';
import HomePage from '@/components/Home/Home';
import { getSiteMapData } from '@/utils/getSiteMapData';
import { getPortraitBanners } from '@/utils/getPortraitBanners';
import { Metadata } from 'next';



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
      }
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


export default async function Page() {
  try {

    const responseData = await fetch(
      `${baseUrl}/meta-data?referencePage=home-page`,
      {
        next: {
          revalidate: 60 // Revalidate every 10 seconds
        },
      }
    ).then((res) => res.json())

    // console.log(responseData.data[0].content,'responseData')

    // ✅ Fetch emirates data
    const res = await fetch(`${baseUrl}/emirate/names`, { cache: "no-store" });
    const data = await res.json();


    // ✅ Fetch counts data
    const resFetchCount = await fetch(`${baseUrl}/news/all/counts`, { cache: "no-store" });
    const dataFetchCount = await resFetchCount.json();

    // console.log(,'dataFetchCount')
    // const propertyTypesShops = {...dataFetchCount?.data?.propertyTypes.shops,...dataFetchCount?.data?.propertyTypes.shop}
    // // dataFetchCount.data.propertyTypes = propertyTypes;
    // console.log(propertyTypes,'propertyTypes')

    // ✅ Fetch counts data
    const resFetchCities = await fetch(`${baseUrl}/city/names`, { cache: "no-store" });
    const dataFetchCities = await resFetchCities.json();


    // ✅ Fetch counts data
    const resFetchVideoAds = await fetch(`${baseUrl}/projects/small-video-ads`, { cache: "no-store" });
    const dataFetchVideoAds = await resFetchVideoAds.json();


    // ✅ Fetch counts data
    const resFetchProjects = await fetch(`${baseUrl}/projects`, { cache: "no-store" });
    const dataFetchProjects = await resFetchProjects.json();

    // ✅ Fetch counts data
    // const resFetchRandomSiteMap = await fetch(`${baseUrl}/site-index/random/urls?page=1&limit=80`, { cache: "no-store" });
    // const dataFetchRandomSiteMap = await resFetchRandomSiteMap.json();
    const dataFetchRandomSiteMap = await getSiteMapData(); // fetches only once, then cached


    // ✅ Fetch counts data
    // const resFetchAllPortraitBanners = await fetch(`${baseUrl}/banners`, { cache: "no-store" });
    // const dataFetchPortraitBanners = await resFetchAllPortraitBanners.json();

    // ✅ Portrait banners with cache
    const dataFetchPortraitBanners = await getPortraitBanners();

    //    const jsonLdFAQ = {
    //   "@context": "https://schema.org",
    //   "@type": "FAQPage",
    //   "mainEntity": [
    //     {
    //       "@type": "Question",
    //       "name": "What is Property Seller?",
    //       "acceptedAnswer": {
    //         "@type": "Answer",
    //         "text": "Property Seller is a platform to buy and sell real estate properties easily."
    //       }
    //     },
    //     {
    //       "@type": "Question",
    //       "name": "How can I contact support?",
    //       "acceptedAnswer": {
    //         "@type": "Answer",
    //         "text": "You can contact support via email or phone listed on our contact page."
    //       }
    //     }
    //   ]
    // };


    return (<>
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }}
      /> */}

      <HomePage
        content={responseData?.data[0]?.content}
        initialData={dataFetchProjects.data}
        initialCities={dataFetchCities?.data}
        emiratesData={data?.data}
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
