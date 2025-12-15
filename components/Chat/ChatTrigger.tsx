"use client";
import { useDispatch } from "react-redux";
import { open } from "@/redux/ai-agent-chat/chatSlice";
import { MessageSquareText } from "lucide-react";
import clsx from "clsx";
import { usePathname } from "next/navigation";



export default function ChatTrigger() {
    const dispatch = useDispatch();
const pathname = usePathname();

const isProjectPage = /^\/projects\/[^/]+/.test(pathname);







    return (
        <button
            onClick={() => dispatch(open())}
           className={clsx(
        "fixed right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#FF1645] text-white shadow-lg transition-transform hover:scale-110 hover:bg-[#E6143E] active:scale-95",
        {
          "bottom-4": !isProjectPage,
          "bottom-24": isProjectPage,
        }
      )}
            aria-label="Open Chat"
        >
            <MessageSquareText size={28} />
        </button>
    );
}
