'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LOCAL_STORAGE_KEYS } from '@/api/storage';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useVerifyPasswordChangeMutation } from '@/redux/auth/authApi';
import { errorToast, successToast } from '@/components/Toast';
import { IoIosArrowRoundBack, IoMdArrowRoundBack } from "react-icons/io";

const OTP_LENGTH = 6;

export default function OtpPage() {
    const router = useRouter();
    const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
    const [resetPasswordToken, setResetPasswordToken] = useState<string | null>(null);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [verifyPasswordChange] = useVerifyPasswordChangeMutation();

    // ✅ Client-side only: Get token
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem(LOCAL_STORAGE_KEYS.RESET_PASSWORD_TOKEN);
            if (!token) {
                router.push('/login');
            } else {
                setResetPasswordToken(token);
            }
        }
    }, [router]);

    const handleChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

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

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const paste = e.clipboardData.getData('text').slice(0, OTP_LENGTH);
        if (!/^\d+$/.test(paste)) return;

        const newOtp = paste.split('');
        setOtp([...newOtp, ...Array(OTP_LENGTH - newOtp.length).fill('')]);
        setTimeout(() => {
            inputRefs.current[paste.length - 1]?.focus();
        }, 0);
    };

    const handleSubmit = async () => {
        try {
            const enteredOtp = otp.join('');
            if (enteredOtp.length !== OTP_LENGTH) {
                errorToast('Please enter all 6 digits.');
                return;
            }

            if (!resetPasswordToken) {
                errorToast('Invalid or expired token. Please try again.');
                router.push('/login');
                return;
            }

            const payload = { token: resetPasswordToken, otp: enteredOtp };
            await verifyPasswordChange(payload).unwrap();

            localStorage.removeItem(LOCAL_STORAGE_KEYS.RESET_PASSWORD_TOKEN);

            successToast('Password changed successfully');
            router.push('/profile');

        } catch (error: any) {
            errorToast(error?.response?.data?.message || error?.data?.message || error?.response?.message || error?.message || 'Error occurred, please try again later');
            console.error("OTP Verification Error:", error.message);
        }
    };

    return (
        <main>
            <Header />

            <div className=" flex my-40 items-center justify-center px-4">
                <div className="w-full sm:max-w-[400px]  bg-white text-center">
                    <h2 className='sm:text-[27px] text-[19.5px] font-medium font-poppins'>Enter OTP To Continue</h2>
                    <p className='text-[#767676] font-normal font-poppins text-[9px] sm:text-[10.5px]'>Enter the code sent to <span className='text-[#FF1645] font-normal font-poppins text-[10.5px]'>jhondoe@gmail.com</span></p>
                    <div className="flex justify-between mb-[18px] text-[11px] sm:gap-[15px] mt-[18px]">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                ref={(el: any) => (inputRefs.current[index] = el)}
                                onChange={(e) => handleChange(e.target.value, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                onPaste={handlePaste}
                                autoFocus={index === 0}
                                className="w-[40.5px] h-[40.5px] sm:w-[52.5px] sm:h-[52.5px] text-center text-xl border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#FFE7EC]"
                            />
                        ))}
                    </div>
                    <p className='text-[#767676] font-normal font-poppins text-[10.5px]'>Didn&apos;t get OTP Code?</p>
                    <p className='text-[#FF1645] font-normal font-poppins text-[10.5px]'>Resend Code</p>

                    <button
                        onClick={handleSubmit}
                        className=" px-8 m-auto gap-[7px] w-full sm:w-fit bg-[#FFE7EC] justify-center items-center flex mt-[18px]  text-white py-2 rounded  transition"
                    >
                        <IoMdArrowRoundBack size={18} color='#FF1645' />
                        <span className='text-[#FF1645] font-poppins font-medium text-[12px] sm:text-[16px]'>Back</span>
                    </button>
                </div>
            </div>
            <Footer />
        </main>
    );
}
