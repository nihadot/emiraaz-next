"use client";

import { aedBlackIcon, aedIcon } from "@/app/assets";
import Image from "next/image";

export default function PriceEnquireBar({
    price,
    onEnquire,
}: {
    price?: string;
    onEnquire?: () => void;
}) {


      function formatPrice(price: number | string): string {
  if (typeof price === "string") {
    const p = price.trim();
    if (/[a-zA-Z]/.test(p)) return p; // 10M, 5L, etc.
    const num = Number(p.replace(/,/g, ""));
    if (!isNaN(num)) return new Intl.NumberFormat("en-AE").format(num);
    return p;
  }
  return new Intl.NumberFormat("en-AE").format(price);
}


  const formattedPrice = formatPrice(price ?? 0);



    return (
        <div className="w-full">
            <div
                className="
                border border-[#DFDFDF]
          flex items-center justify-between
          bg-white
          rounded-xl
          px-[12px] py-2
          shadow
        "
            >
                {/* Price */}
                <div className="flex items-baseline gap-1">
                    {/* <span className="text-xl font-semibold">₫</span> */}
                <div className="relative w-[18px] h-[15px]">

                    <Image
                        src={aedBlackIcon}
                        alt="aed"
                      fill
                        className="object-cover"
                        />
                        </div>

                    <span className="text-xl block font-bold">{formattedPrice}</span>
                    <span className="text-[10px] block text-black line-clamp-1 font-poppins font-normal">Onwards</span>
                </div>

                {/* Button */}
                <button
                    onClick={onEnquire}
                    className="
            bg-black text-white
            px-5 py-[18px]
            text-left
            rounded-lg
            text-xs font-medium
            active:scale-95
            transition
            font-poppins
          "
                >
                    Enquire Now
                </button>
            </div>
        </div>
    );
}
