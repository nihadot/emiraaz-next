"use client";
import { useEffect, useState } from "react";
import Header from "../Header";
import Container from "../atom/Container/Container";
import SpaceWrapper from "../atom/SpaceWrapper/SpaceWrapper";
import PrimaryButton from "../Buttons";
import { useRouter } from "next/navigation";
import { Footer } from "../Footer";
import clsx from "clsx";
import { LuWifiOff } from "react-icons/lu";
import { CiRedo } from "react-icons/ci";
import SectionDivider from "../atom/SectionDivider/SectionDivider";

export default function NoInternetWrapper({ children }: { children: React.ReactNode }) {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  const router = useRouter();

  if (!isOnline) {
    return (
      <main>
        <Header />
   <SectionDivider
                    containerClassName="mt-[10.5px] mb-[12px]"
                    lineClassName="h-[1px] w-full bg-[#DEDEDE]"
                />
        <Container>

          <div className="max-w-[600px] flex flex-col justify-center items-center w-full m-auto py-24">
            <LuWifiOff
              size={40}
              color="red"
            />

            <p className="font-poppins pt-[15px] text-[30px] max-w-[300px] sm:text-[37.5px] font-medium text-black text-center">Oops! It seems you’re offline.</p>
            <SpaceWrapper
              className="pt-[15px]"
            >

              <Paragraph
                content="We’re unable to connect to the internet right now. Please check your connection and try the following:"
              />
              <Paragraph
                content={
                  <>
                    <p>
                      <strong>1.Check Your Wi-Fi Connection:</strong> Ensure that your device is connected to Wi-Fi or mobile data.
                    </p>

                    <p>
                      <strong>2.Restart Your Router:</strong> Sometimes, a quick restart of your router can resolve connectivity issues.
                    </p>

                    <p>
                      <strong>3.Try Again Later:</strong> If the problem persists, there may be an issue with your internet service provider.
                    </p>
                  </>
                }
              />
            </SpaceWrapper>

            <PrimaryButton
              onClick={() => router.push('/')}
              className="bg-[#FF1645] mt-5 rounded-[5px] text-white "
            >
              <label htmlFor="" className="text-[14px[ sm:text-[18px] font-poppins font-medium">Retry</label>
              <CiRedo size={20} color="white" />
            </PrimaryButton>
          </div>

        </Container>

        <Footer />
      </main>
    );
  }

  return <>{children}</>;
}




function Paragraph({
  content,
  className
}: {
  content: React.ReactNode,
  className?: string
}) {
  return (
    <p className={clsx('font-poppins font-normal text-[10.5px] sm:text-[12px] text-black', className)}>
      {content}
    </p>
  )
}
