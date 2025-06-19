'use client'
import React, { useEffect, useState } from 'react'
import ResetPassword from './ResetPassword'
import { handleApiError } from '@/utils/handleApiError';
import { LOCAL_STORAGE_KEYS } from '@/api/storage';
import { useRouter } from 'next/navigation';
import { useForgotNewPasswordMutation } from '@/redux/auth/authApi';

function ResetPasswordPage() {

  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const status = localStorage.getItem(LOCAL_STORAGE_KEYS.FORGOT_PASSWORD_PAGE_ACCESS);
      const mailId = localStorage.getItem(LOCAL_STORAGE_KEYS.FORGOT_PASSWORD_EMAIL);
      if (!status && !mailId) {
        router.push('/forgot-password');
        return;
      }
      if (!mailId) {
        router.push('/forgot-password');
        return;
      }
      if (!status) {
        router.push('/forgot-password');
        return;
      }
      if (mailId) {
        setEmail(mailId)
      }
    }

  }, [])

  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const [newPassword] = useForgotNewPasswordMutation();
  const handleSubmit = async (e: {
    password: string;
    confirmPassword: string;
  }) => {

    try {
      setIsSubmitting(true);

      const response = await newPassword({
        email: email,
        password: e.password
      }).unwrap();


      localStorage.setItem(LOCAL_STORAGE_KEYS.FORGOT_PASSWORD_OTP, 'true');
      localStorage.setItem(LOCAL_STORAGE_KEYS.FORGOT_PASSWORD_OTP_TOKEN, response.token);

      router.push('/forgot-password/otp-verification');

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

export default ResetPasswordPage