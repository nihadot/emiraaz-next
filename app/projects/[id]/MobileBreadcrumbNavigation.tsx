'use client'
import { back_to_black_icon, logoWebP, share_black_icon, wishlist_black_icon } from '@/app/assets'
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
    <div className="flex justify-between px-5  sm:hidden py-3 h-[64px] w-full items-center">
                <div onClick={()=> goBack() } className=" p-0 w-fit rounded relative">
                    {/* <Image
                    src={back_to_black_icon}
                    width={17}
                    height={17}
                    className="object-contain"
                    alt="back to"
                    /> */}
                    <IoChevronBackOutline color='black' size={22} />
                </div>

<div className="w-[120px]  ms-12 h-[30px] relative object-cover">

                  <Image
                    src={logoWebP}
                    className="w-full h-full"
                    alt="logo"
                    fill
                    
                    />
                    </div>

                <div className="flex gap-1 items-center ">


                <div className="px-[10px] bg-transparent p-1  w-fit rounded relative">
                    {/* <Image
                    src={wishlist_black_icon}
                    width={20}
                    height={20}
                    className="object-contain"
                    alt="back to"
                    /> */}

                    <GoHeart
                    color='black'
                    size={19}
                    />

                </div>

                <div
                onClick={()=>handleShareFun(projectTitle)}
                className=" w-fit rounded bg-transparent p-1 relative">
                  
                    <PiShareFat
                    color='black'
                    size={20}
                    />
                </div>
                </div>


            </div>
  )
}

export default MobileBreadcrumbNavigation