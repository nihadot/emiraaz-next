import { back_to_black_icon, share_black_icon, wishlist_black_icon } from '@/app/assets'
import Image from 'next/image'
import React from 'react'


function MobileBreadcrumbNavigation() {
  return (
    <div className="flex px-5 sm:hidden py-3 lg:px-8 xl:px-24 max-w-[1440px] w-full justify-between">
                <div className=" bg-red-600/10 p-3 w-fit rounded relative">
                    <Image
                    src={back_to_black_icon}
                    width={20}
                    height={20}
                    className="object-contain"
                    alt="back to"
                    />
                </div>

                <div className="flex gap-1 items-center">


                <div className=" bg-red-600/10 p-3 w-fit rounded relative">
                    <Image
                    src={wishlist_black_icon}
                    width={20}
                    height={20}
                    className="object-contain"
                    alt="back to"
                    />
                </div>

                <div className=" bg-red-600/10 p-3 w-fit rounded relative">
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