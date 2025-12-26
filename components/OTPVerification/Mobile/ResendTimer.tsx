'use client';

import { useEffect, useState } from 'react';

export default function ResendTimer({
  onResend,
}: {
  onResend: () => void;
}) {
  const [seconds, setSeconds] = useState(175); // 2m 55s

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = setInterval(() => {
      setSeconds((s) => s - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;

  if (seconds <= 0) {
    return (
      <button
        onClick={onResend}
        className="text-black font-medium underline"
      >
        Resend OTP
      </button>
    );
  }

  return (
    <span className="text-gray-500">
      {minutes}m {remaining}s
    </span>
  );
}
