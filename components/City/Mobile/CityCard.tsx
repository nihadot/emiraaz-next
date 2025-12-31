'use client';

import Image from 'next/image';
import Link from 'next/link';
import { citiesBackIcon } from '@/app/assets';
import {
  Building2,
  FileText,
  Home,
  Map
} from 'lucide-react';
import citiesOffplan from '@/app/assets/citiesoffplan.svg';
import citiesResale from '@/app/assets/citiesresale.svg';
import citiesSecondary from '@/app/assets/citiessecondary.svg';
import citiesLand from '@/app/assets/citiesland.svg';
export default function CityCard({
  item,
  variant = 'vertical',
}: {
  item: any;
  variant?: 'vertical' | 'horizontal';
}) {
  const counts = item.projectTypeCounts || {};

  const offplan =
    (counts['Project-residential'] || 0) +
    (counts['Project-commercial'] || 0);

  const resale =
    (counts['Resale-residential'] || 0) +
    (counts['Resale-commercial'] || 0);

  const secondary =
    (counts['Secondary-residential'] || 0) +
    (counts['Secondary-commercial'] || 0);

  const land =
    (counts['Land-residential'] || 0) +
    (counts['Land-commercial'] || 0);

  /* ========================= */
  /* 🔹 NEARBY CITIES (VERTICAL) */
  /* ========================= */
 if (variant === 'vertical') {
  return (
    <Link href={`/cities/${item.slug}`}>
      <div className="w-[300px] rounded-[20px] border border-[#E5E7EB] bg-white overflow-hidden">

        {/* Image */}
        <div className="relative h-[170px] w-full">
          <Image
            src={item.image?.webp?.url}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Emirate pill */}
          <span className="inline-block mb-2 px-3 py-[4px] rounded-md border border-[#E5E7EB] text-[12px] text-[#6B7280]">
            {item.emirate?.name || 'Dubai'}
          </span>

          {/* City name */}
          <p className="text-[16px] font-semibold text-black mb-3">
            {item.name}
          </p>

          {/* Meta list */}
       <div className="space-y-2 text-[14px] text-[#6B7280]">
  <div className="flex items-center gap-2">
    <Image
      src={citiesOffplan}
      alt="Offplan projects"
      width={16}
      height={16}
      className="shrink-0"
    />
    <span>Offplan projects – {offplan}</span>
  </div>

  <div className="flex items-center gap-2">
    <Image
      src={citiesResale}
      alt="Offplan resale"
      width={16}
      height={16}
      className="shrink-0"
    />
    <span>Offplan Resale – {resale}</span>
  </div>

  <div className="flex items-center gap-2">
    <Image
      src={citiesSecondary}
      alt="Secondary"
      width={16}
      height={16}
      className="shrink-0"
    />
    <span>Secondary – {secondary}</span>
  </div>

  <div className="flex items-center gap-2">
    <Image
      src={citiesLand}
      alt="Land"
      width={16}
      height={16}
      className="shrink-0"
    />
    <span>Land – {land}</span>
  </div>
</div>

        </div>
      </div>
    </Link>
  );
}


  /* ========================= */
  /* 🔹 ALL CITIES (HORIZONTAL) */
  /* ========================= */
   return (
    <Link href={`/cities/${item.slug}`}>
      <div className="relative flex gap-4 rounded-[20px] border border-[#ECECEC] bg-white p-2 mb-4">
        {/* Image */}
       <div className="relative w-[100px] aspect-[3/4] rounded-[16px] overflow-hidden shrink-0">
  <Image
    src={item.image?.webp?.url}
    alt={item.name}
    fill
    className="object-cover"
  />
</div>


        {/* Content */}
        <div className="flex-1">
          {/* Emirate pill */}
          <span className="inline-block mb-2 px-2 py-[3px] rounded-md border border-[#E5E7EB] text-[11px] text-[#6B7280]">
            {item.emirate?.name || 'Dubai'}
          </span>

          {/* City name */}
          <p className="text-[16px] mb-2 font-medium leading-tight">
            {item.name}
          </p>

          {/* Meta */}
         <div className="space-y-2 text-[14px] text-[#6B7280]">
  <div className="flex items-center gap-2">
    <Image src={citiesOffplan} alt="Offplan" width={16} height={16} />
    <span>Offplan projects – {offplan}</span>
  </div>

  <div className="flex items-center gap-2">
    <Image src={citiesResale} alt="Resale" width={16} height={16} />
    <span>Offplan Resale – {resale}</span>
  </div>

 <div className="flex items-center gap-2 text-[14px] text-[#6B7280]">
  <div className="flex items-center gap-2">
    <Image
      src={citiesSecondary}
      alt="Secondary"
      width={16}
      height={16}
      className="shrink-0"
    />
    <span>Secondary – {secondary}</span>
  </div>

  <div className="flex items-center gap-2">
    <Image
      src={citiesLand}
      alt="Land"
      width={16}
      height={16}
      className="shrink-0"
    />
    <span>Land – {land}</span>
  </div>
</div>


          </div>
        </div>

        {/* Arrow */}
       
      </div>
    </Link>
  );
}