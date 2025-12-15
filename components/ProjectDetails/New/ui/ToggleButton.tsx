import { AnimatePresence,motion } from "framer-motion";
import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";

export default function ToggleButton({ title, children }: {
  title: string,
  children?: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-[#E3E5E6] my-2.5 rounded-[5px] border overflow-hidden">
      <button
        className="w-full flex justify-between items-center px-3 py-2 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="font-poppins text-start font-medium capitalize text-xs md:text-sm text-black">
          {title}
        </p>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          <IoChevronDown color="#FF1645" className="w-[16px] h-[16px]" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: 'auto', 
              opacity: 1,
              transition: {
                height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                opacity: { duration: 0.25, ease: 'easeOut' }
              }
            }}
            exit={{ 
              height: 0, 
              opacity: 0,
              transition: {
                height: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
                opacity: { duration: 0.2, ease: 'easeIn' }
              }
            }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}