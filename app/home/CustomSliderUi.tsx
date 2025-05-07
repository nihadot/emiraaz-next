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
                            containerClassName=""
                        />
                    </div>
  )
}

export default CustomSliderUi