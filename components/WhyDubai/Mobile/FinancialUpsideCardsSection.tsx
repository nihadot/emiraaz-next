import React from 'react';
import Image from 'next/image';

interface FinancialCard {
  icon: any;
  title: string;
  description: string;
}

interface FinancialUpsideCardsSectionProps {
  cards: FinancialCard[];
}

function FinancialUpsideCardsSection({ cards }: FinancialUpsideCardsSectionProps) {
  return (
    <div className="px-2 mt-6">
      <h2 className="text-[22px] font-bold mb-2 text-black">
        Strong Financial Upside
      </h2>

      <p className="text-md text-gray-600 mb-4 leading-relaxed">
        Dubai offers some of the highest rental returns and investor-friendly
        financial policies.
      </p>

      <div className="flex items-start gap-4 overflow-x-auto scrollbar-hide pb-2">
        {cards.map((card, index) => (
          <div
            key={index}
            className="min-w-[330px] max-h-[200px] bg-white rounded-2xl border border-gray-200 pt-3 px-3 pb-4"
          >
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 flex items-center justify-center">
                <Image
                  src={card.icon}
                  alt={card.title}
                  className="w-[22px] h-[22px]"
                />
              </div>
              <h3 className="text-base font-semibold text-black">
                {card.title}
              </h3>
            </div>

            <div className="h-px bg-gray-200 mb-2" />

            <p className="text-sm text-gray-600 leading-relaxed">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FinancialUpsideCardsSection;
