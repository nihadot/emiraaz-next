import React from "react";
import { clsx } from "clsx";

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  loading?: boolean; // 🔥 NEW optional prop
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  onClick,
  type = "button",
  className,
  disabled = false,
  loading, // 👈 only when passed
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={clsx(
        "px-4 py-2 rounded border border-[#DEDEDE] text-black font-medium text-sm  transition-all duration-200 disabled:bg-gray-500 flex items-center justify-center gap-2",
        className
      )}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      )}
      { !loading && children}
    </button>
  );
};

export default PrimaryButton;
