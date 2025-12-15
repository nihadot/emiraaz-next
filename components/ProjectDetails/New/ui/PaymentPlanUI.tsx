// PaymentPlanUI.tsx
"use client";

import { motion } from "framer-motion";

export default function PaymentPlanUI({
  downPayment,
  completionPayment,
  startingPrice,
  handover,
}: {
  downPayment: number;
  completionPayment: number;
  startingPrice: number;
  handover: string;
}) {
  return (
    <div className="w-full space-y-0">
      {/* Labels */}
      <div className="flex pb-3 justify-between font-poppins text-sm text-black">
        <span>Down payment</span>
        <span>On Completion</span>
      </div>

      {/* Progress bar */}
      <div className="relative mb-3 h-10 rounded-full bg-[#E6E6E6] overflow-hidden border border-dashed">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${downPayment}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="h-full bg-[#7A7A7A] flex items-center px-4 text-white text-sm font-medium"
        >
          {downPayment}%
        </motion.div>

        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-700">
          {completionPayment}%
        </span>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="border border-[#DFDFDF] rounded-xl py-3 px-[20px]">
          <p className="text-sm text-[#767676] font-poppins font-normal">Starting Price</p>
          <p className="text-xl font-poppins font-semibold mt-1">
            Đ {startingPrice.toLocaleString()}
          </p>
        </div>

        <div className="border border-[#DFDFDF] rounded-xl p-3 px-[20px]">
          <p className="text-sm text-[#767676] font-poppins font-normal">Handover</p>
          <p className="text-xl font-semibold mt-1">{handover}</p>
        </div>
      </div>
    </div>
  );
}
