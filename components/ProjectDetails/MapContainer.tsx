import React from 'react'
import { IoCloseSharp } from 'react-icons/io5';

type Props = {
    mapUrl:string,
  close: () => void;

}

function MapContainer({mapUrl,
close
  
}: Props) {
  return (
    <div className='flex relative h-full '>
          <div className="p-1.5 sm:hidden fixed top-20 z-40 left-7 bg-[#FFE7EC] rounded-[3px] w-fit">
                <IoCloseSharp size={17} color='#333333' onClick={close} />
             </div>
          <iframe
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        className='rounded-[3.75px]'
                        src={mapUrl}
                        title="Google Map"
                    ></iframe>

    </div>
  )
}

export default MapContainer