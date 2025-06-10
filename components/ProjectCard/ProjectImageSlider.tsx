import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { black_down_icon, black_right_down_icon, down_icon } from '@/app/assets';
import { AllProjectsItems } from '@/redux/project/types';
import { GrFormNext, GrNext } from 'react-icons/gr';
function ProjectImageSlider({ item }: { item: AllProjectsItems }) {
    const prevRef = useRef(null);
    const swiperRef = useRef<any>(null);
    const nextRef = useRef(null);

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
                return 'Residential & Commercial';
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
        <div className="relative group  lg:max-w-[350px] w-full rounded h-[200px] sm:h-full">
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

                onSlideChange={handleSlideChange}
                className="mySwiper relative w-full h-full"
            >
                <div className="left-3 absolute z-[1000] top-3">

                    {(item.handOverQuarter && item.handOverYear) && <div className="bg-white font-poppins font-medium flex text-[9.5px] items-center rounded-[2px] py-1  px-2">
                        Handover Date : {item.handOverQuarter} {item.handOverYear}
                    </div>}

                    {(item.projectType) && <div className="bg-white mt-1  w-fit flex font-poppins font-medium text-[9.5px] items-center rounded-[2px] py-1  px-2">
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
                ref={prevRef}
                className="absolute cursor-pointer left-2 top-1/2 z-10 transform -translate-y-1/2 h-[20px] w-[20px] bg-white/75 text-red-500 rounded-[4.5px] justify-center items-center hover:opacity-80 transition-opacity duration-200 group-hover:flex"
            >
                <div className="flex justify-center items-center w-full h-full">
                    {/* <Image
                        src={down_icon}
                        className="object-cover relative "
                        width={6}
                        height={3}
                        alt="next icon"
                    /> */}
                    <GrFormNext  color="black" className=' w-[15px] h-[15px] -rotate-180' />
                </div>
            </button>

            <button
                ref={nextRef}
                className="absolute cursor-pointer right-2 top-1/2 z-10 transform -translate-y-1/2 h-[20px] justify-center items-center w-[20px] bg-white/75 text-red-500 rotate-180 rounded-[4.5px] hover:opacity-80 transition-opacity duration-200 group-hover:flex"
            >
                <div className="flex justify-center items-center w-full h-full">
                <GrFormNext  color="black" className=' w-[15px] h-[15px] -rotate-180' />

                </div>
            </button>
        </div>
    );
}

export default ProjectImageSlider;
