import clsx from "clsx";
import { SendHorizontal, Squircle } from "lucide-react";

interface InputFieldProps {
    small?: boolean;
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    search: string;
    onSent: () => void;
    isLoading: boolean;
}

export function InputField({
    small,
    handleKeyDown,
    handleChange,
    search,
    onSent,
    isLoading
}: InputFieldProps) {
    return (
        <div className={clsx(
            "flex bg-[#F7F7F7] h-full rounded-[5px] border-[1.5px] border-[#D4D4D4] gap-2 p-0.5 w-full",
            small ? "ps-[14px]" : "ps-[18px]"
        )}>
            <input
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                value={search}
                type="text"
                className={clsx(
                    "flex-1 bg-transparent outline-none text-black",
                    small ? "placeholder:text-sm" : "placeholder:text-base"
                )}
                placeholder="Type your requirement"
            />
            <button
                type="button"
                onClick={onSent}
                disabled={!search}
                className={clsx(
                    "bg-[#FF1645] h-full flex items-center justify-center rounded-md",
                    small ? "w-6" : "w-8",
                    !search ? 'opacity-60' : 'cursor-pointer'
                )}
            >
                {isLoading ? (
                    <Squircle
                        className="animate-spin"
                        fill="#fff"
                        size={small ? 16 : 22}
                        color="white"
                    />
                ) : (
                    <SendHorizontal
                        className=""
                        size={small ? 16 : 22}
                        color="white"
                    />
                )}
            </button>
        </div>
    );
}
