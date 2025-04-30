import React from 'react'
import clsx from "clsx";

type Props = {
    videoUrl:string
    clickDisable?:boolean
}

function VideoContainer({videoUrl,clickDisable}: Props) {
  return (
  
    <div className='flex  h-full items-center'>
    { videoUrl &&  <iframe
                            width="100%"
                            className={clsx('sm:h-full h-[250px] flex',clickDisable ? 'pointer-events-none' : '')}
                            src={videoUrl}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>}
    </div>

  
  )
}

export default VideoContainer