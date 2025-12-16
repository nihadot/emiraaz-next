import React from 'react';
import { RotateCw } from 'lucide-react';

export default function NoInternetPage() {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        {/* Icon */}
        <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center mb-8">
          <svg className="w-12 h-12 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 20h.01M8.5 16.5c2-2 5-2 7 0M5 13c4-4 10-4 14 0" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="2" y1="2" x2="22" y2="22" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-xl font-semibold text-gray-900 mb-3">
          No Internet Detected
        </h1>

        {/* Description */}
        <p className="text-sm text-gray-500 text-center mb-10">
          We&apos;re unable to connect right now. Check your connection and try again.
        </p>

        {/* Troubleshooting Steps */}
        <div className="w-full space-y-5 mb-12">
          {/* Step 1 */}
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900 mb-1">
                Check Your Wi-Fi or Mobile Data
              </h3>
              <p className="text-xs text-gray-500">
                Make sure your device is connected to an active network.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900 mb-1">
                Restart Your Router
              </h3>
              <p className="text-xs text-gray-500">
                A quick reboot can often fix temporary connectivity issues.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900 mb-1">
                Switch to Mobile Data
              </h3>
              <p className="text-xs text-gray-500">
                If Wi-Fi is unstable, try using your mobile network.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900 mb-1">
                Try Again Later
              </h3>
              <p className="text-xs text-gray-500">
                Your ISP might be facing a temporary outage.
              </p>
            </div>
          </div>

          {/* Step 5 */}
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900 mb-1">
                Turn Airplane Mode Off
              </h3>
              <p className="text-xs text-gray-500">
                Sometimes it gets toggled accidentally.
              </p>
            </div>
          </div>
        </div>

        {/* Retry Button */}
        <button
          onClick={handleRetry}
          className="w-full max-w-sm bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          Retry
          <RotateCw className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Indicator */}
      <div className="flex justify-center pb-2">
        <div className="w-32 h-1 bg-black rounded-full"></div>
      </div>
    </div>
  );
}