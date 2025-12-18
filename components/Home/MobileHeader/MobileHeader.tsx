'use client';

import { motion } from "framer-motion";
import { Ellipsis, MapPin } from "lucide-react";
import { useBottomSheet } from "@/components/BottomSheetWrapper/useBottomSheet";
import FilterBottomSheet from "@/components/BottomSheetWrapper/FilterBottomSheet";

import { useMobileHeaderLogic } from "./useMobileHeaderLogic";
import { useLocationFilterLogic } from "./useLocationFilterLogic";
import LocationFilterUI from "./LocationFilterUI";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { MdKeyboardArrowDown, MdLocationOn } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

export default function MobileHeader({ emirateOptions }: { emirateOptions: any[] }) {
  const sheet = useBottomSheet();

  const { cities } = useSelector((state: RootState) => state.filters);

  const header = useMobileHeaderLogic(sheet, cities?.label || 'Dubai');

  const locationLogic = useLocationFilterLogic("dubai");

  return (
    <>
      <motion.div
        className="w-full py-3 flex items-center justify-between"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={header.actions.handleLocationClick}
          className="flex items-center gap-1 bg-white border border-gray-200 rounded-full px-3.5 py-2"
        >
          <div className="">
          <FaLocationDot size={16} />
          </div>
          {/* <MapPin fill="#000" color="#fff" /> */}
          <span className="text-sm font-poppins font-normal text-gray-800">{cities?.label || 'Dubai'}</span>

          <div className="">
            <MdKeyboardArrowDown
            size={18}
            />
          </div>
        </motion.button>

        <motion.button whileTap={{ scale: 0.85 }} className="p-1 border border-[#DEDEDE] rounded-full">
         <div className="">
           <Ellipsis size={24} />
         </div>
        </motion.button>
      </motion.div>

      <FilterBottomSheet isOpen={sheet.isOpen} onClose={sheet.close}>
        <LocationFilterUI
          onClose={sheet.close}
          emirateOptions={emirateOptions} logic={locationLogic} />
      </FilterBottomSheet>
    </>
  );
}
