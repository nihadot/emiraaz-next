import clsx from "clsx";
import { Eraser } from "lucide-react";
import Button from "../atom/button/Button";
import { InputField } from "@/components/Chat/InputField";

interface ChatSectionProps {
    small?: boolean;
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    search: string;
    clearSearch: () => void;
    onSent: () => void;
    isLoading: boolean;
}

export function ChatSection({
    small,
    handleKeyDown,
    handleChange,
    search,
    clearSearch,
    onSent,
    isLoading
}: ChatSectionProps) {
    return (
        <div className={clsx("flex flex-1 h-full gap-1", small ? "h-[40px]" : "md:h-[50px] h-[50px]")}>
            <Button
                onClick={clearSearch}
                type="button"
                className={clsx(
                    "bg-[#FF1645] h-full cursor-pointer flex justify-center items-center rounded-[5px]",
                    small ? "w-12 h-4" : "lg:w-40 px-3 py-2"
                )}
            >
                {!small && (
                    <span className="text-sm font-medium h-full md:flex hidden text-nowrap font-poppins text-white">
                        Clear Chat
                    </span>
                )}
                <div className="w-4 h-4 flex cursor-pointer justify-center items-center">
                    <Eraser size={small ? 18 : 20} color="white" />
                </div>
            </Button>

            <InputField
                isLoading={isLoading}
                search={search}
                handleKeyDown={handleKeyDown}
                handleChange={handleChange}
                small={small}
                onSent={onSent}
            />
        </div>
    );
}
