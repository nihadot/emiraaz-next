import clsx from "clsx";

interface SuggestionQuestionProps {
    title: string;
    small?: boolean;
    isOwn?: boolean;
    onClick?: () => void;
}

export function SuggestionQuestion({ title, small, isOwn, onClick }: SuggestionQuestionProps) {
    return (
        <div
            onClick={onClick}
            className={clsx(
                "text-black px-3 py-3 flex justify-center cursor-pointer hover:bg-red-600/20 transition-colors rounded-md w-fit bg-red-600/10",
                small ? "text-[10px] px-2 py-1" : "text-sm px-3 py-2",
                isOwn ? "text-end justify-end" : "text-left justify-start"
            )}
        >
            <p className="text-gray-600 text-sm">{title}</p>
        </div>
    );
}
