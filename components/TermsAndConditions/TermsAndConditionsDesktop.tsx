'use client';

import Container from '@/components/atom/Container/Container';
import SpaceWrapper from '@/components/atom/SpaceWrapper/SpaceWrapper';

type Term = {
  title: string;
  content: string[];
};

export default function TermsAndConditionsDesktop({
  terms,
}: {
  terms: Term[];
}) {
  return (
    <Container>
      <h1 className="font-poppins mt-[20px] sm:mt-[51px] text-center font-medium text-[19.5px] sm:text-[37.5px]">
        Terms And Conditions
      </h1>

      <SpaceWrapper className="sm:mt-[46.5px] mb-20">
        {terms.map((item, index) => (
          <div key={index}>
            <p className="text-[19px] mt-[19px] mb-2 font-poppins font-medium">
              {item.title}
            </p>

            {item.content.map((text, i) => (
              <p
                key={i}
                className="text-[12px] font-poppins font-normal text-[#000000] mb-2"
              >
                {text}
              </p>
            ))}
          </div>
        ))}
      </SpaceWrapper>
    </Container>
  );
}
