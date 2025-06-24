'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { LOCAL_STORAGE_KEYS } from '@/api/storage';
import { errorToast, successToast } from '@/components/Toast';
import OTPVerification from './OTPVerification';
import { useOtpSignUpMutation, useSignUpReSentOTPMutation } from '@/redux/auth/authApi';
import { handleApiError } from '@/utils/handleApiError';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';


const OTP_LENGTH = 6;

function SignupOtpPage() {

    const { user } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem(LOCAL_STORAGE_KEYS.CHANGE_PASSWORD_TOKEN);
            if (!token) {
                router.push('/profile/change-password');
                return;
            }

        }


    }, [])

    // Inside your component
    useAuthRedirect();
    const router = useRouter();
    const [resendOtp] = useSignUpReSentOTPMutation();
    const [signup] = useOtpSignUpMutation();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));

    const handleSubmit = async () => {
        const token = localStorage.getItem(LOCAL_STORAGE_KEYS.CHANGE_PASSWORD_TOKEN);

        try {
            setIsSubmitting(true);
            const enteredOtp = otp.join('');
            console.log(OTP_LENGTH, 'OTP_LENGTH', enteredOtp, 'enteredOtp')
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
                token: localStorage.getItem(LOCAL_STORAGE_KEYS.CHANGE_PASSWORD_TOKEN) || ''
            }).unwrap();

            localStorage.removeItem(LOCAL_STORAGE_KEYS.RESET_PASSWORD_TOKEN);

            successToast('OTP verified successfully');
            router.push('/profile');

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
            const token = localStorage.getItem(LOCAL_STORAGE_KEYS.CHANGE_PASSWORD_TOKEN);

            if (token && user) {

                const payload = { token: token, email: user.email };
                const response = await resendOtp(payload).unwrap();
                localStorage.setItem(LOCAL_STORAGE_KEYS.CHANGE_PASSWORD_TOKEN, response.token);
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
            email={user?.email || ''}
            handleSubmit={handleSubmit}
            loading={isSubmitting}
            onChange={handleChangeValue}
        />
    )
}

export default SignupOtpPage