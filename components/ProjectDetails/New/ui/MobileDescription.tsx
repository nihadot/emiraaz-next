import React from 'react'
import Title from './Title'
import { AnimatePresence,motion } from 'framer-motion'

type Props = {
    data: string
    onClick?: () => void;
}

function MobileDescription({
    data,
    onClick
}: Props) {
  return (
    <div>
      <div className="pb-3">
          <Title
        title='Description'
        />
      </div>

  <AnimatePresence initial={false}>
        <motion.p
          key={"expanded"}
          initial={{ height: 96, opacity: 0 }}
          animate={{ height: 96, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="font-poppins font-normal text-base leading-[32px] overflow-hidden"
        >
          {data}
        </motion.p>
      </AnimatePresence>

        <button className='bg-[#F5F5F5] mt-3 font-poppins h-10 rounded-md text-[#333333] px-6 hover:bg-black/60 py-2 text-sm font-medium' onClick={onClick}>Read More</button>

    </div>
  )
}

export default MobileDescription