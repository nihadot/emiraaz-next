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

      <div className="rounded-3xl border border-gray-200 p-8 bg-white shadow-sm">
        <p className="text-base text-gray-900 mb-6 leading-relaxed">
          Unlock exclusive advantages designed to boost your real estate success.
        </p>

        <div className="space-y-4">
          {offers.map((item, i) => (
            <div key={i} className="flex gap-3 items-start">
              <div className="shrink-0 mt-0.5">
                <Image src={roundTick} alt="check" width={24} height={24} />
              </div>
              <p className="text-base text-gray-600 leading-relaxed">
                {item.text}
                {item.bold && <span className="font-semibold text-gray-700">{item.bold}</span>}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}