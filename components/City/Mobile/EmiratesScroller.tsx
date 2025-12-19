'use client';

import Image from 'next/image';

type EmirateItem = {
  _id: string;
  name: string;
  image?: {
    webp?: {
      url?: string;
    };
  };
};

type EmiratesScrollerProps = {
  emirates: EmirateItem[];
  active: string;
  onSelect: (name: string) => void;
};

export default function EmiratesScroller({
  emirates,
  active,
  onSelect,
}: EmiratesScrollerProps) {
  return (
    <div className="mb-5">
      <h3 className="text-[18px] font-semibold mb-3">Emirates</h3>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {emirates.map((item) => (
          <button
            key={item._id}
            onClick={() => onSelect(item.name)}
            className="flex flex-col items-center min-w-[84px]"
          >
            <div
              className={`w-[72px] h-[72px] rounded-full overflow-hidden flex items-center justify-center border-2 transition ${
                active === item.name
                  ? 'border-[#2F80ED]'
                  : 'border-[#E5E7EB]'
              }`}
            >
              <Image
                src={item?.image?.webp?.url || '/placeholder.jpg'}
                alt={item.name}
                width={72}
                height={72}
                className="object-cover"
              />
            </div>

            <p className="text-[13px] text-[#6B7280] mt-2 text-center leading-tight">
              {item.name}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
