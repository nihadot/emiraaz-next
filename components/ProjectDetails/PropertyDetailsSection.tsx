import React from 'react'
import ProjectHeader from './ProjectHeader'
import Image from 'next/image'
import { tick_green_icon } from '@/app/assets'
import { IoCheckmarkCircle } from "react-icons/io5";

type DetailItem = {
  title: string 
  content?: string | string[]
}

interface PropertyDetailsSectionProps {
  data: DetailItem[]
  headerTitle?: string
  icon?: boolean

}

const PropertyDetailsSection: React.FC<PropertyDetailsSectionProps> = ({
  data,
  headerTitle = 'Property Information',
  icon,
}) => {
  return (
    <div className='mt-[18px] sm:mt-[17.25px]'>
      <div className="flex py-2 gap-2 items-center ">
        <ProjectHeader contentClassName='font-medium sm:text-[18.75px] text-[17px]' title={headerTitle} />
        {icon && 
        <IoCheckmarkCircle
        color='#44B842'
        size={20}
        />
        }

      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2  sm:gap-x-6">
        {data.map((item, index) => (
          <PropertyDetailItem key={index} title={item.title} content={item.content} />
        ))}
      </div>
    </div>
  )
}

export default PropertyDetailsSection

const PropertyDetailItem: React.FC<DetailItem> = ({ title, content }) => {
  return (
    <div className="flex font-poppins text-sm py-2 sm:py-3 items-center">
      <p className="flex-1 capitalize font-normal text-[13.5px] text-[#33333]">{title}</p>
{ content ?      <p className="flex-1 capitalize font-medium font-poppins text-[13.5px] text-black">{content}</p>:
<div className="w-[100px] h-[25px] rounded bg-gray-50"></div>
}    </div>
  )
}
