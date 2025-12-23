'use client';

import AgentProfileCard from './AgentProfileCard';
import { AgentData } from './types';

export default function AgentNotWorkingCard({
  data,
  onBack,
}: {
  data: AgentData;
  onBack: () => void;
}) {
  return (
    <div className="text-center">
      <h3 className="font-semibold text-[16px]">
        This agent is no longer working with PropertySeller.
      </h3>

      <div className="mt-4">
        <AgentProfileCard data={data} />
      </div>

      <p className="mt-4 text-[12px] text-gray-500">
        If you are currently involved in a transaction with this agent,
        please email us at support@propertyseller.com
      </p>

      <div className="fixed bottom-4 left-4 right-4 flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 h-12 rounded-xl bg-gray-200"
        >
          Go Back
        </button>
        <a
          href="mailto:support@propertyseller.com"
          className="flex-1 h-12 rounded-xl bg-black text-white flex items-center justify-center"
        >
          Email
        </a>
      </div>
    </div>
  );
}
