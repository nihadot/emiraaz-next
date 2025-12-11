import Image, { StaticImageData } from "next/image";

// CategoryButton.tsx
interface CategoryButtonProps {
  src: StaticImageData;           // path to svg file
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export default function CategoryButton({ src, label, active, onClick }: CategoryButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 min-w-[80px]"
      aria-label={label}
    >
      <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${active ? 'bg-red-50' : 'bg-gray-100'}`}>
        <Image src={src} alt={`${label} icon`} className={`w-7 h-7 ${active ? 'filter-none' : 'opacity-80'}`} />
      </div>
      <span className={`text-xs font-medium ${active ? 'text-gray-900' : 'text-gray-600'}`}>{label}</span>
    </button>
  );
}
