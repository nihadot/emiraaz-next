import { save_icon, share_button_icon } from '@/app/assets'
import PrimaryButton from '@/components/Buttons'
import Image from 'next/image'
import React from 'react'
import { PiMapPin } from "react-icons/pi";
import { PiPlayCircle } from "react-icons/pi";

function ModalViewButtons() {
  return (
    <div className="flex w-full gap-2 mt-[8.5px] sm:hidden h-[35px]">
    <PrimaryButton
      type="button"
      className="bg-[#FFE7EC] flex-1 border-none text-[#FF1645] font-poppins rounded "
   
    >
       <div className="flex items-center gap-2">
          {/* <Image src={save_icon} alt="save icon" width={19} height={19} /> */}
            <PiMapPin
            size={19}
            color='red'
            />
          <label className="text-sm text-[#FF1645] text-[12.73px] font-medium font-poppins">Map</label>
        </div>
      </PrimaryButton>
    <PrimaryButton
      type="button"
      className="bg-[#FFE7EC] flex-1 border-none text-[#FF1645] font-poppins rounded "
    >
        <div className="flex items-center gap-2">
          <PiPlayCircle
          size={19}
          color='red'
          />
          {/* <Image src={share_button_icon} alt="share icon" width={19} height={19} /> */}
          <label className="text-sm text-[#FF1645] text-[12.73px] font-medium font-poppins">Video</label>
        </div>
  </PrimaryButton>
  </div>  )
}

export default ModalViewButtons