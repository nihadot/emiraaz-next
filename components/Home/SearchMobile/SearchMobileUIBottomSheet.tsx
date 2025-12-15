import { Search } from "lucide-react";
import Image from "next/image";

function SearchMobileUIBottomSheet({ value, onChange,placeholder }: any) {
  return (
      <div className="flex items-center gap-3">
        <div className="flex-1 flex items-center gap-2 bg-white rounded-xl  px-2 py-[14px] border border-[#DEDEDE]">
          <Search
           width={24}
          height={24}
          className="ml-1"
          />
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 placeholder:text-base  border-none outline-none text-base text-[#767676] placeholder:text-gray-400"
          />

        </div>
      
      </div>
  );
}

export default SearchMobileUIBottomSheet;
