'use client'
import React, { useRef, useState, useEffect } from "react";
import { BsArrowsFullscreen, BsFullscreenExit } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import CenterControls from "./CenterControls";
import { useDeviceType } from "@/utils/useDeviceType";
import Link from "next/link";
import { FaVolumeDown, FaVolumeUp } from "react-icons/fa";
import clsx from "clsx";
import { createPortal } from "react-dom";
import { getOrCreateDeviceId } from "@/utils/uniquId";
import { sentUniqueId } from "@/api/auth";

type VideoViewProps = {
  videoUrl: string;
  className?: string;
  projectSlug: string;
  alt: string;
  thumbnailUrl: string;
  id: string;
};

const VideoView: React.FC<VideoViewProps> = ({ id, videoUrl, thumbnailUrl, className, projectSlug }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showReplay, setShowReplay] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const hideTimeout = useRef<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const normalContainerRef = useRef<HTMLDivElement>(null);
  const fullscreenContainerRef = useRef<HTMLDivElement>(null);
  const deviceType = useDeviceType();
  const isMobile = deviceType === "mobile";
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  const resetHideTimer = () => {
    setShowControls(true);
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    hideTimeout.current = setTimeout(() => setShowControls(false), 1500);
  };

  useEffect(() => {
    const container = isFullscreen ? fullscreenContainerRef.current : containerRef.current;
    if (!container) return;

    const handleMouseMove = () => resetHideTimer();
    container.addEventListener("mousemove", handleMouseMove);
    resetHideTimer();

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, [isFullscreen]);

  const togglePlay = () => {
    //  const myDeviceId: string = getOrCreateDeviceId();

    // sentUniqueId({ uniqueId: myDeviceId, type: 'video-full-screen', id }).catch(console.error);


    const video = videoRef.current;
    if (!video) return;

    if (video.paused || video.ended) {
      video.play().then(() => {
        setIsPlaying(true);
        setShowReplay(false);
      });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = async () => {
    // console.log('first')
    const myDeviceId: string = getOrCreateDeviceId();

    sentUniqueId({ uniqueId: myDeviceId, type: 'video-mute', id }).catch(console.error);


    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };




  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullscreen) return;

      switch (e.key) {
        case " ":
          e.preventDefault();
          togglePlay();
          break;
        case "Escape":
          setIsFullscreen(false);
          break;
        case "Tab":
          e.preventDefault();
          toggleMute();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen, togglePlay, toggleMute]);

  const toggleFullscreen = () => {

    const myDeviceId: string = getOrCreateDeviceId();
    sentUniqueId({ uniqueId: myDeviceId, type: 'video-full-screen', id }).catch(console.error);
    // console.log(isMobile, 'isMobileisMobile');
    if (!isMobile) {
      setIsFullscreen((prev) => !prev);

    }
  };


  const handleVideoEnd = () => {
    setIsVideoLoaded(true);
    setShowThumbnail(false); // hide thumbnail when video can play
    setIsPlaying(false);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      setCurrentTime(video.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      setDuration(video.duration);
    }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video || !duration) return;

    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;

    video.currentTime = newTime;
    setCurrentTime(newTime);
  };


  const handleCanPlay = () => {
    setIsVideoLoaded(true);
    setShowThumbnail(false); // hide thumbnail when video can play
    setIsPlaying(true);       // autoplay state
  };





  const videoElement = (

    <div className="relative w-full h-full">
      {(showThumbnail) && (
        <img
          src={thumbnailUrl}
          alt="Video thumbnail"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      <video
        ref={videoRef}
        src={videoUrl}
        autoPlay // Add this line
        muted={isMuted}
        playsInline
        preload="metadata"
        className={clsx("cursor-pointer", {
          "w-full h-full object-contain": isFullscreen,
          "w-full h-[195px] object-cover": !isFullscreen,
        })}
        onCanPlay={handleCanPlay}  // fires as soon as browser can start playing
        onEnded={handleVideoEnd}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
      />
    </div>
  );

  useEffect(() => {
    const video = videoRef.current;
    if (isFullscreen && video && video.paused) {
      const timeout = setTimeout(() => {
        video
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => { });
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [isFullscreen, videoRef, setIsPlaying]);





  if (!videoUrl) return <div>No video available</div>;


  return (
    <>
      {/* Animated Theater Fullscreen */}
      {mounted && isFullscreen && createPortal(
        <AnimatePresence>
          <motion.div
            ref={fullscreenContainerRef}
            className="fixed inset-0 z-50 bg-black/80 bg-opacity-90 flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1], // smooth material-style easing
            }}

            onClick={() => setIsFullscreen(false)}
          >
            <motion.div
              className="relative w-11/12 md:w-4/5 lg:w-9/12 max-h-[85vh] bg-black overflow-hidden"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              onClick={(e) => {
                resetHideTimer();
                e.stopPropagation();
              }}
            >
              {/* Video container for fullscreen */}
              <div className="w-full h-full">
                {videoElement}
              </div>

              <CenterControls
              isFullScreen={mounted && isFullscreen}
                showControls={showControls}
                showReplay={showReplay}
                isPlaying={isPlaying}
                onTogglePlay={togglePlay}
              />



              <div className="flex px-3 left-0 right-0 items-center  z-40 absolute bottom-[69px] justify-between">


                {/* Fullscreen Controls */}
                <motion.div
                  onClick={toggleMute}
                  className={clsx("cursor-pointer z-40 p-2 rounded bg-black/30", {
                    "pointer-events-none": !showControls,
                  })}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: showControls ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {!isMuted ? (
                    <FaVolumeUp color="white" size={20} />
                  ) : (
                    <FaVolumeDown color="white" size={20} />
                  )}
                </motion.div>





                {/* Progress Bar - Only in Fullscreen */}
                <motion.div
                  className=" w-[90%] h-1 bg-gray-700 cursor-pointer group hover:h-2 transition-all"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: showControls ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  onClick={handleProgressClick}
                >
                  <div
                    className="h-full bg-white transition-all duration-100 relative"
                    style={{ width: `${progress}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>

                <motion.div
                  className={clsx("cursor-pointer  p-2 rounded bg-black/30", {
                    "pointer-events-none": !showControls,
                  })}
                  onClick={() => setIsFullscreen(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: showControls ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <BsFullscreenExit color="white" size={20} />
                </motion.div>


              </div>
              <KnowMore
              id={id}
                url={projectSlug} />

            </motion.div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}

      {/* Normal View */}
      <div
        ref={containerRef}
        onClick={resetHideTimer}
        className={`relative h-full cursor-pointer w-full flex flex-col justify-center items-center ${className || ""}`}
      >
        <motion.div
          whileHover={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="relative w-full"
        >
          {/* Video container for normal view */}
          <div ref={normalContainerRef}>
            {!isFullscreen && videoElement}
          </div>


          {/* Center Controls - Only show in normal view */}
          {!isFullscreen && (
            <CenterControls
            isFullScreen={mounted && isFullscreen}
              showControls={showControls}
              showReplay={showReplay}
              isPlaying={isPlaying}
              onTogglePlay={togglePlay}
            />
          )}

          {/* Bottom Controls with fullscreen button - Only show in normal view */}
          {!isFullscreen && (
            <BottomControl
              showControls={showControls}
              setIsMuted={setIsMuted}
              videoRef={videoRef}
              isMobile={isMobile}
              isFullscreen={isFullscreen}
              toggleFullscreen={toggleFullscreen}
              toggleMute={toggleMute}
              isMuted={isMuted}
            />
          )}

        </motion.div>

        {/* Know More Button */}
        {!isFullscreen && <KnowMore id={id} url={projectSlug} />}
      </div>
    </>
  );
};

export default VideoView;

function KnowMore({ url, className,id }: { url: string, className?: string,id:string }) {
  const handleFun = () => {
    const myDeviceId: string = getOrCreateDeviceId();
    sentUniqueId({ uniqueId: myDeviceId, type: 'video-more-projects', id }).catch(console.error);
  }
  return (
    <Link
    onClick={handleFun}
      href={`/projects/${url}`}
      className={clsx("bg-[#F5F5F5] h-[54px] flex justify-center items-center w-full", {
        className
      })}
    >
      <button
        type="button"
        className="font-poppins cursor-pointer text-[9px] w-[97px] h-[25px] flex justify-center items-center bg-[#333333] rounded-[3px] text-white font-medium"
      >
        Know More
      </button>
    </Link>
  );
}

function BottomControl({
  isMobile,
  isFullscreen,
  toggleFullscreen,
  toggleMute,
  isMuted,
  showControls,
}: {
  isMobile: boolean;
  isFullscreen: boolean;
  toggleFullscreen: () => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  setIsMuted: any;
  toggleMute: () => void;
  isMuted: boolean;
  showControls: boolean;
}) {
  return (
    <>
      <motion.div
        onClick={toggleMute}
        className={clsx("cursor-pointer absolute bottom-3 left-2 z-40 p-1 rounded", {
          "bg-black/30": showControls,
          "pointer-events-none": !showControls,
        })}
        initial={{ opacity: 0 }}
        animate={{ opacity: showControls ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {!isMuted ? (
          <FaVolumeUp color="white" size={16} />
        ) : (
          <FaVolumeDown color="white" size={16} />
        )}
      </motion.div>

      {!isMobile && (
        <motion.div
          onClick={toggleFullscreen}
          className={clsx("cursor-pointer absolute right-3 bottom-3 z-40 p-1 rounded", {
            "bg-black/30": showControls,
            "pointer-events-none": !showControls,
          })}
          initial={{ opacity: 0 }}
          animate={{ opacity: showControls ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {isFullscreen ? (
            <BsFullscreenExit color="white" size={14} />
          ) : (
            <BsArrowsFullscreen color="white" size={14} />
          )}
        </motion.div>
      )}
    </>
  );
}