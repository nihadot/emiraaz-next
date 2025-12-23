'use client';

import { useState } from 'react';
import VerifyAgentForm from './VerifyAgentForm';
import AgentWorkingCard from './AgentWorkingCard';
import AgentNotWorkingCard from './AgentNotWorkingCard';
import AgentNotFoundCard from './AgentNotFoundCard';
import { AgentStatus, AgentData } from './types';

export default function AgentVerificationMobile() {
  const [status, setStatus] = useState<AgentStatus>({
    working: false,
    notWorking: false,
    notAvailable: false,
    reportAgent: false,
  });

  const [data, setData] = useState<AgentData | null>(null);

  return (
    <main className="min-h-screen bg-white px-4 pt-4 pb-24">
      {/* DEFAULT FORM */}
      {!status.working && !status.notWorking && !status.notAvailable && (
        <VerifyAgentForm
          setStatus={setStatus}
          setData={setData}
        />
      )}

      {/* WORKING */}
      {status.working && data && (
        <AgentWorkingCard
          data={data}
          onBack={() =>
            setStatus({
              working: false,
              notWorking: false,
              notAvailable: false,
              reportAgent: false,
            })
          }
        />
      )}

      {/* NOT WORKING */}
      {status.notWorking && data && (
        <AgentNotWorkingCard
          data={data}
          onBack={() =>
            setStatus({
              working: false,
              notWorking: false,
              notAvailable: false,
              reportAgent: false,
            })
          }
        />
      )}

      {/* NOT FOUND */}
      {status.notAvailable && (
        <AgentNotFoundCard
          onBack={() =>
            setStatus({
              working: false,
              notWorking: false,
              notAvailable: false,
              reportAgent: false,
            })
          }
        />
      )}
    </main>
  );
}
