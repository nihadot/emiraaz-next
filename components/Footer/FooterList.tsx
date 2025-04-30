import React from "react";

type FooterListProps = {
  title: string;
  items: string[];
};

const FooterList: React.FC<FooterListProps> = ({ title, items }) => {
  return (
    <ul className="flex py-4 flex-col items-start font-poppins text-white">
      <li className="text-white font-medium text-[14px] py-1">{title}</li>
      {items.map((item, index) => (
        <li key={index} className="text-white/60 py-1 text-[13px]">
          {item}
        </li>
      ))}
    </ul>
  );
};

export default FooterList;
