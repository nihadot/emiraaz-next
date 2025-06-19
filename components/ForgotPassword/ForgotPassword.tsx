'use client'
import React, { useState } from 'react'
import MailEnter from '../MailEnter/MailEnter'
import { useSignUpForgotPasswordMutation } from '@/redux/auth/authApi';
import { LOCAL_STORAGE_KEYS } from '@/api/storage';
import { useRouter } from 'next/navigation';
import { handleApiError } from '@/utils/handleApiError';




function ForgotPassword() {

    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();

    const [ForgotPassword] = useSignUpForgotPasswordMutation();
    const handleSubmit = async (e: {
        email: string;
    }) => {


        try {
            setIsSubmitting(true);

            await ForgotPassword({
                email: e.email,
            }).unwrap();

            localStorage.setItem(LOCAL_STORAGE_KEYS.FORGOT_PASSWORD_PAGE_ACCESS, 'true');
            localStorage.setItem(LOCAL_STORAGE_KEYS.FORGOT_PASSWORD_EMAIL, e.email);

            router.push('/forgot-password/reset-password');

        } catch (error: any) {
            handleApiError(error);
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <MailEnter
            handleSubmit={handleSubmit}
            title='Reset Your Password'
            loading={isSubmitting}
        />
    )
}

export default ForgotPassword