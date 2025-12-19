'use client';

import { FaCheckCircle } from 'react-icons/fa';

const offers = [
  'Competitive commission structure & transparent payouts',
  'High-quality verified leads every week',
  'Strong brand marketing support',
  'Partner network access across prime locations',
  'Technology-driven CRM and sales tools',
  'In-house training and mentorship programs',
];

export default function OfferList() {
  return (
    <section className="mt-6">
      <h2 className="text-[16px] font-semibold mb-3">
        What we Offer
      </h2>

      <div className="offer-gradient-card rounded-2xl bg-white p-4 space-y-4">
        {offers.map((text, i) => (
          <div
            key={i}
            className="flex gap-3 opacity-0 animate-itemFade"
            style={{ animationDelay: `${i * 120}ms` }}
          >
            <FaCheckCircle
              size={18}
              className="text-[#FF1645] shrink-0 mt-[2px]"
            />
            <p className="text-[13px] text-[#6B7280] leading-relaxed">
              {text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
