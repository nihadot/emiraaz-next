"use client";

import { Check, X } from "lucide-react";
import { TfiClose } from "react-icons/tfi";

export default function ApplicationSuccess({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className="p-6 text-center">
      <div className=" flex justify-end relative bottom-3 left-3">
        <button onClick={onClose}>
          <TfiClose size={20} className="hover:scale-125"/>
        </button>
      </div>
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#00902E]">
        <Check className="text-white" size={22} />
      </div>

      <h3 className="text-[16px] font-semibold">Application Submitted</h3>

      <p className="mt-1 text-[13px] text-[#6B7280]">
        We’ve received your application. Our team will contact you shortly.
      </p>

      <button onClick={onClose} className="mt-4 text-[14px] font-medium">
        Continue →
      </button>
    </div>
  );
}
