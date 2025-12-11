"use client";
import { Eraser, Mic, Send, Squircle } from "lucide-react";
import Modal from "../Modal/Modal";
import clsx from "clsx";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { close, minimize, maximize } from "@/redux/ai-agent-chat/chatSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useDeviceType } from "@/utils/useDeviceType";
import { MobileChatLayout } from "./MobileChatLayout";
import { ChatReplaySection } from "./ChatReplaySection";
import { MobileHero } from "./MobileHero";
import { ControlButtons } from "./ControlButtons";
import { ChatSection } from "./ChatSection";
import { useChatLogic } from "./useChatLogic";

export default function ChatPopup() {
    const dispatch = useDispatch<AppDispatch>();
    const { isOpen, isMinimized } = useSelector((state: RootState) => state.chat);
    const isDevice = useDeviceType();

    // Use custom hook for all chat logic
    const {
        data,
        search,
        isLoading,
        topRef,
        onSent,
        handleChange,
        handleKeyDown,
        clearSearch,
    } = useChatLogic();

    return (
        <>
          

            {isOpen && (
                <Modal onClose={() => dispatch(close())} isOpen={isOpen}>
                    {isDevice === 'mobile' ? (
                        <MobileChatLayout
                            data={data}
                            isLoading={isLoading}
                            search={search}
                            handleChange={handleChange}
                            handleKeyDown={handleKeyDown}
                            onSent={onSent}
                            topRef={topRef}
                            dispatch={dispatch}
                        />
                    ) : (
                        <div className="flex flex-col h-full w-full bg-white max-w-[1060px] rounded-[15px]">
                            {/* Desktop Header with Controls */}
                            <div className="flex-shrink-0 flex justify-end items-center px-3 py-3">
                                <ControlButtons
                                    isMinus={true}
                                    isClose={true}
                                    isMinimize={true}
                                    onMinimize={() => dispatch(minimize())}
                                    onClose={() => dispatch(close())}
                                />
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-auto max-h-[450px] px-3 pb-4 md:pb-0" ref={topRef}>
                                {data?.conversations?.length > 0 ? (
                                    <ChatReplaySection data={data} isLoading={isLoading} />
                                ) : (
                                    <MobileHero />
                                )}
                            </div>

                            {/* Input Area */}
                            <div className="flex-shrink-0 rounded-[15px] px-3 pb-0 pt-2 bg-white border-t border-gray-100">
                                
                                
                                <div className="flex  items-center gap-2 pb-3">
                                       
                                       <button
                                            onClick={clearSearch}
                                            // disabled={!search}
                                            className={clsx(
                                                "w-32 gap-2 text-sm bg-[#FF1645]  px-2 h-12 text-white font-poppins font-medium  rounded flex items-center justify-center transition-all",
                                                // search ? "bg-[#FF1645] shadow-lg" : "bg-[#ff16458c]"
                                            )}
                                        >
                                            Clear Chat
                                            <Eraser size={18} />
                                        </button>
                                    
                                    <div className="flex-1 bg-white rounded-full md:rounded h-16 md:h-[50px] flex items-center ps-[16px] pe-2 border border-gray-200">
                                        
                                        <input
                                            type="text"
                                            value={search}
                                            onChange={handleChange}
                                            onKeyDown={handleKeyDown}
                                            placeholder="Ask me anything.."
                                            className="flex-1 bg-transparent pe-3 outline-none text-gray-800 placeholder:text-gray-500 text-base placeholder:text-sm font-poppins"
                                        />
                                   

                                        <button
                                            onClick={onSent}
                                            disabled={!search}
                                            className={clsx(
                                                "w-6 h-6 md:hidden block rounded-full flex items-center justify-center transition-all",
                                                search ? "bg-[#FF1645] shadow-lg" : "bg-[#ff16458c]"
                                            )}
                                        >
                                            {isLoading ? (
                                                <Squircle className="animate-spin text-white" size={20} />
                                            ) : (
                                                <Send size={20} className="text-white -ml-0.5" />
                                            )}
                                        </button>

                                        <button
                                            onClick={onSent}
                                            disabled={!search}
                                            className={clsx(
                                                "w-[45px] h-[37px] hidden rounded md:flex items-center justify-center transition-all",
                                                search ? "bg-[#FF1645] shadow-lg" : "bg-[#ff16458c]"
                                            )}
                                        >
                                            {isLoading ? (
                                                <Squircle className="animate-spin text-white" size={18} />
                                            ) : (
                                                <Send size={18} className="text-white -ml-0.5" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal>
            )}

            {isMinimized && !isOpen && (
                <div className="border fixed left-3 sm:left-auto right-3 bottom-3 h-[300px] z-50 border-[#DEDEDE] bg-white rounded-[12px] flex flex-col gap-3 p-2.5 w-fit sm:w-[470px] shadow-xl">
                    <div className="">
                        <ControlButtons
                            isFullScreen={true}
                            isClose={true}
                            isMinus={false}
                            onMaximize={() => dispatch(maximize())}
                            onClose={() => dispatch(close())}
                        />
                    </div>
                    <div className="flex-1 pr-2 mb-2 overflow-auto flex flex-col" ref={topRef}>
                        { data && (data?.conversations?.length > 0 )? <ChatReplaySection data={data} small isLoading={isLoading} /> : 
                        <MobileHero 
                        minminize={true}
                        />}
                    </div>
                    <div className="h-[40px] w-full">
                        <ChatSection
                            handleKeyDown={handleKeyDown}
                            onSent={onSent}
                            search={search}
                            handleChange={handleChange}
                            small
                            isLoading={isLoading}
                            clearSearch={clearSearch}
                        />
                    </div>
                </div>
            )}
        </>
    );
}