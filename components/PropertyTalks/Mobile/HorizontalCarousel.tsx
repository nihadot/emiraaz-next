import TalkCardHorizontal from './TalkCardHorizontal';
import { Talk } from './types';

export default function HorizontalCarousel({ talks }: { talks: Talk[] }) {
  return (
    <div className="relative">
      <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
        <div className="flex gap-5 pb-2">
          {talks.map((talk) => (
            <TalkCardHorizontal key={talk.id} talk={talk} />
          ))}
        </div>
      </div>
      
      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mt-6">
        {talks.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === 0 
                ? 'w-2 bg-black' 
                : 'w-2 bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}