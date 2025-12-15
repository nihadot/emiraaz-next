// LoanSummaryUI.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";

export default function LoanSummaryUI({
  monthlyEMI,
  loanPeriod,
  downPayment,
  downPaymentPercent,
  interestRate,
  onEdit,
}: {
  monthlyEMI: number;
  loanPeriod: number;
  downPayment: number;
  downPaymentPercent: number;
  interestRate: number;
  onEdit: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-full border rounded-2xl px-6 py-5 border-[#DFDFDF] bg-white"
    >
      {/* EMI */}
      <div className="text-center mb-6">
        <span className="text-sm font-poppins font-medium mr-2">AED</span>
        <span className="text-5xl font-semibold">
          {monthlyEMI.toLocaleString()}
        </span>
        <span className="text-base text-black font-poppins ml-2">Per Month</span>
      </div>

      {/* Details */}
      <div className="space-y-3 text-lg font-poppins font-normal text-gray-800">
        <p>
          Loan Period : <span className="font-medium">{loanPeriod} Years</span>
        </p>

        <p>
          Down Payment :{" "}
          <span className="font-medium">
            ({downPaymentPercent}%) AED {downPayment.toLocaleString()}
          </span>
        </p>

        <p>
          Interest Rate :{" "}
          <span className="font-medium">{interestRate}%</span>
        </p>
      </div>

      {/* Edit */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        onClick={onEdit}
        className="mt-8 flex text-base items-center font-poppins font-medium justify-center gap-2 text-red-500  w-full"
      >
        <SlidersHorizontal size={20} />
        Edit Values
      </motion.button>
    </motion.div>
  );
}
