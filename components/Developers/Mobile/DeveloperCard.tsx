'use client';

import Image from 'next/image';
import Link from 'next/link';
import { RxArrowTopRight } from 'react-icons/rx';

interface DeveloperCardProps {
  name: string;
  logo: string;
  slug: string;
}

export default function DeveloperCard({
  name,
  logo,
  slug,
}: DeveloperCardProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3">
      <div className="flex items-center gap-4">
        {/* Logo box */}
        <div className="w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center">
          {logo && (
            <Image
              src={logo}
              alt={name}
              width={40}
              height={40}
              className="object-contain"
            />
          )}
        </div>

        {/* Developer name */}
        <p className="text-sm font-medium text-black">
          {name}
        </p>
      </div>

      {/* Arrow */}
      <Link href={`/developers/${slug}`}>
        <RxArrowTopRight size={18} className="text-gray-400" />
      </Link>
    </div>
  );
}
