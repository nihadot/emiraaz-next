import React from 'react'
import { IoMdClose } from 'react-icons/io'
import PrimaryButton from '../Buttons'
import clsx from 'clsx'

function AlreadyEnquired({ onClose,containerClassName,content }: { onClose: () => void,containerClassName?:string,content?:string }) {
  return (

    <div className={clsx(" sm:w-[436px]  h-[136xp] w-full m-auto  relative",containerClassName)}>
      {/* <button
        type='button'
        className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 "
        onClick={onClose}
      >
        <IoMdClose size={18} color='#333333' />

      </button> */}
      <div className='rounded-[5px]  flex justify-center flex-col px-4 items-center w-full bg-white gap-2  py-7'>
        <p className='text-base mb-2 sm:mb-[18px] font-medium font-poppins'>{content}</p>
        <PrimaryButton
          onClick={() => onClose()}
          type="button"
          className="flex w-full cursor-pointer sm:h-[35px] items-center gap-2 rounded border-none bg-[#FF1645]"
        >
          <span className="text-xs text-white font-poppins font-medium sm:text-nowrap">Send a Reminder Continue Browsing</span>
        </PrimaryButton>


      </div>
    </div>
  )
}

export default AlreadyEnquired