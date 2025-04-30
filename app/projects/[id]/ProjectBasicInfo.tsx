import { bath_icon, bed_icon, location_icon, save_icon, share_button_icon } from "@/app/assets";
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
  <div className="flex w-full justify-between gap-0 mt-3">
    <div className="mb-3">
      <h3 className="sm:text-[30px] text-[24px] font-medium font-poppins ">{title}</h3>
      <h4 className='sm:text-[28px] text-[24px] font-poppins sm:mt-3 font-semibold'>
        <span className="text-[16px] font-semibold font-poppins">{currency}</span> {value}
      </h4>
      <div className="flex items-center mt-3 gap-1">
        <Image src={location_icon} alt="location" width={21} />
        <p className="capitalize text-sm line-clamp-2">{address}</p>
      </div>
      <div className="flex mt-3 items-center gap-3">
        <p className="capitalize text-[14px]  font-poppins text-xs">{propertyType}</p>
        <div className="h-4 w-[1px] bg-black" />
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Image src={bed_icon} alt="bed icon" width={20} height={20} className="object-cover" />
            <p className="text-sm font-light font-poppins">{beds}</p>
          </div>
          <div className="flex items-center gap-2">
            <Image src={bath_icon} alt="bath icon" width={20} height={20} className="object-cover" />
            <p className="text-sm font-light font-poppins">{baths}</p>
          </div>
        </div>
        <div className="h-4 w-[1px] bg-black" />
        <div className="flex items-center gap-3">

          <div className="flex items-center gap-2">
            <Image src={bath_icon} alt="bath icon" width={20} height={20} className="object-cover" />
            <p className="text-sm font-light font-poppins">{squareFeet} sqft</p>
          </div>
        </div>
      </div>
    </div>
    <div className="sm:flex hidden gap-3 h-10">
      <PrimaryButton
        type="button"
        className="bg-[#FFE7EC] border-none text-[#FF1645] font-poppins rounded "
       
      >
         <div className="flex items-center gap-2">
            <Image src={save_icon} alt="save icon" width={21} />
            <label className="text-sm font-light text-[#FF1645] font-poppins">Save</label>
          </div>
          </PrimaryButton>
      
      <PrimaryButton
        type="button"
        className="bg-[#FFE7EC] border-none text-[#FF1645] font-poppins rounded "
       
      >
       <div className="flex items-center gap-2">
            <Image src={share_button_icon} alt="share icon" width={21} />
            <label className="text-sm font-light text-[#FF1645] font-poppins">Share </label>
          </div>
      </PrimaryButton>
    </div>
  </div>
);

export default ProjectBasicInfo
