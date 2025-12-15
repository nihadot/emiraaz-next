import { Search, SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

function SearchMobileUI({ value, onChange, onFilterClick, searchIcon, filterIcon }: any) {
  return (
    <div className="">
      <div className="flex  items-center gap-3">
        <div className="flex-1 flex items-center gap-2 bg-white rounded-[12px]  px-2 py-2 border border-[#DEDEDE]">
          {/* <Image src={searchIcon} alt="" width={20} height={20} /> */}
          <Search
            width={22}
            height={22}
            // size={24}
            className="ml-1"
          />
          <input
            type="text"
            placeholder="Search.."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full font-poppins  border-none outline-none text-base text-black placeholder:text-gray-400"
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
            className="bg-red-500 p-3 rounded-[7px] "
          >
            <SlidersHorizontal width={20} height={20} color="white" />
          </motion.button>
        </div>

      </div>
    </div>
  );
}

export default SearchMobileUI;
