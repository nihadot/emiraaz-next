'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { LOCAL_STORAGE_KEYS } from '@/api/storage';
import { errorToast, successToast } from '@/components/Toast';
import { useForgotPasswordOTPVerificationMutation, useOtpSignUpMutation, useSignUpReSentOTPMutation } from '@/redux/auth/authApi';
import { handleApiError } from '@/utils/handleApiError';
import OTPVerification from '../OTPVerification/OTPVerification';


const OTP_LENGTH = 6;

function ForgotPassOTPVerification() {
    const [email, setEmail] = useState<string>('');
    const [otpToken, setOtpToken] = useState<string>('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const status = localStorage.getItem(LOCAL_STORAGE_KEYS.FORGOT_PASSWORD_OTP);
            const mailId = localStorage.getItem(LOCAL_STORAGE_KEYS.FORGOT_PASSWORD_EMAIL);
            const otpToken = localStorage.getItem(LOCAL_STORAGE_KEYS.FORGOT_PASSWORD_OTP_TOKEN);
            if (!status && !mailId && !otpToken) {
                router.push('/forgot-password');
                return;
            }

            if (!status) {
                router.push('/forgot-password');
                return;
            }

            if (!mailId) {
                router.push('/forgot-password');
                return;
            }

            if (!otpToken) {
                router.push('/forgot-password');
                return;
            }
            if (mailId) {
                setEmail(mailId)
            }

            if (otpToken) {
                setOtpToken(otpToken)
            }
        }


    }, [])

    const router = useRouter();
    const [resendOtp] = useSignUpReSentOTPMutation();
    const [verificationOTP] = useForgotPasswordOTPVerificationMutation();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));

    const handleSubmit = async () => {
        const status = localStorage.getItem(LOCAL_STORAGE_KEYS.FORGOT_PASSWORD_OTP);

        try {
            setIsSubmitting(true);
            const enteredOtp = otp.join('');
            if (enteredOtp.length !== OTP_LENGTH) {
                errorToast('Please enter all 6 digits.');
                return;
            }

            if (!status) {
                errorToast('Invalid or expired token. Please try again.');
                router.push('/forgot-password');
                return;
            }

            if (!otpToken) {
                errorToast('Invalid or expired token. Please try again.');
                router.push('/forgot-password');
                return;
            }

            // const payload = { token: resetPasswordToken, otp: enteredOtp };
            await verificationOTP({
                otp: enteredOtp,
                token: localStorage.getItem(LOCAL_STORAGE_KEYS.FORGOT_PASSWORD_OTP_TOKEN) || ''
            }).unwrap();

            localStorage.removeItem(LOCAL_STORAGE_KEYS.FORGOT_PASSWORD_PAGE_ACCESS);
            localStorage.removeItem(LOCAL_STORAGE_KEYS.FORGOT_PASSWORD_OTP);
            localStorage.removeItem(LOCAL_STORAGE_KEYS.FORGOT_PASSWORD_EMAIL);
            localStorage.removeItem(LOCAL_STORAGE_KEYS.FORGOT_PASSWORD_OTP_TOKEN);

            successToast('OTP verified successfully');
            router.push('/login');

        } catch (error: any) {
            handleApiError(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChangeValue = (otp: string[]) => {
        setOtp(otp);
    }


    const handleResentOTP = async() => {
        try {
            setIsSubmitting(true);
            const token = localStorage.getItem(LOCAL_STORAGE_KEYS.SIGNUP_OTP_TOKEN);
            const mailId = localStorage.getItem(LOCAL_STORAGE_KEYS.SIGNUP_TEM_DATA);
            if (token && mailId) {
                const payload = { token: token, email: mailId };
                const response =await resendOtp(payload).unwrap();
                      localStorage.setItem(LOCAL_STORAGE_KEYS.FORGOT_PASSWORD_OTP_TOKEN, response.token);
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

export default ForgotPassOTPVerification