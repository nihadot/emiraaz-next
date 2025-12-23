'use client';

import Image from 'next/image';
import { User, Globe, MessageCircle, Calendar } from 'lucide-react';
import { AgentData } from './types';

export default function AgentProfileCard({ data }: { data: AgentData }) {
  return (
    <div className="rounded-2xl border border-gray-200 px-5 py-6 bg-white">
      {/* Profile Image */}
      {data.image?.webp?.url && (
        <div className="relative mx-auto mb-5 h-36 w-36 overflow-hidden rounded-2xl">
          <Image
            src={data.image.webp.url}
            alt={data.name}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Info Rows */}
      <div className="space-y-3 text-[14px] text-gray-900">
        <Row
          icon={<User size={16} />}
          label="Full Name"
          value={data.name}
        />

        <Row
          icon={<Globe size={16} />}
          label="Nationality"
          value={data.country}
        />

        <Row
          icon={<MessageCircle size={16} />}
          label="Languages Spoken"
          value={data.languages.join(', ')}
        />

        <Row
          icon={<Calendar size={16} />}
          label="Working Since"
          value={data.joiningDate}
        />
      </div>
    </div>
  );
}

function Row({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-gray-900">{icon}</span>

      <span className="text-[14px] text-gray-900">
        <span className="font-medium">{label}</span>
        <span className="mx-1">:</span>
        <span className="font-normal">{value}</span>
      </span>
    </div>
  );
}
