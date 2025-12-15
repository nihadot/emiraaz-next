"use client";

import { aedIcon } from "@/app/assets";
import { openEnquiry, setEnquiry, setProjectId } from "@/redux/enquiry/enquiry";
import { Bookmark, MapPin, BedDouble, Bath, Square, CirclePercent, UserPlus } from "lucide-react";
import Image from "next/image";
import { CiBookmark } from "react-icons/ci";
import { LiaBedSolid, LiaUserPlusSolid } from "react-icons/lia";
import { PiBathtubLight, PiMapPinFill } from "react-icons/pi";
import { RiFullscreenLine } from "react-icons/ri";
import { useDispatch } from "react-redux";

export default function PropertyCardUI({
  image,
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
  image: string;
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

  return (
    <div className="flex gap-2 p-2 border border-[#DEDEDE] rounded-xl mt-3">
      {/* Image */}
      <div
        onClick={handleClick}
        className="relative w-[130px] h-[134px] rounded-xl overflow-hidden">
        <Image
          // width={300} height={300}
          alt=""
          fill
          src={image}
          className="w-full h-full  object-cover" />

        {discount && (
          <span className="absolute flex gap-1 top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-lg">
            {discount} <CirclePercent size={16} />
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 relative font-poppins gap-0 flex flex-col justify-start">
        <div className="flex flex-col">
          <p
            onClick={handleClick}

            className="text-xs pt-0 capitalize line-clamp-1  text-[#767676] font-poppins font-normal ">{type}</p>
          <h3
            onClick={handleClick}

            className="text-base mt-3 leading-3 line-clamp-1 font-poppins font-semibold">{title}</h3>

          <p
            onClick={handleClick}

            className="flex line-clamp-1 mt-3 items-center gap-1 text-gray-500 text-xs">
            <PiMapPinFill size={18} color="#767676" /> <span className="font-poppins font-normal text-[#767676] line-clamp-1">{location}</span>
          </p>

          <div
            onClick={handleClick}

            className="flex line-clamp-1 gap-2 mt-3 text-sm text-gray-600 ">
            <span className="flex  items-center font-poppins font-normal text-xs gap-1">
              <LiaBedSolid size={18} /> <span className="">{beds?.length > 6 ? `${beds?.slice(0, 6)}...` : beds}</span>
            </span>
            <span className="flex items-center gap-1">
              <PiBathtubLight size={18} />
              <span
                className="font-poppins font-normal text-xs"
              >

                {totalFloors}
              </span>
            </span>
            <span className="flex items-center gap-1">
              <RiFullscreenLine size={18} />
              <span
                className="font-poppins font-normal text-xs"
              >

                {area} sqft
              </span>
            </span>
          </div>
        </div>

        <div


          className="flex items-center mt-[10px] justify-between">
          <p
            onClick={handleClick}

            className="text-red-500 items-center flex text-xl font-semibold">
            <Image
              alt="aed"
              src={aedIcon}
              className="w-[20px] h-[20px] me-1"
            />
            <span className="line-clamp-1 block">{formattedPrice}</span>
            <span className="text-[#767676] mt-1 font-poppins text-xs font-normal ml-1">Onwards</span>
          </p>

          <div className="absolute top-0 right-0">

            <CiBookmark size={24} className="text-black" />
          </div>

          <div onClick={handleEnquiry} className="absolute bottom-0 right-0">

            <LiaUserPlusSolid size={24} className="text-black" />
          </div>
        </div>
      </div>
    </div>
  );
}
