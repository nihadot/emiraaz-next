'use client'
import React, { useEffect, useMemo, useState } from 'react'
// import Header from '../Header'
// import MobileHeaderTitle from '../atom/typography/MobileHeaderTitle'
import { Footer } from '../Footer'
// import PropertyTypeSection from './PropertyTypeSection'
import Container from '../atom/Container/Container'
// import SectionDivider from '../atom/SectionDivider/SectionDivider'
import clsx from 'clsx'
// import EmiratesCard from './EmiratesCard'
import { baseUrl } from '@/api'
import PropertyTypeSection from './PropertyTypeSection'
import EmiratesCard from './EmiratesCard'
import Link from 'next/link'
import Pagination from '../Pagination/Pagination'
import SpaceWrapper from '../atom/SpaceWrapper/SpaceWrapper'
import PaginationNew from '../PaginationNew/PaginationNew'
import { useDeviceType } from '@/utils/useDeviceType'
import PageContentSection from './<PageContentSection/PageContentSection'

type Props = {
    category: string;
    emirate: string;
    data: { value: string; label: string; slug: string }[];
};

type FiltersState = {

    page?: number,
    limit?: number,
};

function SiteMap({ category, emirate, data }: Props) {
    const [selectedCategory, setSelectedCategory] = React.useState(category);
    const [selectedEmirate, setSelectedEmirate] = React.useState(emirate);
    const [dataProducts, setDataProducts] = useState<any>([]);


        const [filters, setFilters] = useState<FiltersState>({
            page: 1,
            limit: 20,
        });

    const handleCategoryChange = (newCategory: string) => {
        setSelectedCategory(newCategory);
    };

    const handleEmirateChange = (newEmirate: string) => {
        setSelectedEmirate(newEmirate);
    };

     const queryParams = useMemo(() => ({
            limit: 150,
            page: filters.page,
    
        }), [filters]);

    const fetchAPI = async () => {
        const res = await fetch(`${baseUrl}/site-index/${selectedCategory}/${selectedEmirate}?limit=${queryParams.limit}&page=${queryParams.page}`);
        const responseData = await res.json();
        // console.log(responseData?.data, 'responseData')
        setDataProducts(responseData?.data);
    };

      useEffect(() => {
            const urlParams = new URLSearchParams(window.location.search);
            const page = urlParams.get('page');
    
            if (page) {
                setFilters(prev => ({ ...prev, page: parseInt(page) }))
            }
        }, [filters.page]);

     

    useEffect(() => {
        fetchAPI();
    }, [selectedCategory, selectedEmirate,filters.page]); // refetch whenever either changes

    const totalPages = dataProducts?.pagination?.totalPages;


    const projectTypes = [
        {
            value: "apartments",
            label: "Apartments",

        },
        {
            value: "townhouses",
            label: "Townhouses",
        },
        {
            value: "villas",
            label: "Villas",
        },

        {
            value: "penthouses",
            label: "Penthouses",
        },
    ]

    // 1. Group by type
    const apartmentTypes: any[] = [];
    const villaTypes: any[] = [];
    const townhouseTypes: any[] = [];
    const penthouseTypes: any[] = [];
    const warehouses: any[] = [];
    const shops: any[] = [];
    const officespaces: any[] = [];

    dataProducts?.forEach((item: any) => {
        const url = item.url.toLowerCase();
        if (url.includes("apartments")) apartmentTypes.push(item);
        else if (url.includes("villas")) villaTypes.push(item);
        else if (url.includes("townhouses")) townhouseTypes.push(item);
        else if (url.includes("penthouses")) penthouseTypes.push(item);
        else if (url.includes("warehouses")) warehouses.push(item);
        else if (url.includes("shops")) shops.push(item);
        else if (url.includes("officespaces")) officespaces.push(item);
    });
    const deviceType = useDeviceType();


    return (
        <>



            <Container
                className='flex flex-col gap-[16px] pb-10'
            >


                <PageContentSection/>


                <PropertyTypeSection
                    selectedCategory={selectedCategory}
                    selectedEmirate={selectedEmirate}
                    handleCategoryChange={handleCategoryChange}
                />

                <EmiratesCard
                    selectedCategory={selectedCategory}
                    selectedEmirate={selectedEmirate}
                    handleEmirateChange={handleEmirateChange}

                    data={data}
                />



                <div className="flex flex-col gap-6">
                    {apartmentTypes.length > 0 && (
                        <div className='mt-0'>
                            <h2 
                            className="font-medium pb-3 font-poppins text-lg"
                            >Apartments</h2>
                            <div className="grid sm:grid-cols-2 grid-cols-2  md:grid-cols-3 gap-3">
                                {apartmentTypes.map(item => {
                                    const formatted = item.url.split("/").filter(Boolean).pop()?.replace(/-/g, " ");
                                    return <Link className="inline-block overflow-hidden whitespace-nowrap text-ellipsis font-poppins font-normal text-sm"
                                        key={item._id} href={item.url}>{formatted}</Link>;
                                })}
                            </div>
                        </div>
                    )}

                    {villaTypes.length > 0 && (
                        <div>
                            <h2 className="font-medium pb-3 font-poppins text-lg">Villas</h2>
                            <div className="grid sm:grid-cols-2 grid-cols-2  md:grid-cols-3 gap-3">

                            {villaTypes.map(item => {
                                const formatted = item.url.split("/").filter(Boolean).pop()?.replace(/-/g, " ");
                                return <Link className="inline-block overflow-hidden whitespace-nowrap text-ellipsis font-poppins font-normal text-sm" key={item._id} href={item.url}>{formatted}</Link>;
                            })}
                            </div>
                        </div>
                    )}

                    {townhouseTypes.length > 0 && (
                        <div>
                            <h2 className="font-medium pb-3 font-poppins text-lg">Townhouses</h2>
                            <div
                            className="grid sm:grid-cols-2 grid-cols-2  md:grid-cols-3 gap-3"
                            >

                            {townhouseTypes.map(item => {
                                const formatted = item.url.split("/").filter(Boolean).pop()?.replace(/-/g, " ");
                                return <Link className="inline-block overflow-hidden whitespace-nowrap text-ellipsis font-poppins font-normal text-sm" key={item._id} href={item.url}>{formatted}</Link>;
                            })}
                            </div>
                        </div>
                    )}

                    {penthouseTypes.length > 0 && (
                        <div>
                            <h2 className="font-medium pb-3 font-poppins text-lg">Penthouses</h2>
                           
                           <div className="grid sm:grid-cols-2 grid-cols-2  md:grid-cols-3 gap-3">

                            {penthouseTypes.map(item => {
                                const formatted = item.url.split("/").filter(Boolean).pop()?.replace(/-/g, " ");
                                return <Link className="inline-block overflow-hidden whitespace-nowrap text-ellipsis font-poppins font-normal text-sm" key={item._id} href={item.url}>{formatted}</Link>;
                            })}
                            </div>
                        </div>
                    )}



                    {warehouses.length > 0 && (
                        <div>
                            <h2 className="font-medium pb-3 font-poppins text-lg">Warehouses</h2>
                            <div className="grid sm:grid-cols-2 grid-cols-2  md:grid-cols-3 gap-3">

                            {warehouses.map(item => {
                                const formatted = item.url.split("/").filter(Boolean).pop()?.replace(/-/g, " ");
                                return <Link className="inline-block overflow-hidden whitespace-nowrap text-ellipsis font-poppins font-normal text-sm" key={item._id} href={item.url}>{formatted}</Link>;
                            })}
                            </div>
                        </div>
                    )}



                    {shops.length > 0 && (
                        <div>
                            <h2 className="font-medium pb-3 font-poppins text-lg">Shops</h2>
                            <div className="grid sm:grid-cols-2 grid-cols-2  md:grid-cols-3 gap-3">

                            {shops.map(item => {
                                const formatted = item.url.split("/").filter(Boolean).pop()?.replace(/-/g, " ");
                                return <Link className="inline-block overflow-hidden whitespace-nowrap text-ellipsis font-poppins font-normal text-sm" key={item._id} href={item.url}>{formatted}</Link>;
                            })}
                            </div>
                        </div>
                    )}


                    {officespaces.length > 0 && (
                        <div>
                            <h2 className="font-medium pb-3 font-poppins text-lg">Officespaces</h2>
                           <div 
                           className="grid sm:grid-cols-2 grid-cols-2  md:grid-cols-3 gap-3"
                           >

                            {officespaces.map(item => {
                                const formatted = item.url.split("/").filter(Boolean).pop()?.replace(/-/g, " ");
                                return <Link className="inline-block overflow-hidden whitespace-nowrap text-ellipsis font-poppins font-normal text-sm" key={item._id} href={item.url}>{formatted}</Link>;
                            })}
                            </div>
                        </div>
                    )}
                </div>



                <div className="mt-[23.25px]">

                        <PaginationNew
                            currentPage={filters.page || 1}
                            totalPages={totalPages}
                            onPageChange={(newPage) => {
                                const url = new URL(window.location.href);
                                url.searchParams.set('page', newPage.toString());
                                window.history.pushState({}, '', url);
                                // setPaginationHappened(pre => !pre)
                                setFilters(prev => ({ ...prev, page: newPage }))
                            }}
                            maxVisiblePages={deviceType === 'mobile' ? 4 : 8} />



                    </div>

                {/* {JSON.stringify(categories)} */}
            </Container>



        </>
    )
}

export default SiteMap





