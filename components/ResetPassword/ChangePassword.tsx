'use client'
import React, { Suspense, useState } from 'react'
import ResetPassword from './ResetPassword'
import { handleApiError } from '@/utils/handleApiError';
import { LOCAL_STORAGE_KEYS } from '@/api/storage';
import { useRouter } from 'next/navigation';
import { usePasswordChangeRequestMutation } from '@/redux/auth/authApi';
import useAuthRedirect from '@/hooks/useAuthRedirect';

function ResetPasswordComponent() {




  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  // Inside your component
  useAuthRedirect();
  const [newPassword] = usePasswordChangeRequestMutation();
  const handleSubmit = async (e: {
    password: string;
    confirmPassword: string;
  }) => {

    try {
      setIsSubmitting(true);

      const response = await newPassword({
        newPassword: e.password
      }).unwrap();


      localStorage.setItem(LOCAL_STORAGE_KEYS.CHANGE_PASSWORD_TOKEN, response.token);

      router.push('/profile/otp-verification');

    } catch (error: any) {
      handleApiError(error);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <ResetPassword
      handleSubmit={handleSubmit}
      loading={isSubmitting}
      title='Enter New Password'
    />
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordComponent />
    </Suspense>
  );
}