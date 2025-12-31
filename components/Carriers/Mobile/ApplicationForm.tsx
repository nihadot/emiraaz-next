'use client';

import { X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { PhoneInput } from 'react-international-phone';
import Select from 'react-select';

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
const [phone, setPhone] = useState('');
const nationalityOptions = [
  { value: 'India', label: 'India' },
  { value: 'UAE', label: 'United Arab Emirates' },
  { value: 'UK', label: 'United Kingdom' },
];
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
          <X size={20} />
        </button>
      </div>

      <div className="space-y-4">
        <Input label="Full Name" placeholder="Enter your full name" />

       {/* Nationality */}
<div>
  <p className="text-[13px] font-medium mb-1">Nationality</p>

  <Select
    options={nationalityOptions}
    placeholder="Select Nationality"
    onChange={(opt) => setNationality(opt?.value || '')}
    styles={{
      control: (base) => ({
        ...base,
        minHeight: '44px',
        borderRadius: '14px',
        borderColor: '#E5E7EB',
        boxShadow: 'none',
        fontSize: '13px',
      }),
      placeholder: (base) => ({
        ...base,
        color: '#9CA3AF',
      }),
      indicatorSeparator: () => ({
        display: 'none',
      }),
    }}
  />
</div>

{/* Phone no */}
<div>
  <p className="text-[13px] font-medium mb-1">Phone no</p>

  <div className="w-full h-[44px] rounded-[14px] border border-[#E5E7EB] px-3 flex items-center">
    <PhoneInput
      defaultCountry="ae"
      value={phone}
      onChange={setPhone}
      className="w-full flex items-center gap-2"
      inputClassName="
        h-full w-full
        border-none outline-none
        text-[13px]
        placeholder:text-[#9CA3AF]
      "
      countrySelectorStyleProps={{
        buttonClassName:
          'border-none bg-transparent p-0 flex items-center gap-1',
      }}
    />
  </div>
</div>
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
                  h-9 px-3 rounded-full border text-[13px]
                  ${experience === y
                    ? 'border-black bg-black text-white'
                    : 'border-[#E5E7EB]'
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
          w-full h-[44px]
          rounded-[14px]
          border border-[#E5E7EB]
          px-3 text-[13px]
          placeholder:text-[#9CA3AF]
        "
      />
    </div>
  );
}
