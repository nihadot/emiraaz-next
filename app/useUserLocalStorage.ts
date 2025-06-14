
import { LOCAL_STORAGE_KEYS } from '@/api/storage';
import { useEffect, useState } from 'react';

export const useUserLocalStorage = () => {
  const [localUser, setLocalUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_DATA);
      if (data) {
        setLocalUser(JSON.parse(data));
      }
    }
  }, []);

  const updateLocalUser = (updatedUser: any) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEYS.USER_DATA, JSON.stringify(updatedUser));
      setLocalUser(updatedUser);
    }
  };

  const clearUserData = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.USER_DATA);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
      setLocalUser(null);
    }
  };

  return {
    localUser,
    updateLocalUser,
    clearUserData,
  };
};
