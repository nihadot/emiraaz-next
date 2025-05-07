import clsx from 'clsx';
import React from 'react';

type Props = {
  title: string;
  items?: string[];
  className?: string;
  containerClassName?: string;
  elementClassName?: string;
};

function RecommendedText({ title, items,className,containerClassName,elementClassName }: Props) {
  return (
    <div className={clsx("w-full",className)}>
      <p className={clsx("rounded-[3.5px] p-2 my-2 text-[12px] border font-semibold border-[#DEDEDE] bg-[#F5F5F5] font-poppins",containerClassName)}>{title}</p>
      {items?.map((item, index) => (
        <p
          key={index}
          className={clsx("font-normal pb-[7.5px] text-[12px] text-[#767676] font-poppins",elementClassName)}
        >
          {item}
        </p>
      ))}
    </div>
  );
}

export default RecommendedText;
