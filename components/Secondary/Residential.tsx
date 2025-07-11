import { useFetchAllCityNamesQuery } from '@/redux/cities/citiesApi';
import { useFetchAllEmirateNamesQuery } from '@/redux/emirates/emiratesApi';
import { useFetchAllPortraitBannersQuery } from '@/redux/portraitBannerAd/portraitBannerAdApi';
import { useFetchAllProjectsCountQuery, useFetchAllProjectsQuery } from '@/redux/project/projectApi';
import { AllProjectsItems } from '@/redux/project/types';
import { shuffle } from '@/utils/shuffle';
import { useDeviceType } from '@/utils/useDeviceType';
import { usePathname, useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Header from '../Header';
import Container from '../atom/Container/Container';
import SearchNew from '../SearchField/SearchNew';
import SelectLatest from '../SelectOption/SelectLatest';
import { productTypeOptionFirstItems, PropertyTypes, propertyTypeSecond } from '@/data';
import { SwitchSelector } from '../SelectOption';
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';
import ExpandableComponentDropdown from '../ExpandableComponent/ExpandableComponent';
import RangeCalculator from '@/app/home/RangeCalculator';
import AreaRangeInput from '@/app/home/RangeArea';
import { IoCloseOutline } from 'react-icons/io5';
import SectionDivider from '../atom/SectionDivider/SectionDivider';
import Breadcamps from '../Breadcamps/Breadcamps';
import SpaceWrapper from '../atom/SpaceWrapper/SpaceWrapper';
import LocationTags from '../LocationTags/LocationTags';
import ProjectCard from '../ProjectCard/ProjectCard';
import CustomSlider from '../CustomSlider/CustomSlider';
import ProjectCardSkelton from '../ProjectCard/ProjectCardSkelton';
import Recommendations from '@/app/home/Recommendations';
import CustomSliderUi from '@/app/home/CustomSliderUi';
import PaginationNew from '../PaginationNew/PaginationNew';
import BottomBanner from '@/app/home/BottomBanner';
import { Footer } from '../Footer';
import EnquiryFormModal from '../EnquiryFormModal/EnquiryFormModal';
import clsx from 'clsx';
import BedBathSelector from '@/app/home/BedBathSelector';
import BreadcampNavigation from '../BreadcampNavigation/BreadcampNavigation';
import MobileFilterOption from '@/app/home/MobileFilterOption';
import { FiltersState } from '../types';
import { useViewAllCountsQuery } from '@/redux/news/newsApi';
import { useForceScrollRestore, useScrollToTopOnRefresh } from '@/hooks/useScrollRestoration';
import { parsePrice } from '@/utils/parsePrice';
import RecommendedText from '../RecomendedText/RecommendedText';



function Residential() {

        useForceScrollRestore(); // Default key is "scroll-position"
    
useScrollToTopOnRefresh();

    const router = useRouter()
    const pathname = usePathname();
    const [defaultPropertyType, setDefaultPropertyType] = useState<string>('');

    const [clear, setClear] = useState(false);
    const [defaultEmirate, setDefaultEmirate] = useState<string>('');
    const [defaultCities, setDefaultCities] = useState<any>('');
    const [filterModel, setFilterModel] = useState(false);
    const [debouncedSearch, setDebouncedSearch] = useState<any>("");
    const [EnquiryForm, setEnquiryForm] = useState({ status: false, id: '', count: 0 });
    const [rangeCalculator, setRangeCalculator] = useState(false);
    const [bedsAndBath, setBedsAndBath] = useState(false);
    const [showBedBath, setShowBedBath] = useState(false);

    const [areaRange, setShowAreaRange] = useState(false);

    const [filters, setFilters] = useState<FiltersState>({
        page: 1,
        search: "",
        cities: [],
        developers: [],
        facilities: [],
        propertyTypeSecond: "all",
        emirate: "",
        completionType: "",
        handoverDate: undefined,
        paymentPlan: undefined,
        furnishType: "",
        discount: "",
        projectTypeFirst: 'off-plan-secondary',
        projectTypeLast: 'residential',
        bedAndBath: "",
        minPrice: '',
        maxPrice: '',
        minSqft: "",
        maxSqft: "",
        beds: "",
        bath: "",
    });

    // Event Handlers
    const handleChangeSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setFilters(prev => ({ ...prev, search: event.target.value }));
    }, []);

    // Data fetching with memoized query params
    const queryParams = useMemo(() => ({
        limit: 20,
        page: filters.page,
        search: debouncedSearch,
        cities: filters.cities,
        developers: filters.developers,
        facilities: filters.facilities,
        propertyType: filters.propertyType,
        completionType: filters.completionType,
        paymentPlan: filters.paymentPlan,
        year: filters.handoverDate?.year,
        qtr: filters.handoverDate?.quarter,
        discount: filters.discount,
        projectTypeFirst: filters.projectTypeFirst,
        projectTypeLast: filters.projectTypeLast,
        furnishing: filters.furnishType,
        emirate: filters.emirate,
        maxPrice: filters.maxPrice,
        minPrice: filters.minPrice,
        minSqft: filters.minSqft,
        maxSqft: filters.maxSqft,
        beds: filters.beds,
        bath: filters.bath,
        productTypeOptionFirst: filters.productTypeOptionFirst,
        productTypeOptionLast: filters.productTypeOptionLast,
    }), [filters, debouncedSearch]);


    const { data: emiratesData } = useFetchAllEmirateNamesQuery();
    const { data: cities } = useFetchAllCityNamesQuery({ emirate: filters.emirate });
    const { data: projects } = useFetchAllProjectsQuery(queryParams);
    const { data: allCounts } = useViewAllCountsQuery();


    const emirateOptions = useMemo(() => {
        const mappedOptions = emiratesData?.data.map((item) => ({
            label: item.name,
            value: item._id,
            count: item.count,
        })) || [];

        return [
            { label: "All", value: "all" }, // <--- Add "All" option at the top
            ...mappedOptions,
        ];
    }, [emiratesData]);

    const cityOptions = useMemo(() => {
        const mappedOptions = cities?.data.map((item) => ({
            label: item.name,
            value: item.name,
            count: item.count,
        })) || [];

        return [
            { label: "All", value: "all", count: 0 }, // <--- Add "All" option at the top
            ...mappedOptions,
        ];
    }, [cities]);

       useEffect(() => {
            const urlParams = new URLSearchParams(window.location.search);
            const page = urlParams.get('page');
    
            if (page) {
                setFilters(prev => ({ ...prev, page: parseInt(page) }))
            }
        }, [filters.page]);
    
        
    const deviceType = useDeviceType();

    const handleSelect = useMemo(() => ({
        emirate: (option: any) => setFilters(prev => ({ ...prev, emirate: option?.value || '' })),
        propertyType: (option: any) => setFilters(prev => ({ ...prev, propertyType: option?.value || '' })),
        propertyTypeSecond: (option: any) => setFilters(prev => ({ ...prev, propertyTypeSecond: option })),
        completionType: (option: any) => setFilters(prev => ({ ...prev, completionType: option })),
        productTypeOptionFirst: (option: any) => setFilters(prev => ({ ...prev, productTypeOptionFirst: option })),
        projectTypeFirst: (option: any) => setFilters(prev => ({ ...prev, projectTypeFirst: option })),
        projectTypeLast: (option: any) => setFilters(prev => ({ ...prev, projectTypeLast: option })),
        productTypeOptionLast: (option: any) => setFilters(prev => ({ ...prev, productTypeOptionLast: option })),
        handoverDate: (data: any) => setFilters(prev => ({ ...prev, handoverDate: data })),
        projectType: (option: any) => setFilters(prev => ({ ...prev, projectType: option })),
        paymentPlan: (option: any) => setFilters(prev => ({ ...prev, paymentPlan: option?.value || '' })),
        furnishType: (option: any) => setFilters(prev => ({ ...prev, furnishType: option?.value || '' })),
        discount: (option: any) => setFilters(prev => ({ ...prev, discount: option?.value || '' })),
        bedAndBath: (option: any) => setFilters(prev => ({ ...prev, bedAndBath: option?.value || '' })),
        maxPrice: (option: any) => setFilters(prev => ({ ...prev, maxPrice: option || '' })),
        minSqft: (option: any) => setFilters(prev => ({ ...prev, minSqft: option || '' })),
        maxSqft: (option: any) => setFilters(prev => ({ ...prev, maxSqft: option || '' })),
        minPrice: (option: any) => setFilters(prev => ({ ...prev, minPrice: option || '' })),
        beds: (option: any) => setFilters(prev => ({ ...prev, beds: option || '' })),
        bath: (option: any) => setFilters(prev => ({ ...prev, bath: option || '' })),
    }), []);


   
    const [paginationHappened, setPaginationHappened] = useState(false)
    useEffect(()=>{
             window.scrollTo({ top: 0, behavior: 'smooth' });

    },[paginationHappened]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const emirate = urlParams.get('emirate');
        const cities = urlParams.get('cities');
        const toConvertedCitiesParams = cities?.split(',')
        const propertyType = urlParams.get('property-type');


        if (propertyType) {
            setDefaultPropertyType(propertyType)
        }

        if (emirate) {
            setDefaultEmirate(emirate)
        }
        if (toConvertedCitiesParams) {
            setDefaultCities(toConvertedCitiesParams)
        }


    }, []);


    const [allProjects, setAllProjects] = useState<AllProjectsItems[]>();

    useEffect(() => {
        if (projects?.data) {
            setAllProjects(projects?.data);
        }
    }, [projects]);



    const handleChangeCities = useCallback((option: any[]) => {
        if (option.length === 0) {
            setFilters(prev => ({ ...prev, cities: [] }));
            return;
        }
        setFilters(prev => ({ ...prev, cities: option.map((item) => item.value) }));
    }, []);



    // Debounce search input
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(filters.search);
            setFilters(prev => ({ ...prev, page: 1 }));
        }, 500);

        return () => clearTimeout(handler);
    }, [filters.search]);

        const { data: allProjectsCounts } = useFetchAllProjectsCountQuery();
    

    const handleFilterModal = useCallback(() => {
        setFilterModel(prev => !prev);
    }, []);

    const handleClear = useCallback(() => {
        // alert('aler')
        setFilters({
            page: 1,
            search: "",
            cities: [],
            productTypeOptionFirst: '',
            propertyType: [],
            emirate: "",
        });
        setClear(true);
        setTimeout(() => setClear(false), 100);
    }, []);


    const handleClick = (item: AllProjectsItems) => {
        router.push(`/projects/${item.slug}`);
    }

    const handleEnquiryFormClick = useCallback((item: any) => {
        setEnquiryForm({
            status: true,
            id: item._id,
            count: 1,
        });
    }, []);

    const { data: portraitBannerData } = useFetchAllPortraitBannersQuery({});

    const banners = portraitBannerData?.data || [];
    const shuffledImages = useMemo(() => shuffle(banners), [banners]);



    const shuffleArray = (arr: any[]) => {
        const copy = [...arr];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    };

    const totalPages = projects?.pagination?.totalPages || 1;


    return (
        <main>
            <div className=" min-h-screen  w-full lg:overflow-visible font-[family-name:var(--font-geist-sans)]">
                <Header />
                <Container>
                    <section className="  grid grid-cols-1 w-full  lg:grid-cols-[19.8%_9.5%_9.5%_37.5%_21%] gap-2">
                        <div className="md:h-[48px] h-[45px]">
                            <SearchNew
                                value={filters?.search || ''}
                                onChange={handleChangeSearch}
                                placeholder="Search..."
                            />
                        </div>


                        <div className="hidden lg:flex h-[48px]">
                            <SelectLatest
                                listContainerUlListContainerClassName="w-[200px]" search
                                defaultValue={emirateOptions?.find((item) => item?.label === defaultEmirate)}
                                clearSelection={clear}
                                label="Emirates"
                                options={emirateOptions}
                                onSelect={(e) => {
                                    const url = new URL(window.location.href);
                                    if (e?.value) {
                                        url.searchParams.set('emirate', e?.label ?? '');
                                    } else {
                                        url.searchParams.delete('emirate');
                                    }
                                    const newUrl = `${url.pathname}?${url.searchParams.toString()}`;
                                    window.history.pushState({}, '', newUrl);
                                    handleSelect.emirate(e)
                                }}
                            />
                        </div>


                        <div className="hidden lg:flex h-[48px]">
                            <SelectLatest
                                defaultValueMultiple={cityOptions?.filter((item) => defaultCities?.includes(item.label))}
                                search
                                multiple
                                onSelectMultiple={(e) => {
                                    // console.log(e, 'event')
                                    const url = new URL(window.location.href);

                                    if (e) {

                                        if (e && e.length > 0) {

                                            url.searchParams.set('cities', e?.map((item) => item.label).join(','));
                                        } else {
                                            url.searchParams.delete('cities');
                                        }
                                        const newUrl = `${url.pathname}?${url.searchParams.toString()}`;
                                        window.history.pushState({}, '', newUrl);

                                        handleChangeCities(e);

                                    }


                                }}
                                clearSelection={clear}
                                listContainerUlListContainerClassName="w-[220px]"
                                label="Cities"
                                options={cityOptions}

                            />
                        </div>



                        {productTypeOptionFirstItems.length > 0 ? <div className="h-[45px] sm:h-[48px]">
                            <SwitchSelector
                                containerClassName="sm:!gap-1"

                                onSelect={(e) => {
                                    const url = new URL(window.location.href);
                                    const searchParams = url.search;
                                    handleSelect.projectTypeFirst(e);
                                    let path = '/';

                                    if (e === 'off-plan-secondary') {
                                        return;
                                    }

                                    switch (e) {
                                       
                                        case 'off-plan-projects':
                                            path = '/';
                                            break;
                                        case 'off-plan-resale':
                                            path = '/off-plan-resale';
                                            break;
                                        case 'off-plan-land':
                                            path = '/land';
                                            break;
                                    }

                                    window.location.href = `${path}${searchParams}`;

                                    handleSelect.productTypeOptionFirst(e);
                                }}
                                defaultValue={productTypeOptionFirstItems?.[2]?.value}
                                options={productTypeOptionFirstItems}

                            />
                        </div> : <div className="w-full h-full bg-gray-50"></div>}


                        <div className="flex gap-2 h-[45px] sm:h-[48px]">
                            <SwitchSelector
                                containerClassName="sm:!gap-1"
                                onSelect={(e) => {
                                    const url = new URL(window.location.href);
                                    const searchParams = url.search;
                                     
                                    handleSelect.projectTypeLast(e);
                                    let path = '/';

                                    if (e === 'residential') {
                                        return;
                                    }

                                    switch (e) {

                                        case 'all':
                                            path = '/secondary';
                                            break;
                                        case 'commercial':
                                            path = '/secondary/commercial';
                                            break;

                                    }



                                    window.location.href = `${path}${searchParams}`;

                                }

                                }
                                // onSelect={handleSelect.propertyTypeSecond}
                                defaultValue={propertyTypeSecond[1].value}
                                options={propertyTypeSecond}
                            />
                            <button onClick={handleFilterModal} className="bg-red-600/10 rounded flex justify-center items-center  border-none w-[55px] lg:hidden h-full">
                             
                                <HiOutlineAdjustmentsHorizontal
                                    className="w-[22px] h-[22px]"
                                    color='red'
                                />
                            </button>
                        </div>

                    </section>
                </Container>



                {/* /* Additional Filters  */}

                <Container>
                    <section className=" lg:flex gap-2 justify-between  mt-2  hidden">
                        <div className="flex gap-2">

                            <div className={clsx(`h-[33px]`, true ? 'w-[150px]' : 'flex-[8%]')}>

                                <SelectLatest
                                    label="Property Types"
                                    options={[{
                                        value: "all",
                                        label: "All",
                                        count: 0,

                                    }, {
                                        value: "villa",
                                        label: "Villa",
                                        count: allCounts?.data?.propertyTypes?.find(item => item?.propertyType === 'villa')?.count || 0,

                                    },
                                    {
                                        value: "apartment",
                                        label: "Apartment",
                                        count: allCounts?.data?.propertyTypes?.find(item => item?.propertyType === 'apartment')?.count || 0,

                                    },
                                    {
                                        value: "penthouse",
                                        label: "Penthouse",
                                        count: allCounts?.data?.propertyTypes?.find(item => item?.propertyType === 'penthouse')?.count || 0,

                                    },
                                    {
                                        value: "townhouse",
                                        label: "Townhouse",
                                        count: allCounts?.data?.propertyTypes?.find(item => item?.propertyType === 'townhouse')?.count || 0,

                                    }]}
                                    onSelect={(e) => {
                                        const url = new URL(window.location.href);
                                        if (e?.value) {
                                            url.searchParams.set('property-type', e?.label ?? '');
                                        } else {
                                            url.searchParams.delete('property-type');
                                        }
                                        const newUrl = `${url.pathname}?${url.searchParams.toString()}`;
                                        window.history.pushState({}, '', newUrl);
                                        handleSelect.propertyType(e)
                                    }}
                                    clearSelection={clear}
                                    defaultValue={PropertyTypes?.find((item) => item?.label === defaultPropertyType)}
                                    listContainerUlListContainerClassName="w-[200px]"

                                />
                            </div>


                            <div className={clsx("h-[33px]", true ? 'w-[180px]' : 'flex-[6%]')}>

                                <ExpandableComponentDropdown
                                    isOpen={bedsAndBath}
                                    onToggle={() => setBedsAndBath(prev => !prev)}
                                    label="Beds & Baths"
                                    isSelected={false}

                                    onClear={() => {

                                    }}
                                    customCloseControl={<button className="text-xs text-red-600">X</button>}
                                >


                                    <BedBathSelector
                                        onDone={(beds, baths) => {

                                            handleSelect.bath(baths);
                                            handleSelect.beds(beds);

                                        }}
                                        onClose={() => setShowBedBath(false)}
                                    />

                                </ExpandableComponentDropdown>

                            </div>

                            <div className="h-[33px]">

                                <ExpandableComponentDropdown
                                    isOpen={rangeCalculator}
                                    onToggle={() => setRangeCalculator(prev => !prev)}
                                    label="Price"
                                    isSelected={false}
                                    customCloseControl={<button className="text-xs text-red-600">X</button>}
                                >
                                    <RangeCalculator
                                        wrapperClassName=""
                                        onDone={(minValue, maxValue) => {
                                            handleSelect.maxPrice(maxValue);
                                            handleSelect.minPrice(minValue);
                                        }}
                                        onClose={() => setRangeCalculator(prev => !prev)}

                                    />
                                </ExpandableComponentDropdown>

                            </div>


                            <div className=" w-[100px]  h-[33px]">

                                <ExpandableComponentDropdown
                                    isOpen={areaRange}
                                    onToggle={() => setShowAreaRange(prev => !prev)}
                                    label="Sqft"
                                    isSelected={false}

                                    onClear={() => {

                                    }}
                                    customCloseControl={<button className="text-xs text-red-600">X</button>}
                                >
                                    <AreaRangeInput
                                        onClose={() => setShowAreaRange(prev => !prev)}
                                        onDone={(minValue, maxValue) => {
                                            handleSelect.minSqft(minValue)
                                            handleSelect.maxSqft(maxValue)
                                        }}

                                    />

                                </ExpandableComponentDropdown>

                                <div className=""></div>

                            </div>
                        </div>



                        <div onClick={() => handleClear()} className="flex cursor-pointer max-w-[120px] h-[33px] items-center gap-2">
                            <label className="text-[12px] cursor-pointer">Clear Filters</label>
                            <div className="bg-black cursor-pointer w-[14px] rounded-full h-[14px] flex justify-center items-center">
                                <IoCloseOutline size={12} color="white" />
                            </div>
                        </div>

                    </section>
                </Container>



                <SectionDivider
                    containerClassName="my-[12px]"
                    lineClassName="h-[1px] w-full bg-[#DEDEDE]"
                />



                {/* Projects Section */}
                <Container>

                    <div className="mb-4 flex gap-2">
                        <div className="w-full h-full  grid gap-3 sm:grid-cols-2 lg:grid-cols-1">

                            {/* Breadcrumbs navigation link */}
                            <div className="flex justify-between flex-col md:flex-row flex-1 items-start md:items-center w-full py-3">

                                <BreadcampNavigation
                                    title='Offplan Projects :'
                                    items={[
                                        {
                                            title: filters?.cities && filters?.cities?.length > 0 ? filters?.cities?.join(', ') : 'All Cities',

                                        },
                                        {
                                            title: 'Off plan Project Residential & Commercial',
                                        }
                                    ]}
                                />
                                <p className='font-poppins font-normal text-[12px] text-nowrap w-fit text-[#333333] pt-2 md:pt-0'>130 Properties Available</p>
                            </div>



                            {/* Location link */}
                            <SpaceWrapper
                                className='pb-3'
                            >
                                <LocationTags

                                      
                                        data={
                                            cities?.data?.slice(0, 4).map((item) => ({
                                                location: item.name,
                                                count: item.count,
                                            })) || []
                                        }
                                />
                            </SpaceWrapper>


                            {/* projects */}
                            {allProjects ? (
                                allProjects?.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <ProjectCard
                                            navigateDetailsButton={true}
                                            item={item}
                                            handleClick={handleClick}
                                            handleEnquiryFormClick={handleEnquiryFormClick}
                                        />

                                        {/* Add separator after every 5 items */}
                                        {(index + 1) % 5 === 0 && (
                                            <>
                                                <div className=" flex sm:hidden mt:mt-0">
                                                    <CustomSlider
                                                        images={shuffleArray(shuffledImages)}
                                                        containerClassName="!h-[95px] border border-[#DEDEDE] "
                                                    />
                                                </div></>
                                        )}
                                    </React.Fragment>
                                ))
                            ) : (
                                Array.from({ length: 10 }).map((_, index) => (
                                    <ProjectCardSkelton key={index} />
                                ))
                            )}
                        </div>

                        <div className="w-full xl:block hidden max-w-[301.5px]">



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
                            <div className="sticky top-3 left-0">

                                <CustomSliderUi
                                    shuffledImages={shuffledImages}
                                />

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

                            </div>

                          


                        </div>
                    </div>
                </Container>




                <Container>

                    <div className="mt-[23.25px]">

                        <PaginationNew
                            currentPage={filters.page || 1}
                            totalPages={totalPages}
                            onPageChange={(newPage) => {
                                const url = new URL(window.location.href);
                                url.searchParams.set('page', newPage.toString());
                                  window.history.pushState({}, '', url);
                                setPaginationHappened(pre => !pre)
                                setFilters(prev => ({ ...prev, page: newPage }))
                            }}
                            maxVisiblePages={deviceType === 'mobile' ? 6 : 8} />



                        <div className="text-[10.5px] mt-[8.25px] flex justify-center items-center font-normal font-poppins text-[#767676]">{filters.page} To {totalPages} of {allProjectsCounts?.data?.[0]?.count ? parsePrice(allProjectsCounts?.data?.[0]?.count) : 0} Listings</div>
                    </div>
                </Container>




                <SectionDivider
                    containerClassName="mt-[45.75px]"
                    lineClassName="h-[1px] hidden sm:block w-full bg-[#DEDEDE]"
                />


                <BottomBanner />

            </div>

            <Footer />



            <EnquiryFormModal
                EnquiryForm={EnquiryForm}
                setEnquiryForm={setEnquiryForm}
            />

            <MobileFilterOption

                resultProjects={() => {
                    setAllProjects(projects?.data);
                }}
                setFiltersHandler={setFilters}
                onClose={() => setFilterModel(false)}
                            show={filterModel}
                            />
                
            

       </main>
    )
}

export default Residential