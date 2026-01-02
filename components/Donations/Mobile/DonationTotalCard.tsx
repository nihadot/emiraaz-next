import Image from 'next/image';
import moneybag from '@/app/assets/moneybag.svg';
import dirham from '@/app/assets/dhirham.svg';


export default function DonationTotalCard({
  amount,
}: {
  amount: string;
}) {
  return (
    <div className="mt-6 rounded-2xl bg-black p-5 flex items-center justify-between overflow-hidden relative">
      {/* Left */}
      <div>
        <div className="p-2 bg-white/10 rounded-lg flex items-start justify-start">
  <Image
    src={moneybag}
    alt="Donation"
    width={24}
    height={24}
    className="object-contain"
  />
</div>

        <p className="text-xs text-white/80 mb-1">
          Total Donations Till Date
        </p>
        <p className="flex items-center gap-2 text-xl font-semibold text-white">
  <Image
    src={dirham}
    alt="Dirham"
    width={20}
    height={20}
    className="object-contain"
  />
  {amount}
</p>

      </div>

      {/* Decorative circles */}
     {/* Decorative circles */}
<div className="absolute right-0 top-0 h-full flex items-center">
  <div className="w-16 h-full bg-white/20 rounded-l-full"/>
  <div className="w-16 h-full bg-white/30 rounded-l-full -ml-8"/>
  <div className="w-16 h-full bg-white/40 rounded-l-full -ml-8"/>
</div>

    </div>
  );
}
