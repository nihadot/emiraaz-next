import Link from "next/link";
import React from "react";

type FooterListProps = {
  title: string;
  items: {title:string,link:string}[];
};

const FooterList: React.FC<FooterListProps> = ({ title, items }) => {
  return (
    <ul className="flex pt-4 sm:py-4 flex-col items-start font-poppins text-white">
      <li className="text-white font-medium text-[14px] py-1">{title}</li>
      {items.map((item, index) => (
        <Link href={item.link} key={index} className="text-white/60 py-1 text-[13px]">
          {item.title}
        </Link>
      ))}
    </ul>
  );
};

export default FooterList;
