'use client'
import React, { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export interface ChatMessage {
    id: number
    text: string
    fromUser: boolean
}

interface ChatProps {
    messages: ChatMessage[]
    isTyping?: boolean
}

const Chat: React.FC<ChatProps> = ({ messages, isTyping }) => {
    const containerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        containerRef.current?.scrollTo({
            top: containerRef.current.scrollHeight,
            behavior: 'smooth',
        })
    }, [messages, isTyping])

    return (
        <div ref={containerRef} className='w-full my-4 flex flex-col gap-2 max-h-80 overflow-y-auto '>
            <AnimatePresence initial={false}>
                {messages.map((msg: any) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`p-2 rounded-md text-sm  sm:max-w-[70%] ${msg.fromUser ? 'self-end bg-[#FF1645] text-white' : 'self-start  text-gray-800'}`}
                    >
                        {msg.fromUser && msg.text}
                        {!msg.fromUser && msg.data.map((item: any, index: number) => {
                            return (
                                <div key={index} className="flex mt-4 flex-col gap-2 border  border-gray-200 p-2 rounded-md text-sm w-full max-w-[280px] self-start  text-gray-800">
                                    <div className="flex flex-col gap-2 items-start ">
                                        <div className="w-64 h-40  flex relative justify-center items-center">
                                            <Image src={item.mainImages?.[0]?.webp?.url} alt='avatar' fill className="object-cover rounded" />
                                        </div>
                                        <p className="font-poppins font-medium leading-4 text-base cursor-pointer text-black">{item.projectTitle}</p>
                                        <p className="font-poppins font-medium text-lg leading-5 text-black "><span className='text-sm'>Starting From</span> {item.priceInAED}</p>
                                    </div>

                                    {/* <p className="font-poppins font-normal text-[12px] text-black">{item.job}</p> */}
                                </div>
                            )
                        })}
                    </motion.div>
                ))}

                {isTyping && (
                    <motion.div
                        key="typing"
                        className="self-start  p-2 rounded-md flex gap-1 w-14 justify-center"
                    >
                        {[0, 1, 2].map((i) => (
                            <motion.span
                                key={i}
                                className="bg-red-500 w-2 h-2 rounded-full"
                                style={{ display: 'inline-block' }}
                                animate={{
                                    y: [0, -3, 0],       // smaller gentle movement
                                    opacity: [0.3, 1, 0.3]
                                }}
                                transition={{
                                    duration: 1.0,        // slower
                                    repeat: Infinity,
                                    repeatType: 'loop',
                                    ease: "easeInOut",    // smooth easing
                                    delay: i * 0.3        // stagger
                                }}
                            />
                        ))}
                    </motion.div>



                )}
            </AnimatePresence>
        </div>
    )
}

export default Chat
