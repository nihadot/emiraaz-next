'use client'
import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { FaPause, FaPlay } from "react-icons/fa";
import { MdOutlineReplay } from "react-icons/md";

type CenterControlsProps = {
    showControls: boolean;
    showReplay: boolean;
    isPlaying: boolean;
    onTogglePlay: () => void;
    isFullScreen: boolean;
};

const CenterControls: React.FC<CenterControlsProps> = ({
    showControls,
    showReplay,
    isPlaying,
    onTogglePlay,
    isFullScreen,
}) => {
    return (
        <motion.div
            className={clsx(
                "absolute top-0 left-0  flex justify-center items-center z-30",
                showControls ? "bg-black/5" : "pointer-events-none",
                isFullScreen ? " w-full h-[90%] top-0 " : "w-full h-full"
            )}
            onClick={onTogglePlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: showControls ? 1 : 0, }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >

            {!showReplay ? (
                <div className="cursor-pointer p-3 rounded-full">
                    {isPlaying ? (
                        <FaPause color="white" size={24} />
                    ) : (
                        <FaPlay color="white" size={24} />
                    )}
                </div>
            ) : (
                <button className="px-3 cursor-pointer py-1 text-xs rounded">
                    <MdOutlineReplay size={24} color="white" />
                </button>
            )}
        </motion.div>
    );
};

export default CenterControls;
