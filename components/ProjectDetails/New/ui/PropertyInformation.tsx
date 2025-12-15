'use client';

import Title from "./Title";

type InfoItem = {
  label: string;
  value?: string | number | null;
};

export default function PropertyInformation({
  title = 'Property Information',
  items,
}: {
  title?: string;
  items: InfoItem[];
}) {
  return (
    <section className="bg-[#F5F5F5] p-4 rounded-2xl">
        <div className="pb-3">
              <Title
            title='Property Information'
            />
        </div>

      <div className="grid grid-cols-2 gap-y-4 gap-x-6">
        {items.map((item, index) => (
          <div key={index} className="contents">
            {/* Label */}
            <span className="text-sm font-poppins text-[#333333] font-normal">
              {item.label}
            </span>

            {/* Value */}
            <span className="text-sm font-poppins text-black  font-medium">
              {item.value ?? 'NOT PROVIDED'}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
