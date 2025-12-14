"use client";
import {
  useViewAllBlogsQuery,
  useViewBlogByIdQuery,
} from "@/redux/blogs/blogsApi";
import React, { useMemo } from "react";
import RecommendedText from "../RecomendedText/RecommendedText";
import Image from "next/image";
import Header from "../Header";
import Container from "../atom/Container/Container";
import { useFetchAllPortraitBannersQuery } from "@/redux/portraitBannerAd/portraitBannerAdApi";
import { shuffle } from "@/utils/shuffle";
import CustomSliderUi from "@/app/home/CustomSliderUi";
import { Footer } from "../Footer";
import { formatDate } from "../atom/button/formatDate";
import { useRouter } from "next/navigation";
import MobileHeaderTitle from "../atom/typography/MobileHeaderTitle";
import SectionDivider from "../atom/SectionDivider/SectionDivider";
import clsx from "clsx";
import { calender } from "@/app/assets";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import BlogDetailsPage from "./mobile/CraouselDetail";
import BlogHeroAndContent from "./mobile/CraouselDetail";
import BlogDetailsHeader from "./mobile/BlogDetailsHeader";
import MobileBlogDetailsHeader from "./mobile/BlogDetailsHeader";
import MobileBlogHeroAndContent from "./mobile/CraouselDetail";

type Props = {
  id: string;
  siteMap: any[];
};

function BlogDetails({ id, siteMap }: Props) {
  const { data: singleBlog } = useViewBlogByIdQuery({ id });
  console.log("the data of individual blogs :", singleBlog);
  const { data: allBlogs } = useViewAllBlogsQuery({});
  console.log("the data of all blogs :", allBlogs);

  const { data: portraitBannerData } = useFetchAllPortraitBannersQuery({});

  const banners = portraitBannerData?.data || [];

  console.log("the banners data :", banners);

  const shuffledImages = useMemo(() => shuffle(banners), [banners]);

  console.log("the shuffeledImages :", shuffledImages);
  const router = useRouter();

  return (
    <main>
      <div className="hidden md:block">
        <Header
          logoSection={
            <div className="h-full w-full flex justify-center items-center">
              <MobileHeaderTitle content="Details" />
            </div>
          }
        />
      </div>

      <div className="block md:hidden">
        <MobileBlogDetailsHeader />
      </div>

      <div className="hidden md:block">
        <SectionDivider
          containerClassName={clsx("mb-[12px] mt-[12px]")}
          lineClassName="h-[1px] w-full bg-[#DEDEDE]"
        />
      </div>

<div className="block md:hidden">
<MobileBlogHeroAndContent blog={singleBlog?.data} />
</div>
      <div className="hidden md:block">
        <Container>
          <section className="m-auto gap-[0px] flex flex-col pb-20 ">
            <div className="w-full h-full flex-1 gap-3 flex ">
              <div className=" h-full flex-1">
                {singleBlog?.data?.image ? (
                  <div className="w-full relative object-cover h-[236px] sm:h-[523.5px]">
                    <div className="px-4 py-1 font-poppins font-medium rounded-[3px] absolute text-[10.5px] sm:text-[12px] z-30 left-[15px] top-[15px] text-[#FF1645] bg-[#FFE7EC] ">
                      {singleBlog?.data?.blogCategoryDetails?.name}
                    </div>

                    <Image
                      fill
                      alt={singleBlog?.data?.blogTitle || ""}
                      src={singleBlog?.data?.image?.webp?.url || ""}
                      className="rounded-[5px] cursor-text"
                    />
                  </div>
                ) : (
                  <div className="w-full bg-slate-50 animate-pulse rounded-[5px] h-[236px] sm:h-[523.5px]"></div>
                )}

                <div className="w-full pt-[14px]  ">
                  {singleBlog?.data?.date ? (
                    <div className="flex items-center gap-[4.5px]">
                      {singleBlog?.data?.date && (
                        <p className="text-black text-[12px] font-medium font-poppins">
                          Date Published : {formatDate(singleBlog?.data?.date)}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="w-[180px] mb-3 bg-slate-50 animate-pulse rounded-[5px] h-[40px]"></div>
                  )}

                  {singleBlog?.data?.blogTitle ? (
                    <h1 className="font-poppins font-medium text-2xl leading-[32px] mt-[10.5px]">
                      {singleBlog?.data?.blogTitle}
                    </h1>
                  ) : (
                    <div className="h-[40px] bg-slate-50 w-full mb-3 rounded-[5px] animate-pulse"></div>
                  )}
                  {singleBlog &&
                  singleBlog.data &&
                  singleBlog.data.blogBody &&
                  singleBlog?.data?.blogTitle ? (
                    <p
                      className=" whitespace-pre-wrap content-wrapper-home w-full text-left font-poppins font-normal mt-[12px]"
                      dangerouslySetInnerHTML={{
                        __html: `${singleBlog?.data?.blogBody?.html}`,
                      }}
                    >
                      {/* {singleBlog?.data?.blogBody?.html} */}
                    </p>
                  ) : (
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
                  )}
                </div>
              </div>
              <div className={"md:block hidden max-w-[301.5px] w-full"}>
                {
                  <RecommendedText
                    containerClassName="!my-0 !mb-2"
                    title="Recommended For You"
                    items={shuffle(siteMap)?.slice(0, 6)}
                  />
                }

                <div className="sticky top-3 left-0">
                  <CustomSliderUi shuffledImages={shuffledImages} />

                  {
                    <>
                      <RecommendedText
                        title="Recommended For You"
                        items={shuffle(siteMap)?.slice(0, 6)}
                      />
                      <RecommendedText
                        title="Popular Searches"
                        items={shuffle(siteMap)?.slice(0, 6)}
                      />
                    </>
                  }
                </div>
              </div>
            </div>

            <p className=" font-poppins font-medium text-[20px] my-3">
              Recomended Blogs :
            </p>
            <div className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-4 gap-2.5 w-full h-fit">
              {allBlogs && allBlogs?.data?.length > 0
                ? allBlogs.data
                    .filter((item) => item.slug !== id)
                    .map((item, index) => {
                      return (
                        // <div className="" key={index}>
                        //     <div key={index} className="relative w-full h-[208.5px] object-cover">
                        //         <div className="px-4 py-1 font-poppins font-medium rounded-[3px] absolute text-[10.5px] sm:text-[13.5px] z-30 left-[15px] top-[15px] text-[#FF1645] bg-[#FFE7EC] ">{item.blogCategoryDetails?.name}</div>

                        //         <Image
                        //             fill
                        //             alt={item.blogTitle}
                        //             src={item.image?.webp?.url || ''}
                        //             className="rounded-[5px]"
                        //         />
                        //     </div>

                        //     {item?.date && <p className='text-[#767676] text-[12px] font-medium font-poppins mt-[13.5px]'>Date Published : {formatDate(item?.date)}</p>
                        //     }
                        //     <h4 onClick={() => router.push(`/blog/${item.slug}`)} className='mt-[8.25px] font-poppins font-medium text-[17px] text-black line-clamp-2 text-ellipsis'>{item.blogTitle}</h4>

                        // </div>

                        <div
                          key={index}
                          className="border border-[#DEDEDE] flex h-[380px] flex-col gap-1 p-3 rounded-md "
                        >
                          <div className="relative w-full h-[170px] object-cover">
                            <Image
                              fill
                              alt={item.blogTitle}
                              src={item.image?.webp?.url || ""}
                              className="cursor-text rounded"
                            />
                          </div>

                          <div className="flex items-center mt-1  gap-3">
                            <div className="flex justify-center    items-center gap-[4.5px]">
                              <p className="text-[#767676]   text-[12px] font-medium font-poppins ">
                                {formatDate(item?.date || "")}
                              </p>

                              <Image
                                src={calender}
                                alt="calender"
                                width={16.5}
                                height={16.5}
                                className="w-[16.5px] cursor-text h-[16.5px]"
                              />
                            </div>

                            <div className=" flex font-poppins h-5 font-medium justify-center items-center text-ellipsis line-clamp-1 px-3 rounded text-[10px] text-[#FF1645] bg-[#FFE7EC] ">
                              {item?.blogCategoryDetails?.name}
                            </div>
                          </div>
                          <Link href={`/blog/${item.slug}`}>
                            <h4 className="leading-4 cursor-pointer font-poppins font-medium text-lg text-black line-clamp-2 text-ellipsis">
                              {item.blogTitle}
                            </h4>
                          </Link>

                          <p className="line-clamp-4 font-poppins text-xs font-normal text-[#767676] leading-[20px] overflow-hidden text-ellipsis">
                            {item?.blogBody?.text}
                          </p>

                          <Link
                            href={`/blog/${item.slug}`}
                            className="cursor-pointer text-[#FF1645]  w-fit font-poppins items-center text-xs flex"
                          >
                            <span className="flex font-medium">Read More</span>
                            <ChevronRight size={16} />
                          </Link>
                        </div>
                      );
                    })
                : Array.from({ length: 3 }).map((_, index) => (
                    <div className="" key={index}>
                      <div
                        key={index}
                        className="bg-slate-50 mb-1 animate-pulse w-full h-[208.5px] object-cover"
                      />

                      <div className="bg-slate-50  mb-1 w-full h-[30px]" />

                      <div className="h-[30px] bg-slate-50 w-full" />
                    </div>
                  ))}
            </div>
          </section>
        </Container>
      </div>

      <Footer />
    </main>
  );
}

export default BlogDetails;

// const BlogDetails = () => {
//   return (
//     <div>
//         <MobileBlogDetailsHeader/>
//             <MobileBlogHeroAndContent/>

//     </div>
//   )
// }

// export default BlogDetails
