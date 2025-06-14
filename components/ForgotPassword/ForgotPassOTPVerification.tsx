'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { LOCAL_STORAGE_KEYS } from '@/api/storage';
import { errorToast, successToast } from '@/components/Toast';
import { useOtpSignUpMutation, useSignUpReSentOTPMutation } from '@/redux/auth/authApi';
import { handleApiError } from '@/utils/handleApiError';
import OTPVerification from '../OTPVerification/OTPVerification';


const OTP_LENGTH = 6;

function ForgotPassOTPVerification() {
    const [email, setEmail] = useState<string>('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const status = localStorage.getItem(LOCAL_STORAGE_KEYS.FORGOT_PASSWORD);
            const mailId = localStorage.getItem(LOCAL_STORAGE_KEYS.FORGOT_PASSWORD_EMAIL);
            if (!status && !mailId) {
                router.push('/forgot-password');
                return;
            }

            if(!status){
                router.push('/forgot-password');
                return;
            }

            if(!mailId){
                router.push('/forgot-password');
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
        const status = localStorage.getItem(LOCAL_STORAGE_KEYS.FORGOT_PASSWORD);

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


    const handleResentOTP = () => {
        try {
            setIsSubmitting(true);
            const token = localStorage.getItem(LOCAL_STORAGE_KEYS.SIGNUP_OTP_TOKEN);
            const mailId = localStorage.getItem(LOCAL_STORAGE_KEYS.SIGNUP_TEM_DATA);
            if (token && mailId) {
                const payload = { token: token, email:mailId };
                resendOtp(payload).unwrap();
            }
            
        } catch (error) {
            handleApiError(error);
        }finally{
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