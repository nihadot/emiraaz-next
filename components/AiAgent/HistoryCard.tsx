import React from 'react'

type Props = {
    item:{
        content:string
    };
}

function HistoryCard({item}: Props) {
  return (
    <div className='rounded-[5px] px-3 py-3 bg-red-500/10 '>
        <p className='font-normal  text-[12px] text-[#666666]'>{item.content}</p>
    </div>
  )
}

export default HistoryCard