'use client'

import Image from 'next/image'
import React, { useState, useRef, useEffect } from 'react'
import { FaAlignLeft, FaArrowLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { IoCloseSharp } from "react-icons/io5";

type Props = {
  images: { secure_url: string }[];
  close?: () => void;
}

function ImageContainer({ images,close }: Props) {
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
    <div className="h-full w-full   overflow-auto">
      {previewIndex !== null ? (
        <div className="fixed overflow-hidden inset-0 bg-black/70 bg-opacity-80 flex justify-center items-center z-50">
          <div ref={previewRef} className="relative w-[90%]  max-w-4xl h-[80vh] flex justify-center items-center sm:rounded-md shadow-lg">
            <div className="relative max-w-[874.5px] w-full h-[200px] sm:h-[580.5px]">
              <Image
                src={images[previewIndex].secure_url}
                alt="Preview"
                fill
                className="object-cover rounded-[3.75px] overflow-hidden"
              />
            </div>
            <button
              onClick={() => setPreviewIndex(null)}
              className="absolute flex items-center justify-center bg-[#FFE8ED] -top-14 -left-0 sm:-left-14 text-[#FF1645] w-[152.25px] h-[35.25px] rounded-[3.5px]"
            >
              <FaChevronLeft size={12} color='' />
              <span className=' text-[10px] sm:text-[14.25px] font-medium font-poppins ms-[12px]'>Back to Gallery</span>
            </button>

            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="absolute left-0 sm:-left-[88.5px] top-1/2 transform -translate-y-1/2  px-3 py-1 rounded"
            >
              <FaChevronLeft color='white' className='w-[20px] h-[20px] sm:w-[28px] sm:h-[28px]' />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-0 sm:-right-[88.5px] top-1/2 transform -translate-y-1/2  px-3 py-1 rounded"
            >
              <FaChevronRight className='w-[20px] h-[20px] sm:w-[28px] sm:h-[28px]' color='white' />

            </button>
          </div>
        </div>
      ) : (
        <div className="relative grid grid-cols-1 md:grid-cols-2 w-full gap-3">
       <div className="p-1.5 sm:hidden fixed top-[68px] z-40 left-7 bg-[#FFE7EC] rounded-[3px] w-fit">
          <IoCloseSharp size={17} color='#333333' onClick={close} />
       </div>
          {images?.map((item, index) => (
            <div
              key={index}
              onClick={() => setPreviewIndex(index)}
              className="relative flex-1 h-[178px] sm:h-[400px] cursor-pointer"
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
