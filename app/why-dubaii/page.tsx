import Image from 'next/image'
import React from 'react'
import {  why_dubai_icon } from '../assets'
import HeaderSecondary from '@/components/Header/HeaderSecondary'
import Container from '@/components/atom/Container/Container'

function page() {
    return (
        <main>
            <div className="w-full flex flex-col justify-start items-center  relative h-[619px] bg-green-400">
                <Container>
                    <div className="absolute z-40 top-0 left-0 w-full h-full">
                        <HeaderSecondary />
                    </div>
                    <Image
                        alt=''
                        className='object-cover'
                        fill
                        src={why_dubai_icon}
                    />

                </Container>

                {/* <Card /> */}

            </div>

            <section>
            
            <div className="flex flex-col md:flex-row items-center justify-between bg-white/30 backdrop-blur-md rounded-xl p-6 shadow-md">
      <div className="md:w-2/3 text-left">
        <h2 className="text-2xl md:text-3xl font-bold">
        High Return on Investment  <span className="text-blue-500">((ROI))</span>
        </h2>
        <p className="text-gray-700 mt-2">Dubai offers some of the highest rental yields globally, ranging between 6% to 10% annually. Compared to other major cities like New York, London, or Hong Kong, Dubai provides better value for money with relatively affordable property prices and strong rental demand.</p>
      </div>
      <div className="md:w-1/3 flex justify-center mt-4 md:mt-0">
        {/* <img src={} alt="icon" className="h-20 w-20 object-contain" /> */}
      </div>
    </div>


            </section>




        </main>
    )
}

export default page



