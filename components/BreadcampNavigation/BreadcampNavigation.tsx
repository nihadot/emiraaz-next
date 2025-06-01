import React from 'react';
import Container from '../atom/Container/Container';
import { FaChevronCircleDown } from 'react-icons/fa';
import { IoChevronForwardSharp } from 'react-icons/io5';
import Link from 'next/link';

type Props = {
    title?: string;
    items?: {
        title: string;
        link?:string;
    }[];
    link?:string
};

const BreadcampNavigation: React.FC<Props> = ({
    title = 'Offplan Projects:',
    link,
    items,
}) => {
    return (
      
            <section className=" flex w-full gap-2 items-center flex-wrap">
                <Link href={link ?? ''} className="font-normal text-[12px] font-poppins">{title}</Link>
                <div className="flex gap-2 items-center flex-wrap">
                    

                    {
                        items?.map((item, index) => (
                            <Link key={index} href={item.link ?? ''} className="flex items-center gap-1">
                                <h4 className='text-[#FF1645] font-normal text-[12px] font-poppins'>{item.title}</h4>
                                {index < 2 && index < items.length - 1 && (
                                    <IoChevronForwardSharp size={14} color='#FF1645' />
                                )}
                            </Link>
                        ))
                    }
                </div>
            </section>
      
    );
};

export default BreadcampNavigation;
