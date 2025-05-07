import Image from "next/image";
import React from "react";

type InfoCardProps = {
  title: string;
  highlight: string;
  description: string;
  icon: string; // path to image (can be local or URL)
};

const InfoCardRight: React.FC<InfoCardProps> = ({ title, highlight, description, icon }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white/30 backdrop-blur-md rounded-xl p-6 shadow-md">
      <div className="md:w-2/3 text-left">
        <h2 className="text-2xl md:text-3xl font-bold">
          {title} <span className="text-blue-500">({highlight})</span>
        </h2>
        <p className="text-gray-700 mt-2">{description}</p>
      </div>
      <div className="md:w-1/3 flex justify-center mt-4 md:mt-0">
        <Image src={icon} alt="icon" className="h-20 w-20 object-contain" />
      </div>
    </div>
  );
};

export default InfoCardRight;
