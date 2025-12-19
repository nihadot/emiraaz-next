'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useFetchAllEmirateNamesQuery } from '@/redux/emirates/emiratesApi';
import BottomSheet from './BottomSheet';
import Image from 'next/image';

// 🔹 Figma icons
import apartmentIcon from '@/app/assets/apartment.svg';
import penthouseIcon from '@/app/assets/penthouse.svg';
import townhouseIcon from '@/app/assets/townhouse2.svg';
import villaIcon from '@/app/assets/villa.svg';

export type CityMobileFilters = {
  page: number;
  search: string;
  emirate: string;
  propertyType?: string;
  propertyCategory?: string;
  status?: string;
};

export default function CityFilters({
  filters,
  setFilters,
}: {
  filters: CityMobileFilters;
  setFilters: React.Dispatch<React.SetStateAction<CityMobileFilters>>;
}) {
  const [open, setOpen] = useState<'emirate' | 'type' | 'status' | null>(null);

  const { data: emiratesData } = useFetchAllEmirateNamesQuery();
  const emirates = emiratesData?.data?.map((e) => e.name) || [];

  const buttonClass =
    'flex items-center justify-between h-[44px] px-4 rounded-xl border border-[#E5E7EB] bg-white text-sm font-medium text-[#6B7280] w-full';

  return (
    <div className="mb-4">
      <div className="flex gap-3">
        {/* Emirates */}
        <div className="relative flex-1">
          <button
            className={buttonClass}
            onClick={() => setOpen(open === 'emirate' ? null : 'emirate')}
          >
            {filters.emirate || 'Emirates'}
            <ChevronDown size={16} />
          </button>

          {open === 'emirate' && (
            <div className="absolute z-30 mt-2 w-full rounded-xl border bg-white shadow-lg">
              {emirates.map((item) => (
                <button
                  key={item}
                  className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50"
                  onClick={() =>
                    setFilters((p) => ({ ...p, emirate: item, page: 1 }))
                  }
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Type */}
        <button className={buttonClass} onClick={() => setOpen('type')}>
          Type
          <ChevronDown size={16} />
        </button>

        {/* Status */}
        <button className={buttonClass} onClick={() => setOpen('status')}>
          Status
          <ChevronDown size={16} />
        </button>
      </div>

    {/* ================= TYPE SHEET ================= */}
<BottomSheet
  open={open === 'type'}
  title="Type"
  onClose={() => setOpen(null)}
>
  {/* Property Type */}
  <p className="text-[16px] font-semibold mb-4">
    Property Type
  </p>

  <div className="grid grid-cols-4 gap-6 mb-6">
    {[
      { label: 'Apartment', icon: apartmentIcon },
      { label: 'Penthouse', icon: penthouseIcon },
      { label: 'Townhouse', icon: townhouseIcon },
      { label: 'Villa', icon: villaIcon },
    ].map(({ label, icon }) => (
      <button
        key={label}
        onClick={() =>
          setFilters((p) => ({ ...p, propertyType: label }))
        }
        className="flex flex-col items-center gap-3"
      >
        <div className="w-[72px] h-[72px] rounded-full border border-[#E5E7EB] bg-[#F9F9F9] flex items-center justify-center">
          <Image src={icon} alt={label} width={28} height={28} />
        </div>
        <span className="text-[14px] text-[#3A3A3A]">
          {label}
        </span>
      </button>
    ))}
  </div>

  {/* Divider */}
  <div className="h-[1px] bg-[#E5E7EB] my-5" />

  {/* Property Category */}
  <p className="text-[16px] font-semibold mb-3">
    Property Category
  </p>

  <div className="flex p-1 border border-[#E5E7EB] rounded-2xl mb-5">
    {['Residential', 'Commercial'].map((item) => {
      const active = filters.propertyCategory === item;
      return (
        <button
          key={item}
          onClick={() =>
            setFilters((p) => ({ ...p, propertyCategory: item }))
          }
          className={`flex-1 h-[48px] rounded-xl text-[15px] transition ${
            active
              ? 'bg-[#F5F5F5] font-medium'
              : 'text-[#6B7280]'
          }`}
        >
          {item}
        </button>
      );
    })}
  </div>

  {/* 🔥 Project Type — SLIDING ROW (FIGMA MATCH) */}
  <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
    {['Offplan Projects', 'Offplan Resale', 'Secondary'].map(
      (item) => (
        <button
          key={item}
          className="shrink-0 h-[40px] px-5 rounded-full border border-[#E5E7EB] text-[14px] text-[#3A3A3A] bg-white"
        >
          {item}
        </button>
      )
    )}
  </div>
</BottomSheet>


   {/* ================= STATUS SHEET ================= */}
<BottomSheet
  open={open === 'status'}
  title="Status"
  onClose={() => setOpen(null)}
>
  <div className="border border-[#E5E7EB] rounded-2xl p-1">
    <div className="flex gap-1">
      {['Residential', 'Commercial'].map((item) => {
        const active = filters.status === item;

        return (
          <button
            key={item}
            onClick={() =>
              setFilters((p) => ({
                ...p,
                status: item,
                page: 1,
              }))
            }
            className={`
              flex-1 h-[44px] rounded-xl text-[15px]
              transition
              ${
                active
                  ? 'bg-[#F5F5F5] border border-[#E5E7EB] font-medium'
                  : 'text-[#6B7280]'
              }
            `}
          >
            {item}
          </button>
        );
      })}
    </div>
  </div>
</BottomSheet>

    </div>
  );
}
