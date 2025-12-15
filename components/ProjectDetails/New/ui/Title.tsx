import React from 'react'

type Props = {
    title: string
}

function Title({title}: Props) {
  return (
    <h1 className='text-[20px]  font-poppins font-semibold'>{title}</h1>
  )
}

export default Title