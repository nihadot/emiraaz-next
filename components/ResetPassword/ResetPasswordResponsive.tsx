'use client';

import { Suspense, useState } from 'react';
import { useRouter } from 'next/navigation';
import ResponsiveSwitch from '@/components/Common/ResponsiveSwitch';
import ResetPassword from './ResetPassword';
import ResetPasswordMobile from './Mobile/ResetPasswordMobile';

import { handleApiError } from '@/utils/handleApiError';
import { LOCAL_STORAGE_KEYS } from '@/api/storage';
import { usePasswordChangeRequestMutation } from '@/redux/auth/authApi';
import useAuthRedirect from '@/hooks/useAuthRedirect';

function ResetPasswordContainer() {
  useAuthRedirect();

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [changePassword] = usePasswordChangeRequestMutation();

  const handleSubmit = async (values: {
    password: string;
    confirmPassword: string;
  }) => {
    try {
      setIsSubmitting(true);

      const response = await changePassword({
        newPassword: values.password,
      }).unwrap();

      localStorage.setItem(
        LOCAL_STORAGE_KEYS.CHANGE_PASSWORD_TOKEN,
        response.token
      );

      router.push('/profile/otp-verification');
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ResponsiveSwitch
      mobile={
        <ResetPasswordMobile
          loading={isSubmitting}
          onSubmit={handleSubmit}
        />
      }
      desktop={
        <ResetPassword
          title="Enter New Password"
          loading={isSubmitting}
          handleSubmit={handleSubmit}
        />
      }
    />
  );
}

/* Suspense wrapper */
export default function ResetPasswordResponsive() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordContainer />
    </Suspense>
  );
}
