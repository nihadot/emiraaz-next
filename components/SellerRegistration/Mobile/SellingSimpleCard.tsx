'use client';

import Image from 'next/image';
import roundTick from '@/app/assets/roundtick.svg';

type Props = {
  title: string;
  points: string[];
};

export default function SellingSimpleCard({ title, points }: Props) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-gray-900">
        {title}
      </h2>

      <div className="rounded-[13px] border border-[#DEDEDE] bg-white p-6">
        <p className="text-sm text-gray-700 leading-relaxed mb-5">
          List once, and our team takes care of marketing,
          buyer reach, and closing support — all in one place.
        </p>

        <ul className="space-y-3">
          {points.map((item, index) => (
            <li key={index} className="flex items-center gap-3">
              <Image 
                src={roundTick} 
                alt="check" 
                width={20} 
                height={20}
                className="shrink-0"
              />
              <span className="text-sm text-[#767676]">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}