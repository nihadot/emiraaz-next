'use client';

import { useEffect, useState } from 'react';
import MoreMenuMobile from './Mobile/moremenu';
import MoreMenuDesktop from './Desktop/MoreMenuDesktop';

export default function MoreMenuPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isMobile ? <MoreMenuMobile /> : <MoreMenuDesktop />;
}
