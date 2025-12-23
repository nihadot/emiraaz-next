'use client';

import { Check } from 'lucide-react';
import AgentProfileCard from './AgentProfileCard';
import { AgentData } from './types';

export default function AgentWorkingCard({
  data,
  onBack,
}: {
  data: AgentData;
  onBack: () => void;
}) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-500">
        <Check className="text-white" />
      </div>

      <h3 className="font-semibold text-[16px]">
        This agent is currently working with PropertySeller.
      </h3>

      <div className="mt-4">
        <AgentProfileCard data={data} />
      </div>

      <button
        onClick={onBack}
        className="fixed bottom-4 left-4 right-4 h-12 rounded-xl bg-black text-white"
      >
        Go Back
      </button>
    </div>
  );
}
