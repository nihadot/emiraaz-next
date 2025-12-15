// SectionHeader.tsx
"use client";

import { ReactNode } from "react";

interface SectionHeaderProps {
  icon?: ReactNode;
  title: string;
}

export default function SectionHeader({ icon, title }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-2 py-3">
      {icon && (
        <span className="text-black flex items-center">
          {icon}
        </span>
      )}
      <h2 className="text-lg font-poppins font-medium text-black">
        {title}
      </h2>
    </div>
  );
}
