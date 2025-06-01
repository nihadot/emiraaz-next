import React from 'react'

type Props = {
    data: {
        location: string
        count: number
    }[]
}

function LocationTags({ data }: Props) {
    return (
        <div className="outline px-4 outline-[#DEDEDE] grid grid-cols-2 md:grid-cols-none md:flex bg-slate-100 items-center justify-between rounded-[3px] w-full">
            {
                data.map((item,index) => {
                    return (
                        <div key={index} className="flex justify-start w-full items-center py-2">
                            <p className='font-poppins font-normal text-[12px] text-black'>{item.location}</p>
                            <p className='font-poppins font-normal text-[12px] text-[#333333]'>({item.count})</p>
                        </div>
                    )
                })
            }
                        <p className='font-poppins md:justify-end flex font-semibold pb-3 pt-1 md:pt-0 md:pb-0 text-[12px] w-full'>View All Locations</p>
            
        </div>
    )
}

export default LocationTags