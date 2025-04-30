import { registration_success } from '@/app/assets'
import Image from 'next/image'
import React from 'react'

function RegistrationSuccess() {
  return (
    <div className='w-[450px] flex justify-center flex-col items-center gap-2  py-10'>
        <p className='text-[18px] font-medium font-poppins'>Your Registration Success</p>
        <p className='text-[12px] font-poppins font-light'>Our team will contact you Shortly</p>

    <Image src={registration_success} alt="location icon" width={120} height={120} className="object-cover" />
        
        
    </div>
  )
}

export default RegistrationSuccess