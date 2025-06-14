// hooks/useCountryCode.ts
import { useEffect, useState } from 'react';

export function useCountryCode() {
  const [countryCode, setCountryCode] = useState<string | null>(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const res = await fetch('https://ipapi.co/json');
        const data = await res.json();
        setCountryCode(data.country_calling_code); // e.g. "IN", "US"
      } catch (error) {
        console.error('Failed to fetch country code:', error);
        setCountryCode(null);
      }
    };

    getLocation();
  }, []);

  return countryCode;
}
