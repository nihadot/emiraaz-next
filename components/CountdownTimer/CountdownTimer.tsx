import React, { useEffect, useState } from 'react';

type CountdownTimerProps = {
    onStatusChange?: (status: 'active' | 'timeout') => void;
    resetTrigger?: boolean; // Change this value to trigger reset (e.g., timestamp or counter)
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({ onStatusChange, resetTrigger }) => {
    const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes in seconds
    const [status, setStatus] = useState<'active' | 'timeout'>('active');

    // Handle timer countdown
    useEffect(() => {
        if (timeLeft === 0) {
            if (status !== 'timeout') {
                setStatus('timeout');
                onStatusChange?.('timeout');
            }
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    // Notify parent when status changes
    useEffect(() => {
        onStatusChange?.(status);
    }, [status, onStatusChange]);

    // Reset timer when resetTrigger changes
    useEffect(() => {
        setTimeLeft(5 * 60); // reset to 5 minutes
        setStatus('active');
        onStatusChange?.('active');
    }, [resetTrigger]);

    const formatTime = (seconds: number) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    };

    return (
        <div className="text-base font-bold text-center text-red-600">
            {formatTime(timeLeft)}
        </div>
    );
};

export default CountdownTimer;
