import Image from 'next/image'
import React from 'react'
import backward_icon from '@/app/assets/back.png'

function Backward() {
  return (
    <Image src={backward_icon} alt="backward icon" width={20} height={20} className="object-cover" />
  )
}

export default Backward;
