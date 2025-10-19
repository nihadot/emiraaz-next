import React from "react";
import { FaSearch } from "react-icons/fa";

interface SearchInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
}

const SearchNew: React.FC<SearchInputProps> = ({
    value,
    onChange,
    placeholder = "Search...",
    className = "",
}) => {
    return (
        <div
            className={`flex flex-1   gap-3 h-full w-full text-[13px] items-center outline rounded-[3px] px-3 py-3   outline-[#DEDEDE] text-sm ${className}`}
        >
            {/* <Image src={search_icon} alt='menu icon' width={17.25} className="object-cover" height={17.25} /> */}
           <div className="w-[17px] h-[17px]">
             <FaSearch color="#FF1645" className="text-[11px] w-[17px] h-[17px]" />
           </div>
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="outline-none h-full flex-1 text-base md:text-sm font-normal  font-poppins bg-transparent  "
            />
        </div>
    );
};

export default SearchNew;
