'use client';

import { Check } from 'lucide-react';

export default function PasswordSuccessModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-3xl px-6 py-6">
        <div className="flex justify-end">
          <button onClick={onClose}>✕</button>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
            <Check className="text-white" />
          </div>

          <h3 className="text-lg font-semibold">Password Updated</h3>

          <button
            onClick={onClose}
            className="text-sm font-medium flex items-center gap-1"
          >
            Log In →
          </button>
        </div>
      </div>
    </div>
  );
}
