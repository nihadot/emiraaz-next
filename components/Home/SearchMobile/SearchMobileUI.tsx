import { Search, SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CiSearch } from "react-icons/ci";

function SearchMobileUI({ value, onChange, onFilterClick, searchIcon, filterIcon }: any) {
  return (
    <div className="">
      <div className="flex  items-center gap-3">
        <div className="flex-1 flex items-center gap-2 bg-white rounded-[12px]  ps-2 py-1.5 border border-[#DEDEDE]">
          {/* <Image src={searchIcon} alt="" width={20} height={20} /> */}
        <div className="">
            <CiSearch
            // width={22}
            // height={22}
            size={26}
            className="ml-1"
          />
        </div>
          <input
            type="text"
            placeholder="Search.."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full font-poppins  border-none outline-none text-sm text-black placeholder:text-[#767676] font-normal"
          />


          <motion.button
            onClick={onFilterClick}
            whileTap={{ scale: 0.85 }}
            whileHover={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 18,
            }}
            className="bg-red-500 me-1.5 p-2.5 rounded-[7px] "
          >
            <div className="">
            <SlidersHorizontal size={18} color="white" />
            </div>
          </motion.button>
        </div>

      </div>
    </div>
  );
}

export default SearchMobileUI;
