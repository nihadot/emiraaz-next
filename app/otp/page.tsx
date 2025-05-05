'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LOCAL_STORAGE_KEYS } from '@/api/storage';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useVerifyPasswordChangeMutation } from '@/redux/auth/authApi';
import { errorToast, successToast } from '@/components/Toast';

const OTP_LENGTH = 6;

export default function OtpPage() {
    const router = useRouter();
    const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // ✅ Check token presence
    useEffect(() => {
        const token = localStorage.getItem(LOCAL_STORAGE_KEYS.RESET_PASSWORD_TOKEN);
        if (!token) {
            router.push('/login'); // Redirect if token not found
        }
    }, [router]);

    // ✅ Handle input change
    const handleChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return; // Allow only digits

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Focus next input
        if (value && index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    // ✅ Handle key press (backspace, arrow navigation)
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
        if (e.key === 'ArrowLeft' && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
        if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    // ✅ Handle paste
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const paste = e.clipboardData.getData('text').slice(0, OTP_LENGTH);
        if (!/^\d+$/.test(paste)) return;
        const newOtp = paste.split('');
        setOtp([...newOtp, ...Array(OTP_LENGTH - newOtp.length).fill('')]);
        setTimeout(() => {
            inputRefs.current[paste.length - 1]?.focus();
        }, 0);
    };

    const resetPasswordToken = localStorage.getItem(LOCAL_STORAGE_KEYS.RESET_PASSWORD_TOKEN);

    if (!resetPasswordToken) {
        router.push('/login'); // Redirect if token not found
    }


    const [verifyPasswordChange] = useVerifyPasswordChangeMutation();

    const handleSubmit =async () => {
        try {
            const enteredOtp = otp.join('');
            if (enteredOtp.length !== OTP_LENGTH) {
                errorToast('Please enter all 6 digits.');
                return;
            }



            const payload = { token: resetPasswordToken ? resetPasswordToken : '', otp: enteredOtp };
            await verifyPasswordChange(payload).unwrap();

            console.log('Entered OTP:', enteredOtp);
            successToast('Password changed successfully');
            // Submit logic here
        } catch (error: any) {
            errorToast(error?.response?.data?.message || error?.data?.message || error?.response?.message || error?.message || 'Error occurred, please try again later');

            console.error("Login Error:", error.message);
        }
    };

    return (
        <main>

            <Header />

            <div className="min-h-screen flex items-center justify-center px-4">

                <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md text-center">
                    <h2 className="text-xl font-semibold mb-4">Enter OTP</h2>
                    <div className="flex justify-between gap-2 mb-6">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                ref={(el:any) => (inputRefs.current[index] = el)}
                                onChange={(e) => handleChange(e.target.value, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                onPaste={handlePaste}
                                autoFocus={index === 0}
                                className="w-10 h-12 text-center text-xl border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        ))}
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Verify OTP
                    </button>
                </div>
            </div>


            <Footer />
        </main>

    );
}
