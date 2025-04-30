import EnquiryForm from "@/components/EnquiryForm/EnquiryForm";
import ImageBlock from "@/components/ImageBlock/ImageBlock";
import RecommendedText from "@/components/RecomendedText/RecommendedText";
import { RECOMMENDED_LISTS } from "@/data";
import VideoContainer from "./VideoContainer";
import AdsCard from "@/components/AdsCard/AdsCard";
import Slider from "@/components/Slider/Slider";
import { AllProjectAdsCards } from "@/redux/projectAdsCard/types";
import CustomSlider from "@/components/CustomSlider/CustomSlider";

const SidePanel = ({
     images, videoLink, handleGalleryModal, filteredProjectAdsCard,shuffledImages
}: {
    mainImage: string,
    images: { secure_url: string }[],
    selectedIndex: number,
    videoLink: string,
    filteredProjectAdsCard: AllProjectAdsCards[];
    handleGalleryModal: (item: any) => void;
    shuffledImages:any[]
}) => {





    return (
        <div className="flex flex-col gap-4  w-full max-w-[300px]">
            
            <div className="h-[600px]  gap-2 md:flex hidden flex-col">
                <ImageBlock onClick={() => handleGalleryModal('images')} src={images?.[0]?.secure_url} alt="Next image" />
                <ImageBlock onClick={() => handleGalleryModal('images')} src={images?.[1]?.secure_url} alt="With Overlay" showOverlay />


                <div onClick={() => handleGalleryModal('video')} className="rounded-md h-[200px]  overflow-hidden">

                    <VideoContainer
                        clickDisable
                        videoUrl={videoLink || ''}
                    />
                </div>
            </div>

            
            <div className="hidden sm:block">
            <EnquiryForm />

            </div>
            <div className="hidden sm:block">

            {RECOMMENDED_LISTS.map((block, idx) => (
                <RecommendedText key={idx} title={block.title} items={block.items} />
            ))} 
            </div>

            <div className="">
                {<Slider containerClassName="hidden sm:block" items={filteredProjectAdsCard}>
                    {(item, i) => (
                        <AdsCard item={item} key={i} />
                    )}
                </Slider>}
            </div>



            { shuffledImages && shuffledImages.length > 0 &&  <div className="">
                                    <CustomSlider
                                        images={shuffledImages}
                                        containerClassName="max-w-xl hidden sm:block mx-auto shadow-lg"
                                        imageClassName="h-[600px]"
                                        buttonClassName="hover:bg-white"
                                    />
                                </div>}
        </div>
    );
}

export default SidePanel
