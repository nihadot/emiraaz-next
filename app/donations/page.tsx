import Container from '@/components/atom/Container/Container'
import { Footer } from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'

function page() {
    return (
        <main>
            <Header />


      <div className="">
        <div className="h-[1px] w-full bg-[#DEDEDE]"></div>
      </div>
      
            <Container>

                <section className='mt-20 mb-40'>
                    <div className="">
                        <h1 className=' font-poppins mt-[51px] text-center font-medium text-[19.5px] sm:text-[37.5px]'>
                            Giving Back to the <span className='text-[#FF1645]
'>Community</span>
                        </h1>
                        <p className=' mt-2 sm:mt-[16.5px] text-center text-[12px] font-poppins font-normal text-[#000000]'>At PropertySeller, we believe in making a positive impact. A portion of our earnings is dedicated to helping those in need.</p>
                    </div>


                    <div className="m-auto mt-4 sm:mt-[66px] rounded-[9px] border-[#DEDEDE] max-w-[618px] border flex justify-center items-center w-full h-[85.25px]">
                        <p className='font-poppins flex items-center sm:flex-row flex-col justify-center gap-2 font-normal text-[14px] md:text-[18.75px]'>Total Donations as of Now: <span className='text-[#FF1645] lg:text-[33.75px] md:text-[28px] text-[18px] sm:text-[34px] font-normal font-poppins'>AED 0</span></p>
                    </div>

                    <div className="mt-4 sm:mt-[66px]">
                        <p className='font-normal text-[13px] md:text-[16px] font-poppins text-[#333333] text-center'>Thank you for being part of our journey to create a better future!</p>
                    </div>
                </section>
            </Container>

            <Footer />
        </main>
    )
}

export default page