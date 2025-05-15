'use client';

import { useEffect, useState } from 'react';
import Header from './Header';
import { Footer } from './Footer';
import Container from './atom/Container/Container';
import SpaceWrapper from './atom/SpaceWrapper/SpaceWrapper';
import PrimaryButton from './Buttons';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { LiaRedoAltSolid } from "react-icons/lia";
import { CiWifiOff } from "react-icons/ci";

export default function OfflineFallback() {
  const [isOnline, setIsOnline] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check on initial load
    if (!navigator.onLine) setIsOnline(false);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOnline) {
    return (
     <main>
      <Header />

<Container>

      <div className="max-w-[600px] flex flex-col justify-center items-center w-full m-auto py-24">

       <div className="">
        <CiWifiOff className='w-20 h-20' color="#FF1645" />
       </div>

        <p className="font-poppins pt-[15px] text-[30px] sm:text-[37.5px] font-medium text-black text-center">Oops! It seems you’re offline.</p>
        <SpaceWrapper
          className="pt-[15px]"
        >

          <Paragraph
            content="We’re unable to connect to the internet right now. Please check your connection and try the following:
Check Your Wi-Fi Connection: Ensure that your device is connected to Wi-Fi or mobile data.
Restart Your Router: Sometimes, a quick restart of your router can resolve connectivity issues.
Try Again Later: If the problem persists, there may be an issue with your internet service provider."
          />
        </SpaceWrapper>

        <PrimaryButton
        onClick={() => router.push('/')}
          className="bg-[#FF1645] mt-[15px] rounded-[5px] text-white "
        >
          <label htmlFor="" className="text-[14px[ sm:text-[18px] font-poppins font-medium">Retry</label>
          <LiaRedoAltSolid size={18} />
        </PrimaryButton>
      </div>

</Container>

      <Footer />
    </main>
    );
  }

  return null; // don't show anything if online
}





function Paragraph({
  content,
  className
}: {
  content: string,
  className?: string
}) {
  return (
    <p className={clsx('font-poppins font-normal text-[10.5px] sm:text-[12px] text-black', className)}>
      {content}
    </p>
  )
}
