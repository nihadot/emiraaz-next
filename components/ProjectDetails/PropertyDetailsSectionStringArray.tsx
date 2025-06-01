import React from 'react'
import ProjectHeader from './ProjectHeader'
import Image from 'next/image'
import { tick_green_icon } from '@/app/assets'

type DetailItem = {
  item: string 
}

interface PropertyDetailsSectionProps {
  data: string[]
  headerTitle?: string
  icon?: boolean

}

const PropertyDetailsSectionStringArray: React.FC<PropertyDetailsSectionProps> = ({
  data,
  headerTitle = 'Property Information',
  icon,
}) => {

  // console.log(data,'data?.data?.paymentPlan')
  return (
    <div className='mt-[18px] sm:mt-[17.25px]'>
      <div className="flex py-2 gap-2 items-center ">
        <ProjectHeader contentClassName='font-medium sm:text-[18.75px] text-[17px]' title={headerTitle} />
        {icon && <Image src={tick_green_icon} alt="location" width={18} height={18} />}

      </div>
      <div className="grid grid-cols-1 sm:grid-cols-4  sm:gap-x-6">
        {data?.map((item, index) => (
          <PropertyDetailItem key={index} item={item} />
        ))}
      </div>
    </div>
  )
}

export default PropertyDetailsSectionStringArray

const PropertyDetailItem: React.FC<DetailItem> = ({ item }) => {
  return (
    <div className="flex font-poppins text-sm py-2 sm:py-3 items-center">
      <p className="flex-1 capitalize font-normal text-[13.5px] text-[#33333]">{item}</p>
      {/* <p className="flex-1 capitalize font-medium font-poppins text-[13.5px] text-black">{content}</p> */}
    </div>
  )
}
