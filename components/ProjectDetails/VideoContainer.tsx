import React from 'react'
import clsx from "clsx";
import { IoCloseSharp } from 'react-icons/io5';

type Props = {
    videoUrl:string
    clickDisable?:boolean;
  close?: () => void;

}

function VideoContainer({videoUrl,clickDisable,close}: Props) {
  return (
  
    <div className='flex relative h-full items-center'>
          <div className="p-1.5 sm:hidden fixed top-20 z-40 left-7 bg-[#FFE7EC] rounded-[3px] w-fit">
                <IoCloseSharp size={17} color='#333333' onClick={close} />
             </div>
    { videoUrl &&  <iframe
                            width="100%"
                            className={clsx('sm:h-full h-[250px] rounded-[3.75px] flex',clickDisable ? 'pointer-events-none' : '')}
                            src={videoUrl}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>}
    </div>

  
  )
}

export default VideoContainer