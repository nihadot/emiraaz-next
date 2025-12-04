import { registration_success } from '@/app/assets'
import Image from 'next/image'
import React from 'react'
import { IoMdClose } from 'react-icons/io'
import Container from '../atom/Container/Container'
import clsx from 'clsx'

function RegistrationSuccess({ onClose,
  headlineClassName,
  headline = "Your Registration Success",
  content = "Our team will contact you Shortly",
  innerConainerClassName,
  containerClassName,
  closeButtonElementClassName,
 }: { onClose: () => void, headline?: string, containerClassName?:string,content?: string,headlineClassName?:string,innerConainerClassName?:string,closeButtonElementClassName?:string }) {
  return (
    <Container>

      <div className={clsx(" sm:w-[436px] w-full m-auto  relative",containerClassName)}>
        <button
          type='button'
          className={clsx("absolute cursor-pointer top-2 right-2 text-gray-600 dark:text-gray-300 ",closeButtonElementClassName)}
          onClick={onClose}
        >
          <IoMdClose size={18} color='#333333' />

        </button>
        <div className={clsx('rounded-[5px] flex justify-center flex-col px-4 items-center bg-white gap-2  py-10',innerConainerClassName)}>
          <p className={clsx('text-[18px] font-medium font-poppins', headlineClassName)}>{headline}</p>
          <p className='text-[12px] font-poppins font-light text-center'>{content}</p>

          <Image src={registration_success} alt="location icon" width={120} height={120} className="object-cover" />


        </div>
      </div>
    </Container>

  )
}

export default RegistrationSuccess