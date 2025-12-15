"use client";

import { motion } from "framer-motion";
import { ActionItem } from "../logic/useActionBar";

interface Props {
  actions: ActionItem[];
  onAction: (id: string) => void;
}

export default function ActionBarUI({ actions, onAction }: Props) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="
        w-full flex gap-2 p-3
        bg-white rounded-t-2xl
        border border-gray-200
      "
    >
      {actions.map(action => (
        <motion.button
          key={action.id}
          whileTap={{ scale: 0.95 }}
          onClick={() => onAction(action.id)}
          className="
           flex-1 flex items-center justify-center gap-1
            border border-[#DFDFDF]
            rounded-xl py-1
            text-xs font-normal
            font-poppins px-2
          "
        >
          <span
          className=""
          >{action.icon}</span>
          {action.label}
        </motion.button>
      ))}
    </motion.div>
  );
}
