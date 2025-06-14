import { bath_icon, bed_icon, location_icon } from '@/app/assets'
import { AllProjectsItems } from '@/redux/project/types'
import { formatCurrencyParts } from '@/utils/formateAmount'
import Image from 'next/image'
import React from 'react'
import Typography from '../atom/typography/Typography'
import { LiaBedSolid } from 'react-icons/lia'
import { GoScreenFull } from 'react-icons/go'

type Props = {
  item: AllProjectsItems
  handleClick: (item: AllProjectsItems) => void
}

function Card({ item,handleClick }: Props) {
  const { currency, value } = formatCurrencyParts(item.priceInAED || 0);
  const propertyType = item?.propertyTypes?.[0] ?? '';

  return (
    <div onClick={()=>handleClick(item)} className=' w-full cursor-pointer h-[246.75px]'>
      
      {/* Image Banner */}
      <div className="relative overflow-hidden rounded-[3.75px] sm:w-full h-[142.5px]">
        <Image fill src={item.mainImages[0].secure_url} className='object-cover' alt='menu icon' />
      </div>
      
      {/* Project Title */}
      <h3 className=' font-medium font-poppins text-[12.75px] mt-[8.25px] capitalize'>{item.projectTitle}</h3>

      {/* Price */}
      <h4 className='text-[20px] font-semibold'>
        <span className="text-[10.5px] font-medium font-poppins">{currency}</span> 
        <span className='font-poppins font-medium text-black text-[18.75px] ms-1' >{value}</span>
      </h4>


        {/* Number of beds , bath, square feet  */}
          <div className="flex items-center mt-[4.5px] gap-3">
                          <p className="capitalize font-medium font-poppins text-[12px]">{propertyType}</p>
                          <div className="h-[20px] w-[1px] bg-[#333333]" />
                          {!(item.projectType === 'land-residential' || item.projectType === 'land-commercial') && <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2">
                                  {/* <Image src={bed_icon} alt="bed icon" width={20} height={20} className="object-cover" /> */}
                                  {/* <p className="text-sm font-light font-poppins">{item.numberOfBeds}</p> */}
         <LiaBedSolid size={20} color='#333' />
                                  <Typography
                                      tag='p'
                                      className='text-[12px] line-clamp-1 font-light font-poppins'
                                      text={item.type ?? '-'}
                                  />
                              </div>
      
                             
                          </div>}
                          {!(item.projectType === 'land-residential' || item.projectType === 'land-commercial') && <div className="h-[20px] w-[1px] bg-[#333333]" />}
                          <div className="flex items-center gap-3">
      
                              <div className="flex items-center gap-2">
                                  <GoScreenFull
                                                             color='#333'
                                                             className='w-[20px] h-[20px]'
                                                             /> <Typography
                                      tag='p'
      
                                      className='text-[12px] line-clamp-1 text-ellipsis font-light font-poppins'
                                      text={`${item.squareFeet || 0} sqft`}
                                  />
                              </div>
                          </div>
                      </div>



{/* Location */}
                      <div className="flex items-center mt-[4.5px] gap-2">
                    <Image src={location_icon} alt="location icon" width={15} height={15} className="object-cover" />
                    {/* <p className="text-xs font-light font-poppins capitalize">{item.address || 'Jumeirah Village Circle, Dubai'}</p> */}
                    <Typography
                        tag='p'

                        className='text-[12px] font-light font-poppins capitalize'
                        text={item.address || '-'}
                    />
                </div>

    </div>
  )
}

export default Card 