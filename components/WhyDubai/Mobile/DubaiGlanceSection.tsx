import React from 'react';
import Image from 'next/image';

interface GlanceCard {
  icon: any;
  value: string;
  label: string;
  description: string;
}

interface DubaiGlanceSectionProps {
  cards: GlanceCard[];
}

function DubaiGlanceSection({ cards }: DubaiGlanceSectionProps) {
  return (
    <div className="px-4 py-6">
      <h2 className="text-lg font-bold mb-4 text-black">
        Dubai at a Glance
      </h2>

      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
        {cards.map((card, index) => (
          <div key={index} className="min-w-[260px] bg-[#F5F5F5] rounded-2xl p-5">
            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4">
              <Image
                src={card.icon}
                alt={card.label}
                className="w-8 h-8"
              />
            </div>

            <div className="text-xl font-bold text-black mb-1">
              {card.value}
            </div>
            <div className="text-sm font-semibold text-black mb-1">
              {card.label}
            </div>
            <div className="text-sm text-gray-600 leading-relaxed">
              {card.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DubaiGlanceSection;
