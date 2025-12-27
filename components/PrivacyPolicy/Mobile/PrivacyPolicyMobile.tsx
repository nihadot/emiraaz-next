'use client';

type Term = {
  title: string;
  content: string[];
};

export default function PrivacyPolicyMobile({
  terms,
}: {
  terms: Term[];
}) {
  return (
    <div className="px-2 pb-20 pt-6">
      {terms.map((section, index) => (
        <div key={index} className="mb-6">
          {/* Section Title */}
          <p className="text-[15px] font-bold text-black mb-2">
            {section.title}
          </p>

          {/* Section Content */}
          {section.content.map((line, i) => (
            <p
              key={i}
              className="text-[13px] leading-[18px] text-black mb-2"
            >
              {line}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
