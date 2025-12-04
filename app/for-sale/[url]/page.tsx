import { baseUrl } from '@/api';
import ForSalePage from '@/components/ForSalePage/ForSalePage';
import { getPortraitBanners } from '@/utils/getPortraitBanners';
import { getSiteMapData } from '@/utils/getSiteMapData';
import { Metadata } from 'next';
import Script from 'next/script';
import React from 'react'

interface PageProps {
    params: Promise<{ url: string }>;
}


export const revalidate = 60;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {

    // export async function generateMetadata({
    // params
    // }): Promise<Metadata> {
    const { url } = await params;

    try {

        // console.log(url, 'params')

        //      const resMeta = await fetch(`${baseUrl}/for-sale/url/${url}`);
        // const dataMeta = await resMeta.json();


        // Fetch metadata with cache-busting timestamp to ensure fresh data
        const responseData = await fetch(
            `${baseUrl}/for-sale/url/${url}`,
            {
                next: {
                    revalidate: 60 // Revalidate every 10 seconds
                },
            }
        ).then((res) => res.json())

        // console.log(responseData, 'responseData')

        const data = responseData?.data || {};
        

        return {
            title: data.metaTitle || "Property Seller - Trusted Off-Plan Real Estate Marketplace",
            description: data.metaDescription || "Learn how Property Seller is transforming real estate with verified listings, expert support, and exclusive off-plan property opportunities in Dubai and beyond.",
            keywords: data.keywords || `property, real estate, about us, property seller, real estate marketplace, property marketplace, real estate investment, real estate investments, off plan, off-plan, offplan, residential, commercial, luxury, luxurious, exclusive, exclusive property, exclusive properties, trusted, verified, verified property, verified properties, expert, expert support, expert advice, expert advice, professional, professional advice, professional advice, investment, investments, invest, investor, investors, buyer, buyers, seller, sellers, listing, listings, listing property, listing properties, listings property, listings properties, rental, rental income, rental incomes`,
            openGraph: {
                title: data.openGraphTitle || "Simplifying Real Estate Investments",
                description: data?.openGraphDescription || "Discover Property Seller’s mission to simplify real estate, connect buyers with top developers, and offer transparent, hassle-free property investments.",
                url: data?.openGraphUrl || `https://www.propertyseller.com/for-sale/${url}`,
                siteName: data?.siteName || "Property Seller",
                images: [
                    {
                        url: data?.metaImage?.url || "https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png",
                        width: 1200,
                        height: 630,
                        alt: data?.metaImage?.openGraphTitle || "About Property Seller - Connecting Buyers with Trusted Developers",
                    },
                ],
                type: data?.type || "website",
            },
            twitter: {
                title: data.twitterTitle || 'About Us | Property Seller',
                description: data.twitterDescription || 'Learn PropertySeller',
                images: data.twitterImage ? [data.twitterImage.url] : ["https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png"],
            },
            alternates: {
                canonical: data.canonical || `https://www.propertyseller.com/for-sale/${url}`
            }
        }
    } catch (error) {

        // Return fallback metadata
        return {
            description: "Learn how Property Seller is transforming real estate with verified listings, expert support, and exclusive off-plan property opportunities in Dubai and beyond.",
            openGraph: {
                title: "Property Seller | Simplifying Real Estate Investments",
                description: "Discover Property Seller’s mission to simplify real estate, connect buyers with top developers, and offer transparent, hassle-free property investments.",
                url: `https://www.propertyseller.com/for-sale/${url}`,
                siteName: "Property Seller",
                images: [
                    {
                        url: "https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png",
                        width: 1200,
                        height: 630,
                        alt: "Property Seller - Connecting Buyers with Trusted Developers",
                    },
                ],
                type: "website",
            },
            twitter: {
                card: "summary_large_image",
                title: "Property Seller - Trusted Real Estate Platform",
                description: "At Property Seller, we connect you with the best off-plan property investments—offering expert guidance, verified projects, and complete transparency.",
                images: ["https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png"],
            },
            alternates: {
                canonical: `https://www.propertyseller.com/for-sale/${url}`,
            },
        }
    }
}


async function Page({ params }: PageProps) {

    const { url } = await params; // Await the params Promise

    const dataFetchRandomSiteMap = await getSiteMapData(); // fetches only once, then cached


    const res = await fetch(`${baseUrl}/for-sale/${url}?limit=24&page=1`);
    const data = await res.json();

    // console.log(data?.slice(0,1),'res')
    // console.log(data,'urrlll')


    // console.log(data,'data')

    // ✅ Fetch counts data
    const resFetchCount = await fetch(`${baseUrl}/news/all/counts`, { cache: "no-store" });
    const dataFetchCount = await resFetchCount.json();




    // ✅ Fetch emirates data
    const resEmirates = await fetch(`${baseUrl}/emirate/names`, { cache: "no-store" });
    const dataResEmirates = await resEmirates.json();

    const responseData = await fetch(
        `${baseUrl}/for-sale/url/${url}`,
        {
            next: {
                revalidate: 60 // Revalidate every 10 seconds
            },
        }
    ).then((res) => res.json())

    // console.log(responseData, 'responseData')

    const dataMeta = responseData?.data || {};
    const error = !responseData.data;


    const dataFetchPortraitBanners = await getPortraitBanners();

    // const dataFetchPortraitBanners = await getPortraitBanners();

    // if (error) throw new 
    if (error) throw new Error('Page not available for this request')


    // ✅ Fetch counts data
    const resFetchCities = await fetch(`${baseUrl}/city/names`, { cache: "no-store" });
    const dataFetchCities = await resFetchCities.json();

    // const dataForMeta = responseData?.data?.[0] || {};

    const scripts = dataMeta?.richSnippets?.match(
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


        <ForSalePage
url={url}
emiratesData={dataResEmirates?.data}
metaContent={dataMeta?.content}
allCounts={dataFetchCount?.data}
// initialData={data}
error={error}
siteMap={dataFetchRandomSiteMap?.data}
portraitBanners={dataFetchPortraitBanners?.data}
dataFetchCities={dataFetchCities?.data}

/>
</>
    )
}

export default Page