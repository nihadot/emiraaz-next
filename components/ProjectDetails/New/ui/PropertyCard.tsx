"use client";
import { motion } from "framer-motion";
import { MapPin, Bookmark } from "lucide-react";
import Image from "next/image";
import { CgMaximize } from "react-icons/cg";
import { CiBookmark } from "react-icons/ci";
import { IoBedOutline } from "react-icons/io5";
import { PiBuildingLight } from "react-icons/pi";

export function PropertyCard({ item, onClick }: any) {

     function formatPrice(price: string | string): string {
    if (typeof price === "string") {
      const p = price.trim();
      if (/[a-zA-Z]/.test(p)) return p; // 10M, 5L, etc.
      const num = Number(p.replace(/,/g, ""));
      if (!isNaN(num)) return new Intl.NumberFormat("en-AE").format(num);
      return p;
    }
    return new Intl.NumberFormat("en-AE").format(price);
  }

  const formattedPrice = formatPrice(item.price);


  return (
    <motion.div
    //   whileHover={{ y: -6 }}
    //   whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.25 }}
      className="
        min-w-[300px] bg-white rounded-2xl border border-gray-200
        p-3 cursor-pointer
      "
    >
      {/* Image */}
      <div className="relative h-[180px]  w-full"
      onClick={() => onClick(item.slug)}
      
      >
        <Image
          src={item.image}
          alt={item.title}
          // width={}
          fill
          // height={180}
          className="rounded-xl h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="mt-2 relative">
        <p
      onClick={() => onClick(item.slug)}
        
        className="text-xs font-poppins font-normal capitalize text-gray-500">{item.propertyTypes}</p>
        <h3
      onClick={() => onClick(item.slug)}
        
        className="font-semibold mt-1 truncate font-poppins text-lg">{item.title}</h3>

        <div
      onClick={() => onClick(item.slug)}
        
        className="flex items-center gap-1 text-gray-500 text-sm mt-1">
          <MapPin size={20} />
          <span className="line-clamp-1 font-poppins text-sm  text-black">{item.location}</span>
        </div>

          <div
      onClick={() => onClick(item.slug)}
          
          className="flex gap-3 justify-start items-center mt-3">
                      <div className="flex items-center gap-2">
                        <IoBedOutline size={20} />
                        <p className='text-xs font-poppins font-normal text-[#767676]'>{item?.type}</p>
                      </div>
        
                      <div className="flex items-center gap-2">
                        <PiBuildingLight size={18} />
                        <p className='text-xs font-poppins font-normal text-[#767676]'>{item?.totalFloors}</p>
                      </div>
        
                      <div className="flex items-center gap-2">
                        <CgMaximize size={20} />
                        <p className='text-xs font-poppins font-normal text-[#767676]'>{item?.squareFeet}</p>
                      </div>
                    </div>

       
            <div
      onClick={() => onClick(item.slug)}

              className="flex items-center mt-2 justify-between">
              <p className="text-red-500 items-center flex text-xl font-semibold">

                <span className='me-1 text-base mt-0.5'>AED</span>
                <span className="truncate text-lg font-poppins"> {formattedPrice}</span>
                <span className="text-[#767676] mt-1 font-poppins text-xs font-normal ml-1">Onwards</span>
              </p>

            </div>

               <div className="absolute top-0 right-0">

            <CiBookmark
            size={24}
            className="text-black" />
          </div>

      </div>
    </motion.div>
  );
}
