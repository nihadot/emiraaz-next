'use client'

import { useEffect, useState } from 'react'
import WhyDubai from './WhyDubai'
import WhyDubaiMobile from './Mobile/WhyDubaiMobile'

export default function WhyDubaiClient() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return isMobile ? <WhyDubaiMobile /> : <WhyDubai />
}
