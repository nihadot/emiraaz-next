'use client';

import AuthContainer from './AuthContainer';
import AuthTabs from './AuthTabs';

export default function SignupMobile() {
  return (
    <AuthContainer
      footer={
        <button className="w-full h-14 rounded-xl bg-black text-white text-base font-medium">
          Continue
        </button>
      }
    >
      <AuthTabs />

      <div className="space-y-5">
        <Input label="Name" placeholder="Enter your name" />
        <Input label="Email" placeholder="Enter your email" />
        <Input label="Phone" placeholder="Enter your no" />
        <Input label="Nationality" placeholder="Choose Nationality" />
        <Input label="Password" placeholder="Enter your password" />
        <Input label="Confirm Password" placeholder="Enter your password" />

        <label className="flex gap-2 text-sm text-gray-600">
          <input type="checkbox" /> I agree to all Terms & Conditions
        </label>
      </div>
    </AuthContainer>
  );
}

function Input({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        placeholder={placeholder}
        className="w-full h-12 mt-2 rounded-xl border px-4"
      />
    </div>
  );
}
