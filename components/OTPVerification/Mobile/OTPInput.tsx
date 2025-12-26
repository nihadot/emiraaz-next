'use client';

import { useRef } from 'react';

type Props = {
  length: number;
  onChange: (otp: string[]) => void;
};

export default function OTPInput({ length, onChange }: Props) {
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const values = Array(length).fill('');

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    values[index] = value;
    onChange([...values]);

    if (value && inputs.current[index + 1]) {
      inputs.current[index + 1]?.focus();
    }
  };

  return (
   <div className="flex gap-3 justify-center">
  {Array.from({ length }).map((_, i) => (
    <input
      key={i}
      ref={(el) => {
        inputs.current[i] = el;
      }}
      maxLength={1}
      onChange={(e) => handleChange(e.target.value, i)}
      className="w-12 h-12 border border-gray-200 rounded-xl text-center text-lg font-semibold focus:outline-none focus:border-black"
    />
  ))}
</div>

  );
}
