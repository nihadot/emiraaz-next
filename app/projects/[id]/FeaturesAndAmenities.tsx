import React from 'react'
import ProjectHeader from './ProjectHeader';
import Image from 'next/image';

type Props = {
    headerTitle: string;
    data: { name: string, icon: string }[];
    handleModal:() => void; 
}

function FeaturesAndAmenities({ headerTitle, data,handleModal }: Props) {
    
    
    const visibleData = data.slice(0, 6);
    const remainingCount = data.length > 6 ? data.length - 6 : 0;
    

    return (
        <div className='mt-10'>
            <ProjectHeader title={headerTitle} />
            <div className="flex gap-2 mt-3 flex-wrap">
                {
                    visibleData.map((item, index) => (
                        <div key={index} className="rounded-md gap-3 flex items-center justify-center flex-col w-[120px] h-[120px] p-4 bg-[#F5F5F5] border-[#DEDEDE]">
                            <Image
                                height={40}
                                width={40}
                                src={item.icon}
                                alt={`Thumbnail ${index}`}
                                className={`cursor-pointer object-cover`}
                            />
                            <p className='text-[10px] font-poppins text-center text-black/70'>{item.name}</p>
                        </div>
                    ))
                }

                {remainingCount > 0 && (
                    <div onClick={handleModal} className="border-[#DEDEDE] gap-2 text-[#FF1645] flex font-medium font-poppins text-xs px-3 text-center rounded-md justify-center items-center border w-[120px] h-[120px] cursor-pointer">
                        +{remainingCount} More Amenities
                    </div>
                )}
            </div>
        </div>
    );
}

export default FeaturesAndAmenities