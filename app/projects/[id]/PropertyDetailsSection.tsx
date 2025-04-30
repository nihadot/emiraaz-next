import React from 'react'
import ProjectHeader from './ProjectHeader'
import Image from 'next/image'
import { tick_green_icon } from '@/app/assets'

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
    <div className='mt-4'>
      <div className="flex py-2 gap-2 items-center ">
        <ProjectHeader title={headerTitle} />
        {icon && <Image src={tick_green_icon} alt="location" width={20} />}

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
    <div className="flex font-poppins text-sm py-3 items-center">
      <p className="flex-1 capitalize font-medium text-gray-600">{title}</p>
      <p className="flex-1 capitalize text-gray-800">{content}</p>
    </div>
  )
}
