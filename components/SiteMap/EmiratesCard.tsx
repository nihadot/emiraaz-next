'use client';
import clsx from 'clsx';
import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

type Props = {
  data: { value: string; label: string; slug: string }[];
  selectedCategory: string;
  handleEmirateChange: (newEmirate: string) => void;
  selectedEmirate: string;
};

export default function EmiratesCard({ data, selectedCategory, selectedEmirate,handleEmirateChange }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const segments = pathname.split("/site-index/")[1]?.split("/") || [];
  const firstSegment = segments[0] || "";
  const secondSegment = segments[1] || "";

  const [active, setActive] = React.useState(selectedEmirate || secondSegment);

  const handleClick = (slug: string) => {
    if (active === slug) return;
    setActive(slug);
    handleEmirateChange(slug);
    router.push(`/site-index/${selectedCategory}/${slug}`);
  };

  // Sync active state if URL changes
  useEffect(() => {
    if (secondSegment && secondSegment !== active) {
      setActive(secondSegment);
    }
  }, [secondSegment]);

  return (
    <div className="flex gap-3 ps-1 no-scrollbar py-1 overflow-auto">
      {data?.map(item => (
        <div
          key={item.slug}
          onClick={() => handleClick(item.slug)}
          className={clsx(
            'flex w-fit flex-col justify-center items-center px-4 py-3 rounded-[5px]',
            {
              'bg-[#FFE8ED] outline-none': active === item.slug,
              'outline outline-[#DEDEDE]': active !== item.slug,
            }
          )}
        >
          <p
            className={clsx('text-xs   font-normal whitespace-nowrap text-ellipsis font-poppins', {
              'text-[#FF1645]': active === item.slug,
              'text-black': active !== item.slug,
            })}
          >
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}
