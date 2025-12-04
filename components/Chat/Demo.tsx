//    {(isOpen) && <Modal
//         onClose={close}

//         isOpen={isOpen}
//       >
//         <div
//           className="max-w-[1060px] bg-white w-full sm:w-[90%] xl:w-full relative h-[100dvh] sm:h-full  flex flex-col sm:max-h-[600px] m-auto rounded-none sm:rounded-xl p-[10px] md:p-[18px] "
//         >
//           lorem
//           {/* <div className="">

//             <ControlButtons

//               isFullScreen={false}
//               isClose={true}
//               isMinus={true}
//             />
//           </div> */}
//           {/* Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident saepe eum quod voluptas dolorem eligendi omnis, quia harum tenetur dolorum alias qui veniam molestiae eius libero. Obcaecati possimus unde autem. */}
//           {/* <div className="flex-1  pr-2 mb-2 overflow-auto flex flex-col " ref={topRef}>
//             <ChatReplaySection
//               data={data}
//               isLoading={isLoading}
//             />
//           </div> */}
//           {/* <div className="h-[50px] w-full">

//             <ChatSection
//               isLoading={isLoading}
//               handleKeyDown={handleKeyDown}
//               onSent={onSent}
//               handleChange={handleChange}
//               search={search}
//               clearSearch={clearSearch}
//             />
//           </div> */}

//         </div>
//       </Modal>}



















// "use client";
// import { Circle, Eraser, LoaderPinwheel, Maximize2, Minus, SendHorizontal, Squircle, Triangle, X } from "lucide-react";
// import Modal from "../Modal/Modal";
// import { useChat } from "./ChatProvider";
// import Button from "../atom/button/Button";
// import clsx from "clsx";
// import { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { initSocket } from "@/redux/ai-agent-chat/socketSlice";
// import { AppDispatch } from "@/redux/store";
// import Link from "next/link";
// import { useDeviceType } from "@/utils/useDeviceType";
// import MobileControl from "./MobileControl";

// export default function ChatPopup() {

//   const dispatch = useDispatch<AppDispatch>();

//   const socket = useSelector((s: any) => s.socket.socket);

//   const { isOpen, close, isMinimized } = useChat();
//   const [data, setData] = useState<any>({});
//   const [search, setSearch] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   let sessionId = sessionStorage.getItem("sessionId");

//   useEffect(() => {
//     dispatch(initSocket());
//   }, [dispatch]);


//   useEffect(() => {
//     if (!socket) return;

//     const handleReply = (msg: any) => {
//       console.log('sending function replay got it', msg)
//       setIsLoading(false);
//       setData((prev: any) => ({
//         ...prev,
//         conversations: [...(prev.conversations || []), msg],
//       }));
//     };

//     const handleInitReply = (initialMessages: any) => {
//       setData(initialMessages || {});
//     };

//     socket.on("reply", handleReply);
//     socket.emit("take-initial-data", { sessionId });
//     socket.on("init-reply", handleInitReply);

//     return () => {
//       socket.off("reply", handleReply);
//       socket.off("init-reply", handleInitReply);
//     };
//   }, [socket, isOpen, sessionId]);

//   const onSent = () => {
//     const text = (search || "").trim();
//     if (!text || !socket) return;


//     // show user's message immediately in UI
//     setData((prev: any) => ({
//       ...prev,
//       conversations: [
//         ...(prev.conversations || []),
//       ],
//     }));

//     setIsLoading(true);

//     // emit with sessionId so server can associate
//     socket.emit("message", { message: text });

//     setSearch("");
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearch(e.target.value);

//   }

//   const topRef = useRef<HTMLDivElement>(null);

//   const clearSearch = () => setSearch("");
//   useEffect(() => {
//     if (topRef.current) {
//       topRef.current.scrollTo({
//         top: topRef.current.scrollHeight,
//         behavior: "smooth"
//       });
//     }
//   }, [data?.conversations?.length, isLoading]);

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       onSent(); // your existing send function
//     }
//   };


//   return (

//     <>
//       {(isOpen) && <Modal
//         onClose={close}

//         isOpen={isOpen}
//       >
//         <div
//           className="max-w-[1060px] "
//         >

//           {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit libero ex nisi necessitatibus vel repudiandae facere assumenda eum. Tenetur, repellat harum praesentium nemo nulla aliquid cumque deleniti eius commodi consectetur! */}
//           <ControlButtons
//             isMinus={true}
//             isClose={true}
//             isMinimize={true}

//           />

//                {/* <div className="flex-1  pr-2 mb-2 overflow-auto flex flex-col " ref={topRef}>
//             <ChatReplaySection
//               data={data}
//               isLoading={isLoading}
//             />
//           </div> */}

//         </div>
//       </Modal>}

//       {(isMinimized && !isOpen) && <div className="border fixed left-3 sm:left-auto right-3  bottom-3 h-[300px] z-50 border-[#DEDEDE] bg-white rounded-[12px] flex flex-col gap-3 p-2.5 w-fit sm:w-[440px]  ">
//         <div className="">

//           <ControlButtons
//             isFullScreen={true}
//             isClose={true}
//             isMinus={false}
//           />
//         </div>
//         <div className="flex-1  pr-2 mb-2 overflow-auto flex flex-col " ref={topRef}>
//           {/* <WelcomeHeroSection
//             small
//           /> */}

//           <ChatReplaySection
//             data={data}
//             small
//             isLoading={isLoading}
//           />

//         </div>
//         <div className="h-[40px] w-full">
//           <ChatSection
//             handleKeyDown={handleKeyDown}
//             onSent={onSent}
//             search={search}
//             handleChange={handleChange}
//             small
//             isLoading={isLoading}
//             clearSearch={clearSearch}

//           />
//         </div>
//       </div>}

//     </>

//   );
// }





// function ControlButtons(
//   { isFullScreen, isClose, isMinus, title, isMinimize }
//     :
//     {
//       isFullScreen: boolean,
//       isClose: boolean,
//       isMinus: boolean,
//       title?: boolean,
//       isMinimize?: boolean
//     }
// ) {

//   const isDevice = useDeviceType();


//   // const { close, minimize, maximize } = useChat();

//   return (
//     <div className={clsx(" flex bg-red-300  items-center ",
//       // !title ? "justify-end " : "justify-between",
//     )}>

//       {
//         isDevice === 'mobile' && <MobileControl />
//       }

//       {/* {title && <div className="">
//         <p
//           className="text-lg font-medium font-poppins"
//         ><span className="text-[#FF1645]">AI</span> Agent</p>
//       </div>} */}
//       <div className="flex gap-3 justify-end items-center">

//         {/* {isFullScreen && <div className="cursor-pointer">
//           <Maximize2
//             size={14}
//             onClick={maximize}

//             color="#FF1645"
//           />
//         </div>}

//         {isMinus && <div className="cursor-pointer">
//           <Minus
//             onClick={minimize}
//             color="#FF1645"
//             size={17}
//           />
//         </div>}

//         {isClose && <div className="cursor-pointer">
//           <X
//             size={17}
//             onClick={close}

//             color="#FF1645"
//           />
//         </div>} */}




//       </div>


//     </div>
//   )
// }




// function WelcomeHeroSection({ small }: { small?: boolean }) {
//   return (
//     <div className="flex  flex-col ">
//       {<div className={clsx("flex-1  ",
//         small ? "py-[20px]" : "py-[120px]"
//       )}>
//         <h1 className={clsx("  text-start md:text-center font-medium font-poppins",
//           small ? "text-[20px] leading-[30px]" : "text-[38px] leading-[42px]  lg:leading-[60px]"
//         )}>
//           Meet Your New <span style={{ color: "#FF1645" }}>Property Agent</span>
//         </h1>
//         <p className={clsx("text-[#333333] mt-2 md:mt-0 text-start md:text-center",
//           small ? "text-[12px]" : "text-sm"
//         )}>
//           No more filters. No more forms. Just chat and discover. Powered by{" "}
//           <span style={{ color: "#FF1645" }}>AI</span>
//         </p>

//       </div>}

//       {/* Questions */}
//       <div className="flex flex-col gap-3 mb-3">
//         <div className={clsx("text-[#666666] bg-white w-fit  z-20 border-[#DEDEDE] rounded-md border font-poppins font-normal  ",
//           small ? "text-[10px] py-2 px-3" : "text-sm py-3 px-5"
//         )}>
//           Hi am your ai assistastant to find answers to your questions and get answers


//         </div>


//         {!small && <div className="flex sm:flex-row flex-col  gap-3  ">
//           <SuggetionQuestion
//             title="Question one wht is this and how it working"
//           />
//           <SuggetionQuestion
//             title="Question one wht is this and how it working"
//           />
//           <SuggetionQuestion
//             title="Question one wht is this and how it working"
//           />
//         </div>}


//       </div>
//     </div>
//   )
// }




// function SuggetionQuestion({ title, small, isOwn }: { title: string, small?: boolean, isOwn?: boolean }) {
//   return (
//     <div className={clsx("text-black px-3 py-3 flex justify-center  rounded-md w-fit bg-red-600/10",
//       small ? "text-[10px] px-2 py-1" : "text-sm px-3 py-2",
//       isOwn ? "text-end justify-end" : "text-left justify-start"
//     )}>
//       {<p className="text-gray-600 text-sm">{title}</p>}
//     </div>
//   )
// }


// function ChatSection({ small, handleKeyDown, handleChange, search, clearSearch, onSent, isLoading }: { small?: boolean, handleKeyDown: any, handleChange: any, search: any, clearSearch: any, onSent: any, isLoading: boolean }) {
//   return (
//     <div className={clsx("flex flex-1 h-full gap-1",
//       small ? "h-[40px]" : "md:h-[50px] h-[50px]"
//     )}>
//       <Button
//         onClick={clearSearch}
//         type="button" className={clsx("bg-[#FF1645] h-full cursor-pointer  flex justify-center items-center rounded-[5px]",
//           small ? "w-12 h-full" : "lg:w-40 px-3 py-2"
//         )}>
//         {!small && <span className="text-sm font-medium h-full md:flex hidden text-nowrap  font-poppins text-white">Clear Chat</span>}
//         <div className="w-4 h-4 flex cursor-pointer justify-center items-center">
//           <Eraser size={small ? 18 : 20} color="white" />
//         </div>

//       </Button>

//       <InputField
//         isLoading={isLoading}
//         search={search}
//         handleKeyDown={handleKeyDown}
//         handleChange={handleChange}
//         small={small}
//         onSent={onSent}

//       />

//     </div>
//   )
// }






// function InputField({ small, handleKeyDown, handleChange, search, onSent, isLoading }: { small?: boolean, handleKeyDown: any, handleChange: any, search: any, onSent: any, isLoading: boolean }) {
//   return (
//     <div className={clsx("flex bg-[#F7F7F7] h-full  rounded-[5px] border-[1.5px] border-[#D4D4D4] gap-2 p-0.5 w-full",
//       small ? "ps-[14px]" : "ps-[18px]"
//     )}>
//       <input
//         onKeyDown={handleKeyDown}
//         onChange={handleChange}
//         value={search}
//         type="text" className={clsx("flex-1  outline-none",
//           small ? "placeholder:text-sm" : "placeholder:text-base"
//         )}
//         placeholder="Type your requirement"
//       />
//       <button
//         type="button"
//         onClick={onSent}
//         disabled={!search}
//         className={clsx("bg-[#FF1645]  h-full flex items-center justify-center rounded-md",
//           small ? "w-6" : "w-8",
//           !search ? 'opacity-60' : 'cursor-pointer'
//         )}>
//         {isLoading ? <Squircle
//           className=""
//           fill="#fff"
//           size={small ? 16 : 22}
//           color="white"
//         /> : <SendHorizontal
//           className=""
//           size={small ? 16 : 22}
//           color="white"
//         />}
//       </button>
//     </div>
//   )
// }


// function ChatReplaySection({ data, isLoading, small }: {
//   data: {
//     conversations: {
//       answer: string,
//       prompt: string,
//     }[]
//   }
//   small?: boolean
//   isLoading: boolean
// }) {

//   // const sessionId = sessionStorage.getItem("sessionId");
//   const topRef = useRef<HTMLDivElement>(null);

//   // console.log(data,'Data insde chat replay')
//   const dataSet = data?.conversations || [];

//   console.log(dataSet, 'dataSet')

//   useEffect(() => {
//     if (topRef.current) {
//       topRef.current.scrollTo({
//         top: topRef.current.scrollHeight,
//         behavior: "smooth"
//       });
//     }
//   }, [dataSet.length]);

//   if (!dataSet || dataSet.length === 0) {
//     return (
//       <WelcomeHeroSection />
//     );
//   }

//   //   if(isLoading){
//   //     return (
//   //      <div className="flex gap-2 pt-4">


//   // <div className="flex gap-1 pt-4">
//   //   <div className="dot"></div>
//   //   <div className="dot delay-1"></div>
//   //   <div className="dot delay-2"></div>
//   // </div>

//   // </div>
//   //     )
//   //   }

//   return (
//     <div className="flex flex-col gap-2 pt-4 ps-2" ref={topRef}>



//       {
//         dataSet?.map((item: any, index) => {
//           return (
//             <div
//               key={index}
//               className={clsx("text-black  flex-col  flex  w-full   ",
//               )}>
//               {
//                 <div className={clsx("flex relative ml-auto mt-2  bg-red-600/10  w-fit justify-end",
//                   small ? "px-2 py-2 rounded-[4px]" : "px-3 py-3 rounded-md",
//                   // small && ""
//                 )}>
//                   <p className={clsx("text-gray-600 text-end text-sm",
//                     small ? "text-xs" : "text-sm"
//                   )}>{item?.prompt}</p>

//                   <div className="absolute -right-2 bottom-1.5 w-0 h-0 
//   border-t-8 border-b-8 border-l-8 
//   border-t-transparent border-b-transparent border-l-red-50">
//                   </div>
//                 </div>
//               }


//               {
//                 typeof item.answer === "string" && (
//                   <div className={clsx(
//                     "flex bg-white mt-2 w-fit border border-[#DEDEDE]",
//                     small ? "rounded-[4px]" : "rounded-md"
//                   )}>
//                     <p className={clsx(
//                       "text-black font-poppins font-normal",
//                       small ? "text-xs py-2 px-2" : "text-sm py-3 px-3"
//                     )}>
//                       {item.answer}
//                     </p>
//                   </div>
//                 )
//               }

//               {
//                 item.answer?.message && (
//                   <div className={clsx(
//                     "flex bg-white mt-2 relative w-fit border border-[#DEDEDE]",
//                     small ? "rounded-[4px]" : "rounded-md"
//                   )}>
//                     <p className={clsx(
//                       "text-black font-poppins font-normal",
//                       small ? "text-xs py-2 px-2" : "text-sm py-3 px-3"
//                     )}>
//                       {item.answer.message}
//                     </p>
//                     <div className="absolute -left-2 top-3 w-0 h-0 
//   border-t-8 border-b-8 border-r-8 
//   border-t-transparent border-b-transparent border-r-[#DEDEDE]">
//                     </div>
//                   </div>
//                 )
//               }

//               {
//                 !item.answer?.message &&
//                 Array.isArray(item.answer) &&
//                 item.answer.map((ans: any, i: number) => (
//                   <div
//                     key={i}
//                     className="flex relative px-3 py-3 bg-white mt-2 rounded-md border border-[#DEDEDE] w-fit"
//                   >
//                     <div className="flex flex-col gap-1">
//                       <p className="text-black text-lg font-medium font-poppins">{ans?.projectTitle}</p>
//                       <p className="text-black text-sm">
//                         <span className="font-medium">Price : </span>AED {ans?.priceInAED}
//                       </p>
//                       <p className="text-black text-sm">
//                         <span className="font-medium">Size : </span>{ans?.squareFeet} Sqft
//                       </p>

//                       <p className="text-black text-sm">
//                         <span className="font-medium">Features : </span>
//                         {(() => {
//                           const names = ans?.facilitiesAmenitiesDetails
//                             ?.map((i: { name: string }) => i.name)
//                             .join(", ") || "";
//                           return names.length > 48 ? names.slice(0, 48) + "..." : names;
//                         })()}
//                       </p>

//                       <Link
//                         target="_blank"
//                         href={`/projects/${ans?.slug}`}
//                         className="font-medium underline text-sm text-red-600"
//                       >
//                         View Property Details
//                       </Link>

//                       <div className="absolute -left-2 top-3 w-0 h-0 
//   border-t-8 border-b-8 border-r-8 
//   border-t-transparent border-b-transparent border-r-[#DEDEDE]">
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               }

//               {
//                 isLoading && index === dataSet.length - 1 && (
//                   <div className="flex gap-2 py-3 mt-5 relative px-3 w-fit rounded-md pt-2 border border-[#DEDEDE]">
//                     <div className="dot"></div>
//                     <div className="dot delay-1"></div>
//                     <div className="dot delay-2"></div>
//                     <div className="absolute -left-2 top-3 w-0 h-0 
//   border-t-8 border-b-8 border-r-8 
//   border-t-transparent border-b-transparent border-r-[#DEDEDE]">
//                     </div>    </div>
//                 )
//               }

//             </div>
//           )
//         })
//       }

//     </div>
//   )
// }