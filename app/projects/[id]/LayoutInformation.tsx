import Image from 'next/image'
import React from 'react'
import ProjectHeader from './ProjectHeader'

type Props = { images: { secure_url: string }[], }

function LayoutInformation({
  images
}: Props) {
  return (
    <div className='mt-8'>
      <ProjectHeader
        title='Floor Plans and Layouts'
      />
      <div className="flex gap-2 mt-2 flex-wrap">
        {images.slice(0, 2).map((item, index) => (
         <div key={index} className="relative  object-cover w-full rounded-md sm:rounded-none sm:w-[300px] h-[250px]">
           <Image
            key={index}
           fill
            src={item.secure_url}
            alt={`Thumbnail ${index}`}
            className={`rounded-md cursor-pointer border`}
          />
         </div>
        ))}

        <div className="border-[#DEDEDE] font-medium font-poppins gap-2 text-[#FF1645] flex rounded-md justify-center items-center border w-full sm:w-[220px] h-[60px] sm:h-[250px]">
          +{images && images.length > 2 && images.length - 2 || 0} More
        </div>
      </div>
    </div>
  )
}

export default LayoutInformation