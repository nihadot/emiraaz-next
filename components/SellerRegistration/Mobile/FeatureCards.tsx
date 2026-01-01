import Image from "next/image";
import sellerIcon1 from "@/app/assets/sellerRegistration.svg";
import sellerIcon2 from "@/app/assets/sellerRegistration2.svg";

export default function FeatureCards() {
  return (
    <div className="overflow-x-auto overflow-y-hidden pb-4 scrollbar-hide">
      <div className="flex gap-4 min-w-max px-1">
        {/* Card 1 */}
        <div className="w-[280px] h-[110px] rounded-[13px] border border-[#DEDEDE] bg-white px-4">
          <div className="flex h-full items-center gap-3">
            {/* Icon */}
            <Image
              src={sellerIcon1}
              alt="Easy Listing"
              width={40}
              height={40}
            />

            {/* Text */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                Easy Listing
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Add your property details
                <br />
                with a simple, guided form.
              </p>
            </div>
          </div>
        </div>

        <div className="w-[280px] h-[110px] rounded-[13px] border border-[#DEDEDE] bg-white px-4">
          <div className="flex h-full items-center gap-3">
            {/* Icon */}
            <Image
              src={sellerIcon2}
              alt="Verified Buyers"
              width={40}
              height={40}
            />

            {/* Text */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                Verified Buyers
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
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
