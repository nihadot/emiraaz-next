'use client';

import Image from 'next/image';
import Link from 'next/link';
import { RxArrowTopRight } from 'react-icons/rx';
import ArrowIcon from '../../../public/DevelopersIcons/developerArrowIcon.svg';

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
    <div className="flex items-center justify-between rounded-2xl border border-[#DEDEDE] bg-white px-[15px] py-[22px] font-poppins">
      <div className="flex items-center gap-3">
        {/* Logo box */}
        <div className="w-34 h-22 rounded-xl border-2 border-[#DEDEDE]  bg-[#F5F5F5] flex items-center justify-center">
          {logo && (
            <Image
              src={logo}
              alt={name}
              width={80}
              height={80}
              className="object-contain"
            />
          )}
        </div>
        {/* Developer name */}
        <p className="font-semibold text-black">
          {name}
        </p>
      </div>

      {/* Arrow */}
      <Link href={`/developers/${slug}`}>
        <Image src={ArrowIcon} alt='arrowIcon'/>
      </Link>
    </div>
  );
}
