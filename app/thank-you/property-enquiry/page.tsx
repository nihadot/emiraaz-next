import { registration_success } from '@/app/assets'
import Container from '@/components/atom/Container/Container'
import SectionDivider from '@/components/atom/SectionDivider/SectionDivider'
import MobileHeaderTitle from '@/components/atom/typography/MobileHeaderTitle'
import RegistrationSuccess from '@/components/EnquiryForm/RegistrationSuccess'
import { Footer } from '@/components/Footer'
import Header from '@/components/Header'
import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'


function pages() {
  return (
    <main>
      <Container>

        <Header
          logoSection={
            <div className='h-full w-full flex justify-center items-center'>
              <MobileHeaderTitle
                content='Thank you'
              />
            </div>
          }
        />




      </Container>

            <SectionDivider
        containerClassName={clsx("mb-[12px] mt-[12px]")}
        lineClassName="h-[1px] w-full bg-[#DEDEDE]"
      />





      <Container>

        <div className={clsx(" w-full m-auto relative")}>
      
          <div className={clsx('min-h-[460px] flex justify-center flex-col px-4 items-center  gap-2  py-10')}>
            <p className={clsx('text-[18px] font-medium font-poppins')}>{'Your Registration Success.'}</p>
            <p className='text-[12px] font-poppins font-light text-center'>{'Our team will contact you Shortly.'}</p>

            <Image src={registration_success} alt="location icon" width={120} height={120} className="object-cover" />


          </div>
        </div>
        
      </Container>


      <Footer />
    </main>
  )
}

export default pages