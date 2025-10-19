import Link from 'next/link'
import React from 'react'

type Props = {
    content: string
}

function MobileHeaderTitle({content}: Props) {
  return (
    <Link
    href={'/'}
    >
      <p className='text-[18px] text-nowrap font-bold font-poppins'>{content}</p>
    </Link>
  )
}

export default MobileHeaderTitle