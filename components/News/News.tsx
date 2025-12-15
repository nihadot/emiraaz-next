"use client";
import React, { useMemo, useState } from "react";
import Header from "../Header";
import Container from "../atom/Container/Container";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { calender } from "@/app/assets";
import Pagination from "../Pagination/Pagination";
import RecommendedText from "../RecomendedText/RecommendedText";
import CustomSliderUi from "@/app/home/CustomSliderUi";
import { FiltersState } from "../types";
import { shuffle } from "@/utils/shuffle";
import { useFetchAllPortraitBannersQuery } from "@/redux/portraitBannerAd/portraitBannerAdApi";
import { useViewAllNewsQuery } from "@/redux/news/newsApi";
import { formatDate } from "../atom/button/formatDate";
import { Footer } from "../Footer";
import Link from "next/link";
import SectionDivider from "../atom/SectionDivider/SectionDivider";
import clsx from "clsx";
import MobileHeaderTitle from "../atom/typography/MobileHeaderTitle";
import { ChevronRight } from "lucide-react";
import MobileHeader from "../mobileUI/layouts/mobileHeader";
import CategoryTabs from "./mobile/newsTab";
import NewsCarousel from "./mobile/carouselNews";
import BreakingNews from "./mobile/breakingNews";
import NewsCards from "./mobile/exploreNewsList";
import MobilePagination from "../mobileUI/ui/MobilePagination";
import { NewsItem } from "@/types/news/mobile/newsListApiTypes";
type Props = {
  initialData: any;
  siteMap: any[];
};

const News = ({ initialData, siteMap }: Props) => {
  const [filters, setFilters] = useState<FiltersState>({
    page: 1,
    search: "",
    limit: 20,
  });
  const [debouncedSearch, setDebouncedSearch] = useState<any>("");

  const queryParams = useMemo(
    () => ({
      limit: 20,
      page: filters.page,
      search: debouncedSearch,
    }),
    [filters, debouncedSearch]
  );

  const { data: newsData } = useViewAllNewsQuery(
    { ...queryParams },
    {
      skip: false,
      // @ts-expect-error — We know this line might throw a TS error due to initialData
      initialData,
    }
  );

  const data = newsData?.data || [];

function chunkNewsArray(
  arr: NewsItem[],
  chunkSize: number
): NewsItem[][] {
  const result: NewsItem[][] = [];

  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }

  return result;
}

const [imagedata,breakingdata,listdata]=chunkNewsArray(data,3)
  

  const { data: portraitBannerData } = useFetchAllPortraitBannersQuery({});

  const banners = portraitBannerData?.data || [];
  const shuffledImages = useMemo(() => shuffle(banners), [banners]);
  const totalPages = newsData?.pagination?.totalPages || 1;

  return (
    <main>
      <div className="block md:hidden">
        {/* Header */}
        <MobileHeader title="News" />

        {/* Tabs wrapper */}
        <div className="pt-30 px-4">
          <CategoryTabs />
        </div>
        <div className="mt-9">
          <NewsCarousel items={imagedata??[]} />
        </div>
        <div>
          <BreakingNews items={breakingdata??[]} heading="Breaking News" />
        </div>
        <div>
          <NewsCards items={listdata??[]} />
        </div>
          <div className="relative bottom-7 flex justify-center items-center w-full">
                <MobilePagination
                  currentPage={filters.page ?? 1}
                  totalPages={totalPages}
                  onPageChange={(newPage) =>
                    setFilters((prev) => ({ ...prev, page: newPage }))
                  }
                />
              </div>
      </div>
      <div className="hidden md:block">
        <Header
          logoSection={
            <div className="h-full w-full flex justify-center items-center">
              <MobileHeaderTitle content="News" />
            </div>
          }
        />
      </div>

      <div className="hidden md:block">
        <SectionDivider
          containerClassName={clsx("mb-[12px] mt-[12px]")}
          lineClassName="h-[1px] w-full bg-[#DEDEDE]"
        />
      </div>

      <div className="hidden md:block">
        <Container>
          <section className="h-full w-full gap-[12px] pb-20 flex">
            <div className=" flex-1">
              <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-[12px] sm:gap-[10px] ">
                {data && data?.length > 0
                  ? data?.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="border border-[#DEDEDE] flex h-[380px] flex-col gap-1 p-3 rounded-md "
                        >
                          <div className="relative w-full h-[170px] object-cover">
                            <Image
                              fill
                              alt={item.newsTitle}
                              src={item.image?.webp?.url}
                              className="cursor-text rounded"
                            />
                          </div>

                          <div className="flex items-center mt-1  gap-3">
                            <div className="flex justify-center    items-center gap-[4.5px]">
                              <p className="text-[#767676]   text-[12px] font-medium font-poppins ">
                                {formatDate(item?.date)}
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
                              {item?.newCategoryDetails?.name}
                            </div>
                          </div>
                          <Link href={`/news/${item.slug}`}>
                            <h4 className="leading-4 cursor-pointer font-poppins font-medium text-lg text-black line-clamp-2 text-ellipsis">
                              {item?.newsTitle}
                            </h4>
                          </Link>

                          <p className="line-clamp-4 font-poppins text-xs font-normal text-[#767676] leading-[20px] overflow-hidden text-ellipsis">
                            {item?.newsBody?.text}
                          </p>

                          <Link
                            href={`/news/${item.slug}`}
                            className="cursor-pointer text-[#FF1645]  w-fit font-poppins items-center text-xs flex"
                          >
                            <span className="flex font-medium">Read More</span>
                            <ChevronRight size={16} />
                          </Link>
                        </div>
                      );
                    })
                  : Array.from({ length: 10 }).map((_, index) => (
                      <div className="" key={index}>
                        <div
                          key={index}
                          className="bg-slate-50 mb-1 animate-pulse w-full h-[185px] rounded-[5px] object-cover"
                        />
                        <div className="bg-slate-50  mb-1 w-full h-[30px] rounded-[5px] " />
                        <div className="h-[30px] bg-slate-50 w-full rounded-[5px] " />
                      </div>
                    ))}
              </div>

              <div className="mt-[23.25px]  flex justify-center items-center w-full">
                <Pagination
                  currentPage={filters.page || 1}
                  totalPages={totalPages}
                  onPageChange={(newPage) =>
                    setFilters((prev) => ({ ...prev, page: newPage }))
                  }
                />
              </div>
            </div>

            <div className="max-w-[301.5px] bg-white w-full hidden sm:block">
              <RecommendedText title="Population" containerClassName="!my-0" />

              {data && data.length > 0
                ? data.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-[10.5px]  pt-[8px] "
                      >
                        <div className="relative w-[107.25px] h-[58.5px] rounded-[5px] object-cover">
                          <Image
                            fill
                            alt={item.newsTitle}
                            src={item.image?.webp?.url}
                            className="rounded-[5px]"
                          />
                        </div>
                        <div className="flex flex-col w-full ">
                          <h4 className="font-poppins font-medium text-[12px] text-black line-clamp-2 text-ellipsis">
                            {item.newsTitle}
                          </h4>

                          <div className="flex items-center">
                            <div className="flex items-center gap-[4.5px]">
                              <Image
                                src={calender}
                                alt="calender"
                                width={16.5}
                                height={16.5}
                                className="w-[16.5px] h-[16.5px]"
                              />{" "}
                              <p className="text-[#767676]   text-[12px] font-medium font-poppins">
                                {formatDate(item?.date)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : Array.from({ length: 4 }).map((_, index) => (
                    <div className="flex gap-[10.5px] mt-2" key={index}>
                      <div
                        key={index}
                        className="bg-slate-50 mb-1 animate-pulse  w-[107.25px] h-[58.5px] rounded-[3px]"
                      />
                      <div className="w-full">
                        <div className="bg-slate-50  mb-1 w-full h-[28px] rounded-[3px] " />
                        <div className="h-[28px] bg-slate-50 w-[100px] rounded-[3px] " />
                      </div>
                    </div>
                  ))}

              <div className="mt-4"></div>
              <RecommendedText
                title="Recommended For You"
                items={shuffle(siteMap)?.slice(0, 6)}
              />
              <div className="sticky top-3 mt-3 left-0">
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
          </section>
        </Container>
      </div>

      <Footer />
    </main>
  );
};

export default News;
