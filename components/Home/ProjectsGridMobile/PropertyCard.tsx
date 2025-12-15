// src/Components/PropertyCard.tsx
import { useState } from 'react';
import locationPin from '../assets/svg/location-pin.svg';
import bedSvg from '../assets/svg/bed.svg';
import bathSvg from '../assets/svg/bathtub.svg';
import squarefeetSvg from '../assets/svg/squarefeet.svg';
import bookmarkSvg from '../assets/svg/bookmark.svg'; // man+ icon (bottom-right)
import bookmarkSave from '../assets/svg/bookmark2.svg'; // bookmark save (top-right)
import cameraSvg from '../assets/svg/camera.svg';
import Image from 'next/image';

interface PropertyCardProps {
  id: string;
  title: string;
  type: string;
  price: number;
  currency: string;
  priceLabel: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  areaUnit: string;
  image: string;
  imageCount?: number;
  onCardClick?: (id: string) => void;
}

export default function PropertyCard({
  id,
  title,
  type,
  price,
  currency,
  priceLabel,
  location,
  bedrooms,
  bathrooms,
  area,
  areaUnit,
  image,
  imageCount,
  onCardClick
}: PropertyCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmarkToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookmarked((s) => !s);
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // contact / agent action (man+). implement as needed
    console.log('contact clicked for', id);
  };

  const formatPrice = (p: number) => p.toLocaleString();

  return (
    <div
      onClick={() => onCardClick?.(id)}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-4 mx-4 cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="flex gap-3 p-3">
        {/* IMAGE */}
        <div className="relative w-[150px] h-[150px] flex-shrink-0">
          <Image
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-2xl"
          />

          {/* image count badge */}
          {imageCount && (
            <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <span className="font-medium">{imageCount}</span>
              <Image src={cameraSvg} alt="photos" className="w-3.5 h-3.5" />
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div className="flex-1 flex flex-col justify-between py-1 relative">
          <div>
            <p className="text-xs text-gray-500 mb-1">{type}</p>

            <div className="flex items-start justify-between mb-1">
              <h3 className="text-lg font-semibold text-gray-900 leading-tight pr-2">
                {title}
              </h3>

              {/* bookmark icon (top-right of card content) - moved up */}
              <button
                onClick={handleBookmarkToggle}
                type="button"
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition absolute top-0 right-0"
              >
                <Image
                  src={bookmarkSave}
                  alt="save"
                  className={`w-5 h-5 transition ${
                    isBookmarked
                      ? 'brightness-0 invert-[20%] sepia-[90%] saturate-[800%] hue-rotate-0'
                      : ''
                  }`}
                />
              </button>
            </div>

            <div className="flex items-start gap-2 mb-3">
              <Image src={locationPin} alt="location" className="w-4 h-4 mt-0.5" />
              <p className="text-xs text-gray-500 line-clamp-1">{location}</p>
            </div>

            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-1">
                <Image src={bedSvg} alt="beds" className="w-5 h-5" />
                <span className="text-xs text-gray-600 font-medium">{bedrooms}</span>
              </div>
              <div className="flex items-center gap-1">
                <Image src={bathSvg} alt="baths" className="w-5 h-5" />
                <span className="text-xs text-gray-600 font-medium">{bathrooms}</span>
              </div>
              <div className="flex items-center gap-1">
                <Image src={squarefeetSvg} alt="area" className="w-5 h-5" />
                <span className="text-xs text-gray-600 font-medium">{area.toLocaleString()} {areaUnit}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-red-500 text-xl font-bold">{currency} {formatPrice(price)}</span>
                <span className="text-xs text-gray-500">{priceLabel}</span>
              </div>
            </div>
          </div>

          {/* BOTTOM-RIGHT: man+ icon (contact) - moved up */}
          <button
            onClick={handleContactClick}
            type="button"
            aria-label="Contact seller"
            className="w-9 h-9 rounded-full bg-white/0 flex items-center justify-center hover:bg-gray-50 transition-colors absolute bottom-0 right-0"
          >
            <Image src={bookmarkSvg} alt="contact" className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}