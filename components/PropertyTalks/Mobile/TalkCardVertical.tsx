import Image from 'next/image';
import { Play, Calendar } from 'lucide-react';
import { Talk } from './types';

export default function TalkCardVertical({ talk }: { talk: Talk }) {
  return (
    <div className="rounded-3xl border border-[#E8E8E8] overflow-hidden bg-white shadow-sm mb-5">
      <div className="relative h-[240]">
        <Image 
          src={talk.image} 
          alt={talk.title} 
          fill 
          className="object-cover" 
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black/75 rounded-full p-5 backdrop-blur-sm">
            <Play className="text-white w-8 h-8 fill-white" />
          </div>
        </div>
      </div>

      <div className="p-2">
        <h3 className="text-[20px] font-semibold leading-[1.4] text-black mb-3">
          {talk.title}
        </h3>
        <div className="flex items-center gap-2 text-gray-500 mb-2">
          <Calendar className="w-[18px] h-[18px]" />
          <p className="text-[15px]">{talk.createdAt}</p>
        </div>
      </div>
    </div>
  );
}