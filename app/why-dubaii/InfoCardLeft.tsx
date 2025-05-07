import Image from "next/image";
import React from "react";

type InfoCardProps = {
  title: string;
  highlight: string;
  description: string;
  icon: string;
};

const InfoCardLeft: React.FC<InfoCardProps> = ({ title, highlight, description, icon }) => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-white/30 backdrop-blur-md rounded-xl p-6 shadow-md">
      <div className="md:w-1/3 bg-gray-100 rounded-xl flex justify-center items-center p-6">
        <Image src={icon} alt="icon" className="h-20 w-20 object-contain" />
      </div>
      <div className="md:w-2/3 text-left md:pl-6 mt-4 md:mt-0">
        <h2 className="text-2xl md:text-3xl font-bold">
          <span className="text-green-700">{highlight}</span> {title}
        </h2>
        <p className="text-gray-700 mt-2">{description}</p>
      </div>
    </div>
  );
};

export default InfoCardLeft;
