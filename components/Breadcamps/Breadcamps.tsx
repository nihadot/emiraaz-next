import React from 'react';
import Container from '../atom/Container/Container';
import { FaChevronCircleDown } from 'react-icons/fa';
import { IoChevronForwardSharp } from 'react-icons/io5';

type Props = {
    title?: string;
    items?: string[];
};

const Breadcamps: React.FC<Props> = ({
    title = 'Offplan Projects:',
    items = ['Dubai Apartments', 'Off plan Project Residential'],
}) => {
    return (
      
            <section className=" flex w-full gap-2 items-center flex-wrap">
                <h4 className="font-normal text-[12px] font-poppins">{title}</h4>
                <div className="flex gap-2 items-center flex-wrap">
                    {items.map((item, index) => (
                        <div key={index} className="flex items-center gap-1">
                            <h4 className='text-[#FF1645] font-normal text-[12px] font-poppins'>{item}</h4>
                            {index < 2 && index < items.length - 1 && (
                                <IoChevronForwardSharp size={14} color='#FF1645' />
                            )}
                        </div>
                    ))}
                </div>
            </section>
      
    );
};

export default Breadcamps;
