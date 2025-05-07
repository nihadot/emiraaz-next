import { bath_icon, bed_icon, location_icon, save_icon, share_button_icon } from "@/app/assets";
import Typography from "@/components/atom/typography/Typography";
import PrimaryButton from "@/components/Buttons";
import Image from "next/image";

const ProjectBasicInfo = ({
  title, address, propertyType, beds, baths, currency, value, squareFeet
}: {
  title?: string,
  address?: string,
  propertyType: string,
  beds?: string,
  baths?: string,
  currency: string,
  value: string,
  squareFeet: string
}) => (
  <div className="flex w-full justify-between mt-[9.75px]">
    <div className="">
      <h3 className="text-[21.3px] sm:text-[26.25px] text-[#333333] font-medium font-poppins ">{title}</h3>
      {/* Price */}
      <h4>
        <span className='text-[12px] sm:text-[17.75px] mt-[4.5px] font-semibold font-poppins '>{currency}</span>
        <span className='font-poppins sm:text-[33.75px] text-[30px] ms-1 font-semibold '>
          {value}
        </span>
      </h4>

      {/* Location place */}
      <div className="flex items-center mt-[7.6px] m:mt-[13.5px] gap-1">
        <Image src={location_icon} alt="location" width={15} height={15} />
        <p className="capitalize text-[12px] font-normal font-poppins line-clamp-2">{address || 'Lum1nar Tower 3, Lum1nar Towers, JVT District 2, Jumeirah Village Triangle (JVT), Dubai'}</p>
      </div>

      {/* Property Type */}
      <div className="flex flex-wrap sm:flex-nowrap mt-[12.75px] items-center gap-3">
        <p className="capitalize font-medium font-poppins text-[12px]">{propertyType}</p>
        <div className="h-[18px] w-[1px] bg-[#333333]" />
        {!(propertyType === 'land-residential' || propertyType === 'land-commercial') && <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Image src={bed_icon} alt="bed icon" width={20} height={20} className="object-cover" />
            {/* <p className="text-sm font-light font-poppins">{item.numberOfBeds}</p> */}

            <Typography
              tag='p'
              className='text-[12px] text-nowrap font-light font-poppins'
              text={`Bedrooms: ${beds}`}
            />
          </div>

          <div className="flex items-center gap-2">
            <Image src={bath_icon} alt="bath icon" width={20} height={20} className="object-cover" />
            {/* <p className="text-sm font-light font-poppins">{item.numberOfBath}</p> */}
            <Typography
              tag='p'
              className='text-[12px] text-nowrap font-light font-poppins'
              text={`Bathrooms: ${baths}`}
            />
          </div>
        </div>}
        {!(propertyType === 'land-residential' || propertyType === 'land-commercial') && <div className="h-[18px] w-[1px] bg-[#333333]" />}
        <div className="flex items-center gap-3">

          <div className="flex items-center gap-2">
            <Image src={bath_icon} alt="bath icon" width={20} height={20} className="object-cover" />
            {/* <p className="text-sm font-light font-poppins">{item.squareFeet} </p> */}
            <Typography
              tag='p'

              className='text-[12px] font-light font-poppins'
              text={`${squareFeet} sqft`}
            />
          </div>
        </div>
      </div>
    </div>

    {/* share and wishlist option here */}
    <div className="sm:flex hidden gap-[6px] h-10">
      <PrimaryButton
        type="button"
        className="bg-[#FFE7EC] border-none text-[#FF1645] font-poppins rounded "

      >
        <div className="flex items-center w-[60px] h-[35.25px] justify-center gap-2">
          <Image src={save_icon} alt="save icon" width={21.75} height={21.75} />
          <label className="text-[14.25px] text-[#FF1645] font-medium font-poppins">Save</label>
        </div>
      </PrimaryButton>

      <PrimaryButton
        type="button"
        className="bg-[#FFE7EC] border-none text-[#FF1645] font-poppins rounded "

      >
        <div className="flex items-center gap-2 w-[60px] h-[35.25px] justify-center">
          <Image src={share_button_icon} alt="share icon" width={21.75} height={21.75} />
          <label className="text-[14.25px] text-[#FF1645] font-medium font-poppins">Share </label>
        </div>
      </PrimaryButton>
    </div>
  </div>
);

export default ProjectBasicInfo
