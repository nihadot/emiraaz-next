'use client'
import SectionDivider from '@/components/atom/SectionDivider/SectionDivider'
import MobileHeaderTitle from '@/components/atom/typography/MobileHeaderTitle'
import { Footer } from '@/components/Footer'
import Header from '@/components/Header'
import clsx from 'clsx'
import React, { Suspense } from 'react'


function Page() {
  return (
    <main>
      <Header logoSection={
        <div className='h-full w-full flex justify-center items-center'>
          <MobileHeaderTitle
            content='Property Talks'
          />
        </div>
      } />

      <SectionDivider
        containerClassName={clsx("mb-[12px] mt-[12px]")}
        lineClassName="h-[1px] w-full bg-[#DEDEDE]"
      />

      <section>

      </section>
      <Footer />
    </main>
  )
}

// export default page


export default function OtherNavMenus() {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <Page />
    </Suspense>
  )
}