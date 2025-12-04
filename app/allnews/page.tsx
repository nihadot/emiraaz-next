import { baseUrl } from "@/api";
import News from "@/components/News/News"
import { getSiteMapData } from "@/utils/getSiteMapData";
import { Metadata } from "next";
import Script from "next/script";

// Enable ISR with 60-second revalidation
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {

  try {
    // Fetch metadata with cache-busting timestamp to ensure fresh data
    const responseData = await fetch(
      `${baseUrl}/meta-data?referencePage=news-page`,
   
    ).then((res) => res.json())

    const data = responseData?.data?.[0] || {};

    return {
      title: data.metaTitle || "Latest News | Property Seller.",
      description: data.metaDescription || "Stay up to date with the latest news and updates from Property Seller.",
      keywords: data.keywords || 'property, real estate, about us',
      openGraph: {
        title: data.openGraphTitle || "Latest News | Property Seller",
        description: data?.openGraphDescription || "Read the latest articles and updates in the real estate market.",
        url: data?.openGraphUrl || "https://www.propertyseller.com/allnews",
        siteName: data?.siteName || "Property Seller",
        images: [
          {
            url: "https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png", // replace with your OG image
            width: 1200,
            height: 630,
            alt: "Property Seller News",
          },
        ],
        type: data?.type || "website",
      },
      twitter: {
        card: "summary_large_image",

        title: data.twitterTitle || 'Latest News | Property Seller',
        description: data.twitterDescription || 'Stay up to date with the latest news and updates from Property Seller.',
        images: data.twitterImage ? [data.twitterImage.url] : ["https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png"],
      },
      alternates: {
        canonical: data.canonical || "https://www.propertyseller.com/allnews"
      }
    }
  } catch (error) {

    // Return fallback metadata
    return {
      title: "Latest News | Property Seller",
      description: "Stay up to date with the latest news and updates from Property Seller.",
      openGraph: {
        title: "Latest News | Property Seller",
        description: "Read the latest articles and updates in the real estate market.",
        url: "https://www.propertyseller.com/allnews",
        siteName: "Property Seller",
        images: [
          {
            url: "https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png", // replace with your OG image
            width: 1200,
            height: 630,
            alt: "Property Seller News",
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "Latest News | Property Seller",
        description: "Stay up to date with the latest news and updates from Property Seller.",
        images: ["https://res.cloudinary.com/dknxmloqh/image/upload/v1748991060/favicon-DBW5gi7l_j0cjdz.png"], // same here
      },
    }
  }
}

export default async function AllNews() {
  try {
    const res = await fetch(`${baseUrl}/news?limit=24`);

    const dataFetchRandomSiteMap = await getSiteMapData(); // fetches only once, then cached


    if (!res.ok) {
      throw new Error(`API returned ${res.status} ${res.statusText}`);
    }



    const data = await res.json();


     const responseData = await fetch(
          `${baseUrl}/meta-data?referencePage=referencePage=news-page`,
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



    return(
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

      
       <News

      siteMap={dataFetchRandomSiteMap?.data}

      initialData={data.data} />
      </>
    );
  } catch (err) {
    console.error('Error fetching news:', err);
    return <div>Failed to load news.</div>;
  }
}