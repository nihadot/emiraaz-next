import { topArrowIcon } from '@/app/assets'
import Image from 'next/image'
import React from 'react'

function SearchComponent() {
    return (
        <div className="rounded-full ps-4 pe-1 flex border-[#D4D4D4] w-full py-1 border-[1.5px] ">
            <input type="text"
            placeholder='Type your requirement'
                className='text-[#666666] text-[12px] font-poppins font-normal w-full outline-none border-none bg-white   '
            />
            <button className='border bg-[#FF1645] text-[#FFFFFF] rounded-full flex justify-center items-center h-[41px] w-[50px] text-[12px] font-poppins font-normal'>
               <div className="relative w-[38px] h-[38px] flex justify-center items-center">
                <Image src={topArrowIcon} alt='top arrow icon' fill className="object-cover " />   
               </div>
            </button>
        </div>
    )
}

export default SearchComponent