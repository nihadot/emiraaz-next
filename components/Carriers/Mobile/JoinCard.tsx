'use client';

import Image from 'next/image';
import { useState } from 'react';
import joinSvg from '@/app/assets/CarreerJoin.svg';
import ApplicationModal from './ApplicationModal';

export default function JoinCard() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="mt-6 rounded-2xl border border-[#E5E7EB] bg-white p-5 text-center">
        <h3 className="text-[18px] font-semibold">
          Ready to Join Us?
        </h3>

        <p className="mt-2 text-[13px] text-[#6B7280]">
          We’re excited to meet people who want to grow with us.
        </p>

        <div className="my-6 flex justify-center">
          <Image src={joinSvg} alt="Join" width={90} height={90} />
        </div>

        <button
          onClick={() => setOpen(true)}
          className="w-full rounded-lg bg-black py-3 text-white text-[14px] font-medium hover:bg-gray-800"
        >
          Join Now
        </button>
      </div>

      {/* ✅ THIS IS THE KEY */}
      <ApplicationModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
