import React from 'react'
import { motion } from "framer-motion";

type Props = {
    questions: any[];
    currentIndex: number;
}

const Progress = ({ questions, currentIndex }: Props) => {
    const getProgressBarGradient = (index: number) => {
        const gradients = [
            'rgba(255, 22, 69, 1)',
            'rgba(255, 22, 69, 1)',
            'rgba(255, 22, 69, 1)',
            'rgba(255, 22, 69, 1)',
            'rgba(255, 22, 69, 1)',
            'rgba(255, 22, 69, 1)',
        ];
        return gradients[index % gradients.length];
    };

    return (
    <div className="mb-3 w-full px-4 flex gap-1">
  {[...questions, "contact"].map((_, index) => (
    <div
      key={index}
      className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden"
    >
      <motion.div
        className="h-full opacity-85 rounded-full"
        style={{
          background:
            index <= currentIndex
              ? getProgressBarGradient(index)
              : "transparent",
        }}
        initial={{ width: 0 }}
        animate={{
          width:
            index < currentIndex
              ? "100%"
              : index === currentIndex
              ? "100%"
              : "0%",
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  ))}
</div>

    )
}

export default Progress;
