"use client";
import { Mic, Send, Squircle } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";
import { BlackBackIcon, NotificationBlackIcon } from "@/app/assets";
import { TopBar } from "@/components/topbar";
import { ChatReplaySection } from "@/components/Chat/ChatReplaySection";
import { MobileHero } from "@/components/Chat/MobileHero";
import { close } from "@/redux/ai-agent-chat/chatSlice";

interface MobileChatLayoutProps {
    data: any;
    isLoading: boolean;
    search: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onSent: () => void;
    topRef: React.RefObject<HTMLDivElement | null>;
    dispatch: any;
}

export function MobileChatLayout({
    data,
    isLoading,
    search,
    handleChange,
    handleKeyDown,
    onSent,
    topRef,
    dispatch
}: MobileChatLayoutProps) {
    const hasMessages = data?.conversations?.length > 0;

    return (
        <div className="flex flex-col h-[100svh] w-full">
            {/* Header */}
            <TopBar
                onBack={() => dispatch(close())}
                backIcon={
                    <Image
                        width={20}
                        height={20}
                        alt="back icon"
                        src={BlackBackIcon}
                        unoptimized={true}
                    />
                }
                title="Ai Agent"
                onOptions={() => { }}
                optionsIcon={
                    <Image
                        width={20}
                        height={20}
                        alt="options icon"
                        src={NotificationBlackIcon}
                        unoptimized={true}
                    />
                }
            />

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-4 pb-4" ref={topRef}>
                {hasMessages ? (
                    <ChatReplaySection
                        data={data}
                        isLoading={isLoading}
                        small
                    />
                ) : (
                    <MobileHero />
                )}
            </div>

            {/* Input Area */}
            <div className="flex-shrink-0 bg-white shadow-lg px-4 pb-3">
                <div className="bg-white rounded-full h-14 flex items-center border border-gray-200 py-2 pe-2">
                    <div className="w-full h-full flex">
                        <input
                            type="text"
                            value={search}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask me anything.."
                            className="w-full placeholder:text-sm h-full rounded-full bg-white outline-none ps-[20px] text-gray-800 placeholder:text-gray-500 text-base font-poppins"
                        />
                    </div>

              
                    <button
                        onClick={onSent}
                        disabled={!search}
                        className={clsx(
                            "flex-shrink-0 w-[40px] ms-2 h-[40px] rounded-full flex items-center justify-center transition-all",
                            search ? "bg-[#FF1645] shadow-lg" : "bg-[#ff16458c]"
                        )}
                    >
                        {isLoading ? (
                            <Squircle className="animate-spin text-white" size={20} />
                        ) : (
                            <Send size={20} className="text-white -ms-1" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
