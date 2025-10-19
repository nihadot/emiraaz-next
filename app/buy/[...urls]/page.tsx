import { baseUrl } from "@/api";
import BuyPage from "@/components/BuyPage/BuyPage";
import { productTypeOptionFirstItems } from "@/data";
import { getPortraitBanners } from "@/utils/getPortraitBanners";
import { getSiteMapData } from "@/utils/getSiteMapData";
import { Metadata } from "next";

type Props = {
  params: { urls: string[] };
};



// export async function generateMetadata({ params }: Props) {

//       const { urls } = params;

//           const isExistPropertyCategoryType = urls.find((seg) =>
//               productTypeOptionFirstItems.some((item: any) => item.value === seg)
//           );
//      const findItem =  productTypeOptionFirstItems.find(item => item.value === isExistPropertyCategoryType)?.label
//           const 
//     // const isMatchCity = cityOptions.find((item: any) => item.slug === lastCitySlug);

//     //  isMatchCity?.label === 'All' ? 'All Cities' : isMatchCity?.label || 'All Cities'

     
//       console.log(findItem, 'urls')
// }



export default async function Page({
  params,
}: {
  params: Promise<{ urls: string[] }>;
}) {
  const { urls } = await params;
  
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

  return <BuyPage 
  content={responseData?.data[0]?.content}
  initialData={dataFetchProjects?.data}
  initialCities={dataFetchCities?.data}
  emiratesData={data?.data}
  videoAds={dataFetchVideoAds?.data}
  urls={urls}
  siteMap={dataFetchRandomSiteMap?.data}
  portraitBanners={dataFetchPortraitBanners?.data}
  allCounts={dataFetchCount?.data}
   />;
}