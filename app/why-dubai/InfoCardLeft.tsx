import Image, { StaticImageData } from "next/image";
import React from "react";
import { ColorsTypes } from "./InfoCardRight";
import clsx from "clsx";

type InfoCardProps = {
  children: React.ReactNode;
  description: string;
  icon: StaticImageData;
  color:ColorsTypes
};

const InfoCardLeft: React.FC<InfoCardProps> = ({ children, description, icon,color }) => {
  return (
    <div className="flex flex-row h-[232px] md:flex-row items-center  w-full backdrop-blur-md gap-[37px] rounded-[5px]">
      <div className={clsx("h-[70px] sm:h-[232px] w-[78px] sm:w-[232px] rounded-xl flex justify-center items-center",color)}>
        <Image src={icon} alt="icon" className="h-[34px] sm:h-[85px] w-[34px] sm:w-[85px] object-cover" />
      </div>
      <div className="md:w-2/3 text-left  w-full flex-1 mt-[9px] md:mt-0">
        {children}
        <p className="text-[#666666] font-normal font-poppins text-[12px] mt-2">{description}</p>
      </div>
    </div>
  );
};

export default InfoCardLeft;
