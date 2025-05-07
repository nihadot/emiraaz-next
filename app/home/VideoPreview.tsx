import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { play_icon } from "../assets";
import { FaPause, FaPlay, FaRegPlayCircle, FaReply, FaStreetView, FaVolumeDown, FaVolumeUp } from "react-icons/fa";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineReplay } from "react-icons/md";
import { BsArrowsFullscreen } from "react-icons/bs";

type VideoPreviewProps = {
  src: string;
  width?: string;
  height?: string;
  dimOpacity?: number;
};

const VideoPreview: React.FC<VideoPreviewProps> = ({
  src,
  dimOpacity = 0.5,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showReplay, setShowReplay] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const hideTimeout = useRef<any>(null);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
  
    if (video.paused || video.ended) {
      video.play();
      setIsPlaying(true);
      setShowReplay(false);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  const resetHideTimer = () => {
    setShowControls(true);
    if (hideTimeout.current) clearTimeout(hideTimeout.current);

    hideTimeout.current = setTimeout(() => {
      setShowControls(false);
    }, 700);
  };

  useEffect(() => {
    const handleMouseMove = () => resetHideTimer();

    window.addEventListener("mousemove", handleMouseMove);
    resetHideTimer();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error("Auto-play blocked or failed:", error);
          });
      }
    }
  }, []);
  

  return (
    <AnimatePresence>
      <motion.div
        layout
        // transition={{ type: "", stiffness: 300, damping: 30 }}
        className={clsx(
          "relative flex flex-col h-[250px] w-full",
          // isFullscreen ? "!absolute h-[85vh] !left-[-900px] !w-[1220px] p-4 z-50 bg-black -top-[130px]  rounded-xl" : "h-[250px]"
        )}
      >
        <div className="w-full relative flex h-full">
        <video
  ref={videoRef}
  src={src}
  muted={isMuted}
  autoPlay // ✅ Auto play enabled
  style={{
    filter: `brightness(${1 - dimOpacity})`,
    objectFit: "cover",
  }}
  onEnded={() => {
    setIsPlaying(false);
    setShowReplay(true);
  }}
  className="w-fit h-full"
/>
  

          {/* Center Controls */}
          <div
            className={clsx(
              "w-full flex justify-center items-center absolute top-0 left-0 z-30 h-full transition-opacity duration-300",
              showControls ? "opacity-100 bg-black/5" : "opacity-0 pointer-events-none"
            )}
          >
            {!showReplay ? (
              <div onClick={togglePlay} className="cursor-pointer p-3 rounded-full">
                {isPlaying ? (
                  <FaPause color="white" />
                ) : (
                  <FaPlay width={21.75} height={21.75} color="white" />
                )}
              </div>
            ) : (
              <button
                onClick={togglePlay}
                className=" px-3 py-1 text-xs rounded"
              >
                <MdOutlineReplay size={21.75} color="white" />
              </button>
            )}
          </div>

          {/* Bottom Controls */}
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              display: "flex",
              height: "15px",
              zIndex: 30,
            }}
            className={clsx(
              "w-full px-[10px] justify-between absolute bottom-2 h-[15px] z-[100] transition-opacity duration-300",
              showControls ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          >
            <div onClick={toggleMute}>
              {!isMuted ? (
                <FaVolumeUp color="white" size={14} />
              ) : (
                <FaVolumeDown color="white" size={14} />
              )}
            </div>

            {/* <div onClick={toggleFullscreen}> */}
              <BsArrowsFullscreen color="white" size={14} />
            {/* </div> */}
          </div>

          {/* Progress Bar */}
          {/* <input
  type="range"
  min={0}
  max={duration || 0.0001} // avoid division by zero
  value={currentTime}
  onChange={(e) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) videoRef.current.currentTime = time;
  }}
  className="absolute bottom-[25px] left-0 w-full h-[4px] z-40 cursor-pointer rounded-lg appearance-none bg-transparent"
  style={{
    background: `linear-gradient(to right, #f00 ${(currentTime / duration) * 100}%, #d1d5db ${(currentTime / duration) * 100}%)`,
  }}
/> */}

<input
  type="range"
  min={0}
  max={duration || 0.0001}
  value={currentTime}
  onChange={(e) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) videoRef.current.currentTime = time;
  }}
  className="absolute bottom-[25px] left-0 w-full h-[4px] z-40 cursor-default rounded-lg appearance-none bg-transparent
             [&::-webkit-slider-thumb]:appearance-none
             [&::-moz-range-thumb]:appearance-none
             [&::-ms-thumb]:appearance-none"
/>



        </div>

        {/* Know More */}
        {!isFullscreen && (
          <div className="bg-[#F5F5F5] h-[70px] flex justify-center items-center w-full">
            <button className="font-poppins text-[9px] w-[97px] h-[25px] flex justify-center items-center bg-[#333333] rounded-[3px] text-white font-medium">
              Know More
            </button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default VideoPreview;
