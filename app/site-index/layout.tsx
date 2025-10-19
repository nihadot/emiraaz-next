import SectionDivider from '@/components/atom/SectionDivider/SectionDivider'
import MobileHeaderTitle from '@/components/atom/typography/MobileHeaderTitle'
import { Footer } from '@/components/Footer'
import Header from '@/components/Header'
import clsx from 'clsx'
import React from 'react'

function layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Header
        logoSection={
          <div className='h-full w-full flex justify-center items-center'>
            <MobileHeaderTitle
              content='Site Map'
            />
          </div>
        }
      />

      <SectionDivider
        containerClassName={clsx("mb-[12px] mt-[12px]")}
        lineClassName="h-[1px] w-full bg-[#DEDEDE]"
      />


      <main>{children}</main>


      <Footer />
    </main>
  )
}

export default layout