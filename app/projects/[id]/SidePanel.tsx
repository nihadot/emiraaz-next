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
    images, videoLink, handleGalleryModal, handleGallerySelect,filteredProjectAdsCard, shuffledImages
}: {
    mainImage: string,
    images: { secure_url: string }[],
    selectedIndex: number,
    videoLink: string,
    filteredProjectAdsCard: AllProjectAdsCards[];
    handleGalleryModal: () => void;
    shuffledImages: any[];
    handleGallerySelect:(value:string)=> void;
}) => {





    return (
        <div className="flex flex-col gap-[6px]  w-full max-w-[301.5px]">

            <div className="gap-[6px] md:flex hidden flex-col">
                <ImageBlock wrapperClassName="h-[177.5px]" onClick={() => {
                    handleGalleryModal()
                    handleGallerySelect('images')
                }} src={images?.[1]?.secure_url} alt="Next image" />
                <ImageBlock imageCount={images.length} wrapperClassName="h-[136.5px]" onClick={() => {
                    handleGalleryModal()
                    handleGallerySelect('images')
                }} src={images?.[2]?.secure_url} alt="With Overlay" showOverlay />


                <div onClick={() => {
                    handleGalleryModal()
                    handleGallerySelect('video')
                }} className="rounded-md h-[163.5px]  overflow-hidden">

                    <VideoContainer
                        clickDisable
                        videoUrl={videoLink || ''}
                    />
                </div>
            </div>


            <div className="hidden w-full sm:block">
                <EnquiryForm />
            </div>

            <div className="hidden sm:block">

                {RECOMMENDED_LISTS.map((block, idx) => (
                    <RecommendedText key={idx} title={block.title} items={block.items} />
                ))}
            </div>

            {/* Project Ads Card */}
            <div className="mt-[26.75px]">
                {<Slider containerClassName="hidden sm:block" items={filteredProjectAdsCard}>
                    {(item, i) => (
                        <AdsCard item={item} key={i} />
                    )}
                </Slider>}
            </div>




            <div className="mt-[15px] sticky top-[85px] left-0">
            {shuffledImages && shuffledImages.length > 0 &&
                <CustomSlider
                    images={shuffledImages}
                    containerClassName="max-w-xl hidden sm:block mx-auto shadow-lg"
                    imageClassName="h-[600px]"
                    // buttonClassName="hover:bg-white"
                />
          }



            <div className="hidden sm:block">

{RECOMMENDED_LISTS.map((block, idx) => (
    <RecommendedText key={idx} title={block.title} items={block.items} />
))}
</div>
</div>


        </div>
    );
}

export default SidePanel
