import CustomSlider from '@/components/CustomSlider/CustomSlider'
import { PortraitBanner } from '@/redux/portraitBannerAd/types'
import React from 'react'

type Props = {
    shuffledImages:PortraitBanner[]
}

function CustomSliderUi({shuffledImages}: Props) {
  return (
        <div className="">
                        <CustomSlider
                            images={shuffledImages}
                            containerClassName="max-w-xl mx-auto shadow-lg"
                            imageClassName="h-[600px]"
                            buttonClassName="hover:bg-white"
                        />
                    </div>
  )
}

export default CustomSliderUi