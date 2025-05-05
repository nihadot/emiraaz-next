import React from 'react';
import Image from 'next/image';
import {
    bath_icon,
    bed_icon,
    christmas__icon_star,
    details_icon,
    location_icon,
    notes_icon,
} from '@/app/assets';

import { AllProjectsItems } from '@/redux/project/types';
import { formatCurrencyParts } from '@/utils/formateAmount';

import PrimaryButton from '../Buttons';
import FavoriteIcon from './FavoriteIcon';
import ProjectImageSlider from './ProjectImageSlider';

import 'swiper/css';
import 'swiper/css/pagination';
import Typography from '../atom/typography/Typography';
// import Image from '../atom/image/Image';

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
        <div className="relative overflow-hidden h-[500px] lg:h-[260px] rounded lg:flex-row flex-col flex border border-[#DEDEDE]">
            <ProjectImageSlider item={item} />

            <div className="flex font-poppins flex-col  p-[16.5px]">
                <div className="relative w-fit">
                    {/* <h3 className="text-[20px] font-medium capitalize">
                        {item.projectTitle}
                    </h3> */}
                    <Typography
                        // variant='h2'
                        className='text-[15px] font-medium font-poppins'
                        tag='h2'
                        text={item.projectTitle}
                    />

                    {item.discount && (
                        <div className="absolute font-medium font-poppins top-0 lg:block hidden -right-28 bg-[#44B842] rounded-[2px] text-white text-[9.75px] px-2 py-0.5 capitalize w-fit">
                            {item.discount} Discount </div>
                    )}
                </div>
                {/* Price */}
                {/* <h4 className="text-[20px] font-semibold">
                    <span className="text-xs font-medium font-poppins">{currency}</span> {value}
                </h4> */}

                {/* <Typography
                    tag='h3'
                    className='text-[12.75px] mt-[4.5px] font-semibold font-poppins   '
                    text={currency}
                >
                   
                </Typography> */}

                {/* Price  */}
                <p>
                    <span className='text-[12.75px] mt-[4.5px] font-semibold font-poppins '>{currency}</span>
                    <span className='font-poppins text-[24.75px] ms-1 font-semibold '>
                        {value}
                    </span>
                </p>


      {/* Property Type */}

                <div className="flex mt-[4.5px] items-center gap-3">
                    <p className="capitalize font-semibold font-poppins text-[12px]">{propertyType}</p>
                    <div className="h-[20px] w-[1px] bg-[#333333]" />
                    {!(item.projectType === 'land-residential' || item.projectType === 'land-commercial') && <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <Image src={bed_icon} alt="bed icon" width={20} height={20} className="object-cover" />
                            {/* <p className="text-sm font-light font-poppins">{item.numberOfBeds}</p> */}

                            <Typography
                                tag='p'
                                className='text-[12px] font-light font-poppins'
                                text={item.numberOfBeds}
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <Image src={bath_icon} alt="bath icon" width={20} height={20} className="object-cover" />
                            {/* <p className="text-sm font-light font-poppins">{item.numberOfBath}</p> */}
                            <Typography
                                tag='p'
                                className='text-[12px] font-light font-poppins'
                                text={item.numberOfBath}
                            />
                        </div>
                    </div>}
                    {!(item.projectType === 'land-residential' || item.projectType === 'land-commercial') && <div className="h-[20px] w-[1px] bg-[#333333]" />}
                    <div className="flex items-center gap-3">

                        <div className="flex items-center gap-2">
                            <Image src={bath_icon} alt="bath icon" width={20} height={20} className="object-cover" />
                            {/* <p className="text-sm font-light font-poppins">{item.squareFeet} </p> */}
                            <Typography
                                tag='p'

                                className='text-[12px] font-light font-poppins'
                                text={`${item.squareFeet} sqft`}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 mt-[9px] items-center">
                    {/* <p className='text-xs capitalize'>{furnishing}</p> */}
                    <Typography
                        tag='p'

                        className='text-[12px] capitalize'
                        text={`${furnishing}`}
                    />
                    <div className="h-[20px] w-[1px] bg-[#333333]" />

                    <div className="flex gap-1">
                        {item.facilitiesAmenitiesDetails.slice(0, 3).map((f, index, arr) => (
                            <React.Fragment key={index}>
                                {/* <p className="text-xs px-2 capitalize">{f.name}</p> */}
                                <Typography
                                    tag='p'

                                    className='text-[12px] px-2 capitalize'
                                    text={f.name}
                                />
                                {index < arr.length - 1 && (
                                    <div className="h-4 w-[1px] bg-black/50" />
                                )}
                            </React.Fragment>
                        ))}
                    </div>


                </div>


                <div className="flex items-center mt-[10.5px] gap-2">
                    <Image src={location_icon} alt="location icon" width={15} height={15} className="object-cover" />
                    <p className="text-xs font-light font-poppins capitalize">{item.address || 'Jumeirah Village Circle, Dubai'}</p>
                    <Typography
                        tag='p'

                        className='text-[12px] font-light font-poppins capitalize'
                        text={item.address}
                    />
                </div>

                <div className="flex mt-[9px] h-[27px] items-center rounded-[3.75px] bg-[#FFE7EC] gap-1 px-3 py-1.5 text-[12px] font-light text-[#FF1645]">
                    <Image src={christmas__icon_star} alt="authenticity icon" width={20} height={20} className="object-cover" />
                    Property Authenticity Was Validated On May 25
                </div>

                <div className="flex mt-[10.5px] bg-white h-8 items-center gap-2">
                    {/* Details Button */}
                    <PrimaryButton
                        onClick={() => handleClick(item)}
                        type="button"
                        className="flex w-[106.5px] h-[35px] items-center gap-2 rounded border-none bg-[#FF1645]"
                    >
                        <Image src={details_icon} alt="details icon" width={16.5} height={16.5} />
                        <span className="text-[14px] text-white">Details</span>
                    </PrimaryButton>

                    {/* Enquiry Button */}
                    <PrimaryButton
                        onClick={() => handleEnquiryFormClick(item)}
                        type="button"
                        className="flex w-[140.5px] h-[35px] items-center gap-2 rounded border-none bg-[#FF1645]"
                    >
                        <Image src={notes_icon} alt="enquiry icon" width={16.5} height={16.5} />
                        <span className="text-[14px] text-white text-nowrap">Enquiry Now</span>
                    </PrimaryButton>
                </div>

                <div className="absolute hidden min-1110px:block right-3 bottom-3">
                    <Image src={item?.developerDetails?.image?.secure_url} alt="authenticity icon" width={57} height={11.25} className="object-cover" />

                </div>
            </div>

       

            <div className="absolute right-0 z-20">
                <FavoriteIcon projectId={item._id} />
            </div>
        </div>
    );
}

export default ProjectCard;
