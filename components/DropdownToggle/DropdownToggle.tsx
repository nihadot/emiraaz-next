'use client';

import Image from 'next/image';
import React from 'react';
import { drop_down__red_icon, drop_up_red_icon } from '@/app/assets';

interface DropdownToggleProps {
  isOpen: boolean;
  onClick: () => void;
  label: string;
  className?: string;
}

const DropdownToggle: React.FC<DropdownToggleProps> = ({
  isOpen,
  onClick,
  label,
  className = '',
}) => {
  return (
    <div
      onClick={onClick}
      className={`border py-3 rounded-md px-3 gap-3 text-sm border-[#DEDEDE] text-[#767676] cursor-pointer flex w-full select-none relative ${className}`}
    >
      <div className='flex justify-between w-full items-center'>
        <label>{label}</label>
        <Image
          src={isOpen ? drop_up_red_icon : drop_down__red_icon}
          alt='toggle icon'
          width={24}
        />
      </div>
    </div>
  );
};

export default DropdownToggle;
