'use client';

import { useEffect, useState } from 'react';
import OfflineFallback from './OfflineFallback';

export default function InternetCheck({ children }: { children: React.ReactNode }) {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const updateStatus = () => setIsOnline(navigator.onLine);

    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);

    updateStatus(); // set initial status

    return () => {
      window.removeEventListener('online', updateStatus);
      window.removeEventListener('offline', updateStatus);
    };
  }, []);

  return isOnline ? <>{children}</> : <OfflineFallback />;
}
