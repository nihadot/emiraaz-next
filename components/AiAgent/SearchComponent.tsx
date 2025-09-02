import { topArrowIcon } from '@/app/assets'
import Image from 'next/image'
import React, { ChangeEvent, KeyboardEvent } from 'react'

interface SearchComponentProps {
    placeholder?: string
    value?: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    onSearch?: () => void
    onEnterPress?: () => void
    buttonIcon?: string
    buttonStyle?: string
    inputStyle?: string
}

const SearchComponent: React.FC<SearchComponentProps> = ({
    placeholder = 'Type your requirement',
    value = '',
    onChange,
    onSearch,
    onEnterPress,
    buttonIcon = topArrowIcon,
    buttonStyle = 'border bg-[#FF1645] text-[#FFFFFF] rounded-full flex justify-center items-center h-[41px] w-[50px] text-[12px] font-poppins font-normal',
    inputStyle = 'text-[#666666] text-[12px] font-poppins font-normal w-full outline-none border-none bg-white'
}) => {
    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && value.trim() && onEnterPress) {
            onEnterPress()
        }
    }

    const isDisabled = !value.trim()

    return (
        <div className="rounded-full ps-4 pe-1 flex border-[#D4D4D4] w-full py-1 border-[1.5px]">
            <input
                type="text"
                placeholder={placeholder}
                className={inputStyle}
                value={value}
                onChange={onChange}
                onKeyDown={handleKeyPress}
            />
            <button
                className={`${buttonStyle} ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={onSearch}
                disabled={isDisabled}
            >
                <div className="relative w-[38px] h-[38px] flex justify-center items-center">
                    <Image src={buttonIcon} alt='search icon' fill className="object-cover" />
                </div>
            </button>
        </div>
    )
}

export default SearchComponent
