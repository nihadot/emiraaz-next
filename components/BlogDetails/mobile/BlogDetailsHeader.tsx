"use client"
import { ChevronLeft, Share } from "lucide-react";
import { useRouter } from "next/navigation";

function MobileBlogDetailsHeader() {
    const router = useRouter()
  return (
    <header className="flex items-center justify-between px-4 py-3">
      
      {/* Back button */}
      <button className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-200" onClick={()=>router.back()}>
        <ChevronLeft size={18} />
      </button>

      {/* Right action (share) */}
      <button className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300">
        <Share size={16} />
      </button>

    </header>
  );
}

export default MobileBlogDetailsHeader;
