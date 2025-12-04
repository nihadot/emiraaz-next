'use client';
import React from 'react';
import PaginationNew from '../PaginationNew/PaginationNew';
import Container from '../atom/Container/Container';
import PropertyTypeSection from './PropertyTypeSection';
import EmiratesCard from './EmiratesCard';
import { useDeviceType } from '@/utils/useDeviceType';
import Link from 'next/link';

type Props = {
  category: string;
  emirate: string;
  data: { value: string; label: string; slug: string }[];
  initialData: any[];
  initialPage: number;
  pagination:any
};

export default function SiteMap({ pagination,category, emirate, data, initialData, initialPage }: Props) {
  const [filters, setFilters] = React.useState({ page: initialPage });
  const deviceType = useDeviceType();

  // no client fetch — everything from props
  const dataProducts:any = initialData;
  const totalPages = pagination?.totalPages;
const groups: Record<string, Set<string>> = {
  apartments: new Set(),
  villas: new Set(),
  townhouses: new Set(),
  penthouses: new Set(),
  warehouses: new Set(),
  shops: new Set(),
  officespaces: new Set(),
  others: new Set(), // fallback for URLs without a known type
};

  console.log(dataProducts,'dataProducts')

 // Populate groups with unique developer URLs
dataProducts.forEach((item: any) => {
  const matchedType = Object.keys(groups).find(k => item.url.toLowerCase().includes(k));
  if (matchedType) {
    groups[matchedType].add(item.url);
  } else {
    groups['others'].add(item.url); // fallback if no known type
  }
});

  return (
    <Container className="flex flex-col gap-[6px] md:gap-[16px] pb-10">
      <PropertyTypeSection
        selectedCategory={category}
        selectedEmirate={emirate}
        handleCategoryChange={() => {}}
      />
      <EmiratesCard
        selectedCategory={category}
        selectedEmirate={emirate}
        handleEmirateChange={() => {}}
        data={data}
      />


     {Object.entries(groups).map(([type, urls]) =>
  urls.size ? (
    <div key={type} className='mb-10'>
      <h2 className="font-medium pb-3 font-poppins text-lg capitalize">{type}</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
        {Array.from(urls).map(url => {
          const formatted = url.split('/').filter(Boolean).pop()?.replace(/-/g, ' ');
          return (
            <Link key={url} href={`/for-sale/${url}`} className="text-sm truncate whitespace-nowrap text-ellipsis font-poppins">
              {formatted}
            </Link>
          );
        })}
      </div>
    </div>
  ) : null
)}


      <div className="mt-[23.25px]">
        <PaginationNew
          currentPage={filters.page}
          totalPages={totalPages}
          onPageChange={newPage => {
            const url = new URL(window.location.href);
            url.searchParams.set('page', newPage.toString());
            window.location.href = url.toString(); // reload page for SSR
          }}
          maxVisiblePages={deviceType === 'mobile' ? 4 : 8}
        />
      </div>
    </Container>
  );
}
