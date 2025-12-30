import Image from 'next/image';
import freelancerJoin from '@/app/assets/freelancerjoin.svg';

export default function RegisterCard({
  onRegister,
}: {
  onRegister: () => void;
}) {
  return (
    <div className="mt-8 rounded-[13px] border-[1.7px] border-[#DEDEDE] p-6 text-center bg-white">
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
        className="w-full rounded-[9px]  bg-black py-3.5  text-white text-2xl font-medium hover:bg-gray-900 transition-colors"
      >
        Register Now
      </button>
    </div>
  );
}