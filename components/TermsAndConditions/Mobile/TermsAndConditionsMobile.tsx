'use client';

import Container from '@/components/atom/Container/Container';

type Props = {
  terms: {
    title: string;
    content: string[];
  }[];
};

export default function TermsAndConditionsMobile({ terms }: Props) {
  return (
    <Container>
      <div className="pt-4 pb-20">
        {terms.map((section, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-[14px] font-semibold mb-2">
              {section.title}
            </h2>

            {section.content.map((text, i) => (
              <p
                key={i}
                className="text-[12px] leading-[18px] text-black mb-2"
              >
                {text}
              </p>
            ))}
          </div>
        ))}
      </div>
    </Container>
  );
}
