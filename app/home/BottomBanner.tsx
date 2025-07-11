import Container from '@/components/atom/Container/Container'
import Link from 'next/link'
import React from 'react'


function BottomBanner({}) {
  return (
    <Container>

    <div className='my-[111px] gap-1 md:flex hidden items-center justify-between'>
        <div className="flex flex-col">
            <h4 className='text-[27.75px] pb-[5.25px] font-semibold font-poppins'>Join Our Network of Freelance Agents</h4>
            <p className='text-[12px] pb-[5.25px] font-normal font-poppins '>Empower your real estate career with PropertySeller. Register now for an 80/20 commission split, work on your own terms, and confidently close deals on our platform!</p>
           <Link
           href={'/login'}
           >
            <button className='text-[14.25px] mt-1 w-fit rounded-[3.5px] px-[13px] font-poppins text-white bg-black font-medium  h-[35.25px] flex justify-center items-center cursor-pointer'>Register Now!</button>
           </Link>
        </div>


        <div className="flex flex-col items-end ">
            <h4 className='text-[27.75px] pb-[5.25px] font-semibold font-poppins'>Are You A Property Owner?</h4>
            <p className='text-[12px] pb-[5.25px] text-end font-normal font-poppins '>Ready to sell your property? Join our community of sellers and showcase your listings to a wide audience. Get started today by filling out our simple registration form!</p>
            <Link
            href={'/seller-registration'}
            >
            <button className='w-fit cursor-pointer mt-1 text-[14.25px] font-poppins px-[13px] rounded-[3.5px] text-white bg-black font-medium h-[35.25px] flex justify-center items-center'>List Your Property Now!</button>
            </Link>
        </div>
    </div>
    </Container>

  )
}

export default BottomBanner