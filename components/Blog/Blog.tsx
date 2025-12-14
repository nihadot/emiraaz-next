"use client";
import { formatDate } from "@/components/atom/button/formatDate";
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import Pagination from "@/components/Pagination/Pagination";
import { useViewAllBlogsQuery } from "@/redux/blogs/blogsApi";
import Container from "@/components/atom/Container/Container";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SectionDivider from "../atom/SectionDivider/SectionDivider";
import MobileHeaderTitle from "../atom/typography/MobileHeaderTitle";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import { calender } from "@/app/assets";
import MobileHeader from "../mobileUI/layouts/mobileHeader";
import BlogCards from "./mobile/BlogCards";

type FiltersState = {
  page?: number;
  limit?: number;
  search?: string;
};

function Blog({ initialData }: { initialData: any }) {
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

  const { data: blogsData } = useViewAllBlogsQuery(
    { ...queryParams },
    {
      skip: false,
      // @ts-expect-error — We know this line might throw a TS error due to initialData
      initialData,
    }
  );

  const data = blogsData?.data || [];


  const router = useRouter();
  const totalPages = blogsData?.pagination?.totalPages || 1;

  return (
    <main>
      <div className="block md:hidden">
        <MobileHeader title="Blog" />
      </div>
      <div className="block md:hidden">
        <BlogCards items={data}/>
      </div>
      <div className="hidden md:block">
        <Header
          logoSection={
            <div className="h-full w-full flex justify-center items-center">
              <MobileHeaderTitle content="Blogs" />
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
          <h3 className="text-[26px] sm:text-[37.5px] text-center py-[32px] font-medium font-poppins text-[#FF1645]">
            Learn, Discover, Invest.
          </h3>

          <section className="m-auto gap-[30px] pb-20 flex items-start ">
            <div className="w-full">
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
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

                          <p className="line-clamp-4 font-poppins text-xs font-normal text-[#767676] leading-5 overflow-hidden text-ellipsis">
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
                  : Array.from({ length: 9 }).map((_, index) => (
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

              <div className="mt-[23.25px] flex justify-center items-center w-full ">
                <Pagination
                  currentPage={filters.page || 1}
                  totalPages={totalPages}
                  onPageChange={(newPage) =>
                    setFilters((prev) => ({ ...prev, page: newPage }))
                  }
                />

                <div className="text-[10.5px] mt-[8.25px] flex justify-center items-center font-normal font-poppins text-[#767676]">
                  1 To 24 of 23,567 Listings
                </div>
              </div>
            </div>
          </section>
        </Container>

       </div>
        <Footer />
    </main>
  );
}

export default Blog;
