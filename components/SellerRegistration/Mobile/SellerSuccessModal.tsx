'use client';

import { Check, X } from 'lucide-react';

export default function SellerSuccessModal({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className="px-5 pt-6 pb-8 text-center relative">
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4"
      >
        <X size={20} />
      </button>

      {/* Icon */}
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500">
        <Check size={22} className="text-white" />
      </div>

      <h3 className="text-[16px] font-semibold">
        Registration Success
      </h3>

      <p className="mt-2 text-[13px] text-[#6B7280]">
        We’ve received your application. Our team will
        contact you for further process shortly.
      </p>

      <button
        onClick={onClose}
        className="mt-4 text-[14px] font-medium"
      >
        Continue →
      </button>
    </div>
  );
}
