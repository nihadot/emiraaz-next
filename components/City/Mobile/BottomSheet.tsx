'use client';

import { X } from 'lucide-react';
import { useEffect } from 'react';

export default function BottomSheet({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  // Lock background scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40"
        onClick={onClose}
      />

      {/* Sheet wrapper with GAP */}
      <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none">
        <div
          className="
            pointer-events-auto
            w-full
            mx-3 mb-4
            bg-white
            rounded-[28px]
            shadow-xl
            max-h-[85vh]
            flex flex-col
            animate-slideUp
          "
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4">
            <h3 className="text-[22px] font-semibold">{title}</h3>
            <button onClick={onClose}>
              <X size={22} />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 pb-6 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
