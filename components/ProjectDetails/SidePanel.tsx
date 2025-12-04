'use client'
import EnquiryForm from "@/components/EnquiryForm/EnquiryForm";
import ImageBlock from "@/components/ImageBlock/ImageBlock";
import RecommendedText from "@/components/RecomendedText/RecommendedText";
import { RECOMMENDED_LISTS } from "@/data";
import VideoContainer from "./VideoContainer";
import AdsCard from "@/components/AdsCard/AdsCard";
import Slider from "@/components/Slider/Slider";
import { AllProjectAdsCards } from "@/redux/projectAdsCard/types";
import CustomSlider from "@/components/CustomSlider/CustomSlider";
import { useState } from "react";
import RegistrationSuccess from "@/components/EnquiryForm/RegistrationSuccess";
import Container from "@/components/atom/Container/Container";
import Modal from "@/components/Modal/Modal";
import AlreadyEnquired from "@/components/EnquiryForm/AlreadyEnquired";
import { ImageType } from "@/utils/types";
import { shuffle } from "@/utils/shuffle";
import Recommendations from "@/app/home/Recommendations";
import { useRouter } from "next/navigation";

const SidePanel = ({
    projectId, siteMap,promotion,promotionId,
    images, videoLink, handleGalleryModal, handleGallerySelect, filteredProjectAdsCard, shuffledImages
}: {
    mainImage: string,
    images: ImageType[],
    selectedIndex: number,
    videoLink?: string,
    filteredProjectAdsCard: AllProjectAdsCards[];
    handleGalleryModal: () => void;
    shuffledImages: any[];
    handleGallerySelect: (value: string) => void;
    projectId: string;
    promotionId?: string;
    promotion?: boolean;
    siteMap: any[];
}) => {

    const [EnquiryFormState, setEnquiryFormState] = useState({ status: false, count: 0 });

    const router = useRouter();


    return (
        <div className="flex flex-col gap-[6px]  w-full max-w-[301.5px]">

            <div className="gap-[6px] md:flex hidden flex-col">

                {
                    images?.[1]?.webp?.url ? <ImageBlock wrapperClassName="h-[177.5px]" onClick={() => {
                        handleGalleryModal()
                        handleGallerySelect('images')
                    }} src={images?.[1]?.webp?.url} alt="Next image" /> : <div className="h-[177.5px] w-full bg-gray-50"></div>
                }

                {images?.[2]?.webp?.url ? <>

                    {videoLink ? <ImageBlock imageCount={images.length} wrapperClassName="h-[136.5px]" onClick={() => {
                        handleGalleryModal()
                        handleGallerySelect('images')
                    }} src={images?.[2]?.webp?.url} alt="With Overlay" showOverlay /> :

                        <ImageBlock wrapperClassName="h-[136.5px]" onClick={() => {
                            handleGalleryModal()
                            handleGallerySelect('images')
                        }} src={images?.[2]?.webp?.url} alt="With Overlay" />

                    }
                </>

                    : <div className="h-[136.5px] w-full bg-gray-50"></div>

                }


                <div onClick={() => {
                    handleGalleryModal()
                    handleGallerySelect('video')
                }} className="rounded-md h-[163.5px]  overflow-hidden">

                    {videoLink ? <VideoContainer
                        clickDisable
                        videoUrl={videoLink}
                    /> :
                        <ImageBlock imageCount={images.length} wrapperClassName="h-[163.5px]" onClick={() => {
                            handleGalleryModal()
                            handleGallerySelect('images')
                        }} src={images?.[3]?.webp?.url} alt="With Overlay" showOverlay />

                    }
                </div>
            </div>


            <div className="hidden w-full sm:block">
                <EnquiryForm
                    setEnquiry={setEnquiryFormState}
                    projectId={projectId}
                    onSuccessToShowThankYou={()=>{
                        router.push('/thank-you/property-enquiry')
                    }}
                    promotion={promotion}
                    promotionId={promotionId}
                />
            </div>

            <div className="hidden sm:block">

                {/* {RECOMMENDED_LISTS.map((block, idx) => (
                    <RecommendedText key={idx} title={block.title} items={block.items} />
                ))} */}

                <Recommendations siteMap={siteMap}>
                    {(items) => (
                        <>
                            <Recommendations

                                siteMap={siteMap}>
                                {(items) => (
                                    <>
                                        <RecommendedText
                                            title="Recommended For You"
                                            items={shuffle(siteMap)?.slice(0, 6)}
                                        />

                                    </>
                                )}
                            </Recommendations>
                        </>
                    )}
                </Recommendations>
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

                    {/* {RECOMMENDED_LISTS.map((block, idx) => (
                        <RecommendedText key={idx} title={block.title} items={block.items} />
                    ))} */}
                    <Recommendations siteMap={siteMap}>
                        {(items) => (
                            <>
                                <Recommendations siteMap={siteMap}>
                                    {(items) => (
                                        <div className="mt-2">
                                            <RecommendedText
                                                title="Recommended For You"
                                                items={shuffle(siteMap)?.slice(0, 6)}
                                            />
                                            <RecommendedText
                                                title="Popular Searches"
                                                items={shuffle(siteMap)?.slice(0, 6)}
                                            />
                                        </div>
                                    )}
                                </Recommendations>
                            </>
                        )}
                    </Recommendations>

                </div>
            </div>





            <Modal
                isOpen={EnquiryFormState.status}
                // isOpen={true}
                onClose={() => setEnquiryFormState({ status: false, count: 0 })}
            >



                <Container>
                    <div className="relative w-full h-[200px] rounded-[5px]">


                        {
                            EnquiryFormState.count === 1 && <RegistrationSuccess
                                onClose={() => setEnquiryFormState({ status: false, count: 0 })}

                            />
                        }



                        {EnquiryFormState.count === 2 && <AlreadyEnquired
                            onClose={() => setEnquiryFormState({ status: false, count: 0 })}

                        />}
                    </div>
                </Container>

            </Modal>

        </div>
    );
}

export default SidePanel
