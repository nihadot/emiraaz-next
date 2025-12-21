"use client";
import React from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
const MobileEditProfileHeader: React.FC = () => {
  const router = useRouter();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white font-poppins">
      <div className="relative flex items-center justify-center h-14 px-4">
        {/* Back Button - Left */}
        <button
          className="absolute left-4 flex items-center justify-center w-9 h-9 bg-white border  border-gray-300 rounded-full"
          aria-label="Go back"
          onClick={() => router.back()}
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" strokeWidth={2.1} />
        </button>

        {/* Title - Center */}
        <h1 className="text-xl font-semibold text-gray-900">
          Edit Profile Details
        </h1>
      </div>
    </header>
  );
};

export default MobileEditProfileHeader;
