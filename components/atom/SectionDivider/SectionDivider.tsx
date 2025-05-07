import React from 'react';
import clsx from 'clsx';

type SectionDividerProps = {
  containerClassName?: string;
  lineClassName?: string;
};

const SectionDivider: React.FC<SectionDividerProps> = ({
  containerClassName = 'mt-[45.75px]',
  lineClassName = 'h-[1px] w-full bg-[#DEDEDE] hidden sm:block',
}) => {
  return (
    <div className={clsx('', containerClassName)}>
      <div className={clsx('', lineClassName)} />
    </div>
  );
};

export default SectionDivider;
