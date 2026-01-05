"use client";

import "./styles/OfferCard.css";
import Image from "next/image";
import LikeIcon from "../../../public/careerPage/mobile/LikeIcon.svg";

const offers = [
  "Competitive commission structure & transparent payouts",
  "High-quality verified leads every week",
  "Strong brand marketing support",
  "Partner network access across prime locations",
  "Technology-driven CRM and sales tools",
  "In-house training and mentorship programs",
];

export default function OfferList() {
  return (
    <section className="mt-6 px-4">
      {/* Title */}
      <h2 className="text-[16px] font-semibold mb-2 text-gray-900">
        What we Offer
      </h2>

      {/* Card */}
      <div className="offer-card relative rounded-2xl bg-white px-4 py-5">
        {/* Intro text */}
        <p className="text-[13px] text-gray-700 mb-4 leading-relaxed">
          Everything you need to perform at your best and build a strong career
          in real estate
        </p>

        {/* List */}
        <div className="space-y-3">
          {offers.map((text, i) => (
            <div key={i} className="flex items-start gap-3">
              {/* Icon */}
              <div className="h-5 w-5 rounded-full bg-[#FF1645] flex items-center justify-center shrink-0">
                <Image src={LikeIcon} alt="Like" width={12} height={12} />
              </div>

              {/* Text */}
              <p className="text-[13px] text-[#6B7280] leading-[18px] relative top-0.5">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
