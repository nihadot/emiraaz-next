'use client'
import React from 'react'
import {BeatLoader} from 'react-spinners'

const Loader = () => {
    return (
        <div className="h-dvh flex items-center justify-center">

        <BeatLoader
        speedMultiplier={0.3}
        color='red'
        />
        </div>




    )
}

export default Loader   