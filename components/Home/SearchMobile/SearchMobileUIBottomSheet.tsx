import { CiSearch } from "react-icons/ci";

function SearchMobileUIBottomSheet({ value, onChange,placeholder }: any) {
  return (
      <div className="flex items-center gap-3">
        <div className="flex-1 flex items-center gap-2 bg-white rounded-xl  px-3 py-[10px] border border-[#DEDEDE] ">
          <CiSearch
          size={24}
          className="ml-1"
          />
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 placeholder:text-sm  border-none font-poppins outline-none text-base text-[#767676] placeholder:text-[#767676] font-normal"
          />

        </div>
      
      </div>
  );
}

export default SearchMobileUIBottomSheet;
