import { baseUrl } from "@/api";
import BuyPage from "@/components/BuyPage/BuyPage";
import { propertyCategoryStatus, propertyCategoryType, propertyCategoryTypes } from "@/data";
import { getPortraitBanners } from "@/utils/getPortraitBanners";
import { getSiteMapData } from "@/utils/getSiteMapData";


export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ urls: string[] }>;
  searchParams: Promise<{ cities?: string | string[], page?: number ,pt?:string,ct?:string,y:number | '',q?:string,pp?:string,ds?:string,ft?:string}>;

}) {
  const { cities,page,pt,ct,y,q,ds,ft,pp } = await searchParams;
  const { urls } = await params;

  const isPropertyCategoryType = urls.find((seg) =>
    propertyCategoryType.some((item: any) => item.value === seg)
  );

  const isPropertyCategoryStatus = urls.find((seg) =>
    propertyCategoryStatus.some((item: any) => item.value === seg)
  );

  // ✅ Fetch emirates data
  const res = await fetch(`${baseUrl}/emirate/names`, { cache: "no-store" });
  const emirateData = await res.json();

  // console.log(cities,'citiescities')
  const isEmirate = emirateData?.data?.find((item: {
    _id: string;
    name: string;
    count: number;
    slug: string;
  }) => urls?.includes(item.slug)) || ''

  // ✅ Fetch counts data
  const resFetchCount = await fetch(`${baseUrl}/news/all/counts`, { cache: "no-store" });
  const dataFetchCount = await resFetchCount.json();

  // ✅ Fetch counts data
  const resFetchCities = await fetch(`${baseUrl}/city/names`, { cache: "no-store" });
  const dataFetchCities = await resFetchCities.json();

  const query = new URLSearchParams();

  const initialValues ={ 
    emirate: isEmirate?.slug,
    cities: Array.isArray(cities)
    ? cities
    : cities
    ? [cities]
    : [],
      propertyCategoryType: isPropertyCategoryType || 'off-plan-projects', // default string
  propertyCategoryStatus: isPropertyCategoryStatus || 'all',
    propertyType: pt,
    completionType : ct,
    qtr:q,
    year:y,
    discount:ds,
    furnishied:ft,
    paymentPlan:pp,
  }
 
  if (isEmirate?.slug) query.append("emirate", isEmirate?.slug);
  if (cities && cities?.length) query.append("cities", Array.isArray(cities) ? cities.join(',') : cities);
  if(isPropertyCategoryStatus) query.append("propertyCategoryStatus", isPropertyCategoryStatus);
  if(isPropertyCategoryType) query.append("propertyCategoryType", isPropertyCategoryType);
  if(pt) query.append("propertyType", pt);
  if(ct) query.append("completionType", ct);
  if(y) query.append('year',y.toString())
  if(q) query.append('qtr',q)
  if(ds) query.append('discount',ds)
  if(ft) query.append('furnishied',ft)
  if(pp) query.append("paymentPlan",pp)
  
  query.append("page", page ? page+'' : '1');
  query.append("limit",'24');
 
  // ✅ Fetch emirates data
  const buyProjects = await fetch(`${baseUrl}/projects?${query.toString()}`, { cache: "no-store" });

  const buyProjectsResponse = await buyProjects.json();

  // ✅ Fetch counts data
  const resFetchVideoAds = await fetch(`${baseUrl}/projects/small-video-ads`, { cache: "no-store" });
  const dataFetchVideoAds = await resFetchVideoAds.json();

  const resFetchProjects = await fetch(`${baseUrl}/projects?${query.toString()}`, { cache: "no-store" });
  const dataFetchProjects = await resFetchProjects.json();

  // ✅ Fetch counts data
   const dataFetchRandomSiteMap = await getSiteMapData(); // fetches only once, then cached

  //  console.log(dataFetchRandomSiteMap,'dataFetchRandomSiteMap')
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

  console.log(urls,'urls')

    const isExistPropertyCategoryType = urls.find((seg) =>
          propertyCategoryTypes.some((item: any) => item.value === seg)
      );

      // console.log(isE / . xistPropertyCategoryType,'isExistPropertyCategoryType')
      // const isShowEmptyPages = propertyCategoryTypes.filter((i) => i.value !== 'off-plan-projects').some((item: any) => item.value === isExistPropertyCategoryType)
  // console.log(isShowEmptyPages,'isShowEmptyPages')

  return <BuyPage
  // isShowEmptyPages={isShowEmptyPages}
    isOffplanValue={urls?.includes('off-plan-projects')}
    content={responseData?.data[0]?.content}
    initialData={buyProjectsResponse}
    initialCities={dataFetchCities?.data}
    emiratesData={emirateData?.data}
    existingFilter={
      {
        emirate: isEmirate,
        cities,
      }
    }
    initialValues={initialValues}
    videoAds={dataFetchVideoAds?.data}
    urls={urls}
    siteMap={dataFetchRandomSiteMap?.data}
    portraitBanners={dataFetchPortraitBanners?.data}
    allCounts={dataFetchCount?.data}
  />;
}