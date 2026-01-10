import React from 'react';
import Image from 'next/image';

interface LivingCard {
  image: any;
  title: string;
  description: string;
}

interface WorldClassLivingSectionProps {
  cards: LivingCard[];
}

function WorldClassLivingSection({ cards }: WorldClassLivingSectionProps) {
  return (
    <div className="px-2 mt-6">
      <h2 className="text-xl font-bold mb-2 text-black">
        World-Class Living Experience
      </h2>

      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
        Dubai combines luxury living with advanced infrastructure and futuristic planning.
      </p>

      <div className="flex items-start gap-4 overflow-x-auto scrollbar-hide pb-2">
        {cards.map((card, index) => (
          <div key={index} className="min-w-[300px] bg-white rounded-2xl border border-gray-200 p-3">
            <div className="overflow-hidden rounded-xl mb-2">
              <Image
                src={card.image}
                alt={card.title}
                className="w-full h-[180px] object-cover"
                priority={index === 0}
              />
            </div>

            <h3 className="text-base font-semibold mb-1 text-black">
              {card.title}
            </h3>

            <p className="text-[13px] text-gray-600 leading-snug">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorldClassLivingSection;
