'use client'
import React, { useState } from 'react'
import HistoryCards from './HistoryCards'
import SearchComponent from './SearchComponent'
import Chat, { ChatMessage } from './Chat'
import axios from 'axios'
import apiClient from '@/api/apiClient'
import { baseUrl } from '@/api'
import toast from 'react-hot-toast'

const Body: React.FC = () => {
    const [messages, setMessages] = useState<any[]>([])
    const [input, setInput] = useState('')
    const [isTyping, setIsTyping] = useState(false)

    const sendMessage = async (text: string) => {
        try {
            if (!text.trim()) return

            // Add user message
            setMessages(prev => [...prev, { id: Date.now(), text, fromUser: true }])
            setInput('')




            // Simulate AI typing
            setIsTyping(true)
            // setTimeout(() => {
                // setIsTyping(false)
                // }, 4000)
                
                const response = await axios(`${baseUrl}/ps-aiagent`, {
                    method: 'POST',
                    data: {
                        message: text
                    }
                })
                
                const data = response.data?.data;
                setMessages(prev => [...prev, { id: Date.now() + 1, fromUser: false,data, }])





        } catch (error: any) {
            toast.error(error.message)
        }finally {
            setIsTyping(false)
        }
    }

    console.log(messages,'asassa')

    return (
        <div className='bg-white w-full min-h-[40vh] max-w-[640px] m-auto flex flex-col justify-start mt-20 items-center p-4'>
            <h1 className='font-poppins mb-[12px] font-medium text-[37.5px]'>
                Say hello to your new <span className='text-[#FF1645]'>Ai Agent</span>
            </h1>
            <p className='font-poppins font-normal mb-[20px] text-[12px] text-[#333333]'>
                No more filters. No more forms. Just chat and discover. Powered by <span className='text-[#FF1645]'>AI</span>
            </p>

            <HistoryCards />

            <Chat messages={messages} isTyping={isTyping} />

            <SearchComponent
                value={input}
                onChange={e => setInput(e.target.value)}
                onSearch={() => sendMessage(input)}
                onEnterPress={() => sendMessage(input)}
            />
        </div>
    )
}

export default Body
