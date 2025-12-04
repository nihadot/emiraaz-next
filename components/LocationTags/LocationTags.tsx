import Link from 'next/link'
import React from 'react'

type Props = {
    data: {
        location: string
        count: number
        slug: string | undefined
    }[]
}

function LocationTags({ data }: Props) {
    return (
        <>
        <div className="outline px-4 rounded outline-[#DEDEDE] grid grid-cols-2 md:flex  bg-white justify-center items-center   w-full">
            {
                data.map((item,index) => {
                    return (
                        <Link
                        key={index}
                        href={`/cities/${item.slug}`}
                        className='block w-full'
                        >
                        <div key={index} className="flex w-full justify-start items-center px-0 md:px-2 py-2">
                            <p className='font-poppins font-normal text-[12px] me-1 text-black'>{item.location} </p>
                            <p className='font-poppins font-normal text-[10px] text-[#333333]'>({item.count})</p>
                        </div>
                        </Link>
                    )
                })
            }


                 
            
  <Link
  href={`/cities`}
  className="flex py-3 md:py-0
   md:justify-center items-center w-full cursor-pointer h-full text-black text-xs font-poppins font-normal">View All Locations</Link>
        </div>
        </>

    )
}

export default LocationTags