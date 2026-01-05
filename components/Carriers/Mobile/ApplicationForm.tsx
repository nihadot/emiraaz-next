'use client';

import { X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { TfiClose } from "react-icons/tfi";


export default function ApplicationForm({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: () => void;
}) {
  const [nationalityOpen, setNationalityOpen] = useState(false);
  const [nationality, setNationality] = useState('');
  const [experience, setExperience] = useState('');

  return (
    <div className="px-5 pt-5 pb-6">
      {/* Header */}
      <div className="flex justify-between mb-4">
        <div>
          <h3 className="text-[18px] font-semibold">
            Application Form
          </h3>
          <p className="text-[13px] text-[#6B7280]">
            Tell us a bit about yourself.
          </p>
        </div>

        <button onClick={onClose}>
          <TfiClose size={20} className="hover:scale-125"/>
        </button>
      </div>

      <div className="space-y-4">
        <Input label="Full Name"  placeholder="Enter your full name" />

        {/* Nationality */}
        <div className="relative">
          <p className="text-[13px] font-medium mb-1">Nationality</p>

          <button
            onClick={() => setNationalityOpen(!nationalityOpen)}
            className="
              w-full h-11 rounded-[11px]
              border-[1.5px] border-[#DEDEDE]
              px-3 flex justify-between items-center
              text-[13px] text-[#9CA3AF]
            "
          >
            {nationality || 'Select Nationality'}
            <ChevronDown size={16} />
          </button>

          {nationalityOpen && (
            <div className="absolute z-20 mt-2 w-full rounded-xl border bg-white shadow">
              {['India', 'UAE', 'UK'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setNationality(item);
                    setNationalityOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>

        <Input label="Phone no" placeholder="Enter Phone no" />
        <Input label="Languages" placeholder="English, Hindi, Arabic" />

        {/* Experience */}
        <div>
          <p className="text-[13px] font-medium mb-2">
            Years of Experience
          </p>
          <div className="flex gap-2 flex-wrap">
            {['0','1','2','3','4','5','6','7','8+'].map((y) => (
              <button
                key={y}
                onClick={() => setExperience(y)}
                className={`
                  h-9 px-3 rounded-[10px] border-[1.7px] text-[13px]
                  ${experience === y
                    ? 'border-black bg-black text-white'
                    : 'border-[#DEDEDE]'
                  }
                `}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        <Input
          label="Linkedin Profile"
          placeholder="Paste Linkedin profile link here .."
        />

        <button
        type="button" 
          onClick={onSubmit}
          className="w-full h-[52px] rounded-xl bg-black text-white text-[14px]"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

/* helpers */
function Input({ label, placeholder }: any) {
  return (
    <div>
      <p className="text-[13px] font-medium mb-1">{label}</p>
      <input
        placeholder={placeholder}
        className="
          w-full h-11
          rounded-[11px]
          border-[1.5px] border-[#DEDEDE]
          px-3 text-[13px]
          placeholder:text-[#9CA3AF]
        "
      />
    </div>
  );
}
