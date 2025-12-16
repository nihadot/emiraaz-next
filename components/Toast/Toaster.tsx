import React from 'react';
import { Check, X } from 'lucide-react';

export default function Toast({ message = "Success!", type = 'success' }) {
  const isSuccess = type === 'success';
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center pt-8">
      <div className="inline-flex items-center gap-4 bg-[#353535] rounded-full pl-6 pr-8 py-4 shadow-xl">
        {/* Icon Circle with Border */}
        <div className={`flex-shrink-0 w-[52px] h-[52px] rounded-full border-[2.5px] ${isSuccess ? 'border-emerald-500' : 'border-red-500'} flex items-center justify-center bg-transparent`}>
          {isSuccess ? (
            <Check className="w-7 h-7 text-emerald-500 stroke-[2.5]" strokeLinecap="round" strokeLinejoin="round" />
          ) : (
            <X className="w-7 h-7 text-red-500 stroke-[2.5]" strokeLinecap="round" strokeLinejoin="round" />
          )}
        </div>
        
        {/* Message Text */}
        <p className="text-white text-[17px] font-normal leading-relaxed">
          {message}
        </p>
      </div>
    </div>
  );
}