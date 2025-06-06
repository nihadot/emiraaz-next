import React from 'react'


function MobileFooterBanner({ }) {
    return (
       <>
        <div className="px-5 lg:px-8 flex sm:hidden">

            <div className='border-[#DEDEDE] px-3 py-4 rounded-[7.6px]  border '>
                <div className="rounded-[1px] border-[#DEDEDE] flex flex-col justify-center items-center">
                    <p className='font-poppins text-[20.48px] font-semibold text-black text-center mb-[5.96px]'>Join Our Network of Freelance Agents</p>
                    <div className="font-poppins mb-[5.96px] text-center font-medium text-[15px]">
                        Empower your real estate career with PropertySeller. Register now for an 80/20 commission split, work on your own terms, and confidently close deals on our platform!
                    </div>

                    <button className='bg-black font-poppins font-normal sm:font-medium text-[14px] rounded-[5px] w-[201.9px] h-[37.4px] flex justify-center items-center text-white px-3 py-3'>List Your Property Now!</button>
                </div>



                <div className="rounded-[1px] mt-[24.7px] border-[#DEDEDE] flex flex-col justify-center items-center">
                    <p className='font-poppins text-[20.48px] font-semibold text-black text-center mb-[5.96px]'>Are You a Property Owner?</p>
                    <div className="font-poppins mb-[5.96px] text-center font-medium text-[15px]">
                        Ready to sell your property? Join our community of sellers and showcase your listings to a wide audience. Get started today by filling out our simple registration form!
                    </div>

                    <button className='bg-black font-poppins font-normal  sm:font-medium text-[14px] rounded-[5px] w-[201.9px] h-[37.4px] flex justify-center items-center text-white px-3 py-3'>List Your Property Now!</button>
                </div>
            </div>
        </div>
       </>

    )
}

export default MobileFooterBanner