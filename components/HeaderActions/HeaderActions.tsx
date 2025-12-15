// HeaderActions.tsx
"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { GoChevronLeft } from "react-icons/go";

type Action = {
  icon: ReactNode;
  onClick?: () => void;
};

interface HeaderActionsProps {
  onBack?: () => void;
  rightActions?: Action[];
}

export default function HeaderActions({ onBack, rightActions = [] }: HeaderActionsProps) {
  const router = useRouter();

  return (
    <div className="absolute top-4 left-[12px] right-[12px] flex items-center justify-between z-10">
      {/* Back */}
   
     <div className="bg-white w-[38px] h-[38px] flex justify-center items-center rounded-full">
         <GoChevronLeft
        size={24}
        onClick={onBack ?? (() => router.back())}
      />
     </div>

      {/* Right icons */}
      <div className="flex gap-3">
        {rightActions.map((action, i) => (
          <button
            key={i}
            onClick={action.onClick}
            className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow"
          >
            {action.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
