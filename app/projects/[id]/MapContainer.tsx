import React from 'react'

type Props = {
    mapUrl:string
}

function MapContainer({mapUrl}: Props) {
  return (
    <div className='flex h-full'>
          <iframe
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        src={mapUrl}
                        title="Google Map"
                    ></iframe>

    </div>
  )
}

export default MapContainer