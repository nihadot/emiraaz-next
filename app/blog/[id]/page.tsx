'use client'
import { formatDate } from '@/components/atom/button/formatDate';
import { Footer } from '@/components/Footer'
import Header from '@/components/Header'
import RecommendedText from '@/components/RecomendedText/RecommendedText';
import Image from 'next/image';
import React, { use, useMemo } from 'react'
import { FaCalendar } from 'react-icons/fa';
import CustomSliderUi from '../../home/CustomSliderUi';
import { shuffle } from '@/utils/shuffle';
import { useFetchAllPortraitBannersQuery } from '@/redux/portraitBannerAd/portraitBannerAdApi';
import { useViewAllBlogsQuery, useViewBlogByIdQuery } from '@/redux/blogs/blogsApi';
import Container from '@/components/atom/Container/Container';


const Blog = ({ params }: { params: Promise<{ id: string }> }) => {

    const { id } = use(params);


    const { data: singleBlog } = useViewBlogByIdQuery({ id });
    const { data: allBlogs } = useViewAllBlogsQuery({});

    const { data: portraitBannerData } = useFetchAllPortraitBannersQuery({});

    const banners = portraitBannerData?.data || [];

    const shuffledImages = useMemo(() => shuffle(banners), [banners]);

    return (
        <main>
            <Header />
            <div className="pb-[12.75px] sm:flex hidden">
                <div className="h-[1px] w-full bg-[#DEDEDE]"></div>
            </div>

<Container>

            <section className='m-auto gap-[30px] pb-20 '>
                <div className="w-full relative object-cover h-[236px] sm:h-[523.5px]">
                    <div className="px-4 py-2 absolute z-30 left-[15px] top-[15px] text-[#FF1645] bg-[#FFE7EC] ">Area Spotlight</div>
                    <Image
                        fill
                        alt={singleBlog?.data?.blogTitle || ''}
                        src={singleBlog?.data?.image?.secure_url || ''}
                        className="rounded-md"
                    />
                </div>

                <div className="mb-20">


                    <div className="flex items-center mt-[25.5px] gap-[7.5px]">


                        <div className="text-[9.75px] mt-[4.5px] rounded-[2.25px] bg-red-700/10 w-fit px-4 h-[21px] flex justify-center items-center text-[#FF1645]  font-normal">
                            {singleBlog?.data?.blogCategoryDetails?.name}
                        </div>

                        <div className="flex items-center gap-[4.5px]">
                            <FaCalendar size={16.5} color='#767676' height={16.5} />
                            {singleBlog?.data?.date && <p className='text-[#767676]   text-[12px] font-medium font-poppins'>{formatDate(singleBlog?.data?.date)}</p>
                            }
                        </div>
                    </div>


                    <div className="flex items-start gap-[27.5px] justify-center">

                        <div className="w-full h-full">
                            <p className='text-[12px] w-full font-poppins font-normal mt-[16px] '>{singleBlog?.data?.blogBody}</p>
                            <p className=' font-poppins font-medium text-[33.75px] mt-[10px]'>Read More</p>








                        </div>
                        <div className="max-w-[301.5px] sm:block hidden w-full h-full">
                            <RecommendedText
                                title="Recommended For You"
                                items={[
                                    'Studio Properties For Sale in Dubai',
                                    '1 BHK Flats in Downtown',
                                    'Luxury Villas in Palm Jumeirah',
                                    'Affordable Apartments in JVC',
                                    'Beachfront Homes in Dubai Marina',
                                ]}
                            />
                            <RecommendedText
                                title="Recommended For You"
                                items={[
                                    'Studio Properties For Sale in Dubai',
                                    '1 BHK Flats in Downtown',
                                    'Luxury Villas in Palm Jumeirah',
                                    'Affordable Apartments in JVC',
                                    'Beachfront Homes in Dubai Marina',
                                ]}
                            />
                            <RecommendedText
                                title="Popular Searches"
                                items={[
                                    'Off-plan Projects in Dubai',
                                    'Ready to Move Villas',
                                    'High ROI Areas in UAE',
                                    'Townhouses in Arabian Ranches',
                                    'Gated Communities in Sharjah',
                                ]}
                            />


                            <div className="mt-[27px]">

                                <CustomSliderUi
                                    shuffledImages={shuffledImages}
                                />

                            </div>

                        </div>
                    </div>


                </div>




                <div className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 gap-[30px] w-full h-fit">
                    {
                        allBlogs?.data.map((item, index) => {
                            return (
                                <div key={index} className="flex items-center flex-col gap-[10.5px] ">
                                    <div key={index} className="relative w-full h-[208.5px] rounded-[3.75px] object-cover">
                                        <div className="px-3 py-1 absolute z-30 left-[15px] top-[13.5px] text-[#FF1645] bg-red-700/10 ">{item?.blogCategoryDetails?.name}</div>

                                        <Image
                                            fill
                                            alt={item?.blogTitle}
                                            src={item.image?.secure_url || ''}
                                            className="rounded-md"
                                        />
                                    </div>
                                    <div className="flex flex-col ">

                                        <div className="flex items-center mb-[6px] gap-[4.5px]">
                                            {item?.date && <p className='text-[#767676]   text-[12px] font-medium font-poppins'>Date Published{formatDate(item?.date)}</p>
                                            }                                                        </div>
                                        <h4 className='font-poppins font-medium text-[12px] text-black line-clamp-2 text-ellipsis'>{item.blogTitle}</h4>
                                    </div>
                                </div>
                            )
                        })
                    }




                </div>



            </section>

</Container>



            <Footer />
        </main>
    )
}

export default Blog