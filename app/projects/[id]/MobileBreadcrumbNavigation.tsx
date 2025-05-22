'use client'
import { back_to_black_icon, share_black_icon, wishlist_black_icon } from '@/app/assets'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { IoChevronBackOutline } from "react-icons/io5";
import { GoHeart } from "react-icons/go";
import { PiShareFat } from "react-icons/pi";
import { handleShare } from '@/utils/shareOption'


function MobileBreadcrumbNavigation({projectTitle}:{projectTitle:string}) {

    const navigate = useRouter();
    const goBack = () => {
        navigate.push('/')
    }

    const handleShareFun = async (title:string) => {
        handleShare(title);
    }
  return (
    <div className="flex px-5  sm:hidden py-3 h-[64px] w-full items-center justify-between">
                <div onClick={()=> goBack() } className="bg-[#FFE7EC] p-2 w-fit rounded relative">
                    {/* <Image
                    src={back_to_black_icon}
                    width={17}
                    height={17}
                    className="object-contain"
                    alt="back to"
                    /> */}
                    <IoChevronBackOutline color='#FF1645' size={20} />
                </div>

                <div className="flex gap-1 items-center">


                <div className="px-[10px] bg-[#FFE7EC] p-2  w-fit rounded relative">
                    {/* <Image
                    src={wishlist_black_icon}
                    width={20}
                    height={20}
                    className="object-contain"
                    alt="back to"
                    /> */}

                    <GoHeart
                    color='#FF1645'
                    size={19}
                    />

                </div>

                <div
                onClick={()=>handleShareFun(projectTitle)}
                className=" w-fit rounded bg-[#FFE7EC] p-2 relative">
                  
                    <PiShareFat
                    color='#FF1645'
                    size={20}
                    />
                </div>
                </div>


            </div>
  )
}

export default MobileBreadcrumbNavigation