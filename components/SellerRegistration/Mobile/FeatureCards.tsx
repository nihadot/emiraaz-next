import Image from 'next/image';
import sellerIcon1 from '@/app/assets/sellerRegistration.svg';
import sellerIcon2 from '@/app/assets/sellerRegistration2.svg';

export default function FeatureCards() {
  return (
    <div className="overflow-x-auto scrollbar-hide pb-4">
      <div className="flex gap-4 min-w-max px-1">
        
        {/* Card 1 */}
        <div className="w-[300px] rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-4">
            <Image
              src={sellerIcon1}
              alt="Easy Listing"
              width={44}
              height={44}
              className="shrink-0"
            />

            <div>
              <h3 className="text-[15px] font-semibold text-gray-900 mb-1">
                Easy Listing
              </h3>
              <p className="text-[13px] leading-relaxed text-gray-500">
                Add your property details
                <br />
                with a simple, guided form.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="w-[300px] rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-4">
            <Image
              src={sellerIcon2}
              alt="Verified Buyers"
              width={44}
              height={44}
              className="shrink-0"
            />

            <div>
              <h3 className="text-[15px] font-semibold text-gray-900 mb-1">
                Verified Buyers
              </h3>
              <p className="text-[13px] leading-relaxed text-gray-500">
                Reach a wide network of
                <br />
                serious and trusted buyers.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
