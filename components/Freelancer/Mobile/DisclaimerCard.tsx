import Image from 'next/image';
import warningFreelance from '@/app/assets/warningfreelance.svg';

export default function DisclaimerCard() {
  return (
    <div className="mt-8 rounded-3xl bg-amber-50 border border-amber-100 p-8 text-center">
      <div className="flex items-center justify-center gap-3 mb-4">
        <h3 className="font-semibold text-2xl text-gray-900">Disclaimer</h3>
        <Image 
          src={warningFreelance} 
          alt="Warning" 
          width={32} 
          height={32}
        />
      </div>
      
      <p className="text-base text-gray-600 leading-relaxed">
        PropertySeller provides a platform for freelance agents to close deals but PropertySeller is not responsible for any promises, commitments, or agreements made by agents to their clients. Agents are fully accountable for their own transactions.
      </p>
    </div>
  );
}