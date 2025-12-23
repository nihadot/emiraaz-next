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
      <h2 className="text-lg font-bold text-gray-900">
        {title}
      </h2>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
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
                className="flex-shrink-0"
              />
              <span className="text-sm text-gray-700">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}