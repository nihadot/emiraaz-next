"use client";

import { aedIcon, enquiryIcon } from "@/app/assets";
import { openEnquiry, setEnquiry, setProjectId } from "@/redux/enquiry/enquiry";
import { Bookmark, MapPin, BedDouble, Bath, Square, CirclePercent, UserPlus } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { LiaBedSolid, LiaUserPlusSolid } from "react-icons/lia";
import { PiBathtubLight, PiMapPinFill, PiUserLight } from "react-icons/pi";
import { RiFullscreenLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import { GrFormNext } from "react-icons/gr";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { AnimatePresence, motion } from "framer-motion";
import { LuUserRoundPlus } from "react-icons/lu";
export default function PropertyCardUI({
  images,
  title,
  type,
  location,
  beds,
  totalFloors,
  area,
  formattedPrice,
  discount,
  id,
  handleClick,
}: {
  images: string[];
  title: string;
  type: string;
  location: string;
  beds: string;
  totalFloors?: string;
  area: number;
  formattedPrice: string;
  discount?: number;
  id: string;
  handleClick?: () => void;
}) {

  const dispatch = useDispatch();
  const handleEnquiry = () => {
    dispatch(openEnquiry());
    dispatch(setProjectId(id))
  }

  const test = 'sdsd dsd sdd d ddsd dsdsd  ds sd sds dsd ds d dsd'


  const [[index, direction], setSlide] = useState<[number, number]>([0, 0]);

  const next = () =>
    setSlide(([i]) => [(i + 1) % images.length, 1]);

  const prev = () =>
    setSlide(([i]) => [(i - 1 + images.length) % images.length, -1]);

  // const EnquiryIcon

  return (
    <div className="flex gap-2 p-2 border border-[#DEDEDE] rounded-xl mt-3">
      {/* Image */}
      <div
        onClick={handleClick}
        className="relative w-[130px] h-[128px] rounded-xl overflow-hidden"
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            initial={{
              x: direction > 0 ? "100%" : "-100%",
              opacity: 0,
            }}
            animate={{ x: "0%", opacity: 1 }}
            exit={{
              x: direction > 0 ? "-100%" : "100%",
              opacity: 0,
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -50) next();
              if (info.offset.x > 50) prev();
            }}
            className="absolute inset-0"
          >
            <Image fill alt="" src={images[index]} className="object-cover" />
          </motion.div>
        </AnimatePresence>

        {discount && (
          <span className="absolute flex gap-1 top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-lg z-10">
            {discount}
          </span>
        )}
      </div>


      {/* Content */}
      <div className="flex-1 relative font-poppins gap-0 flex flex-col justify-start">
        <div className="flex flex-col">
          <p
            onClick={handleClick}

            className="text-[10px] pt-0 capitalize line-clamp-1 pe-4  text-[#767676] font-poppins font-normal ">{type}</p>
          <h3
            onClick={handleClick}

            className="text-base mt-2 leading-3 line-clamp-1 font-poppins font-semibold">{title}</h3>

          <p
            onClick={handleClick}

            className="flex line-clamp-1 mt-2 items-center gap-1 text-[#767676] text-xs">
            <PiMapPinFill size={18} color="#767676" /> <span className="font-poppins font-normal text-[#767676] line-clamp-1">{location}</span>
          </p>

          <div
            onClick={handleClick}

            className="flex line-clamp-1 gap-2 mt-2 text-sm text-[#767676] ">
            <div className="flex items-center font-poppins font-normal text-xs gap-1">
              <div className="">
                <LiaBedSolid size={18} color="#767676" />
              </div>
              <span className=" line-clamp-1">{beds}</span>
            </div>
            <span className="flex items-center gap-1">
              <div className="">
                <PiBathtubLight size={18} color="#767676" />
              </div>
              <span
                className="font-poppins font-normal line-clamp-1 text-xs"
              >

                {totalFloors}
              </span>
            </span>
            <span className="flex items-center gap-1">
              <div className="">
                <RiFullscreenLine size={18} color="#767676" />
              </div>
              <span
                className="font-poppins font-normal line-clamp-1 text-xs"
              >

                {area} sqft
              </span>
            </span>
          </div>
        </div>

        <div


          className="flex items-center mt-[18px] justify-between">
          <p
            onClick={handleClick}
            className="flex leading-[24px] items-center text-xl font-semibold text-red-500"
          >
            <Image
              alt="aed"
              src={aedIcon}
              className="w-[18px] h-[18px] me-1 shrink-0"
            />

            <span className="line-clamp-1 font-poppins font-semibold max-w-[160px] break-all overflow-hidden">
              {formattedPrice}
            </span>

            <span className="ml-1 block top-[3px] relative text-[#767676] text-[10px] font-medium shrink-0">
              {formattedPrice?.length > 9 ? "..." : "Onwards"}
            </span>
          </p>

          <div className="absolute top-0 right-0">

            <CiBookmark size={24} className="text-black" />
          </div>

          <div onClick={handleEnquiry} className="absolute bottom-0 right-0">
            {/* <Image src={enquiryIcon} alt="enquiry icon" width={20} height={20} /> */}
            {/* <EnquiryIcon
            width={20}
            height={20}
            /> */}
            <div className="">
            <PiUserLight size={18} className="text-black" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

{/* <motion.div
  key={`shimmer-${index}`}
  initial={{ x: "-100%", opacity: 0 }}
  animate={{ x: "120%", opacity: [0, 1, 0] }}
  transition={{ duration: 0.6, ease: "easeInOut" }}
  className="absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-white/70 to-transparent z-20"
/> */}


function ProjectImageSlider({ images }: { images: any[] }) {

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  console.log(images, 'images')

  return (
    <div className="relative group  lg:max-w-[350px] w-full rounded h-[200px] sm:h-full">




      <button
        ref={prevRef}
        className="absolute cursor-pointer left-2 top-1/2 z-10 transform -translate-y-1/2 h-[20px] w-[20px] bg-white/75 text-red-500 rounded-[4.5px] justify-center items-center hover:opacity-80 transition-opacity duration-200 group-hover:flex"
      >
        <div className="flex justify-center items-center w-full h-full">
          <GrFormNext color="black" className=' w-[15px] h-[15px] -rotate-180' />
        </div>
      </button>

      <button
        ref={nextRef}
        className="absolute cursor-pointer right-2 top-1/2 z-10 transform -translate-y-1/2 h-[20px] justify-center items-center w-[20px] bg-white/75 text-red-500 rotate-180 rounded-[4.5px] hover:opacity-80 transition-opacity duration-200 group-hover:flex"
      >
        <div className="flex justify-center items-center w-full h-full">
          <GrFormNext color="black" className=' w-[15px] h-[15px] -rotate-180' />

        </div>
      </button>
    </div>
  )
}