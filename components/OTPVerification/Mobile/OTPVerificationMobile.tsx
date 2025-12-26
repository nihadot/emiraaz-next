'use client';

import OTPInput from './OTPInput';
import ResendTimer from './ResendTimer';

type Props = {
  email: string;
  loading: boolean;
  handleSubmit: () => void;
  handleResentOTP: () => void;
  onChange: (otp: string[]) => void;
};

export default function OTPVerificationMobile({
  email,
  loading,
  handleSubmit,
  handleResentOTP,
  onChange,
}: Props) {
  return (
    <main className="min-h-screen bg-white px-6 flex flex-col justify-between pb-6">
      {/* Content */}
      <div className="mt-24">
        <h1 className="text-2xl font-semibold text-center">
          Verify your email
        </h1>

        <div className="mt-8">
          <p className="text-sm font-medium text-black mb-1">
            Enter code
          </p>

          <p className="text-xs text-gray-500 mb-4">
            We sent it to <span className="font-medium">{email}</span>
            <br />
            The OTP will expire in <ResendTimer onResend={handleResentOTP} />
          </p>

          <OTPInput length={6} onChange={onChange} />
        </div>
      </div>

      {/* Button */}
      <button
        disabled={loading}
        onClick={handleSubmit}
        className={`w-full h-14 rounded-2xl text-white text-base font-medium transition ${
          loading ? 'bg-gray-400' : 'bg-black'
        }`}
      >
        Verify
      </button>
    </main>
  );
}
