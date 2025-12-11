"use client";
import { Maximize2, Minus, X } from "lucide-react";
import clsx from "clsx";
import { useDeviceType } from "@/utils/useDeviceType";
import MobileControl from "./MobileControl";

interface ControlButtonsProps {
    isClose: boolean;
    isMinus: boolean;
    isMinimize?: boolean;
    isFullScreen?: boolean;
    onMinimize?: () => void;
    onMaximize?: () => void;
    onClose?: () => void;
}

export function ControlButtons({
    isMinus,
    isClose,
    isMinimize,
    isFullScreen,
    onMinimize,
    onMaximize,
    onClose
}: ControlButtonsProps) {
    const isDevice = useDeviceType();

    return (
        <div className={clsx("flex items-center justify-between  w-full gap-1 pb-2")}>
            
               <div className="font-poppins font-medium">
                        <span className="text-[#FF1645]"> AI </span> <span>Agent</span>
                    </div>

                    <div className="">
                        
            {/* Desktop Controls */}
            {isDevice !== 'mobile' && (
                <>
                    {isFullScreen && onMaximize && (
                        <button onClick={onMaximize} className="p-1 hover:bg-gray-100 rounded">
                            <Maximize2 size={18} color="#FF1645" />
                        </button>
                    )}
                    {isMinimize && onMinimize && (
                        <button onClick={onMinimize} className="p-1 hover:bg-gray-100 rounded">
                            <Minus size={22} color="#FF1645" />
                        </button>
                    )}
                    {isClose && onClose && (
                        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
                            <X size={20} color="#FF1645" />
                        </button>
                    )}

                 
                </>
            )}
                    </div>


            {isDevice === 'mobile' && <MobileControl />}
        </div>
    );
}
