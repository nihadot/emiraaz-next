import Image from 'next/image';
import { Play, Calendar } from 'lucide-react';
import { Talk } from './types';

export default function TalkCardHorizontal({ talk }: { talk: Talk }) {
  return (
    <div className="w-[356px] shrink-0 rounded-[20px] border border-[#E5E5E5] overflow-hidden bg-white shadow-sm">
      <div className="relative h-[200px]">
        <Image 
          src={talk.image} 
          alt={talk.title} 
          fill 
          className="object-cover" 
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black/70 rounded-full p-4 backdrop-blur-sm">
            <Play className="text-white w-7 h-7 fill-white" />
          </div>
        </div>
        <span className="absolute top-4 right-4 bg-white text-[13px] font-medium px-3 py-1.5 rounded-full text-gray-700">
          {talk.category}
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-[18px] font-semibold leading-[1.4] text-gray-900 mb-3">
          {talk.title}
        </h3>
        <div className="flex items-center gap-2 text-gray-500">
          <Calendar className="w-4 h-4" />
          <p className="text-[14px]">{talk.createdAt}</p>
        </div>
      </div>
    </div>
  );
}