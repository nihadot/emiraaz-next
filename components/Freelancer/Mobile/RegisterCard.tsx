import Image from 'next/image';
import freelancerJoin from '@/app/assets/freelancerjoin.svg';

export default function RegisterCard({
  onRegister,
}: {
  onRegister: () => void;
}) {
  return (
    <div className="mt-8 rounded-3xl border border-gray-200 p-10 text-center bg-white shadow-sm">
      <h3 className="font-semibold text-2xl text-gray-900 leading-tight">
        Start Your Freelance Journey
      </h3>

      <p className="mt-4 text-base text-gray-600 leading-relaxed">
        Submit your details and unlock new opportunities in real estate.
      </p>

      <div className="my-8 flex justify-center">
        <Image 
          src={freelancerJoin} 
          alt="Freelancer Join" 
          width={120} 
          height={120}
        />
      </div>

      <button
        onClick={onRegister}
        className="w-full rounded-xl bg-black py-4 text-white text-base font-medium hover:bg-gray-900 transition-colors"
      >
        Register Now
      </button>
    </div>
  );
}