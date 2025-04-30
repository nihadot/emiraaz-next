import React from 'react';
import Image from 'next/image';
import {
    bath_icon,
    bed_icon,
    christmas__icon_star,
    details_icon,
    location_icon,
} from '@/app/assets';

import { AllProjectsItems } from '@/redux/project/types';
import { formatCurrencyParts } from '@/utils/formateAmount';

import PrimaryButton from '../Buttons';
import FavoriteIcon from './FavoriteIcon';
import ProjectImageSlider from './ProjectImageSlider';

import 'swiper/css';
import 'swiper/css/pagination';

type Props = {
    item: AllProjectsItems;
    handleClick: (item: any) => void;
    handleEnquiryFormClick: (item: any) => void;
};

function ProjectCard({ item, handleClick, handleEnquiryFormClick }: Props) {
    const { currency, value } = formatCurrencyParts(item.priceInAED);
    const propertyType = item.propertyTypes.length > 0 ? item.propertyTypes[0] : '';
    const furnishing =
        item.furnishing === 'fully-furnished'
            ? 'Fully Furnish'
            : item.furnishing === 'semi-furnished'
                ? 'Semi Furnish'
                : item.furnishing === 'un-furnishing'
                    ? 'Under Furnish'
                    : item.furnishing;


    return (
        <div className="relative overflow-hidden h-[500px] lg:h-[290px] rounded lg:flex-row flex-col flex border border-[#DEDEDE]">
            <ProjectImageSlider item={item} />

            <div className="flex font-poppins flex-col p-4 gap-3">
                <div className="relative w-fit">
                    <h3 className="text-[20px] font-medium capitalize">
                        {item.projectTitle}
                    </h3>

                    {item.discount && (
                        <div className="absolute top-0 lg:block hidden -right-28 bg-[#44B842] rounded-[2px] text-white text-[12px] px-2 py-0.5 capitalize w-fit">
                            {item.discount} Discount </div>
                    )}
                </div>
                {/* Price */}
                <h4 className="text-[20px] font-semibold">
                    <span className="text-xs font-medium font-poppins">{currency}</span> {value}
                </h4>
                <div className="flex  items-center gap-3">
                    <p className="capitalize text-[14px]  font-poppins text-xs">{propertyType}</p>
                    {<div className="h-4 w-[1px] bg-black" />}
                    {!(item.projectType === 'land-residential' || item.projectType === 'land-commercial') && <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <Image src={bed_icon} alt="bed icon" width={20} height={20} className="object-cover" />
                            <p className="text-sm font-light font-poppins">{item.numberOfBeds}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Image src={bath_icon} alt="bath icon" width={20} height={20} className="object-cover" />
                            <p className="text-sm font-light font-poppins">{item.numberOfBath}</p>
                        </div>
                    </div>}
                    {!(item.projectType === 'land-residential' || item.projectType === 'land-commercial') && <div className="h-4 w-[1px] bg-black" />}
                    <div className="flex items-center gap-3">

                        <div className="flex items-center gap-2">
                            <Image src={bath_icon} alt="bath icon" width={20} height={20} className="object-cover" />
                            <p className="text-sm font-light font-poppins">{item.squareFeet} sqft</p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 items-center">
                    <p className='text-xs capitalize'>{furnishing}</p>
                    <div className="h-4 w-[1px] bg-black/50" />

                    <div className="flex gap-1">
                        {item.facilitiesAmenitiesDetails.slice(0, 3).map((f, index, arr) => (
                            <React.Fragment key={index}>
                                <p className="text-xs px-2 capitalize">{f.name}</p>
                                {index < arr.length - 1 && (
                                    <div className="h-4 w-[1px] bg-black/50" />
                                )}
                            </React.Fragment>
                        ))}
                    </div>


                </div>


                <div className="flex items-center gap-2">
                    <Image src={location_icon} alt="location icon" width={18} height={18} className="object-cover" />
                    <p className="text-xs font-light font-poppins capitalize">{item.address}</p>
                </div>

                <div className="flex items-center rounded-md bg-[#FFE7EC] gap-1 px-3 py-1.5 text-xs font-light text-[#FF1645]">
                    <Image src={christmas__icon_star} alt="authenticity icon" width={20} height={20} className="object-cover" />
                    Property Authenticity Was Validated On May 25
                </div>

                <div className="flex h-8 items-center gap-2">
                    {/* Details Button */}
                    <PrimaryButton
                        onClick={() => handleClick(item)}
                        type="button"
                        className="flex w-full sm:w-fit items-center gap-2 rounded border-none bg-[#FF1645]"
                    >
                        <Image src={details_icon} alt="details icon" width={19} />
                        <span className="text-sm text-white">Details</span>
                    </PrimaryButton>

                    {/* Enquiry Button */}
                    <PrimaryButton
                        onClick={() => handleEnquiryFormClick(item)}
                        type="button"
                        className="flex w-full items-center gap-2 sm:w-[160px] rounded border-none bg-[#FF1645]"
                    >
                        <Image src={details_icon} alt="enquiry icon" width={19} />
                        <span className="text-sm text-white">Enquiry Now</span>
                    </PrimaryButton>
                </div>

                <div className="absolute hidden min-1110px:block right-3 bottom-3">
                    <Image src={item?.developerDetails?.image?.secure_url} alt="authenticity icon" width={60} height={60} className="object-cover" />

                </div>
            </div>

            <div className="absolute right-0 z-20">
                <FavoriteIcon />
            </div>
        </div>
    );
}

export default ProjectCard;
