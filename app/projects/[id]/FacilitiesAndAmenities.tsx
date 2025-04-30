import Image from 'next/image'
import React from 'react'

type Props = {
    data:any[]
    heading?:boolean
}

function FacilitiesAndAmenities({data,heading}: Props) {

  return (
    <div className='flex flex-col h-full'>
       { heading &&  <p>Amenities</p>}

         <div className="sm:flex grid grid-cols-3 sm:flex-row gap-2 mt-3">
                        {
                            data && data.length > 0 &&
                            data.map((item, index) => {
                                return (
                                    <div key={index} className="rounded-md gap-3 flex items-center justify-center flex-col w-[120px] h-[120px] p-4 bg-[#F5F5F5]  border-[#DEDEDE] ">
                                        <Image
                                            height={40}
                                            width={40}
                                            src={item?.image?.secure_url}
                                            alt={`Thumbnail ${index}`}
                                            className={`cursor-pointer object-cover`}
                                        />
                                        <p className='text-[10px] font-poppins text-center  text-black/70'>{item.name}</p>
                                    </div>
                                )
                            })
                        }
    </div>
    </div>

  )
}

export default FacilitiesAndAmenities