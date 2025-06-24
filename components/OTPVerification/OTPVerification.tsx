'use client'
import React, { useEffect, useRef, useState } from 'react'
import Header from '../Header';
import { Footer } from '../Footer';
import CountdownTimer from '../CountdownTimer/CountdownTimer';
import SpaceWrapper from '../atom/SpaceWrapper/SpaceWrapper';
import clsx from 'clsx';

type Props = {
    handleSubmit: () => void;
    loading: boolean;
    onChange: (item: string[]) => void;
    otpLength?: number;
    handleResentOTP: () => void;
    email: string;
}



function OTPVerification({ handleSubmit, loading, onChange, otpLength = 6, email,handleResentOTP }: Props) {
    const [otp, setOtp] = useState<string[]>(Array(otpLength).fill(''));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [timeoutState, setTimeoutState] = useState(false);

    const handleChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < otpLength - 1) {
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
        if (e.key === 'ArrowRight' && index < otpLength - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const paste = e.clipboardData.getData('text').slice(0, otpLength);
        if (!/^\d+$/.test(paste)) return;

        const newOtp = paste.split('');
        setOtp([...newOtp, ...Array(otpLength - newOtp.length).fill('')]);
        setTimeout(() => {
            inputRefs.current[paste.length - 1]?.focus();
        }, 0);
    };


    useEffect(() => {
        onChange(otp);
    }, [otp]);


    const handleTimerStatusChange = (status: 'active' | 'timeout') => {
        if (status === 'timeout') {
            setTimeoutState(true);
        }
    }
    return (
        <main>
            <Header />

            <div className=" flex my-40 items-center justify-center px-4">
                <div className="w-full sm:max-w-[400px]  bg-white text-center">
                    <h2 className='sm:text-[27px] text-[19.5px] font-medium font-poppins'>Enter OTP To Continue</h2>
                    <p className='text-[#767676] font-normal font-poppins text-[9px] sm:text-[12px]'>Enter the code sent to <span className='text-[#FF1645] font-normal font-poppins text-[12px]'>{email}</span></p>
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
                    <SpaceWrapper
                        className='py-1'
                    >
                        <CountdownTimer
                        resetTrigger={!timeoutState}
                        onStatusChange={handleTimerStatusChange}
                        />
                    </SpaceWrapper>

                    <p className='text-[#767676] font-normal font-poppins text-[12px]'>Didn&apos;t get OTP Code?</p>
                    <button onClick={handleResentOTP} className={clsx('text-[#FF1645] font-normal font-poppins text-[12px]',!timeoutState ? 'cursor-not-allowed opacity-50' : 'cursor-pointer')} >Resend Code</button>

                    <button type="submit"
                        onClick={handleSubmit}
                        disabled={loading} className="w-full mt-3 text-[14px] cursor-pointer max-w-md w-f font-medium bg-[#FF1645] text-white  h-[35px] rounded-[3px] hover:bg-[#D8133A] transition flex items-center justify-center">
                        {loading ? (
                            <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                            </svg>
                        ) : null}
                        {loading ? "loading..." : "Submit"}
                    </button>
                </div>
            </div>
            <Footer />
        </main>
    );
}

export default OTPVerification