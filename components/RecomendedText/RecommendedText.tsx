import { formatUrl } from '@/utils/formatUrl';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

type Props = {
  title: string;
  items?: {
  url:string,
  }[];
  className?: string;
  containerClassName?: string;
  elementClassName?: string;
};

function RecommendedText({ title, items,className,containerClassName,elementClassName }: Props) {
  return (
    <div className={clsx("w-full",className)}>
      <p className={clsx("rounded-[3.5px] p-2 my-2 text-[12px] border font-semibold border-[#DEDEDE] bg-[#F5F5F5] font-poppins",containerClassName)}>{title}</p>
      {items?.map((item, index) => {

        if(!item?.url) return

        const url  = formatUrl(item.url)

        return (
           
           <Link
           href={item.url}
             key={index}
           >
           <p
          className={clsx("block truncate text-ellipsis line-clamp-1 font-normal pb-[7.5px] text-[12px] text-[#767676] font-poppins",elementClassName)}
          >
          {url}
        </p>
          </Link>
        )
      }
       
      )}
    </div>
  );
}

export default RecommendedText;
