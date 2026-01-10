import React from 'react';
import Image from 'next/image';

interface UpcomingProjectsSectionProps {
  backgroundImage: any;
  title: string;
  description: string;
}

function UpcomingProjectsSection({
  backgroundImage,
  title,
  description,
}: UpcomingProjectsSectionProps) {
  return (
    <div className="px-2 mb-6 mt-4">
      <div className="relative overflow-hidden rounded-2xl h-[360px]">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute bottom-5 left-5 right-5">
          <h3 className="text-white text-lg font-semibold mb-2">
            {title}
          </h3>
          <p className="text-white/90 text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UpcomingProjectsSection;
