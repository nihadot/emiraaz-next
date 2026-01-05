"use client";

import { useEffect, useState } from "react";

export default function BottomModal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    if (open) {
      setVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      // wait for animation before unmount
      setTimeout(() => setVisible(false), 300);
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`
          fixed inset-x-0 bottom-0 z-50
          bg-white rounded-t-[28px]
          transition-transform duration-300 ease-out
          ${open ? "animate-slideUp" : "translate-y-full"}
        `}
      >
        {children}
      </div>
    </>
  );
}
