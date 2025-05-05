import React from 'react';

type Props = {
  title: string;
  items: string[];
};

function RecommendedText({ title, items }: Props) {
  return (
    <div className="">
      <p className="rounded-[3.5px] p-2 my-2 text-[12px] border font-semibold border-[#DEDEDE] bg-[#F5F5F5] font-poppins">{title}</p>
      {items.map((item, index) => (
        <p
          key={index}
          className="font-normal pb-[7.5px] text-[12px] text-[#767676] font-poppins"
        >
          {item}
        </p>
      ))}
    </div>
  );
}

export default RecommendedText;
