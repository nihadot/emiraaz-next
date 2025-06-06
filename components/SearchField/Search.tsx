import { search_icon } from "@/app/assets";
import Image from "next/image";
import React from "react";

interface SearchInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
    value,
    onChange,
    placeholder = "Search...",
    className = "",
}) => {
    return (
        <div
            className={`flex flex-1   gap-3 h-full w-full text-[13px] items-center border rounded-[5px] px-3 py-3   border-[#DEDEDE] text-sm ${className}`}
        >
            <Image src={search_icon} alt='menu icon' width={17.25} className="object-cover" height={17.25} />

            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="outline-none h-full flex-1 text-[12px] font-normal  font-poppins bg-transparent  "
            />
        </div>
    );
};

export default SearchInput;
