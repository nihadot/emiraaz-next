import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
    location_icon,
} from '@/app/assets';
import { BsStars } from "react-icons/bs";

import { RiFileList2Line } from "react-icons/ri";

import { AllProjectsItems } from '@/redux/project/types';
import { formatCurrencyParts } from '@/utils/formateAmount';
import { TfiLocationPin } from "react-icons/tfi";

import PrimaryButton from '../Buttons';
import FavoriteIcon from './FavoriteIcon';
import ProjectImageSlider from './ProjectImageSlider';
import details_icon from "@/app/assets/details_icon.svg";
import 'swiper/css';
import 'swiper/css/pagination';
import Typography from '../atom/typography/Typography';
import { getDaysAgo } from '../atom/button/getDaysAgo';
import { LiaBedSolid } from "react-icons/lia";
import { HiOutlineBuildingOffice } from 'react-icons/hi2';
import { PiNotePencilLight } from "react-icons/pi";
import { CiViewList } from 'react-icons/ci';
import { useFetchCurrencyQuery } from '@/redux/currency/currencyApi';
import { formatCurrencyConversion } from '../atom/button/formatCurrencyConversion';

type Props = {
    item: AllProjectsItems;
    handleClick: (item: any) => void;
    handleEnquiryFormClick: (item: any) => void;
    navigateDetailsButton: boolean;
    navigateEnquiredButton?: boolean;
};

function ProjectCard({ item, handleClick, handleEnquiryFormClick, navigateDetailsButton,navigateEnquiredButton = true }: Props) {
    const [toggleCurrency, setToggleCurrency] = useState<string>('');
  
    useEffect(() => {
        const url = new URL(window.location.href);
        const currency = url.searchParams.get('currency');
        if (currency) {
            setToggleCurrency(currency);
        } else {
            setToggleCurrency('AED');
        }
    }, []);


    const { data: currencyExchange } = useFetchCurrencyQuery({ currency: toggleCurrency });

    const { currency, value } = formatCurrencyParts(item.priceInAED);
    const propertyType = item?.propertyTypes?.length > 0 ? item?.propertyTypes[0] : '';
    const furnishing =
        item.furnishing === 'fully-furnished'
            ? 'Fully Furnished'
            : item.furnishing === 'semi-furnished'
                ? 'Semi Furnished'
                : item.furnishing === 'un-furnishing'
                    ? 'Un Furnishing'
                    : item.furnishing ? item.furnishing : 'NOT SELECTED';


    return (
        <div className="relative overflow-hidden w-full sm:w-full flex-none sm:h-[500px] lg:h-[260px] rounded lg:flex-row flex-col flex h-[410px] border border-[#DEDEDE]">

            {item.discount && (
                <span className="bg-[#44B842] font-medium font-poppins absolute sm:hidden z-40  right-5 top-3 rounded-[2px] text-white text-[10px] px-3 py-0.5 capitalize w-fit flex">
                    {item.discount} Discount
                </span>
            )}

            <ProjectImageSlider item={item} />

            <div className="flex font-poppins relative flex-col px-[10px] pt-[10px] pb-[3px] sm:p-[10px] lg:p-[16.5px]">

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
                            <span className="bg-[#44B842] font-poppins sm:flex  right-5 top-3 rounded-[2px] text-white text-[9.75px] px-2 py-0.5 capitalize w-fit hidden">
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
                {(item.projectType === 'commercial-residential' || item.projectType === 'project-residential' || item.projectType === 'project-commercial') ? 
                <p>
                    <span className='text-[17px] font-semibold'>Starting From</span>
                    <span className='font-poppins text-[24.75px] ms-2 sm:ms-1 font-semibold '>
                        {
                            (currencyExchange && currencyExchange.data && currencyExchange.data.rate && toggleCurrency !== 'AED') ?  
                            (formatCurrencyConversion(value,currencyExchange.data.rate)) : value
                        }
                       
                    </span>
                    <span className='text-[11.928px] sm:text-[12.75px] ms-[2px] sm:ms-0 font-semibold mt-[4.5px] font-poppins '>{
                (currencyExchange && currencyExchange.data && currencyExchange.data.rate) ?
                currencyExchange.data.currency
                :  currency
                }</span>

                </p> 
                
                :

                     <p>
                    {/* <span className='text-[17px] font-semibold'>Starting From</span> */}
                    <span className='font-poppins text-[24.75px] ms-2 sm:ms-1 font-semibold '>
                        {
                            (currencyExchange && currencyExchange.data && currencyExchange.data.rate && toggleCurrency !== 'AED') ?  
                            (formatCurrencyConversion(value,currencyExchange.data.rate)) : value
                        }
                       
                    </span>
                    <span className='text-[11.928px] sm:text-[12.75px] ms-[2px] sm:ms-0 font-semibold mt-[4.5px] font-poppins '>{
                (currencyExchange && currencyExchange.data && currencyExchange.data.rate) ?
                currencyExchange.data.currency
                :  currency
                }</span>

                </p> 
                }






                {/* Property Type */}

                <div className="flex mt-[2px] sm:mt-[4.5px] items-center gap-3">

                    <p className="capitalize font-semibold font-poppins text-[12px]">{propertyType}</p>
                    <div className="h-[17.25px] w-[1px] bg-[#333333]" />
                    
                    
                    {
                        item.propertyTypes && item.propertyTypes.length >= 2 && item?.communityTick ? <p className="capitalize font-semibold font-poppins text-[12px]">{item.propertyTypes?.[1]}</p> :

                        <>
                        {!(item.projectType === 'land-residential' || item.projectType === 'land-commercial') && 
                    <div className="flex items-center gap-3">
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
                    </>
                    }
                    <div className="h-[17.25px] w-[1px] bg-[#333333]" />


                    {
                        item.propertyTypes && item.propertyTypes.length >= 3 && item?.communityTick ? <p className="capitalize font-semibold font-poppins text-[12px]">{item.propertyTypes?.[2]}</p> :
                        <>
                        {/* {!(item.projectType === 'land-residential' || item.projectType === 'land-commercial') && <div className="h-[20px] w-[1px] bg-[#333333]" />} */}
                    <div className="flex items-center gap-3">

                        <div className="flex items-center gap-2">
                            {/* <p className="text-sm font-light font-poppins">{item.squareFeet} </p> */}
                            {/* <GoScreenFull
                            color='#333'
                            className='w-[20px] h-[20px]'
                            /> */}
                            <HiOutlineBuildingOffice
                                color='#333'
                                className='w-[18px] h-[18px]'
                            />

                            <Typography
                                tag='p'

                                className='text-[12px] font-light font-poppins'
                                text={`${item.totalFloors || 0} floors`}
                            />
                        </div>
                    </div>
                        </>
                    }
                    
                    
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
                        {item?.facilitiesAmenitiesDetails?.slice(0, 2)?.map((f, index, arr) => (
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


                <div className="flex items-center mt-[8px] sm:mt-[10.5px] gap-1">
                    <div className="">
                        <TfiLocationPin size={18} color='#333333' />
                    </div>
                    {/* <Image src={location_icon} alt="location icon" width={15} height={15} className="object-cover" /> */}
                    {/* <p className="text-xs font-light font-poppins capitalize">{item.address || 'Jumeirah Village Circle, Dubai'}</p> */}
                    <Typography
                        tag='p'

                        className='text-[12px] line-clamp-1 text-ellipsis font-light font-poppins capitalize'
                        text={item.address}
                    />
                </div>




                <div className="flex items-center mt-[9px] rounded-[3.75px] bg-[#FFE7EC] gap-1 px-3  text-[#FF1645]">
                    {/* <Image src={christmas__icon_star} alt="authenticity icon" width={20} height={20} className="object-cover py-1" /> */}
                    <div className=" ">
                        <BsStars size={16} />
                    </div>
                    <div className="text-[12px] font-light bg-[#FFE7EC] text-ellipsis line-clamp-1 py-1">
                        This listing was newly introduced { item.createdAt ? getDaysAgo(item.createdAt) : '' }
                    </div>
                </div>

                <div className="flex mt-[3px] sm:mt-[10.5px] bg-white h-8 sm:h-7 lg:h-8 items-center gap-2">
                    {/* Details Button */}
                    {navigateDetailsButton &&

                        <PrimaryButton
                            onClick={() => handleClick(item)}
                            type="button"
                            className="!px-0 cursor-pointer sm:!px-4 flex w-full sm:w-[106.5px] h-[35px] items-center gap-2 rounded border-none bg-[#FF1645]"
                        >
                            <div className="relative w-[20px] h-[20px]">

                                <CiViewList size={20} color='white' />
                            </div>
                            <span className="text-[14px] text-white">Details</span>
                        </PrimaryButton>

                    }

                    {/* Enquiry Button */}
                    { navigateEnquiredButton && <PrimaryButton
                        onClick={() => handleEnquiryFormClick(item)}
                        type="button"
                        className="flex cursor-pointer !px-0 sm:!px-4 w-full sm:w-[140.5px] h-[35px] items-center gap-2 rounded border-none bg-[#FF1645]"
                    >
                        <div className="relative w-[20px] h-[20px]">

                            <PiNotePencilLight size={20} color='white' />
                        </div>
                        <span className="text-[14px] text-white text-nowrap">Enquire Now</span>
                    </PrimaryButton>}
                </div>


            </div>


            <div className="absolute hidden min-1110px:block right-3 bottom-3">
                <Image src={item?.developerDetails?.image?.secure_url || ''} alt="authenticity icon" width={57} height={11.25} className="object-cover" />

            </div>
            <div className="absolute hidden sm:flex right-0 z-20">
                <FavoriteIcon projectId={item?._id} />
            </div>
        </div>
    );
}

export default ProjectCard;
