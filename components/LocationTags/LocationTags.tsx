import React from 'react'

type Props = {
    data: {
        location: string
        count: number
    }[]
}

function LocationTags({ data }: Props) {
    return (
        <div className="outline px-4 outline-[#DEDEDE] grid grid-cols-2 md:grid-cols-none md:flex bg-white items-center justify-between rounded-[3px] w-full">
            {
                data.map((item,index) => {
                    return (
                        <div key={index} className="flex justify-start w-full items-center p-2">
                            <p className='font-poppins font-normal text-[12px] me-1 text-black'>{item.location} </p>
                            <p className='font-poppins font-normal text-[10px] text-[#333333]'>({item.count})</p>
                        </div>
                    )
                })
            }
                        <p className='font-poppins md:justify-end flex font-semibold pb-3 pt-1 md:pt-0 md:pb-0 text-[12px] w-full'>View All Locations</p>
            
        </div>
    )
}

export default LocationTags