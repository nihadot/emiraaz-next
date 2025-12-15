// components/DescriptionBlock.tsx
"use client";

interface DescriptionBlockProps {
  title?: string;
  html: string;
}

export default function DescriptionBlock({
  title = "Description",
  html,
}: DescriptionBlockProps) {
  return (
    <section className="w-full">
   

      <div
        className="text-base leading-[32px] font-poppins font-normal text-[#333333]"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </section>
  );
}
