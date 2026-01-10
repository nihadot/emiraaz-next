import React from 'react';
import InfoCardMobile from './InfoCardMobile';

interface CardData {
  icon: any;
  title: string;
  description: string;
  accentColor: string;
}

interface FinancialInfoCardsSectionProps {
  cards: CardData[];
}

function FinancialInfoCardsSection({ cards }: FinancialInfoCardsSectionProps) {
  return (
    <div>
      <h2 className="text-[22px] px-2 font-bold mb-1 mt-4 text-black">
        Strong Financial Upside
      </h2>

      <p className="text-[14px] text-gray-600 mb-4 leading-relaxed">
        Dubai offers some of the highest rental returns and investor-friendly financial policies.
      </p>

      {cards.map((card, index) => (
        <InfoCardMobile
          key={index}
          icon={card.icon}
          title={card.title}
          description={card.description}
          accentColor={card.accentColor}
        />
      ))}
    </div>
  );
}

export default FinancialInfoCardsSection;
