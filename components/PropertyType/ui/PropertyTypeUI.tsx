"use client";

import { motion } from "framer-motion";

export default function PropertyTypeUI({ types, selected, selectType }: any) {
  
  console.log(selected,'selected')
  return (
    <motion.div
      className="flex gap-[16px] w-full overflow-x-auto no-scrollbar py-2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {types.map((item: any, index: number) => (
        <motion.button
          key={item.value}
          onClick={() => selectType(item)}

          // smooth interaction
          whileTap={{ scale: 0.88 }}
          whileHover={{ scale: 1.05 }}

          // FIX: animate when entering viewport
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{
            duration: 0.25,
            // delay: index * 0.05,
            ease: "easeOut",
          }}

          // FIX: guarantee scroll smoothness
          className="flex flex-col items-center  gap-3 shrink-0"
        >
          <div
            className={`
              w-[64px] h-[64px] rounded-full flex items-center border border-[#DEDEDE] justify-center 
              ${selected?.value === item.value ? "bg-black/10 " : "bg-[#F5F5F5]"}
            `}
          >
           <div className="">
             {item.icon}
           </div>
          </div>

          <span
            className={`text-xs font-poppins ${
              selected?.value === item.value ? "font-medium" : "font-normal"
            }`}
          >
            {item.label}
          </span>
        </motion.button>
      ))}
    </motion.div>
  );
}
