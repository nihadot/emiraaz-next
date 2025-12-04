import { baseUrl } from "@/api";
import HomePage from "@/components/Home/Home";
import { propertyCategoryStatus, propertyCategoryType } from "@/data";
import { getPortraitBanners } from "@/utils/getPortraitBanners";
import { getSiteMapData } from "@/utils/getSiteMapData";
import Head from "next/head";

// export async function generateStaticParams() {
//   const res = await fetch(`${baseUrl}/projects?limit=24`);
//   const data = await res.json();

//   console.log(data,'Data')
//   return data?.data.map((project: any) => ({
//     slug: project.slug,
//   }));
// }

interface PageProps {
  params: Promise<{ urls: string[] }>;

  searchParams: Promise<{ cities?: string | string[], page?: number, pt?: string, ct?: string, y: number | '', q?: string, pp?: string, ds?: string, ft?: string }>;
}


export default async function Page({ searchParams, params }: PageProps) {


  const { urls } = await params;
  const { cities, page, pt, ct, y, q, ds, ft, pp } = await searchParams;

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

  const query = new URLSearchParams();
  query.append("page", page ? page + '' : '1');
  query.append("limit", '24');
  // console.log('first')

  // ✅ Fetch counts data
  const resFetchProjects = await fetch(`${baseUrl}/projects?${query.toString()}`, { cache: "no-store" });
  const dataFetchProjects = await resFetchProjects.json();

  // ✅ Fetch counts data
  // const resFetchRandomSiteMap = await fetch(`${baseUrl}/site-index/random/urls?page=1&limit=80`, { cache: "no-store" });
  // const dataFetchRandomSiteMap = await resFetchRandomSiteMap.json();
  const dataFetchRandomSiteMap = await getSiteMapData(); // fetches only once, then cached

  console.log('dataFetchProjects')

  // ✅ Fetch counts data
  // const resFetchAllPortraitBanners = await fetch(`${baseUrl}/banners`, { cache: "no-store" });
  // const dataFetchPortraitBanners = await resFetchAllPortraitBanners.json();

  // ✅ Portrait banners with cache
  const dataFetchPortraitBanners = await getPortraitBanners();


  const responseData = await fetch(
    `${baseUrl}/meta-data?referencePage=home-page`,
    {
      next: {
        revalidate: 60 // Revalidate every 10 seconds
      },
    }
  ).then((res) => res.json())


    // console.log(cities,'citiescities')
    const isEmirate = emirateData?.data?.find((item: {
      _id: string;
      name: string;
      count: number;
      slug: string;
    }) => urls?.includes(item.slug)) || ''




   const isPropertyCategoryType = urls.find((seg) =>
        propertyCategoryType.some((item: any) => item.value === seg)
      );
  
      const isPropertyCategoryStatus = urls.find((seg) =>
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
  


  return (
    <>
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
      />;
    </>)
}