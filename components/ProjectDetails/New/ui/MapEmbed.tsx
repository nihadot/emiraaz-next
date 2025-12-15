// MapEmbed.tsx
"use client";

interface MapEmbedProps {
  embedUrl: string; // Google Maps embed URL
}

export default function MapEmbed({ embedUrl }: MapEmbedProps) {
  return (
    <div className="relative w-full h-[95%] rounded-2xl overflow-hidden bg-gray-200">
      <iframe
        className="absolute inset-0 w-full h-full"
        src={embedUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
