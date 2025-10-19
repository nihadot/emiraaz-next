import { baseUrl } from '@/api';
import SiteMap from '@/components/SiteMap/SiteMap';

interface PageParams {
  category: string;
  emirate: string;
}

interface Props {
  params: Promise<PageParams>; // Changed: params is now a Promise
}

const Page = async ({ params }: Props) => {
  const { category, emirate } = await params;

          const preferredOrder = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ras Al Khaimah', 'Ajman', 'Umm Al-Quwain'];

   // SSR fetch based on route params
    const res = await fetch(`${baseUrl}/emirate`);
    const responseData = await res.json();
    const mappedOptions = responseData?.data?.map((item: any) => ({
        value: item._id,
        label: item.name,
        slug: item.slug,
    }));

    const data = mappedOptions.sort((a: { label: string; }, b: { label: string; }) => {
            const aIndex = preferredOrder.indexOf(a.label);
            const bIndex = preferredOrder.indexOf(b.label);

            // If both labels are in the preferredOrder list
            if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;

            // If only one is in the list, put it before the other
            if (aIndex !== -1) return -1;
            if (bIndex !== -1) return 1;

            // If neither is in the list, sort alphabetically (optional)
            return a.label.localeCompare(b.label);
        });

        
  return <SiteMap data={data} category={category} emirate={emirate} />;
}


export default Page