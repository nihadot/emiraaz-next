import clsx from "clsx";
import Image, { StaticImageData } from "next/image";
import React from "react";

export enum ColorsTypes {
  ROI = "bg-[#3CA8E2]/14",
  TAX_FREE = "bg-[#345F4C]/14",
  FORE_OWNERSHIP = "bg-[#986F2D]/14",
  ECONOMY = "bg-[#304FFF]/14",
  TOURISM = "bg-[#01BFA5]/14",
  WORLD_CLASS = "bg-[#6A1B9A]/14",
  SAFE = "bg-[#5D4036]/14",
  RESIDENCY = "bg-[#0091EA]/14",
  PROPERTY = "bg-[#1A237E]/14",
  FLEXIBLE = "bg-[#D500F6]/14",
  MEGA_PROJECTS = "bg-[#00685A]/14",
  EXPO = "bg-[#F9C12B]/14",
}


type InfoCardProps = {
  children: React.ReactNode;
  description: string;
  icon: StaticImageData;
  color: ColorsTypes
};

const InfoCardRight: React.FC<InfoCardProps> = ({ children, description, icon,color }) => {
  return (
    <div className="flex flex-row h-[232px] md:flex-row items-center  w-full backdrop-blur-md gap-[37px] rounded-[5px]">

<div className="md:w-2/3 text-left  w-full flex-1 mt-[9px] md:mt-0">
        {children}
        <p className="text-[#666666] font-normal font-poppins text-[12px] mt-2">{description}</p>
      </div>

     <div className={clsx("h-[70px] sm:h-[232px] w-[78px] sm:w-[232px] rounded-xl flex justify-center items-center",color)}>
            <Image src={icon} alt="icon" className="h-[34px] sm:h-[85px] w-[34px] sm:w-[85px] object-cover" />
          </div>
    </div>
  );
};

export default InfoCardRight;
