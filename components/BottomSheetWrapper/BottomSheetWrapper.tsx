'use client';
import { motion } from 'framer-motion';

export default function BottomSheetWrapper({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col">
      {/* overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      {/* sheet */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ duration: 0.25 }}
        className="
          absolute bottom-0 
          w-full 
          bg-white 
          rounded-t-2xl 
          shadow-xl 
          max-h-[85vh] 
          flex 
          flex-col
        "
      >
        {/* drag handle */}
        <div className="w-full flex justify-center pt-3 pb-2">
          <div className="h-1.5 w-16 rounded-full bg-gray-300" />
        </div>

        {/* scrollable content */}
        <div className="overflow-y-auto px-4 pb-6">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
