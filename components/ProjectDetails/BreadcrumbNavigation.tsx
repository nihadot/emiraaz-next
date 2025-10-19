'use client'
import Image from "next/image";
import { back_red_icon } from "@/app/assets";
import { IoChevronBackOutline } from "react-icons/io5";

type Props = {
  backToFun: () => void;
}
export default function BreadcrumbNavigation({ backToFun }: Props) {
  return (
    <div onClick={() => backToFun()} className="sm:flex hidden items-center py-3">
      {/* <Image src={back_red_icon} alt="Back" width={11.25} height={11.25} /> */}
      <IoChevronBackOutline color='#FF1645' size={14} />

      <p className="text-[#FF1645] text-[12px] ms-[9px] cursor-pointer font-medium font-poppins">Back to Search</p>
    </div>
  );
}
