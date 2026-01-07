'use client';

import { X, Check } from 'lucide-react';

interface BookingSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingSuccessModal({
  isOpen,
  onClose,
}: BookingSuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full bg-white rounded-t-[22px] p-6 animate-slide-up">
        <button onClick={onClose} className="absolute top-4 right-4">
          <X size={22} />
        </button>

        <div className="flex flex-col items-center">
          <div className="w-[72px] h-[72px] rounded-full bg-[#22C55E] flex items-center justify-center mb-4">
            <Check size={36} color="white" />
          </div>

          <h3 className="text-[20px] font-semibold mb-2">
            Booking Confirmed
          </h3>

          <p className="text-[14px] text-[#6B7280] text-center mb-6">
            Your slots has been confirmed and the ticket has been sent to your mail
          </p>

          <button
            onClick={onClose}
            className="w-full h-[48px] bg-black text-white rounded-xl text-[15px]"
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}
