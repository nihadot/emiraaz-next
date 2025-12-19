'use client';

import {
  Handshake,
  MessageSquare,
  MapPin,
  Target,
  Languages,
} from 'lucide-react';

const points = [
  {
    text: 'Passion for real estate and helping clients',
    icon: Handshake,
  },
  {
    text: 'Excellent communication and negotiation skills',
    icon: MessageSquare,
  },
  {
    text: 'Knowledge of local property markets',
    icon: MapPin,
  },
  {
    text: 'Ability to work independently and meet targets',
    icon: Target,
  },
  {
    text: 'Fluent in English (Arabic or Hindi is a plus)',
    icon: Languages,
  },
];

export default function WhoWeAreList() {
  return (
    <section className="mt-6">
      <h2 className="text-[16px] font-semibold mb-2">
        Who we are looking for
      </h2>

      <p className="text-[13px] text-[#6B7280] mb-4">
        We’re seeking people who bring energy, creativity, and commitment to every deal.
      </p>

      <div className="space-y-3">
        {points.map(({ text, icon: Icon }, i) => (
          <div
            key={i}
            className="
              flex items-center gap-3
              rounded-xl bg-[#F7F7F7]
              px-4 py-3
            "
          >
            {/* Icon */}
            <div className="w-6 h-6 flex items-center justify-center text-black">
              <Icon size={20} strokeWidth={1.5} />
            </div>

            {/* Text */}
            <span className="text-[14px] text-[#374151] leading-snug">
              {text}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
