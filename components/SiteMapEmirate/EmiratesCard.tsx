'use client'
import { baseUrl } from '@/api';
import clsx from 'clsx';
import React from 'react'

type Props = {
    data: any
}



function EmiratesCard({
    data
}: Props) {
    



    const [active, setActiveState] = React.useState('');

    const CardItem = ({ label, value }: { value: string, label: string }) => {
        return (
            <div
                onClick={() => setActiveState(value)}
                className={clsx('flex w-fit outline-[#DEDEDE]  flex-col justify-center items-center  px-3 capitalize py-2 rounded-[5px]',
                    {
                        "outline bg-[#FFE8ED] outline-none": active === value,
                        "outline": active !== value
                        //      "" : ""
                    }
                )}>
                <p className={clsx('text-xs  font-normal  font-poppins', {
                    "text-[#FF1645]": active === value,
                    "text-black": active !== value
                })}>{label}</p>
            </div>
        )
    }

    
    const CardListItem = data?.map((item:{
        value: string,
        label: string
    }, index:number) => {
        return (
            <CardItem key={index} label={item.label} value={item.value} />
        )
    })

    return (
        <section>

            {/* {JSON.stringify(data)} */}


            <div className="flex gap-3 ">
                {CardListItem}
            </div>

        </section>
    )
}

export default EmiratesCard