import React from 'react';
import Image from 'next/image';

interface InfoCardMobileProps {
  icon: any;
  title: string;
  description: string;
  accentColor: string;
}

function InfoCardMobile({
  icon,
  title,
  description,
  accentColor,
}: InfoCardMobileProps) {
  return (
    <div className="bg-white font-poppins rounded-xl border border-[#E5E7EB] px-4 py-3 mb-3">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0">
          <Image src={icon} alt="" width={40} height={40} />
        </div>

        <div className="flex-1">
          <p className="text-[17px] font-semibold text-[#111827] leading-tight">
            {title}
          </p>
          <p className="mt-1 text-[12px] text-[#6B7280] leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default InfoCardMobile;
