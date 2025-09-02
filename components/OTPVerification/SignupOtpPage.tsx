'use client'
import React, { Suspense, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { LOCAL_STORAGE_KEYS } from '@/api/storage';
import { errorToast, successToast } from '@/components/Toast';
import OTPVerification from './OTPVerification';
import { useOtpSignUpMutation, useSignUpReSentOTPMutation } from '@/redux/auth/authApi';
import { handleApiError } from '@/utils/handleApiError';


const OTP_LENGTH = 6;

function SignupOtpPageComponent() {
    const [email, setEmail] = useState<string>('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem(LOCAL_STORAGE_KEYS.SIGNUP_OTP_TOKEN);
            const mailId = localStorage.getItem(LOCAL_STORAGE_KEYS.SIGNUP_TEM_DATA);
            if (!token && !mailId) {
                router.push('/registration');
                return;
            }
            if (mailId) {
                setEmail(mailId)
            }
        }


    }, [])

    const router = useRouter();
    const [resendOtp] = useSignUpReSentOTPMutation();
    const [signup] = useOtpSignUpMutation();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));

    const handleSubmit = async () => {
        const token = localStorage.getItem(LOCAL_STORAGE_KEYS.SIGNUP_OTP_TOKEN);

        try {
            setIsSubmitting(true);
            const enteredOtp = otp.join('');

            if (enteredOtp.length !== OTP_LENGTH) {
                errorToast('Please enter all 6 digits.');
                return;
            }

            if (!token) {
                errorToast('Invalid or expired token. Please try again.');
                router.push('/registration');
                return;
            }

            // const payload = { token: resetPasswordToken, otp: enteredOtp };
            await signup({
                otp: enteredOtp,
                token: localStorage.getItem(LOCAL_STORAGE_KEYS.SIGNUP_OTP_TOKEN) || ''
            }).unwrap();

            localStorage.removeItem(LOCAL_STORAGE_KEYS.RESET_PASSWORD_TOKEN);

            successToast('OTP verified successfully');
            router.push('/');

        } catch (error: any) {
            handleApiError(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChangeValue = (otp: string[]) => {
        setOtp(otp);
    }


    const handleResentOTP = async () => {
        try {
            setIsSubmitting(true);
            const token = localStorage.getItem(LOCAL_STORAGE_KEYS.SIGNUP_OTP_TOKEN);
            const mailId = localStorage.getItem(LOCAL_STORAGE_KEYS.SIGNUP_TEM_DATA);
            if (token && mailId) {
                const payload = { token: token, email: mailId };
                const response = await resendOtp(payload).unwrap();
                localStorage.setItem(LOCAL_STORAGE_KEYS.RESET_PASSWORD_TOKEN, response.token);
                successToast('OTP sent successfully');

            }

        } catch (error) {
            handleApiError(error);
        } finally {
            setIsSubmitting(false);
        }
    }


    return (
        <OTPVerification
            handleResentOTP={handleResentOTP}
            email={email}
            handleSubmit={handleSubmit}
            loading={isSubmitting}
            onChange={handleChangeValue}
        />
    )
}



export default function SignupOtpPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SignupOtpPageComponent />
        </Suspense>
    );
}