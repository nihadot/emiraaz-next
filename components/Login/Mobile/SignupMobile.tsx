'use client';

import AuthContainer from './AuthContainer';
import AuthTabs from './AuthTabs';
import { ChevronDown } from 'lucide-react';

export default function SignupMobile() {
  return (
    <AuthContainer
      footer={
        <button className="w-full h-[52px] rounded-xl bg-black text-white text-base font-medium">
          Continue
        </button>
      }
    >
      <AuthTabs />

      <div className="mt-6 space-y-4">
        <Input label="Name" placeholder="Enter your name" />
        <Input label="Email" placeholder="Enter your Password" />

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium mb-2.5 text-black">
            Phone
          </label>
          <div className="flex items-center h-[52px] rounded-xl border border-gray-200 px-3.5 focus-within:border-black bg-white">
            <div className="flex items-center gap-1.5 pr-2.5 border-r border-gray-200">
              <span className="text-lg">🇦🇪</span>
              <ChevronDown size={16} className="text-gray-400" />
            </div>
            <input
              placeholder="Enter your no"
              className="flex-1 h-full text-sm outline-none px-3 text-gray-900 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Nationality */}
        <div>
          <label className="block text-sm font-medium mb-2.5 text-black">
            Nationality
          </label>
          <div className="flex items-center h-[52px] rounded-xl border border-gray-200 px-4 focus-within:border-black bg-white cursor-pointer">
            <input
              placeholder="Choose Nationality"
              className="flex-1 text-sm outline-none text-gray-400 cursor-pointer"
              readOnly
            />
            <ChevronDown size={18} className="text-gray-400" />
          </div>
        </div>

        <Input label="Password" placeholder="Enter your Password" type="password" />
        <Input
          label="Confirm Password"
          placeholder="Enter your Password"
          type="password"
        />

        {/* Terms */}
        <label className="flex items-start gap-2.5 text-sm text-gray-700 cursor-pointer pt-1">
          <input type="checkbox" className="w-4 h-4 mt-0.5 accent-black cursor-pointer" />
          <span className="leading-tight">I Agree to all <span className="font-medium text-black">Terms&Conditions</span></span>
        </label>
      </div>
    </AuthContainer>
  );
}

function Input({
  label,
  placeholder,
  type = 'text',
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2.5 text-black">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full h-[52px] rounded-xl border border-gray-200 px-4 text-sm
                   focus:outline-none focus:border-black bg-white text-gray-900 
                   placeholder:text-gray-400"
      />
    </div>
  );
}