"use client";

import Header from "../Header";
import Container from "../atom/Container/Container";
import SpaceWrapper from "../atom/SpaceWrapper/SpaceWrapper";
import PrimaryButton from "../Buttons";
import SectionDivider from "../atom/SectionDivider/SectionDivider";
import { Footer } from "../Footer";
import { LuWifiOff } from "react-icons/lu";
import { CiRedo } from "react-icons/ci";
import clsx from "clsx";

export function NoInternetUI({ onRetry }: { onRetry: () => void }) {
  return (
    <main>
      <Header />
      <SectionDivider
        containerClassName="mt-[10.5px] mb-[12px]"
        lineClassName="h-[1px] w-full bg-[#DEDEDE]"
      />

      <Container>
        <div className="max-w-[600px] flex flex-col justify-center items-center w-full m-auto py-24">
          <LuWifiOff size={40} color="red" />

          <p className="font-poppins pt-[15px] text-[30px] max-w-[300px] sm:text-[37.5px] font-medium text-black text-center">
            Oops! It seems you’re offline.
          </p>

          <SpaceWrapper className="pt-[15px]">
            <Paragraph content="We’re unable to connect. Please try:" />

            <Paragraph content={<><strong>1.</strong> Check your WiFi.</>} />
            <Paragraph content={<><strong>2.</strong> Restart your router.</>} />
            <Paragraph content={<><strong>3.</strong> Try again later.</>} />
          </SpaceWrapper>

          <PrimaryButton
            onClick={onRetry}
            className="bg-[#FF1645] mt-5 rounded-[5px] text-white"
          >
            <label className="text-[14px] sm:text-[18px] font-poppins font-medium">
              Retry
            </label>
            <CiRedo size={20} color="white" />
          </PrimaryButton>
        </div>
      </Container>

      <Footer />
    </main>
  );
}

function Paragraph({
  content,
  className
}: {
  content: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={clsx("font-poppins font-normal text-[10.5px] sm:text-[12px] text-black", className)}>
      {content}
    </p>
  );
}
