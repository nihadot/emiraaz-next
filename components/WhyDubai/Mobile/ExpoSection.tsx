import React from 'react';
import Image from 'next/image';

interface ExpoPill {
  label: string;
}

interface ExpoSectionProps {
  backgroundImage: any;
  title: string;
  description: string;
  pills: ExpoPill[];
}

function ExpoSection({
  backgroundImage,
  title,
  description,
  pills,
}: ExpoSectionProps) {
  return (
    <div className="px-2 mb-6">
      <h3 className="text-lg font-bold text-black mb-2">
        {title}
      </h3>

      <p className="text-sm text-gray-600 leading-relaxed mb-4">
        {description}
      </p>

      <div className="overflow-hidden rounded-2xl mb-4">
        <Image
          src={backgroundImage}
          alt="Expo 2020"
          className="w-full h-[220px] object-cover"
          priority
        />
      </div>

      <div className="overflow-x-auto scrollbar-hide mb-10">
        <div className="flex gap-3 w-max px-[2px]">
          {pills.map((pill, index) => (
            <span
              key={index}
              className="whitespace-nowrap px-4 py-2 rounded-[9px] border border-[#DEDEDE] text-sm text-[#767676]"
            >
              {pill.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExpoSection;
