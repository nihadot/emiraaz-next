import Image from 'next/image';
import sellerFreelance from '@/app/assets/sellerFreelance.svg';

export default function StartJourneyCard({
  onRegister,
}: {
  onRegister: () => void;
}) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm text-center">
      <h3 className="text-lg font-bold text-gray-900">
        Start Your Freelance Journey
      </h3>

      <p className="mt-3 text-[12px] text-gray-600 leading-relaxed">
        Submit your details and unlock new opportunities in<br />real estate.
      </p>

      <div className="my-4 flex justify-center">
        <Image 
          src={sellerFreelance} 
          alt="Start Journey" 
          width={80} 
          height={80}
          className="opacity-60"
        />
      </div>

      <button
        onClick={onRegister}
        className="w-full h-12 rounded-xl bg-black text-white text-base font-medium hover:bg-gray-900 transition-colors"
      >
        Register Now
      </button>
    </div>
  );
}