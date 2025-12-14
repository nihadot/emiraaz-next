"use client"
import React from 'react';
import { ChevronLeft, MoreVertical ,MoreHorizontal} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface MobileHeaderProps {
  title: string;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ title }) => {
  const router = useRouter()
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white font-poppins">
      <div className="relative flex items-center justify-center h-14 px-4">
        {/* Back Button - Left */}
        <button
          className="absolute left-4 flex items-center justify-center w-9 h-9 bg-white border  border-gray-300 rounded-full"
          aria-label="Go back"
          onClick={()=>router.back()}
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" strokeWidth={2.1}  />
        </button>

        {/* Title - Center */}
        <h1 className="text-xl font-bold text-gray-900">
          {title}
        </h1>

        {/* More Options - Right */}
        <button
          className="absolute right-4 flex items-center justify-center w-9 h-9 bg-white border border-gray-300   rounded-full"
          aria-label="More options"
        >
          <MoreHorizontal className="w-5 h-5 " strokeWidth={1.9}  />
        </button>
      </div>
    </header>
  );
};

export default MobileHeader;