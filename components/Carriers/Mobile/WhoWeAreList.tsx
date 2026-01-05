"use client";

import HandShake from "../../../public/careerPage/mobile/shakeHandIcon.svg";
import Communication from "../../../public/careerPage/mobile/messageIcon.svg";
import LocationIcon from "../../../public/careerPage/mobile/locationIcon.svg";
import BoardIcon from "../../../public/careerPage/mobile/BoardIcon.svg";
import LanguageIcon from "../../../public/careerPage/mobile/LanguageIcon.svg";
import Image from "next/image";

const points = [
  {
    text: "Passion for real estate and helping clients",
    icon: HandShake,
  },
  {
    text: "Excellent communication and negotiation skills",
    icon: Communication,
  },
  {
    text: "Knowledge of local property markets",
    icon: LocationIcon,
  },
  {
    text: "Ability to work independently and meet targets",
    icon: BoardIcon,
  },
  {
    text: "Fluent in English (Arabic or Hindi is a plus)",
    icon: LanguageIcon,
  },
];

export default function WhoWeAreList() {
  return (
    <section className="mt-6">
      <h2 className="text-[16px] font-semibold mb-2">Who we are looking for</h2>

      <p className="text-[13px] text-[##333333] mb-4">
        We’re seeking people who bring energy, creativity, and commitment to
        every deal.
      </p>

      <div className="space-y-3">
        {points.map(({ text, icon }, i) => (
          <div
            key={i}
            className="
              flex items-center gap-3
              rounded-xl bg-[#F5F5F5]
              px-4 py-3
            "
          >
            {/* Icon */}
            <div className="w-6 h-6 flex items-center justify-center text-black">
              {/* <Icon size={20} strokeWidth={1.5} /> */}
              <Image src={icon} alt="iconImages" className="w-[25px] h-[25]" />
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
