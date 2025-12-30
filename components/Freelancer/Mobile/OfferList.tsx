import Image from 'next/image';
import roundTick from '@/app/assets/roundtick.svg';

const offers = [
  { text: 'Earn up to ', bold: '80% commission' },
  { text: 'Work on your ', bold: 'own terms & schedule' },
  { text: 'Access exclusive ', bold: 'off-plan and resale inventory' },
  { text: 'Get marketing tools, property data, and updates', bold: '' },
  { text: 'Zero joining fees, transparent payouts', bold: '' },
  { text: 'Direct connection to platform buyers & sellers', bold: '' },
];

export default function OfferList() {
  return (
    <section className="mt-8">
      <h3 className="text-xl font-semibold mb-5 text-gray-900">What we Offer</h3>

      <div className="rounded-[13px] border-[1.6px] border-[#DEDEDE] px-5 py-7.5 bg-white">
        <p className="text-base text-gray-900 mb-6 leading-relaxed">
          Unlock exclusive advantages designed to boost your real estate success.
        </p>

<div className="space-y-3">
  {offers.map((item, i) => (
    <div key={i} className="flex items-center gap-3">
      {/* Tick */}
      <div className="shrink-0">
        <Image src={roundTick} alt="check" width={24} height={24} />
      </div>

      {/* Text */}
      <p className="flex-1 text-base text-[#767676] whitespace-nowrap overflow-hidden text-ellipsis">
        {item.text}
        {item.bold && (
          <span className="font-semibold text-gray-500">
            {item.bold}
          </span>
        )}
      </p>
    </div>
  ))}
</div>


      </div>
    </section>
  );
}