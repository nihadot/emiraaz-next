// import Image from "next/image";
// import React, { useEffect, useRef, useState } from "react";
// import { play_icon } from "../assets";
// import { FaPause, FaPlay, FaRegPlayCircle, FaReply, FaStreetView, FaVolumeDown, FaVolumeUp } from "react-icons/fa";
// import clsx from "clsx";
// import { motion, AnimatePresence } from "framer-motion";
// import { MdOutlineReplay } from "react-icons/md";
// import { BsArrowsFullscreen } from "react-icons/bs";

// type VideoPreviewProps = {
//   src: string;
//   width?: string;
//   height?: string;
//   dimOpacity?: number;
// };

// const VideoPreview: React.FC<VideoPreviewProps> = ({
//   src,
//   dimOpacity = 0.5,
// }) => {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isMuted, setIsMuted] = useState(true);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [showControls, setShowControls] = useState(true);
//   const [showReplay, setShowReplay] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const hideTimeout = useRef<any>(null);

//   const togglePlay = () => {
//     const video = videoRef.current;
//     if (!video) return;
  
//     if (video.paused || video.ended) {
//       video.play();
//       setIsPlaying(true);
//       setShowReplay(false);
//     } else {
//       video.pause();
//       setIsPlaying(false);
//     }
//   };

//   const toggleMute = () => {
//     const video = videoRef.current;
//     if (video) {
//       video.muted = !video.muted;
//       setIsMuted(video.muted);
//     }
//   };

//   const toggleFullscreen = () => {
//     setIsFullscreen((prev) => !prev);
//   };

//   const resetHideTimer = () => {
//     setShowControls(true);
//     if (hideTimeout.current) clearTimeout(hideTimeout.current);

//     hideTimeout.current = setTimeout(() => {
//       setShowControls(false);
//     }, 700);
//   };

//   useEffect(() => {
//     const handleMouseMove = () => resetHideTimer();

//     window.addEventListener("mousemove", handleMouseMove);
//     resetHideTimer();

//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//       if (hideTimeout.current) clearTimeout(hideTimeout.current);
//     };
//   }, []);

//   useEffect(() => {
//     const video = videoRef.current;
//     if (video) {
//       const playPromise = video.play();
//       if (playPromise !== undefined) {
//         playPromise
//           .then(() => {
//             setIsPlaying(true);
//           })
//           .catch((error) => {
//             console.error("Auto-play blocked or failed:", error);
//           });
//       }
//     }
//   }, []);
  

//   return (
//     <AnimatePresence>
//       <motion.div
//         layout
//         // transition={{ type: "", stiffness: 300, damping: 30 }}
//         className={clsx(
//           "relative flex flex-col h-[250px] w-full",
//           // isFullscreen ? "!absolute h-[85vh] !left-[-900px] !w-[1220px] p-4 z-50 bg-black -top-[130px]  rounded-xl" : "h-[250px]"
//         )}
//       >
//         <div className="w-full relative flex h-full">
//         <video
//   ref={videoRef}
//   src={src}
//   muted={isMuted}
//   autoPlay // ✅ Auto play enabled
//   style={{
//     filter: `brightness(${1 - dimOpacity})`,
//     objectFit: "cover",
//   }}
//   onEnded={() => {
//     setIsPlaying(false);
//     setShowReplay(true);
//   }}
//   className="w-fit h-full"
// />
  

//           {/* Center Controls */}
//           <div
//             className={clsx(
//               "w-full flex justify-center items-center absolute top-0 left-0 z-30 h-full transition-opacity duration-300",
//               showControls ? "opacity-100 bg-black/5" : "opacity-0 pointer-events-none"
//             )}
//           >
//             {!showReplay ? (
//               <div onClick={togglePlay} className="cursor-pointer p-3 rounded-full">
//                 {isPlaying ? (
//                   <FaPause color="white" />
//                 ) : (
//                   <FaPlay width={21.75} height={21.75} color="white" />
//                 )}
//               </div>
//             ) : (
//               <button
//                 onClick={togglePlay}
//                 className=" px-3 py-1 text-xs rounded"
//               >
//                 <MdOutlineReplay size={21.75} color="white" />
//               </button>
//             )}
//           </div>

//           {/* Bottom Controls */}
//           <div
//             style={{
//               position: "absolute",
//               bottom: "10px",
//               display: "flex",
//               height: "15px",
//               zIndex: 30,
//             }}
//             className={clsx(
//               "w-full px-[10px] justify-between absolute bottom-2 h-[15px] z-[100] transition-opacity duration-300",
//               showControls ? "opacity-100" : "opacity-0 pointer-events-none"
//             )}
//           >
//             <div onClick={toggleMute}>
//               {!isMuted ? (
//                 <FaVolumeUp color="white" size={14} />
//               ) : (
//                 <FaVolumeDown color="white" size={14} />
//               )}
//             </div>

//             {/* <div onClick={toggleFullscreen}> */}
//               <BsArrowsFullscreen color="white" size={14} />
//             {/* </div> */}
//           </div>

//           {/* Progress Bar */}
//           {/* <input
//   type="range"
//   min={0}
//   max={duration || 0.0001} // avoid division by zero
//   value={currentTime}
//   onChange={(e) => {
//     const time = parseFloat(e.target.value);
//     if (videoRef.current) videoRef.current.currentTime = time;
//   }}
//   className="absolute bottom-[25px] left-0 w-full h-[4px] z-40 cursor-pointer rounded-lg appearance-none bg-transparent"
//   style={{
//     background: `linear-gradient(to right, #f00 ${(currentTime / duration) * 100}%, #d1d5db ${(currentTime / duration) * 100}%)`,
//   }}
// /> */}

// <input
//   type="range"
//   min={0}
//   max={duration || 0.0001}
//   value={currentTime}
//   onChange={(e) => {
//     const time = parseFloat(e.target.value);
//     if (videoRef.current) videoRef.current.currentTime = time;
//   }}
//   className="absolute bottom-[25px] left-0 w-full h-[4px] z-40 cursor-default rounded-lg appearance-none bg-transparent
//              [&::-webkit-slider-thumb]:appearance-none
//              [&::-moz-range-thumb]:appearance-none
//              [&::-ms-thumb]:appearance-none"
// />



//         </div>

//         {/* Know More */}
//         {!isFullscreen && (
//           <div className="bg-[#F5F5F5] h-[70px] flex justify-center items-center w-full">
//             <button className="font-poppins text-[9px] w-[97px] h-[25px] flex justify-center items-center bg-[#333333] rounded-[3px] text-white font-medium">
//               Know More
//             </button>
//           </div>
//         )}
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// export default VideoPreview;





import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay, FaVolumeDown, FaVolumeUp } from "react-icons/fa";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineReplay } from "react-icons/md";
import { BsArrowsFullscreen, BsFullscreenExit } from "react-icons/bs";
import { useRouter } from "next/navigation";
import Link from "next/link";

type VideoPreviewProps = {
  src: string;
  width?: string;
  height?: string;
  dimOpacity?: number;
  projectId?:string;
  projectSlug?:string;
};

const VideoPreview: React.FC<VideoPreviewProps> = ({
  src,
  dimOpacity = 0.5,
  projectSlug,
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
      const updateTime = () => {
        setCurrentTime(video.currentTime);
        setDuration(video.duration);
      };
      video.addEventListener("timeupdate", updateTime);
      video.addEventListener("loadedmetadata", () => setDuration(video.duration));
      return () => {
        video.removeEventListener("timeupdate", updateTime);
        video.removeEventListener("loadedmetadata", () => {});
      };
    }
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

  const router = useRouter();
  return (
      <AnimatePresence>
    <motion.div
  layout
  initial={{
    width: isFullscreen ? 0 : "100%",
    height: isFullscreen ? 0 : "250px",
    top: isFullscreen ? "50%" : "auto",
    left: isFullscreen ? "50%" : "auto",
    transform: isFullscreen ? "translate(-50%, -50%)" : "none",
    position: isFullscreen ? "fixed" : "relative",
    zIndex: isFullscreen ? 50 : "auto",
    backgroundColor: isFullscreen ? "transparent" : "transparent",
  }}
  animate={{
    width: isFullscreen ? "1000px" : "100%",
    height: isFullscreen ? "600px" : "250px",
    top: isFullscreen ? "50%" : "auto",
    left: isFullscreen ? "50%" : "auto",
    transform: isFullscreen ? "translate(-50%, -50%)" : "none",
    position: isFullscreen ? "fixed" : "relative",
    zIndex: isFullscreen ? 50 : "auto",
    backgroundColor: isFullscreen ? "transparent" : "transparent",
  }}
  transition={{ type: "spring", stiffness: 300, damping: 30 }}
  className={clsx("flex flex-col")}
>
        <div
          className={clsx(
            "relative flex h-full m-auto",
            isFullscreen ? "items-center justify-center w-full" : ""
          )}
        >
          <video
            ref={videoRef}
            src={src}
            muted={isMuted}
            autoPlay
            style={{
              filter: `brightness(${1 - dimOpacity})`,
              objectFit: isFullscreen ? "contain" : "cover",
              width: isFullscreen ? "100%" : "100%",
              height: isFullscreen ? "100%" : "100%",
              maxHeight: isFullscreen ? "100%" : "250px",
            }}
            onEnded={() => {
              setIsPlaying(false);
              setShowReplay(true);
            }}
            className="mx-auto"
          />

          {/* Center Controls */}
          <div
            className={clsx(
              "w-full flex justify-center items-center absolute top-0 left-0 z-30 h-full transition-opacity duration-300",
              showControls ? "opacity-100 bg-black/5" : "opacity-0 pointer-events-none"
            )}
            onClick={togglePlay}
          >
            {!showReplay ? (
              <div className="cursor-pointer p-3 rounded-full">
                {isPlaying ? (
                  <FaPause color="white" size={24} />
                ) : (
                  <FaPlay width={21.75} height={21.75} color="white" size={24} />
                )}
              </div>
            ) : (
              <button className="px-3 py-1 text-xs rounded">
                <MdOutlineReplay size={24} color="white" />
              </button>
            )}
          </div>

          {/* Bottom Controls */}
          <div
            className={clsx(
              "w-[98%] px-[10px] flex justify-between absolute h-[15px] z-40 transition-opacity duration-300",
              showControls ? "opacity-100" : "opacity-0 pointer-events-none",
              isFullscreen ? ' bottom-6' : 'bottom-3'
            )}
          >
            <div onClick={toggleMute} className="cursor-pointer">
              {!isMuted ? (
                <FaVolumeUp color="white" size={14} />
              ) : (
                <FaVolumeDown color="white" size={14} />
              )}
            </div>
            <div onClick={toggleFullscreen} className="cursor-pointer">
              {isFullscreen ? (
                <BsFullscreenExit color="white" size={14} />
              ) : (
                <BsArrowsFullscreen color="white" size={14} />
              )}
            </div>
          </div>

        </div>

        {/* Know More */}
        {!isFullscreen && (
          <Link href={`/projects/${projectSlug}`} className="bg-[#F5F5F5] h-[70px] flex justify-center items-center w-full">
            <button className="font-poppins text-[9px] w-[97px] h-[25px] flex justify-center items-center bg-[#333333] rounded-[3px] text-white font-medium">
              Know More
            </button>
          </Link>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default VideoPreview;








// import React, { useEffect, useRef, useState } from "react";
// import { FaPause, FaPlay, FaVolumeDown, FaVolumeUp } from "react-icons/fa";
// import clsx from "clsx";
// import { motion, AnimatePresence } from "framer-motion";
// import { MdOutlineReplay } from "react-icons/md";
// import { BsArrowsFullscreen, BsFullscreenExit } from "react-icons/bs";

// type VideoPreviewProps = {
//   src: string;
//   width?: string;
//   height?: string;
//   dimOpacity?: number;
// };

// const VideoPreview: React.FC<VideoPreviewProps> = ({
//   src,
//   dimOpacity = 0.5,
// }) => {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isMuted, setIsMuted] = useState(true);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [showControls, setShowControls] = useState(true);
//   const [showReplay, setShowReplay] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const hideTimeout = useRef<any>(null);

//   console.log(isFullscreen,'isFullscreen')

//   const togglePlay = () => {
//     const video = videoRef.current;
//     if (!video) return;

//     if (video.paused || video.ended) {
//       video.play();
//       setIsPlaying(true);
//       setShowReplay(false);
//     } else {
//       video.pause();
//       setIsPlaying(false);
//     }
//   };

//   const toggleMute = () => {
//     const video = videoRef.current;
//     if (video) {
//       video.muted = !video.muted;
//       setIsMuted(video.muted);
//     }
//   };

//   const toggleFullscreen = () => {
//     setIsFullscreen(prev => !prev);
//   };

//   // const resetHideTimer = () => {
//   //   if (!isFullscreen) {
//   //     setShowControls(true);
//   //     if (hideTimeout.current) clearTimeout(hideTimeout.current);

//   //     hideTimeout.current = setTimeout(() => {
//   //       setShowControls(false);
//   //     }, 700);
//   //   }
//   // };

//   // useEffect(() => {
//   //   const handleMouseMove = () => resetHideTimer();

//   //   if (!isFullscreen) {
//   //     window.addEventListener("mousemove", handleMouseMove);
//   //     resetHideTimer();
//   //   } else {
//   //     setShowControls(true);
//   //   }

//   //   return () => {
//   //     window.removeEventListener("mousemove", handleMouseMove);
//   //     if (hideTimeout.current) clearTimeout(hideTimeout.current);
//   //   };
//   // }, [isFullscreen]);

//   useEffect(() => {
//     const video = videoRef.current;
//     if (video) {
//       const playPromise = video.play();
//       if (playPromise !== undefined) {
//         playPromise
//           .then(() => {
//             setIsPlaying(true);
//           })
//           .catch((error) => {
//             console.error("Auto-play blocked or failed:", error);
//           });
//       }
//     }
//   }, []);

//   useEffect(() => {
//     const video = videoRef.current;
//     if (video) {
//       const updateTime = () => setCurrentTime(video.currentTime);
//       const updateDuration = () => setDuration(video.duration);
      
//       video.addEventListener('timeupdate', updateTime);
//       video.addEventListener('loadedmetadata', updateDuration);
      
//       return () => {
//         video.removeEventListener('timeupdate', updateTime);
//         video.removeEventListener('loadedmetadata', updateDuration);
//       };
//     }
//   }, []);

//   // Bounce animation variants
//   const bounceVariants = {
//     initial: {
//       scale: 0.3,
//       opacity: 0,
//     },
//     animate: {
//       scale: 1,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         damping: 10,
//         stiffness: 100,
//         duration: 0.6,
//       }
//     },
//     exit: {
//       scale: 0.3,
//       opacity: 0,
//       transition: {
//         duration: 0.3,
//       }
//     }
//   };

//   const normalVariants = {
//     initial: { opacity: 0 },
//     animate: { opacity: 1 },
//     exit: { opacity: 0 }
//   };

//   return (
//     <AnimatePresence mode="wait">
//       {isFullscreen ? (
//         // Fullscreen Modal
//         <motion.div
//           key="fullscreen"
//           variants={bounceVariants}
//           initial="initial"
//           animate="animate"
//           exit="exit"
//           className="fixed inset-0 z-50 h-[80vh] m-auto w-[80%] bg-black flex items-center justify-center"
//           onClick={(e) => {
//             if (e.target === e.currentTarget) {
//               toggleFullscreen();
//             }
//           }}
//         >
//           <div className="relative w-full h-full flex items-center justify-center">
//             <video
//               ref={videoRef}
//               src={src}
//               muted={isMuted}
//               autoPlay
//               className="max-w-full max-h-full object-contain"
//               onEnded={() => {
//                 setIsPlaying(false);
//                 setShowReplay(true);
//               }}
//             />

//             {/* Fullscreen Center Controls */}
//             <div className="w-full flex justify-center items-center absolute top-0 left-0 z-30 h-full">
//               {!showReplay ? (
//                 <div onClick={togglePlay} className="cursor-pointer p-4 rounded-full bg-black bg-opacity-30 hover:bg-opacity-50 transition-all">
//                   {isPlaying ? (
//                     <FaPause color="white" size={32} />
//                   ) : (
//                     <FaPlay color="white" size={32} />
//                   )}
//                 </div>
//               ) : (
//                 <button
//                   onClick={togglePlay}
//                   className="p-4 rounded-full bg-black bg-opacity-30 hover:bg-opacity-50 transition-all"
//                 >
//                   <MdOutlineReplay size={32} color="white" />
//                 </button>
//               )}
//             </div>

//             {/* Fullscreen Bottom Controls */}
//             <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
//               <div className="flex items-center space-x-4">
//                 <div onClick={toggleMute} className="cursor-pointer p-2 rounded bg-black bg-opacity-30 hover:bg-opacity-50 transition-all">
//                   {!isMuted ? (
//                     <FaVolumeUp color="white" size={18} />
//                   ) : (
//                     <FaVolumeDown color="white" size={18} />
//                   )}
//                 </div>
//               </div>

//               <div 
//                 onClick={toggleFullscreen}
//                 className="cursor-pointer p-2 rounded bg-black bg-opacity-30 hover:bg-opacity-50 transition-all"
//               >
//                 <BsFullscreenExit color="white" size={18} />
//               </div>
//             </div>

//           </div>
//         </motion.div>
//       ) : (
//         // Normal Video Preview
//         <motion.div
//           key="normal"
//           variants={normalVariants}
//           initial="initial"
//           animate="animate"
//           exit="exit"
//           layout
//           className={clsx(
//             "relative flex flex-col h-64 w-full",
//           )}
//         >
//           <div className="w-full relative flex h-full">
//             <video
//               ref={videoRef}
//               src={src}
//               muted={isMuted}
//               autoPlay 
//               style={{
//                 filter: `brightness(${1 - dimOpacity})`,
//                 objectFit: "cover",
//               }}
//               onEnded={() => {
//                 setIsPlaying(false);
//                 setShowReplay(true);
//               }}
//               className="w-full h-full"
//             />

//             {/* Center Controls */}
//             <div
//               className={clsx(
//                 "w-full flex justify-center items-center absolute top-0 left-0 z-30 h-full transition-opacity duration-300",
//                 showControls ? "opacity-100 bg-black bg-opacity-5" : "opacity-0 pointer-events-none"
//               )}
//             >
//               {!showReplay ? (
//                 <div onClick={togglePlay} className="cursor-pointer p-3 rounded-full">
//                   {isPlaying ? (
//                     <FaPause color="white" />
//                   ) : (
//                     <FaPlay width={21.75} height={21.75} color="white" />
//                   )}
//                 </div>
//               ) : (
//                 <button
//                   onClick={togglePlay}
//                   className="px-3 py-1 text-xs rounded"
//                 >
//                   <MdOutlineReplay size={21.75} color="white" />
//                 </button>
//               )}
//             </div>

//             {/* Bottom Controls */}
//             <div
//               className={clsx(
//                 "w-full px-2 justify-between absolute bottom-2 h-4 z-30 transition-opacity duration-300 flex items-center",
//                 showControls ? "opacity-100" : "opacity-0 pointer-events-none"
//               )}
//             >
//               <div onClick={toggleMute} className="cursor-pointer">
//                 {!isMuted ? (
//                   <FaVolumeUp color="white" size={14} />
//                 ) : (
//                   <FaVolumeDown color="white" size={14} />
//                 )}
//               </div>

//               <div onClick={toggleFullscreen} className="cursor-pointer">
//                 <BsArrowsFullscreen color="white" size={14} />
//               </div>
//             </div>

           
//           </div>

//           {/* Know More */}
//           <div className="bg-gray-100 h-16 flex justify-center items-center w-full">
//             <button className="font-poppins text-xs w-24 h-6 flex justify-center items-center bg-gray-800 rounded text-white font-medium">
//               Know More
//             </button>
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default VideoPreview;