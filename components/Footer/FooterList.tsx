import clsx from "clsx";
import Link from "next/link";
import React from "react";

type FooterListProps = {
  title: string;
  items: {title:string,link:string}[];
  ulContainerClassName?: string;
  liContainerClassName?: string;
  LinkItemClassName?: string;
};

const FooterList: React.FC<FooterListProps> = ({ title, items,ulContainerClassName,LinkItemClassName,liContainerClassName }) => {
  return (
    <ul className={clsx("flex pt-4 sm:py-4 flex-col items-start font-poppins text-white",ulContainerClassName)}>
      <li className={clsx("text-white font-medium text-[14px] py-1",liContainerClassName)}>{title}</li>
      {items.map((item, index) => (
        <Link  href={item.link} key={index} className={clsx("text-white/60 py-1 text-[13px]",LinkItemClassName)}>
          {item.title}
        </Link>
      ))}
    </ul>
  );
};

export default FooterList;
