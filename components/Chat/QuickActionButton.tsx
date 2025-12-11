import clsx from "clsx";

interface QuickActionButtonProps {
    label: string;
    onClick: () => void;
    minminize?: boolean;
}

export const QuickActionButton = ({ label, onClick,minminize }: QuickActionButtonProps) => (
    <button
        onClick={onClick}
        className={clsx(" py-3 w-full cursor-pointer font-poppins rounded-[6px] bg-rose-50 hover:bg-rose-100 text-[#666666] text-xs",
            minminize ? "px-0" : "px-4"
        )}
    >
        {label}

    </button>
)
