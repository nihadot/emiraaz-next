'use client'

import Image from 'next/image'
import React, { useState, useRef, useEffect } from 'react'
import { FaAlignLeft, FaArrowLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

type Props = {
  images: { secure_url: string }[]
}

function ImageContainer({ images }: Props) {
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
        <div className="fixed rounded-md overflow-hidden inset-0 bg-black/70 bg-opacity-80 flex justify-center items-center z-50">
          <div ref={previewRef} className="relative w-[90%]  max-w-4xl h-[80vh] flex justify-center items-center rounded-md overflow-hidden shadow-lg">
            <div className="relative w-full h-[580px] sm:h-full">
              <Image
                src={images[previewIndex].secure_url}
                alt="Preview"
                fill
                className="object-cover rounded-[3.75px] overflow-hidden"
              />
            </div>
            <button
              onClick={() => setPreviewIndex(null)}
              className="absolute flex items-center justify-center bg-[#FFE8ED] top-4 left-4 text-[#FF1645] w-[152.25px] h-[35.25px] rounded-[3.5px]"
            >
              <FaChevronLeft size={10} color='' />
              <span className='text-[14.25px] font-medium font-poppins ms-[12px]'>Back to Gallery</span>
            </button>

            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 transform -translate-y-1/2  px-3 py-1 rounded"
            >
              <FaChevronLeft size={28} color='white' />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2  px-3 py-1 rounded"
            >
              <FaChevronRight size={28} color='white' />

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
