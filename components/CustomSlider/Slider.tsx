import React, { useMemo } from 'react'
import CustomSlider from './CustomSlider'
import { useFetchAllPortraitBannersQuery } from '@/redux/portraitBannerAd/portraitBannerAdApi';
import { shuffle } from '@/utils/shuffle';

function Slider({images}:{images:any}) {

    // const { data: portraitBannerData } = useFetchAllPortraitBannersQuery({},{
    //     refetchOnMountOrArgChange: false,
    // });

    // const banners = portraitBannerData?.data || [];

    const shuffledImages = useMemo(() => shuffle(images), [images]);

    return (
        <div className="">
            <CustomSlider
                images={shuffledImages}
                containerClassName=""
            />
        </div>
    )
}

export default Slider