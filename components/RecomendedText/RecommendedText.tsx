import React from 'react';

type Props = {
  title: string;
  items: string[];
};

function RecommendedText({ title, items }: Props) {
  return (
    <div className="">
      <p className="rounded-[5px] p-2 my-2 text-sm border font-semibold border-[#DEDEDE] bg-[#F5F5F5]">{title}</p>
      {items.map((item, index) => (
        <p
          key={index}
          className="font-normal p-1 text-[14px] text-[#767676] font-poppins"
        >
          {item}
        </p>
      ))}
    </div>
  );
}

export default RecommendedText;
