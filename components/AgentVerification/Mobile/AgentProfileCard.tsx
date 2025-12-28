"use client";

import Image from "next/image";
import { User, Globe, MessageCircle, Calendar } from "lucide-react";
import UserIcon from "../../../public/AgentVerification/userICon.svg";
import NationalIcon from "../../../public/AgentVerification/NationalityIcon.svg";
import Message from "../../../public/AgentVerification/MessageIcon.svg";
import CalendarIcon from "../../../public/AgentVerification/CalendarIcon.svg";

import { AgentData } from "./types";

export default function AgentProfileCard({ data }: { data: AgentData }) {
  console.log("the joining date :", data.joiningDate);

  //date filtering function

  function formatDate(dateString?: string): string {
    if (!dateString) return "";

    const date = new Date(dateString);

    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
    }).format(date);
  }
  return (
    <div className="rounded-[13px] border border-[#DEDEDE] px-5 py-6 bg-white">
      {/* Profile Image */}
      {data.image?.webp?.url && (
        <div className="relative mx-auto mb-5 h-[167px] w-[147px] overflow-hidden rounded-[10px]">
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
          icon={<Icon src={UserIcon} alt="User" />}
          label="Full Name"
          value={data.name}
        />

        <Row
          icon={<Icon src={NationalIcon} alt="Nationality" />}
          label="Nationality"
          value={data.country}
        />

        <Row
          icon={<Icon src={Message} alt="Languages" />}
          label="Languages Spoken"
          value={data.languages.join(", ")}
        />

        <Row
          icon={<Icon src={CalendarIcon} alt="Working Since" />}
          label="Working Since"
          value={formatDate(data.joiningDate)}
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
        <span className="mx-1 font-semibold">:</span>
        <span className="font-normal">{value}</span>
      </span>
    </div>
  );
}

//icons compontent fot this component
function Icon({ src, alt }: { src: any; alt: string }) {
  return (
    <Image src={src} alt={alt} width={16} height={16} className="shrink-0" />
  );
}
