import { bath_icon, bed_icon, location_icon } from '@/app/assets'
import { AllProjectsItems } from '@/redux/project/types'
import { formatCurrencyParts } from '@/utils/formateAmount'
import Image from 'next/image'
import React from 'react'

type Props = {
  item: AllProjectsItems
}

function Card({ item }: Props) {
  const { currency, value } = formatCurrencyParts(item.priceInAED || 0);
  const propertyType = item?.propertyTypes?.[0] ?? '';

  return (
    <div className='w-full'>
      <div className="relative overflow-hidden rounded-md w-[250px] sm:w-full h-[150px]">
        <Image fill src={item.mainImages[0].secure_url} className='object-cover' alt='menu icon' />
      </div>
      <h3 className='text-[20px] pt-2 font-medium capitalize'>{item.projectTitle}</h3>

      <h4 className='text-[20px] pt-1 font-semibold'>
        <span className="text-xs font-medium font-poppins">{currency}</span> {value}
      </h4>
      <div className="flex items-center gap-3">
        <p className="capitalize text-[12px] font-normal font-poppins text-xs">{propertyType}</p>
        <div className="h-4 w-[1px] bg-black" />
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Image src={bed_icon} alt="bed icon" width={16} height={16} className="object-cover" />
            <p className="text-[12px] font-light font-poppins">{item.numberOfBeds}</p>
          </div>
          <div className="flex items-center gap-2">
            <Image src={bath_icon} alt="bath icon" width={16} height={16} className="object-cover" />
            <p className="text-[12px] font-light font-poppins">{item.numberOfBath}</p>
          </div>
        </div>
        <div className="h-4 w-[1px] bg-black" />
        <div className="flex items-center gap-3">

          <div className="flex items-center gap-2">
            <Image src={bath_icon} alt="bath icon" width={16} height={16} className="object-cover" />
            <p className="text-[12px] font-light font-poppins">{item.squareFeet} sqft</p>
          </div>
        </div>
      </div>
      <div className="flex items-center  gap-1">
        <Image src={location_icon} alt="location" width={18} />
        <p className='capitalize text-[13px]'>{item.address}</p>
      </div>

    </div>
  )
}

export default Card 