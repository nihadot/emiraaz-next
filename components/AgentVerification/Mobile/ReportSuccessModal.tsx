'use client';

import { X } from 'lucide-react';

export default function ReportSuccessModal({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-end justify-center">
      <div className="w-full max-w-sm rounded-t-3xl bg-white px-6 pt-6 pb-8">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-gray-500"
        >
          <X size={18} />
        </button>

        {/* Icon */}
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white text-xl">
          ✓
        </div>

        <h3 className="text-center text-[16px] font-semibold">
          Report Submitted Successfully
        </h3>

        <p className="mt-3 text-center text-[13px] leading-[18px] text-gray-500">
          Thank you for helping us keep the PropertySeller community safe. Our
          team will review your report and take necessary action.
        </p>

        <button
          onClick={onClose}
          className="mt-6 w-full text-center text-[15px] font-medium"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
