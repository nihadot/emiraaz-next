'use client';

import Image from 'next/image';
import agentWarningIcon from '@/app/assets/agentwarning.png';
import { useState } from 'react';
import ReportAgentForm from './ReportAgentForm';

export default function AgentNotFoundCard({
  onBack,
}: {
  onBack: () => void;
}) {
  const [showReport, setShowReport] = useState(false);

  // 👉 Show Report Page
  if (showReport) {
    return <ReportAgentForm onClose={() => setShowReport(false)} />;
  }

  return (
    <div className="relative h-screen overflow-hidden bg-white px-4 font-poppins">
      {/* Center Content */}
      <div className="flex h-full flex-col items-center justify-center text-center">
        <Image
          src={agentWarningIcon}
          alt="Agent not found"
          width={44}
          height={44}
          className="mb-5"
          priority
        />

        <h3 className="mb-2 text-[16px] font-semibold text-gray-900">
          This agent is not in our records.
        </h3>

        <p className="max-w-[280px] text-[13px] leading-[18px] text-[#333333]">
          We could not verify this Agent ID. This agent is not affiliated with
          PropertySeller.
        </p>

        <p className="mt-3 max-w-[280px] text-[13px] leading-[18px] text-[#333333]">
          If you suspect this is a fake agent, please help us keep the community
          safe by reporting them.
        </p>
      </div>

      {/* Bottom Buttons */}
      <div className="absolute bottom-4 left-4 right-4 flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 h-12 rounded-[9px] bg-[#E5E5E5] text-[15px] font-medium text-black"
        >
          Go Back
        </button>

        <button
          onClick={() => setShowReport(true)}
          className="flex-1 h-12 rounded-[9px] bg-black text-[15px] font-medium text-white"
        >
          Report
        </button>
      </div>
    </div>
  );
}
