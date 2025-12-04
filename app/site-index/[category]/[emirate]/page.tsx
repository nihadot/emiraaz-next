// app/site-index/[category]/[emirate]/page.tsx

import { baseUrl } from '@/api';
import SiteMap from '@/components/SiteMap/SiteMap';

interface PageParams {
  category: string;
  emirate: string;
}

export const dynamic = 'force-dynamic'; // ensure SSR fetch


interface Props {
  params: Promise<{
    category: string;
    emirate: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

const Page = async (props: Props) => {
  
    const [params, searchParams] = await Promise.all([
    props.params,
    props.searchParams
  ]);

  const { category, emirate } = params;
  const page = parseInt(searchParams.page || '1', 10);



  const limit = 200;

  const preferredOrder = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ras Al Khaimah', 'Ajman', 'Umm Al-Quwain'];

  // Fetch emirates (SSR)
  const emirateRes = await fetch(`${baseUrl}/emirate`, { cache: 'no-store' });
  const emirateData = await emirateRes.json();

  const emirateDataResponse = emirateData?.data
    ?.map((item: any) => ({
      value: item._id,
      label: item.name,
      slug: item.slug,
    }))
    .sort((a: { label: string }, b: { label: string }) => {
      const aIndex = preferredOrder.indexOf(a.label);
      const bIndex = preferredOrder.indexOf(b.label);
      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      return a.label.localeCompare(b.label);
    });

  // Fetch sitemap data (SSR)
  const siteMapRes = await fetch(
    `${baseUrl}/site-index/${category}/${emirate}?limit=${limit}&page=${page}`,
    { cache: 'no-store' }
  );
  const siteMapData = await siteMapRes.json();
  // console.log(siteMapData,'siteMapData')

  return (
    <SiteMap
      data={emirateDataResponse}
      category={category}
      emirate={emirate}
      initialData={siteMapData?.data || []}
      initialPage={page}
      pagination={siteMapData?.pagination}
    />
  );
};

export default Page;
