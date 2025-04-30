'use client'
import Image from "next/image";
import { back_red_icon } from "@/app/assets";

type Props = {
  backToFun:()=> void;
}
export default function BreadcrumbNavigation({backToFun}:Props) {      
  return (
    <div onClick={()=> backToFun() } className="sm:flex hidden items-center py-3">
      <Image src={back_red_icon} alt="Back" width={20} height={20} />
      <p className="text-[#FF1645] text-sm font-medium font-poppins">Back to Search</p>
    </div>
  );
}
