'use client'

import Image from 'next/image'
import React, { useState, useRef, useEffect } from 'react'

type Props = {
  images: { secure_url: string }[]
}

function  ImageContainer({ images }: Props) {
  const [previewIndex, setPreviewIndex] = useState<number | null>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  const handleNext = () => {
    if (previewIndex !== null) {
      setPreviewIndex((prev) => (prev! + 1) % images.length)
    }
  }

  const handlePrev = () => {
    if (previewIndex !== null) {
      setPreviewIndex((prev) => (prev! - 1 + images.length) % images.length)
    }
  }

  // Detect outside click to close preview
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (previewRef.current && !previewRef.current.contains(event.target as Node)) {
        setPreviewIndex(null)
      }
    }

    if (previewIndex !== null) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [previewIndex])

  return (
    <div className="h-full w-full  overflow-auto">
      {previewIndex !== null ? (
        <div className="fixed rounded-md overflow-hidden inset-0 bg-black/40 bg-opacity-80 flex justify-center items-center z-50">
          <div ref={previewRef} className="relative w-[90%]  max-w-4xl h-[80vh] flex justify-center items-center rounded-md overflow-hidden shadow-lg">
           <div className="relative w-full h-[300px] sm:h-full">
           <Image
              src={images[previewIndex].secure_url}
              alt="Preview"
              fill
              className="object-cover rounded-md overflow-hidden"
            />
           </div>
            <button
              onClick={() => setPreviewIndex(null)}
              className="absolute top-4 left-4 bg-white text-black px-4 py-1 rounded shadow"
            >
              Back to Images
            </button>

            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-black px-3 py-1 rounded shadow"
            >
              ◀
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-black px-3 py-1 rounded shadow"
            >
              ▶
            </button>
          </div>
        </div>
      ) : (
        <div className=" grid grid-cols-1 md:grid-cols-2 w-full gap-3">
          {images?.map((item, index) => (
            <div
              key={index}
              onClick={() => setPreviewIndex(index)}
              className="relative flex-1 h-[400px] cursor-pointer"
            >
              <Image
                src={item.secure_url}
                alt={`image-${index}`}
                fill
                className="rounded-md object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageContainer
