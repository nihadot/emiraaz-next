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
// import { LiaBedSolid } from "react-icons/lia";
import { GoScreenFull } from "react-icons/go";

import { AllProjectsItems } from '@/redux/project/types';
import { formatCurrencyParts } from '@/utils/formateAmount';

import PrimaryButton from '../Buttons';
import FavoriteIcon from './FavoriteIcon';
import ProjectImageSlider from './ProjectImageSlider';

import 'swiper/css';
import 'swiper/css/pagination';
import Typography from '../atom/typography/Typography';
import { getDaysAgo } from '../atom/button/getDaysAgo';
import { LiaBedSolid } from "react-icons/lia";

type Props = {
    item: AllProjectsItems;
    handleClick: (item: any) => void;
    handleEnquiryFormClick: (item: any) => void;
    navigateDetailsButton: boolean;
};

function ProjectCard({ item, handleClick, handleEnquiryFormClick, navigateDetailsButton }: Props) {
    const { currency, value } = formatCurrencyParts(item.priceInAED);
    const propertyType = item?.propertyTypes?.length > 0 ? item?.propertyTypes[0] : '';
    const furnishing =
        item.furnishing === 'fully-furnished'
            ? 'Fully Furnish'
            : item.furnishing === 'semi-furnished'
                ? 'Semi Furnish'
                : item.furnishing === 'un-furnishing'
                    ? 'Under Furnish'
                    : item.furnishing ? item.furnishing : 'Not available';


    return (
        <div className="relative overflow-hidden w-full sm:w-full flex-none sm:h-[500px] lg:h-[260px] rounded lg:flex-row flex-col flex h-[410px] border border-[#DEDEDE]">

            {item.discount && <div className="bg-[#44B842] rounded-[2px] sm:hidden text-[11px] font-poppins font-normal top-3 px-3 right-3 absolute z-40  text-white">

               
                            <div className=" ">
                                {item.discount} Discount
                            </div>
                        


            </div>}
            <ProjectImageSlider item={item} />

            <div className="flex font-poppins relative flex-col px-[10px] pt-[10px] pb-[3px] sm:p-[16.5px]">

                <div className="absolute flex top-0 sm:hidden right-0 z-20">
                    <FavoriteIcon projectId={item._id} />
                </div>
                <div className="relative w-fit">
                    {/* <h3 className="text-[20px] font-medium capitalize">
                        {item.projectTitle}
                    </h3> */}
                    <Typography
                        className=" text-[14.4px] sm:text-[15px]  relative font-medium font-poppins flex items-center gap-[9px]"
                        tag="h2"
                    >

                        {item.projectTitle}

                        {item.discount && (
                            <span className="bg-[#44B842] sm:flex absolute right-5 top-3 rounded-[2px] text-white text-[9.75px] px-2 py-0.5 capitalize w-fit hidden">
                                {item.discount} Discount
                            </span>
                        )}
                    </Typography>


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
                {(item.projectType === 'commercial-residential' || item.projectTitle === 'project-residential' || item.projectTitle === 'project-commercial') ? <p>
                    <span className='text-[17px] font-semibold'>Starting From</span>
                    <span className='font-poppins text-[24.75px] ms-2 sm:ms-1 font-semibold '>
                        {value}
                    </span>
                    <span className='text-[11.928px] sm:text-[12.75px] font-semibold mt-[4.5px] font-poppins '>{currency}</span>

                </p> :

                    <p>
                        {/* <span className='text-[18px] font-semibold'>Starting From</span> */}
                        <span className='text-[11.928px] sm:text-[12.75px] font-semibold mt-[4.5px] font-poppins '>{currency}</span>
                        <span className='font-poppins font-semibold text-[24.75px] ms-2 sm:ms-1 '>
                            {value}
                        </span>
                    </p>
                }






                {/* Property Type */}

                <div className="flex mt-[2px] sm:mt-[4.5px] items-center gap-3">

                    <p className="capitalize font-semibold font-poppins text-[12px]">{propertyType}</p>
                    <div className="h-[17.25px] w-[1px] bg-[#333333]" />
                    {!(item.projectType === 'land-residential' || item.projectType === 'land-commercial') && <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            {/* <Image src={bed_icon} alt="bed icon" width={20} height={20} className="object-cover" /> */}
                            {/* <p className="text-sm font-light font-poppins">{item.numberOfBeds}</p> */}
                            <LiaBedSolid size={20} color='#333' />
                            <Typography
                                tag='p'
                                className='text-[12px] line-clamp-1 font-light font-poppins'
                                text={item.type}
                            />
                        </div>


                        {/* <div className="flex items-center gap-2"> */}
                            {/* <Image src={bath_icon} alt="bath icon" width={20} height={20} className="object-cover" /> */}
                            {/* <p className="text-sm font-light font-poppins">{item.numberOfBath}</p> */}
                            {/* <Typography
                                tag='p'
                                className='text-[12px] font-light font-poppins'
                                text={item.numberOfBath}
                            /> */}
                        {/* </div> */}
                    </div>}
                    {!(item.projectType === 'land-residential' || item.projectType === 'land-commercial') && <div className="h-[20px] w-[1px] bg-[#333333]" />}
                    <div className="flex items-center gap-3">

                        <div className="flex items-center gap-2">
                            <Image src={bath_icon} alt="bath icon" width={20} height={20} className="object-cover" />
                            {/* <p className="text-sm font-light font-poppins">{item.squareFeet} </p> */}
                            
                            
                            <Typography
                                tag='p'

                                className='text-[12px] font-light font-poppins'
                                text={`${item.squareFeet || 0} sqft`}
                            />
                        </div>
                    </div>
                </div>

                <div className="sm:flex hidden gap-2 mt-[9px] items-center">
                    {/* <p className='text-xs capitalize'>{furnishing}</p> */}
                    <Typography
                        tag='p'

                        className='text-[12px] line-clamp-1 text-ellipsis capitalize'
                        text={`${furnishing}`}
                    />
                    <div className="h-[17.25px] w-[1px] bg-[#333333]" />

                    <div className="flex gap-1 items-center justify-center">
                        {item.facilitiesAmenitiesDetails.slice(0, 2).map((f, index, arr) => (
                            <React.Fragment key={index}>
                                {/* <p className="text-xs px-2 capitalize">{f.name}</p> */}
                                <Typography
                                    tag='p'

                                    className='text-[12px] line-clamp-1 px-2 capitalize'
                                    text={f.name}
                                />
                                {index < arr.length - 1 && (
                                    <div className="h-[17.25px] w-[1px] bg-[#333333]" />
                                )}
                            </React.Fragment>
                        ))}
                    </div>


                </div>


                <div className="flex items-center mt-[8px] sm:mt-[10.5px] gap-2">
                    <Image src={location_icon} alt="location icon" width={15} height={15} className="object-cover" />
                    {/* <p className="text-xs font-light font-poppins capitalize">{item.address || 'Jumeirah Village Circle, Dubai'}</p> */}
                    <Typography
                        tag='p'

                        className='text-[12px] line-clamp-1 text-ellipsis font-light font-poppins capitalize'
                        text={item.address || 'Jumeirah Village Circle, Dubai'}
                    />
                </div>




                <div className="flex items-center mt-[9px] rounded-[3.75px] bg-[#FFE7EC] gap-1 px-3  text-[#FF1645]">
                    <Image src={christmas__icon_star} alt="authenticity icon" width={20} height={20} className="object-cover py-1" />
                    <div className="text-[12px] font-light bg-[#FFE7EC] text-ellipsis line-clamp-1 py-1">
                        This listing was newly introduced {getDaysAgo(item.createdAt)}
                    </div>
                </div>

                <div className="flex mt-[3px] sm:mt-[10.5px] bg-white h-8 items-center gap-2">
                    {/* Details Button */}
                    {navigateDetailsButton &&

                        <PrimaryButton
                            onClick={() => handleClick(item)}
                            type="button"
                            className="flex w-full sm:w-[106.5px] h-[35px] items-center gap-2 rounded border-none bg-[#FF1645]"
                        >
                            <Image src={details_icon} alt="details icon" width={16.5} height={16.5} />
                            <span className="text-[14px] text-white">Details</span>
                        </PrimaryButton>

                    }

                    {/* Enquiry Button */}
                    <PrimaryButton
                        onClick={() => handleEnquiryFormClick(item)}
                        type="button"
                        className="flex w-full sm:w-[140.5px] h-[35px] items-center gap-2 rounded border-none bg-[#FF1645]"
                    >
                        <Image src={notes_icon} alt="enquiry icon" width={16.5} height={16.5} />
                        <span className="text-[14px] text-white text-nowrap">Enquire Now</span>
                    </PrimaryButton>
                </div>


            </div>


            <div className="absolute hidden min-1110px:block right-3 bottom-3">
                <Image src={item?.developerDetails?.image?.secure_url} alt="authenticity icon" width={57} height={11.25} className="object-cover" />

            </div>
            <div className="absolute hidden sm:flex right-0 z-20">
                <FavoriteIcon projectId={item._id} />
            </div>
        </div>
    );
}

export default ProjectCard;
