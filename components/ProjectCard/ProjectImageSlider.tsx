import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { black_down_icon, black_right_down_icon } from '@/app/assets';
import { AllProjectsItems } from '@/redux/project/types';

function ProjectImageSlider({ item }: { item: AllProjectsItems }) {
    const swiperRef = useRef<any>(null);

    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    const handleSwiper = (swiper: any) => {
        swiperRef.current = swiper;
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    };

    const handleSlideChange = (swiper: any) => {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    };
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

    
    const getProjectTypeLabel = (projectType: ProjectType): string => {
        switch (projectType) {
          case 'commercial-residential':
            return 'Commercial & Residential';
          case 'project-commercial':
            return 'Commercial Project';
          case 'project-residential':
            return 'Residential Project';
          case 'resale-commercial':
            return 'Commercial Resale';
          case 'resale-residential':
            return 'Residential Resale';
          case 'secondary-residential':
            return 'Secondary Residential';
          case 'land-commercial':
            return 'Commercial Land';
          case 'land-residential':
            return 'Residential Land';
          case 'secondary-commercial':
            return 'Secondary Commercial';
          default:
            // This ensures TypeScript will warn us if we add a new ProjectType but forget to add a label
            const exhaustiveCheck: never = projectType;
            return exhaustiveCheck;
        }
      };

    return (
        <div className="relative group  lg:max-w-[350px] w-full rounded h-full">
            <Swiper
                pagination={{
                    dynamicBullets: true,
                }}
                keyboard={{ enabled: true }}
                navigation={{
                    prevEl: '.image-swiper-button-prev',
                    nextEl: '.image-swiper-button-next',
                }}
                modules={[Pagination, Navigation, Keyboard]}
                onSwiper={handleSwiper}
                onSlideChange={handleSlideChange}
                className="mySwiper relative w-full h-full"
            >
                <div className="left-3 absolute z-[1000] top-3">

               { (item.handOverQuarter && item.handOverYear)  &&<div className="bg-white flex text-[10px] items-center rounded-[2px] py-1  px-2">
                    Handover Date : {item.handOverQuarter} {item.handOverYear} 
                </div>}

                { (item.projectType)  &&<div className="bg-white mt-1  w-fit flex text-[10px] items-center rounded-[2px] py-1  px-2">
                    {getProjectTypeLabel(item.projectType)} 
                </div>}
                </div>

                {item.mainImages.length > 0 &&
                    item.mainImages.map((img: any, index: number) => (
                        <SwiperSlide key={index} className="w-full h-full">
                            <Image
                                src={img.secure_url}
                                className="object-cover"
                                fill
                                alt="project image"

                            />
                        </SwiperSlide>
                    ))}
            </Swiper>

            <button
                className={`image-swiper-button-prev absolute left-2 top-1/2 z-10 transform -translate-y-1/2 h-6 w-6 bg-white text-red-500 rounded-full p-2 shadow-md hover:bg-red-100 transition-opacity duration-200 ${isBeginning ? 'opacity-30 cursor-not-allowed' : 'opacity-100 cursor-pointer'
                    } hidden group-hover:flex`}
                disabled={isBeginning}
            >

                <Image
                    src={black_down_icon}
                    className="object-cover p-2"
                    fill
                    alt="previous icon"

                />
            </button>
            <button
                className={`image-swiper-button-next absolute right-2 top-1/2 z-10 transform -translate-y-1/2 h-6 w-6 bg-white text-red-500 rounded-full p-2 shadow-md hover:bg-red-100 transition-opacity duration-200 ${isEnd ? 'opacity-30 cursor-not-allowed' : 'opacity-100 cursor-pointer'
                    } hidden group-hover:flex`}
                disabled={isEnd}
            >
                <Image
                    src={black_right_down_icon}
                    className="object-cover p-2"
                    fill
                    alt="next icon"

                />
            </button>
        </div>
    );
}

export default ProjectImageSlider;
