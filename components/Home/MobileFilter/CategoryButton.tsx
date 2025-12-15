import Image, { StaticImageData } from "next/image";

// CategoryButton.tsx
interface CategoryButtonProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
value: string;
}

export default function CategoryButton({ value,icon, label, active, onClick }: CategoryButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 min-w-[80px]"
      aria-label={label}
    >
      <div className={`w-16 h-16 border border-[#DFDFDF] rounded-full flex items-center justify-center transition-colors ${active ? 'bg-red-50' : 'bg-[#F5F5F5]'}`}>
        {icon}
      </div>
      <span className={`text-xs font-poppins font-normal ${active ? 'text-gray-900' : 'text-gray-600'}`}>{label}</span>
    </button>
  );
}
