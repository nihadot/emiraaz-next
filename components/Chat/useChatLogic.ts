import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initSocket } from "@/redux/ai-agent-chat/socketSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { getSocket } from "@/redux/ai-agent-chat/socket";
// import { getSocket } from "@/utils/socketService";

/**
 * Custom hook that manages all chat logic including:
 * - Socket connection and event handlers
 * - Message sending and receiving
 * - Streaming response support
 * - Input handling and validation
 */
export function useChatLogic() {
        const dispatch = useDispatch<AppDispatch>();
    const socket = getSocket(); // ← socket comes from singleton
    const { isOpen } = useSelector((state: RootState) => state.chat);


    const [data, setData] = useState<any>({});
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const topRef = useRef<HTMLDivElement>(null);
    const isInitialized = useRef(false);



useEffect(() => {
        if (isInitialized.current) return;
        isInitialized.current = true;
    }, []);

    

    // Socket event handlers
    useEffect(() => {
        if (!socket) return;

        const handleReply = (msg: any) => {
            setIsLoading(false);

            setData((prev: any) => {
                const conversations = [...(prev.conversations || [])];
                if (conversations.length > 0) {
                    conversations[conversations.length - 1] = {
                        ...conversations[conversations.length - 1],
                        answer: msg.answer || msg
                    };
                }
                return { ...prev, conversations };
            });
        };

        const handleStream = (chunk: any) => {
            setIsLoading(false);

            setData((prev: any) => {
                const conversations = [...(prev.conversations || [])];
                if (conversations.length > 0) {
                    const last = conversations[conversations.length - 1];
                    const curr = typeof last.answer === "string" ? last.answer : "";

                    conversations[conversations.length - 1] = {
                        ...last,
                        answer: curr + (chunk.text || chunk.answer || chunk),
                        isStreaming: true,
                    };
                }
                return { ...prev, conversations };
            });
        };

        const handleStreamEnd = () => {
            setData((prev: any) => {
                const conversations = [...(prev.conversations || [])];
                if (conversations.length > 0) {
                    conversations[conversations.length - 1] = {
                        ...conversations[conversations.length - 1],
                        isStreaming: false,
                    };
                }
                return { ...prev, conversations };
            });
        };

        const handleInitReply = (initialMessages: any) => {
            setData(initialMessages || {});
        };

        socket.on("reply", handleReply);
        socket.on("stream", handleStream);
        socket.on("stream-end", handleStreamEnd);
        socket.on("init-reply", handleInitReply);

        const sessionId = sessionStorage.getItem("sessionId");
        if (sessionId) {
            socket.emit("take-initial-data", { sessionId });
        }

        return () => {
            socket.off("reply", handleReply);
            socket.off("stream", handleStream);
            socket.off("stream-end", handleStreamEnd);
            socket.off("init-reply", handleInitReply);
        };
    }, [socket, isOpen]);   
    // Auto-scroll to bottom when new messages arrive
    // useEffect(() => {
    //     if (topRef.current) {
    //         topRef.current.scrollTo({
    //             top: topRef.current.scrollHeight,
    //             behavior: "smooth"
    //         });
    //     }
    // }, [data?.conversations?.length, isLoading]);

    console.log("data", data);

    // Send message handler
      const onSent = () => {
          if (isLoading) return; // ← BLOCK second send

        const text = search.trim();
        if (!text || !socket) return;

        setData((prev: any) => ({
            ...prev,
            conversations: [
                ...(prev.conversations || []),
                { prompt: text, answer: null },
            ],
        }));

        setIsLoading(true);
        socket.emit("message", { message: text });
        setSearch("");
    };

     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setSearch(e.target.value);

    const clearSearch = () => setSearch("");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            onSent();
        }
    };

    return {
         data,
        search,
        isLoading,
        topRef,

        onSent,
        handleChange,
        handleKeyDown,
        clearSearch,
    };
}
