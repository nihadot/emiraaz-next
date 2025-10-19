import React from 'react'
import { BsStars } from 'react-icons/bs'


function FilterEmpty() {
    return (
        <div
            className='w-full h-full'
        >
            <div className="w-full border border-[#DEDEDE] rounded-[12px] flex flex-col gap-3 px-8 py-12">
                <h2 className='text-center text-3xl font-medium font-poppins'><span className='text-[#FF1645]'>Coming Soon</span> – Properties in This Category</h2>
                <p
                className='text-center text-[#333333] text-xs font-poppins leading-4 font-normal'>We’re working hard behind the scenes to bring you a trusted, reliable, and up-to-date collection of properties in this category.
                    Our team is carefully curating verified listings so you can explore only the best opportunities in the market—whether you’re buying, investing, or selling.</p>
            
            <div className="flex sm:mx-24 border px-4 py-2  rounded-[5px] items-center gap-3 border-[#DEDEDE] ">
                <div className=" flex-1">
                    <BsStars
                    color='#FF1645'
                    size={22} />
                </div>
                <p
                className='text-xs font-poppins leading-4 text-left font-normal'
                >Stay tuned! These listings will be available very soon. PropertySeller is committed to making your property search simple, transparent, and scam-free.</p>
            </div>
            </div>
        </div>
    )
}

export default FilterEmpty