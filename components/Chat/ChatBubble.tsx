import clsx from "clsx";

interface ChatBubbleProps {
    text: string;
    minminize?: boolean;
}

export const ChatBubble = ({ text ,minminize}: ChatBubbleProps) => (
    <div className={clsx("relative bg-white border border-[#DEDEDE] rounded-md w-fit font-poppins py-2.5 text-xs text-[#666666]",
        minminize ? "px-3 leading-normal my-2" : "px-4"
    )}>
        {text}
        {/* Left pointer/tail */}
        <div className="absolute -left-2 bottom-[4px]  w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-[#DEDEDE]"></div>
    </div>
)
