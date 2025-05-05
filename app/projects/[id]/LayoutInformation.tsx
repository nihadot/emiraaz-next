import Image from 'next/image'
import React from 'react'
import ProjectHeader from './ProjectHeader'

type Props = { images: { secure_url: string }[], }

function LayoutInformation({
  images
}: Props) {
  return (
    <div className=''>
      <ProjectHeader
        title='Floor Plans and Layouts'
        contentClassName='font-poppins text-[18.75px] mb-[13.5px] font-medium'
      />
      <div className="flex gap-[8.25px] mt-2 flex-wrap">
        {images.slice(0, 2).map((item, index) => (
         <div key={index} className="relative border-[#DEDEDE] border object-cover rounded-[3.5px] w-[271px] h-[174.75px]">
           <Image
            key={index}
           fill
            src={item.secure_url}
            alt={`Thumbnail ${index}`}
            className={`cursor-pointer border-none`}
          />
         </div>
        ))}

        <div className="border-[#DEDEDE] text-[15px] font-medium font-poppins gap-2 text-[#FF1645] flex rounded-[3.5px] justify-center items-center border w-[174.75px] h-[174.75px]">
          +{images && images.length > 2 && images.length - 2 || 0} More
        </div>
      </div>
    </div>
  )
}

export default LayoutInformation