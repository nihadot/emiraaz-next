import { Footer } from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'

function page() {
    return (
        <main>
            <Header />
            <section className='my-20 px-5  lg:px-8 xl:px-[144.75px max-w-[1200px] '>
                <div className="">
                    <h1 className='text-center py-[14px] lg:text-[37.5px] md:text-[32px] sm:text-[28px] text-[26px] font-medium font-poppins'>Giving Back to the <span className='text-[#FF1645] text-center'>Community</span></h1>
                    <p className='font-poppins font-normal text-[12px] pb-4 text-center text-[#333333]'>At PropertySeller, we believe in making a positive impact. A portion of our earnings is dedicated to helping those in need.</p>
                </div>


                <div className="m-auto rounded-[9px] border-[#DEDEDE] max-w-[618px] border flex justify-center items-center w-full h-[85.25px]">
                    <p className='font-poppins flex items-center sm:flex-row flex-col justify-center gap-2 font-normal text-[14px] md:text-[18.75px]'>Total Donations as of Now: <span className='text-[#FF1645] lg:text-[33.75px] md:text-[28px] text-[18px] sm:text-[21px] font-normal font-poppins'>AED 50,000</span></p>
                </div>

                <div className="py-14">
                    <p className='font-normal text-[13px] md:text-[16px] font-poppins text-[#333333] text-center'>Thank you for being part of our journey to create a better future!</p>
                </div>
            </section>
            <Footer />
        </main>
    )
}

export default page