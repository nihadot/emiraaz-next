import React from 'react';
import Image from 'next/image';

interface HeroSectionProps {
  backgroundImage: any;
  title: string;
  description: string;
}

function HeroSection({ backgroundImage, title, description }: HeroSectionProps) {
  return (
    <div className="relative mx-4 mt-4 h-[200px] overflow-hidden rounded-2xl">
      <Image
        src={backgroundImage}
        alt="Dubai skyline"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      <div className="absolute bottom-5 left-5 right-5 flex gap-4">
        <div className="w-[3px] bg-white/90 rounded-full" />

        <div>
          <h2 className="text-white text-[20px] font-semibold mb-2 leading-tight">
            {title}
          </h2>
          <p className="text-white/90 text-[13px] leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
