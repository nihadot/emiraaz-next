'use client'
import React, { useEffect, useState } from 'react'
import HomePage from './home/page'
import Image from 'next/image'
import { big_white_logo_icon } from './assets'

function Page() {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    const lastSeen = localStorage.getItem('splashLastSeenDate')

    if (lastSeen !== today) {
      setLoading(true)
      const timer = setTimeout(() => {
        setLoading(false)
        localStorage.setItem('splashLastSeenDate', today)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="relative w-full max-w-[320px] sm:max-w-[420px] md:max-w-[500px] lg:max-w-[580.5px] aspect-[574.5/140.5] p-4 sm:p-0">
          <Image width={574} height={133.5} src={big_white_logo_icon} alt="logo" />
        </div>
      </div>
    )
  }

  return <HomePage />
}

export default Page
