// PropertyTypeSection.tsx
'use client';
import clsx from 'clsx';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function PropertyTypeSection({ selectedCategory, handleCategoryChange }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const segments = pathname.split("/site-index/")[1]?.split("/") || [];
  const firstSegment = segments[0] || "";

  const categories = [
    { value: "commercial-residential", label: "Commercial & Residential" },
    { value: "offplan-residential", label: "Offplan Residential" },
    { value: "offplan-commercial", label: "Offplan Commercial" },
  ];

  // Only use selectedCategory prop OR firstSegment for initial value
  const [active, setActive] = React.useState(selectedCategory || firstSegment);

  const handleClick = (category: string) => {
    if (active === category) return; // prevent unnecessary push
    setActive(category);
    handleCategoryChange(category);
    router.push(`/site-index/${category}/${segments[1] || "s"}`); // preserve current emirate
  };

  // Only update active if pathname changes to a new category
  useEffect(() => {
    if (firstSegment && firstSegment !== active) {
      setActive(firstSegment);
    }
  }, [firstSegment]);

  return (
    <div className="flex gap-5 ps-1  py-1 whitespace-nowrap no-scrollbar text-ellipsis overflow-auto ">
      {categories.map(cat => (
        <div
          key={cat.value}
          onClick={() => handleClick(cat.value)}
          className={clsx('flex flex-col justify-center px-4 items-center w-full p-2 rounded-[5px]', {
            'bg-[#FFE8ED] outline-none': active === cat.value,
            'outline outline-[#DEDEDE]': active !== cat.value,
          })}
        >
          <p className={clsx(' text-sm lg:text-lg  font-medium font-poppins', {
            'text-[#FF1645]': active === cat.value,
            'text-black': active !== cat.value,
          })}>
            {cat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
