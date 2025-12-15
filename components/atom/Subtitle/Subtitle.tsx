// components/atom/Subtitle/Subtitle.tsx
"use client";

export default function Subtitle({ text }: { text: string }) {
  return (
    <p className="text-base font-poppins text-black font-medium mb-0">
      {text}
    </p>
  );
}
