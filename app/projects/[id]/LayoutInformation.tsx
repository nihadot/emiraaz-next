import Image from 'next/image'
import React from 'react'
import ProjectHeader from './ProjectHeader'

type Props = { images: { secure_url: string }[],handleGallerySelect:(value:string)=> void,handleGalleryModal:()=> void }

function LayoutInformation({
  images,handleGalleryModal,handleGallerySelect
}: Props) {
  return (
    <div className=''>
      <ProjectHeader
        title='Floor Plans and Layouts'
        contentClassName='font-poppins text-[18.75px] mb-[13.5px] font-medium'
      />
      <div className="flex gap-[8.25px] mt-2 flex-wrap">
        {images.slice(0, 2).map((item, index) => (
         <div key={index} className="relative border-[#DEDEDE] border object-cover rounded-[3.5px] w-full sm:w-[271px] h-[198px] sm:h-[174.75px]">
           <Image
            key={index}
           fill
            src={item.secure_url}
            alt={`Thumbnail ${index}`}
            className={`cursor-pointer border-none`}
          />
         </div>
        ))}

        <div onClick={()=>{
          handleGalleryModal()
          handleGallerySelect('layouts')
        }} className="border-[#DEDEDE] sm:text-[15px] text-[13px] font-medium font-poppins gap-2 text-[#FF1645] flex rounded-[3.5px] justify-center items-center border w-full sm:w-[174.75px] h-[58px] sm:h-[174.75px]">
          +{images && images.length > 2 && images.length - 2 || 0} More
        </div>
      </div>
    </div>
  )
}

export default LayoutInformation