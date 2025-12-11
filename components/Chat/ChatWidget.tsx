'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import ChatTrigger from './ChatTrigger';
// import ChatTrigger from './ChatTrigger';

// Lazy load the ChatPopup component to reduce initial bundle size
const ChatPopup = dynamic(() => import('./ChatPopup'), {
    ssr: false, // Chat is client-side only
});

export default function ChatWidget() {
    return (
        <>
            <ChatTrigger />
            <Suspense fallback={null}>
                <ChatPopup />
            </Suspense>
        </>
    );
}
