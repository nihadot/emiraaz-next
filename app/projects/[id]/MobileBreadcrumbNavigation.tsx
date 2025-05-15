'use client'
import { back_to_black_icon, share_black_icon, wishlist_black_icon } from '@/app/assets'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'


function MobileBreadcrumbNavigation() {

    const navigate = useRouter();
    const goBack = () => {
        navigate.push('/')
    }
  return (
    <div className="flex px-5  sm:hidden py-3 h-[64px] w-full items-center justify-between">
                <div onClick={()=> goBack() } className=" w-fit rounded relative">
                    <Image
                    src={back_to_black_icon}
                    width={17}
                    height={17}
                    className="object-contain"
                    alt="back to"
                    />
                </div>

                <div className="flex gap-1 items-center">


                <div className="px-[12px] w-fit rounded relative">
                    <Image
                    src={wishlist_black_icon}
                    width={20}
                    height={20}
                    className="object-contain"
                    alt="back to"
                    />
                </div>

                <div className=" w-fit rounded relative">
                    <Image
                    src={share_black_icon}
                    width={20}
                    height={20}
                    className="object-contain"
                    alt="back to"
                    />
                </div>
                </div>


            </div>
  )
}

export default MobileBreadcrumbNavigation