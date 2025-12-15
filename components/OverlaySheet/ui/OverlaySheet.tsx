// components/OverlaySheet/OverlaySheet.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface OverlaySheetProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function OverlaySheet({
  open,
  onClose,
  children,
}: OverlaySheetProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop (cross-fade) */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50  bg-transparent"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{
              y: { duration: 0.45, ease: 'easeOut' },
              opacity: { duration: 0.3, ease: 'easeInOut' },
            }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
