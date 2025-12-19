'use client';

import { useEffect } from 'react';

export default function BottomModal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
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

      {/* Modal */}
      <div
        className="
          fixed inset-x-0 bottom-0 z-50
          bg-white rounded-t-[28px]
          animate-slideUp
        "
      >
        {children}
      </div>
    </>
  );
}
