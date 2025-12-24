import { Check, X } from 'lucide-react';

export default function FreelancerSuccess({ onClose }: { onClose: () => void }) {
  return (
    <div className="bg-white rounded-t-3xl p-6 max-w-md mx-auto relative">
      <button 
        onClick={onClose} 
        className="absolute top-6 right-6 text-gray-900"
      >
        <X size={24} strokeWidth={2} />
      </button>

      <div className="flex flex-col items-center justify-center pt-8 pb-6">
        <div className="mb-6 h-16 w-16 rounded-full bg-green-600 flex items-center justify-center">
          <Check className="text-white" size={32} strokeWidth={3} />
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Application Submitted
        </h2>
        
        <p className="text-sm text-gray-500 text-center leading-relaxed max-w-sm px-4">
          We&apos;ve received your application. Our team will contact you for further process shortly.
        </p>

        <button 
          onClick={onClose} 
          className="mt-8 font-medium text-gray-900 flex items-center gap-2"
        >
          Continue 
          <span className="text-lg">→</span>
        </button>
      </div>
    </div>
  );
}