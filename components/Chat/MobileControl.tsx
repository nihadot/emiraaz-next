import { Maximize2, Minus, X } from 'lucide-react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { close, minimize, maximize } from "@/redux/ai-agent-chat/chatSlice";

type Props = {
    isClose?: boolean,
    isMinus?: boolean,
    isMinimize?: boolean
}

function MobileControl({ }: Props) {
    const dispatch = useDispatch();

    return (
        <div
            className='w-full flex justify-end items-center gap-4 py-2 '
        >

            <div className="w-full  flex items-center justify-end gap-2 pr-2">

                <button onClick={() => dispatch(maximize())} className="w-7 h-7 flex items-center justify-center rounded-md">
                    <Maximize2 size={18} color="#FF1645" />
                </button>

                <button onClick={() => dispatch(minimize())} className="w-7 h-7 flex items-center justify-center rounded-md">
                    <Minus size={22} color="#FF1645" />
                </button>

                <button onClick={() => dispatch(close())} className="w-7 h-7 flex items-center justify-center rounded-md">
                    <X size={20} color="#FF1645" />
                </button>

            </div>

        </div>
    )
}

export default MobileControl