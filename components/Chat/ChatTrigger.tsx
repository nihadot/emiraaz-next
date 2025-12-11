"use client";
import { useDispatch } from "react-redux";
import { open } from "@/redux/ai-agent-chat/chatSlice";
import { MessageSquareText } from "lucide-react";

export default function ChatTrigger() {
    const dispatch = useDispatch();

    return (
        <button
            onClick={() => dispatch(open())}
            className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#FF1645] text-white shadow-lg transition-transform hover:scale-110 hover:bg-[#E6143E] active:scale-95"
            aria-label="Open Chat"
        >
            <MessageSquareText size={28} />
        </button>
    );
}
