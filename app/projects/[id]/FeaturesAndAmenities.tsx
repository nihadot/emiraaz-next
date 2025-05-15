import React from 'react'
import ProjectHeader from './ProjectHeader';
import Image from 'next/image';
import { useDeviceType } from '@/utils/useDeviceType';

type Props = {
    headerTitle: string;
    data: { name: string, icon: string }[];
    handleModal:() => void; 
}

function FeaturesAndAmenities({ headerTitle, data,handleModal }: Props) {
    
    
    const visibleData = data.slice(0, 6);
    const remainingCount = data.length > 6 ? data.length - 6 : 0;
    
  const deviceType = useDeviceType();

    const limit = deviceType === 'mobile' ? 2 : 6;

    if(!limit) return null;

    return (
        <div className='mt-10'>
            <ProjectHeader
        contentClassName='font-medium text-[18.75px]' 
            
            title={headerTitle} />
            <div className="flex gap-2 mt-[15px] flex-wrap">
                {
                    visibleData.slice(0,limit).map((item, index) => (
                        <div key={index} className="rounded-[3px] gap-[8.25px] flex items-center justify-center flex-col w-[99px] h-[99px] p-4 bg-[#F5F5F5] border-[#DEDEDE]">
                            <Image
                                height={25.5}
                                width={25.5}
                                src={item.icon}
                                alt={`Thumbnail ${index}`}
                                className={`cursor-pointer object-cover`}
                            />
                            <p className='text-[9px] font-medium  font-poppins text-center text-black/70'>{item.name}</p>
                        </div>
                    ))
                }

                {remainingCount > 0 && (
                    <div onClick={handleModal} className="border-[#DEDEDE] gap-2 text-[#FF1645] flex font-medium font-poppins text-[11.25px] px-3 text-center rounded-[3px] justify-center items-center border w-[99px] h-[99px] cursor-pointer">
                        +{remainingCount} More Amenities
                    </div>
                )}
            </div>
        </div>
    );
}

export default FeaturesAndAmenities