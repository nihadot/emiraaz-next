import { Metadata } from "next";
import ProjectDetails from "@/components/ProjectDetails/ProjectDetails";
import { baseUrl } from "@/api";
import { getSiteMapData } from "@/utils/getSiteMapData";
import Script from "next/script";

interface PageProps {
  params: Promise<{ id: string }>;
    searchParams: Promise<{ cities?: string | string[], page?: number,lead?:string ,id?:string}>;

}


// ✅ Static Paths for Pre-rendering (e.g., top 10 projects)
export async function generateStaticParams() {
  try {
    const res = await fetch(`${baseUrl}/projects?limit=500`);

    if (!res.ok) {
      throw new Error(`API returned ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    return data.data.map((project: any) => ({
      id: project.slug,
    }));
  } catch (err) {
    console.error('Error in generateStaticParams:', err);
    return []; // optional: return empty array to avoid build crash
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { id } = await params; // Await the params Promise
    const res = await fetch(`${baseUrl}/projects/${id}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return {
        title: "Project Not Found | Property Seller",
        description: "The project you're looking for doesn't exist.",
      };
    }

    const data = await res.json();

    return {
      title: data?.data?.metaTitle || `${data?.data?.projectTitle} | Property Seller`,
      description: data?.data?.metaDescription || data?.data?.description?.slice(0, 150),
      alternates: {
        canonical: `https://www.propertyseller.com/projects/${id}`,
      },
      keywords: data?.data?.metaKeywords,
      openGraph: {
        title: data?.data?.metaTitle || `${data?.data?.projectTitle} | Property Seller`,
        description: data?.data?.metaDescription || data?.data?.description?.slice(0, 150),
        url: `https://www.propertyseller.com/projects/${id}`,
        type: "website",
        images: [
          {
            url: data?.data?.mainImages?.[0]?.webp?.url,
            width: 1200,
            height: 630,
            alt: data?.data?.projectTitle,
          },
        ],
      },
      twitter: {
        title: data?.data?.metaTitle || `${data?.data?.projectTitle} | Property Seller`,
        description: data?.data?.metaDescription || data?.data?.description?.slice(0, 150),
        card: "summary_large_image",
        images: [
          {
            url: data?.data?.mainImages?.[0]?.webp?.url,
            width: 1200,
            height: 630,
            alt: data?.data?.projectTitle,
          },
        ],
      },
    };
  } catch (err) {
    console.error('Error generating metadata:', err);
    return {
      title: "Project Not Found | Property Seller",
      description: "The project you're looking for doesn't exist.",
    };
  }
}


export default async function Page({ params,searchParams }: PageProps) {
  const { id } = await params; // Await the params Promise
  const { cities,page,lead,id:promoId } = await searchParams;

  const dataFetchRandomSiteMap = await getSiteMapData(); // fetches only once, then cached

  const responseData = await fetch(`${baseUrl}/projects/${id}`, {
      next: { revalidate: 60 },
    }).then((res) => res.json())
   const dataForMeta = responseData?.data || {};
    console.log(dataForMeta,'dataForMeta')
    const scripts = dataForMeta?.richSnippets?.match(
      /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
    ) || [];
// console.log(dataFetchRandomSiteMap,'fdfdf')
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

<ProjectDetails
lead={lead}
    siteMap={dataFetchRandomSiteMap?.data}
      data={responseData}
      promoId={promoId}
    id={id} />;

</>)
}