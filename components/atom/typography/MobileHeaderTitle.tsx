import React from 'react'

type Props = {
    content: string
}

function MobileHeaderTitle({content}: Props) {
  return (
      <p className='text-[18px] text-nowrap font-bold font-poppins'>{content}</p>
  )
}

export default MobileHeaderTitle