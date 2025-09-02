'use client'
import { useViewAllBlogsQuery, useViewBlogByIdQuery } from '@/redux/blogs/blogsApi';
import React, { useMemo } from 'react'
import RecommendedText from '../RecomendedText/RecommendedText';
import Image from 'next/image';
import Header from '../Header';
import Container from '../atom/Container/Container';
import { useFetchAllPortraitBannersQuery } from '@/redux/portraitBannerAd/portraitBannerAdApi';
import { shuffle } from '@/utils/shuffle';
import CustomSliderUi from '@/app/home/CustomSliderUi';
import { Footer } from '../Footer';
import { formatDate } from '../atom/button/formatDate';
import { useRouter } from 'next/navigation';
import MobileHeaderTitle from '../atom/typography/MobileHeaderTitle';
import SectionDivider from '../atom/SectionDivider/SectionDivider';
import clsx from 'clsx';

type Props = {
    id: string;
}

function BlogDetails({ id }: Props) {

    const { data: singleBlog } = useViewBlogByIdQuery({ id });
    const { data: allBlogs } = useViewAllBlogsQuery({});

    const { data: portraitBannerData } = useFetchAllPortraitBannersQuery({});

    const banners = portraitBannerData?.data || [];

    const shuffledImages = useMemo(() => shuffle(banners), [banners]);

    const router = useRouter();

    return (
        <main>
            <Header logoSection={
                <div className='h-full w-full flex justify-center items-center'>
                    <MobileHeaderTitle
                        content='Details'
                    />
                </div>
            } />
            <SectionDivider
                containerClassName={clsx("mb-[12px] mt-[12px]")}
                lineClassName="h-[1px] w-full bg-[#DEDEDE]"
            />


            <Container>

                <section className='m-auto gap-[0px] flex flex-col pb-20 '>
                    <div className="w-full h-full flex-1 gap-3 flex ">
                        <div className=" h-full flex-1">
                            {singleBlog?.data?.image ?
                                <div className="w-full relative object-cover h-[236px] sm:h-[523.5px]">
                                    <div className="px-4 py-1 font-poppins font-medium rounded-[3px] absolute text-[10.5px] sm:text-[12px] z-30 left-[15px] top-[15px] text-[#FF1645] bg-[#FFE7EC] ">{singleBlog?.data?.blogCategoryDetails?.name}</div>

                                    <Image
                                        fill
                                        alt={singleBlog?.data?.blogTitle || ''}
                                        src={singleBlog?.data?.image?.webp?.url || ''}
                                        className="rounded-[5px] cursor-text"
                                    />
                                </div>
                                :

                                <div className="w-full bg-slate-50 animate-pulse rounded-[5px] h-[236px] sm:h-[523.5px]"></div>
                            }


                            <div className="w-full pt-[14px]  ">

                                {singleBlog?.data?.date ?
                                    <div className="flex items-center gap-[4.5px]">
                                        {singleBlog?.data?.date && <p className='text-black text-[12px] font-medium font-poppins'>Date Published : {formatDate(singleBlog?.data?.date)}</p>
                                        }
                                    </div> :
                                    <div className="w-[180px] mb-3 bg-slate-50 animate-pulse rounded-[5px] h-[40px]">

                                    </div>

                                }

                                {singleBlog?.data?.blogTitle ? <h1 className='font-poppins font-medium text-[19.5px] mt-[10.5px]'>{singleBlog?.data?.blogTitle}</h1> :
                                    <div className='h-[40px] bg-slate-50 w-full mb-3 rounded-[5px] animate-pulse'></div>
                                }
                                {singleBlog && singleBlog.data && singleBlog.data.blogBody && singleBlog?.data?.blogTitle ? <p
                                    className=" whitespace-pre-wrap w-full text-left font-poppins font-normal mt-[12px]"
                                dangerouslySetInnerHTML={{ __html: `${singleBlog?.data?.blogBody?.html}` }}
                                >
                                    {/* {singleBlog?.data?.blogBody?.html} */}
                                </p>
                                    :
                                    <>
                                        <div className="w-full h-[50px] bg-slate-50 mb-3 animate-pulse rounded-[5px]"></div>
                                        <div className="w-full h-[50px] bg-slate-50 mb-3 animate-pulse rounded-[5px]"></div>
                                        <div className="w-full h-[50px] bg-slate-50 mb-3 animate-pulse rounded-[5px]"></div>
                                        <div className="w-full h-[50px] bg-slate-50 mb-3 animate-pulse rounded-[5px]"></div>
                                        <div className="w-full h-[50px] bg-slate-50 mb-3 animate-pulse rounded-[5px]"></div>
                                        <div className="w-full h-[50px] bg-slate-50 mb-3 animate-pulse rounded-[5px]"></div>
                                        <div className="w-full h-[50px] bg-slate-50 mb-3 animate-pulse rounded-[5px]"></div>
                                        <div className="w-full h-[50px] bg-slate-50 mb-3 animate-pulse rounded-[5px]"></div>
                                        <div className="w-full h-[50px] bg-slate-50 mb-3 animate-pulse rounded-[5px]"></div>
                                        <div className="w-full h-[50px] bg-slate-50 mb-3 animate-pulse rounded-[5px]"></div>
                                    </>
                                }








                            </div>

                        </div>
                        <div className={"md:block hidden max-w-[301.5px] w-full"}>





                            {<RecommendedText
                                containerClassName='!my-0 !mb-2'
                                title="Recommended For You"
                                items={[
                                    'Smart Picks in Dubai’s Fastest-Growing Zones',
                                    'Handpicked Homes with High ROI Potential',
                                    'Investor-Friendly Properties You’ll Love',
                                    'Move-In Ready Units in Prime Locations',
                                    'Top-Rated Listings in Family-Friendly Areas',
                                ]}
                            />}

                            <div className="sticky top-3 left-0">

                                <CustomSliderUi
                                    shuffledImages={shuffledImages}
                                />



                                {<>
                                    <RecommendedText
                                        title="Recommended For You"
                                        items={[
                                            'Smart Picks in Dubai’s Fastest-Growing Zones',
                                            'Handpicked Homes with High ROI Potential',
                                            'Investor-Friendly Properties You’ll Love',
                                            'Move-In Ready Units in Prime Locations',
                                            'Top-Rated Listings in Family-Friendly Areas',
                                        ]}
                                    />
                                    <RecommendedText
                                        title="Popular Searches"
                                        items={[
                                            'Downtown Dubai: Iconic City Living',
                                            'Dubai Marina: Waterfront Lifestyle at Its Best',
                                            'Business Bay: Where Work Meets Luxury',
                                            'Yas Island, Abu Dhabi: Island Living Redefined',
                                            'Jumeirah Village Circle: Affordable Modern Homes',
                                            'Al Reem Island, Abu Dhabi: Urban Peace',
                                        ]}
                                    />
                                </>}



                            </div>







                        </div>
                    </div>

                    <p className=' font-poppins font-medium text-[20px] my-3'>Recomended Blogs :</p>
                    <div className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 gap-[30px] w-full h-fit">

                        {
                            allBlogs && allBlogs?.data?.length > 0 ? allBlogs.data
                                .filter(item => item.slug !== id)
                                .map((item, index) => {
                                    return (
                                        <div className="" key={index}>
                                            <div key={index} className="relative w-full h-[208.5px] object-cover">
                                                <div className="px-4 py-1 font-poppins font-medium rounded-[3px] absolute text-[10.5px] sm:text-[13.5px] z-30 left-[15px] top-[15px] text-[#FF1645] bg-[#FFE7EC] ">{item.blogCategoryDetails?.name}</div>

                                                <Image
                                                    fill
                                                    alt={item.blogTitle}
                                                    src={item.image?.webp?.url || ''}
                                                    className="rounded-[5px]"
                                                />
                                            </div>

                                            {item?.date && <p className='text-[#767676] text-[12px] font-medium font-poppins mt-[13.5px]'>Date Published : {formatDate(item?.date)}</p>
                                            }
                                            <h4 onClick={() => router.push(`/blog/${item.slug}`)} className='mt-[8.25px] font-poppins font-medium text-[17px] text-black line-clamp-2 text-ellipsis'>{item.blogTitle}</h4>


                                        </div>
                                    )
                                }) :


                                Array.from({ length: 3 }).map((_, index) => (
                                    <div className="" key={index}>
                                        <div key={index} className="bg-slate-50 mb-1 animate-pulse w-full h-[208.5px] object-cover" />

                                        <div className='bg-slate-50  mb-1 w-full h-[30px]' />

                                        <div className='h-[30px] bg-slate-50 w-full' />


                                    </div>
                                ))
                        }




                    </div>



                </section>

            </Container>



            <Footer />
        </main>
    )
}

export default BlogDetails