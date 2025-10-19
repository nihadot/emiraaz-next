import { baseUrl } from "@/api";
import HomePage from "@/components/Home/Home";
import { getPortraitBanners } from "@/utils/getPortraitBanners";
import { getSiteMapData } from "@/utils/getSiteMapData";

// export async function generateStaticParams() {
//   const res = await fetch(`${baseUrl}/projects?limit=24`);
//   const data = await res.json();

//   console.log(data,'Data')
//   return data?.data.map((project: any) => ({
//     slug: project.slug,
//   }));
// }


export default async function Page() {

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


     const responseData = await fetch(
          `${baseUrl}/meta-data?referencePage=home-page`,
          {
            next: {
              revalidate: 60 // Revalidate every 10 seconds
            },
          }
        ).then((res) => res.json())
    


    return <HomePage
    content={responseData?.data[0]?.content}

        initialData={dataFetchProjects.data}
        initialCities={dataFetchCities?.data}
        emiratesData={data?.data}
        videoAds={dataFetchVideoAds?.data}
        siteMap={dataFetchRandomSiteMap?.data}
        portraitBanners={dataFetchPortraitBanners?.data}
        allCounts={dataFetchCount?.data}

    />;
}