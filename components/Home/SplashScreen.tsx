/**
 * Splash Screen Component
 * Shows loading animation on first visit of the day
 */

'use client';

import React from 'react';
import Image from 'next/image';
import { big_white_logo_icon } from '@/app/assets';
import pIcon from "@/app/assets/p-icon.png";

export default function SplashScreen() {
    return (
        <div
            className="flex items-center justify-center h-full bg-black"
            style={{ height: 'calc(var(--vh, 1vh) * 100)' }}
        >
            {/* Desktop Logo */}
            <div className="relative animate-pulse sm:block hidden w-full max-w-[320px] sm:max-w-[420px] md:max-w-[500px] lg:max-w-[580.5px] aspect-[574.5/140.5] p-4 sm:p-0">
                <Image
                    width={590}
                    height={140}
                    src={big_white_logo_icon}
                    alt="PropertySeller logo"
                />
            </div>

            {/* Mobile Logo */}
            <div className="relative animate-pulse block sm:hidden w-full max-w-[320px] sm:max-w-[420px] p-4 sm:p-0">
                <Image
                    width={300}
                    height={140}
                    src={pIcon}
                    alt="PropertySeller logo"
                />
            </div>
        </div>
    );
}
