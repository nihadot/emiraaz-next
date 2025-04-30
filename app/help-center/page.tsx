'use client'
import { Footer } from '@/components/Footer'
import Header from '@/components/Header'
import SearchInput from '@/components/SearchField/Search'
import React, { useState } from 'react'


function HelpCenter() {

    const [search, setSearch] = useState("");

    const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };


    return (

        <main>

            <div className=" max-w-[1440px] mx-auto w-full lg:overflow-visible font-[family-name:var(--font-geist-sans)]">
                <Header />


                <div className="  font-poppins px-5 py-20 flex flex-col justify-center items-center max-w-[900px] m-auto lg:px-8 xl:px-24">
                    <h3 className=' text-[30px] mb-2 font-medium'>Help Center</h3>

                    <p className='text-base text-center mb-4 font-light'>
                        <span className='text-[#FF1645] font-light text-base'>Welcome to the Help Center! </span>Here, you can find answers to common questions, access helpful resources, and get assistance with any issues you may encounter. Whether you need guidance on using our platform or have specific inquiries, we’re here to help you every step of the way!
                    </p>

                    <SearchInput
                        value={search}
                        onChange={handleChangeSearch}
                        placeholder="Search..."
                    />
                </div>


                <p className='text-[20px] lg:px-8 xl:px-24 px-5 font-medium text-black font-poppins'>Explore Help Topics</p>


<div className="">
    <div className="border border-[#DEDEDE] rounded-md"></div>
</div>

            </div>

            <Footer />
        </main>
    )
}

export default HelpCenter