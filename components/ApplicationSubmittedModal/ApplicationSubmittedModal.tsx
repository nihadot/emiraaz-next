// components/ApplicationSubmittedModal.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { HiArrowLongRight } from "react-icons/hi2";
import { TfiClose } from "react-icons/tfi";

interface Props {
  open: boolean;
  onClose: () => void;
  onContinue?: () => void;
  title?:string,
  subtitle?:string
}

export default function ApplicationSubmittedModal({
  open,
  onClose,
  onContinue,
  title = 'Application Submitted',
  subtitle = ` We’ve received your application. Our team will contact you shortly.`
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed h-fit mt-auto inset-0 z-50 flex items-end justify-end mb-4 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }} // ✅ cross-fade
          >
            <div 
                onClick={(e) => e.stopPropagation()}
            
            className="relative w-full max-w-md bg-white rounded-2xl px-6 py-6 text-center">
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-black"
              >
                <TfiClose size={20} color="black" />
              </button>

              {/* Icon */}
              <div className="flex justify-center mb-5">
                <div className="w-14 h-14 rounded-full bg-green-600 flex items-center justify-center">
                  <svg
                    width="26"
                    height="20"
                    viewBox="0 0 26 20"
                    fill="none"
                  >
                    <path
                      d="M2 10L9.5 17.5L24 2"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-xl text-black font-poppins font-semibold mb-2">
                {title}
              </h2>

              {/* Description */}
              <p className="text-black font-poppins font-normal leading-[26px] text-sm mb-6">
               {subtitle}
              </p>

              {/* Action */}
              <button
                onClick={onContinue}
                className="text-base text-black font-medium font-poppins flex items-center justify-center gap-2 mx-auto"
              >
                Continue 
                <div className="">
                    <HiArrowLongRight size={22} />
                </div>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
