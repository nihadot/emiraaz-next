import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { AllProjectsItems } from '@/redux/project/types';
import Image from 'next/image';
import { IoMdHeartEmpty } from "react-icons/io";
import { formatCurrencyParts } from '@/utils/formateAmount';
import { LiaBedSolid } from 'react-icons/lia';
import Typography from '../atom/typography/Typography';
import { HiOutlineBuildingOffice } from 'react-icons/hi2';
import { TfiLocationPin } from 'react-icons/tfi';


function SmallCard({ item, handleClick }: { item: AllProjectsItems, handleClick: (item: AllProjectsItems) => void }) {
    const prevRef = useRef(null);

    const nextRef = useRef(null);
    const { currency, value } = formatCurrencyParts(item.priceInAED);


    type ProjectType =
        | "commercial-residential"
        | "project-commercial"
        | "project-residential"
        | "resale-commercial"
        | "resale-residential"
        | "secondary-residential"
        | "land-commercial"
        | "land-residential"
        | "secondary-commercial";


    return (
        <div onClick={()=>handleClick(item)} className=" h-56 cursor-pointer w-full rounded-[8px]">
            <div className="h-32">
                <Swiper
                    pagination={{
                        dynamicBullets: true,
                    }}
                    keyboard={{ enabled: true }}
                    navigation={{
                        prevEl: '.image-swiper-button-prev',
                        nextEl: '.image-swiper-button-next',
                    }}
                    onSwiper={(swiper) => {
                        // Delay navigation assignment until refs are defined
                        setTimeout(() => {
                            if (
                                swiper?.params?.navigation &&
                                typeof swiper?.params?.navigation !== 'boolean'
                            ) {
                                swiper.params.navigation.prevEl = prevRef.current;
                                swiper.params.navigation.nextEl = nextRef.current;
                                swiper.navigation.destroy();
                                swiper.navigation.init();
                                swiper.navigation.update();
                            }
                        });

                    }}
                    modules={[Pagination, Navigation, Keyboard]}

                    className="mySwiper rounded-[8px] relative w-full h-full"
                >
                    <div className="">
                        <IoMdHeartEmpty />

                    </div>

                    {item?.mainImages?.length > 0 &&
                        item?.mainImages.map((img: any, index: number) => (
                            <SwiperSlide key={index} className="w-full h-full">
                                <Image
                                    src={img?.secure_url}
                                    className="object-cover"
                                    fill
                                    alt="project image"
                                />
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>

            <div className="">

                <p className='mt-1'>
                    <span className='text-[14px] me-2 font-bold mt-[4.5px] font-poppins '>{currency}</span>
                    <span className='font-poppins font-bold text-[14px]'>
                        {value}
                    </span>
                </p>

                <div className="flex mt-1 justify-start gap-2">

                    <div className="flex items-center gap-2 ">
                        <LiaBedSolid size={20} color='#333' />
                        <Typography
                            tag='p'
                            className='text-[12px] line-clamp-1 font-light font-poppins'
                            text={item.type ?? '-'}
                        />
                    </div>


                    <div className="flex items-center gap-2">
                   
                        <HiOutlineBuildingOffice
                            color='#333'
                            className='w-[18px] h-[18px]'
                        />

                        <Typography
                            tag='p'

                            className='text-[12px] line-clamp-1 font-light font-poppins'
                            text={`${item.totalFloors || 0} floors`}
                        />
                    </div>



                </div>
            </div>




            <div className="flex items-center mt-1 gap-1">
                <div className="">
                    <TfiLocationPin size={18} color='#333333' />
                </div>
              
                <Typography
                    tag='p'

                    className='text-[12px] line-clamp-2 text-ellipsis font-light font-poppins capitalize'
                    text={item?.address || 'Jumeirah Village Circle, Dubai'}
                />
            </div>
        </div>
    )
}

export default SmallCard