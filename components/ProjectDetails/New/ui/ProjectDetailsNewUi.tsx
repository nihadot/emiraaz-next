'use client'
import Header from '@/components/Header'
import HeaderActions from '@/components/HeaderActions/HeaderActions'
import { AllProjectsItems } from '@/redux/project/types'
import { handleShare } from '@/utils/shareOption'
import { Bookmark, BookmarkIcon, LayoutGrid, MapPin, Share2, ShareIcon, UserPlus, Video } from 'lucide-react'
import React, { useEffect, useMemo, useState } from 'react'

import StickyScrollHeader from '../../StickyScrollHeader'
import Container from '@/components/atom/Container/Container'
import BreadcrumbNavigation from '../../BreadcrumbNavigation'
import { useProjectDetailsLogic } from '../logic/logic'
import MainImageDisplay from '../../MainImageDisplay'
import { TfiLocationPin } from 'react-icons/tfi'
import SidePanel from '../../SidePanel'
import ImageCarouselMobile from './ImageCarouselMobile'
import ModalViewButtons from '../../Mobile/ModalViewButtons'
import ProjectBasicInfo from '../../ProjectBasicInfo'
import { FaBed, FaImage, FaMap, FaMeetup, FaPlay, FaRegBuilding, FaVideo } from 'react-icons/fa'
import ActionTabs from './ActionTabs'
import { aedIcon, close_icon, floor_plan, notes_red_edit, save_icon, share_button_icon, wishlistIcon } from '@/app/assets'
import Image from 'next/image'
import { usePropertyCard } from '@/components/PropertyCardMobile/logic/usePropertyCard'
import MobileDescription from './MobileDescription'
import PropertyInformation from './PropertyInformation'
import SectionHeader from './SectionHeader'
import FloorPlanScroller from './FloorPlanScrollerProps'
import NearbyLocations from './NearbyLocations'
import ProjectDescription from '../../ProjectDescription'
import PropertyDetailsSection from '../../PropertyDetailsSection'
import { formatCustomDate } from '@/utils/formateCustomDate'
import LayoutInformation from '../../LayoutInformation'
import AreaNearBy from '../../AreaNearBy'
import { useWindowSize } from '@/utils/useWindowSize'
import FeaturesAndAmenities from '../../FeaturesAndAmenities'
import LoanAmountOptions from '../../Mobile/LoanAmountOptions'
import PropertyDetailsSectionStringArray from '../../PropertyDetailsSectionStringArray'
import MortgageCalculator from '../../LoanCalculator'
import CustomSlider from '@/components/CustomSlider/CustomSlider'
import { shuffle } from '@/utils/shuffle'
import { useFetchAllPortraitBannersQuery } from '@/redux/portraitBannerAd/portraitBannerAdApi'
import RecommendedProjects from '../../RecommendedProjects'
import PrimaryButton from '@/components/Buttons'
import { PiBlueprint, PiBuildingLight, PiBuildingThin, PiMapTrifoldLight, PiNotePencil, PiNotePencilLight, PiShareFat } from 'react-icons/pi'
import { useFetchAllProjectsQuery } from '@/redux/project/projectApi'
import RecommendedText from '@/components/RecomendedText/RecommendedText'
import FAQQuestions from './FAQQuestions'
import NewModal from "../../../NewModal/NewModal";
import { IoIosPie, IoMdClose } from 'react-icons/io'
import { MdFullscreen } from 'react-icons/md'
import ImageContainer from '../../ImageContainer'
import MapContainer from '../../MapContainer'
import VideoContainer from '../../VideoContainer'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { GoHeart, GoHeartFill } from 'react-icons/go'
import { errorToast, successToast } from '@/components/Toast'
import { useToggleWishlistItemMutation } from '@/redux/wishlist/wishlistApi'
import Modal from '@/components/Modal/Modal'
import { IoBedOutline, IoCloseOutline, IoMapOutline, IoSparklesSharp } from 'react-icons/io5'
import FacilitiesAndAmenities from '../../FacilitiesAndAmenities'
import { LOCAL_STORAGE_KEYS } from '@/api/storage'
import axios from 'axios'
import { baseUrl } from '@/api'
import SpaceWrapper from '@/components/atom/SpaceWrapper/SpaceWrapper'
import TextareaField from '@/components/TextareaField/TextareaField'
import { Footer } from '@/components/Footer'
import ProjectHeader from '../../ProjectHeader'
import SectionDivider from '@/components/atom/SectionDivider/SectionDivider'
import { parsePrice } from '@/utils/parsePrice'
import ModalForm from '@/components/EnquiryForm/ModalForm'
import RegistrationSuccess from '@/components/EnquiryForm/RegistrationSuccess'
import AlreadyEnquired from '@/components/EnquiryForm/AlreadyEnquired'
import { useRouter } from 'next/navigation'
import { CiBookmark, CiPlay1 } from 'react-icons/ci'
import { RiShare2Line } from 'react-icons/ri'
import { CgMaximize } from "react-icons/cg";
import { FaHouseMedicalCircleCheck, FaLocationDot, FaWaterLadder } from 'react-icons/fa6'
import AmenitiesSection from './AmenitiesSection'
import PaymentPlanSection from './PaymentPlanSection'
import LoanSummarySection from './LoanSummarySection'
import PropertyCardSlider from './PropertyCardSlider'
import { PropertyCardItem } from '../logic/usePropertyCards'
import PriceEnquireBar from './PriceEnquireBar'
import OverlaySheet from '@/components/OverlaySheet/ui/OverlaySheet'
import { useOverlaySheet } from '@/components/OverlaySheet/logic/useOverlaySheet'
import ActionBar from './ActionBar'
import GalleryHeader from './GalleryHeader'
import VerticalImageScroll from './VerticalImageScroll'
import YouTubeEmbed from './YouTubeEmbed'
import MapEmbed from './MapEmbed'
import { GalleryTab } from '../types/types'
import DescriptionBlock from './DescriptionBlock'
import Title from './Title'
import LayoutHeader from './LayoutHeader'
import FacilitiesVerticalImageScroll from './FacilitiesVerticalImageScroll'
import MortgageCalculatorFilter from './MortgageCalculatorFilter'
import { closeEnquiry, closeSuccessEnquiry, openEnquiry, setProjectId } from '@/redux/enquiry/enquiry'
import ApplicationSubmittedModal from '@/components/ApplicationSubmittedModal/ApplicationSubmittedModal'
import EnquiryModal from '@/components/EnquiryModal/EnquiryModal'
import { useEnquirySubmit } from '@/hooks/useEnquirySubmit'

interface UserData {
  _id: string;
  // Add more fields if needed
}
interface Props {
  id: string;
  siteMap: any[];
  data: {
    data: AllProjectsItems
  };
  lead?: string;
  promoId?: string;
}

export default function ProjectDetailsNewUi({ id, siteMap, data, lead, promoId }: Props) {
  const logic = useProjectDetailsLogic(data, lead, promoId);

  const images = data?.data?.mainImages ?? [];
  const mainImage = images[logic.imagesIndex]?.webp?.url;

  const router = useRouter();
  function formatPrice(price: string | string): string {
    if (typeof price === "string") {
      const p = price.trim();
      if (/[a-zA-Z]/.test(p)) return p; // 10M, 5L, etc.
      const num = Number(p.replace(/,/g, ""));
      if (!isNaN(num)) return new Intl.NumberFormat("en-AE").format(num);
      return p;
    }
    return new Intl.NumberFormat("en-AE").format(price);
  }

  const { data: projects } = useFetchAllProjectsQuery(
    {
      limit: 6,
      page: 1,

    }
  );


  const layoutOption = [
    {
      label: 'Floor Plans & Layouts',
      value: 'floor-plans-layouts',
      icon: <TfiLocationPin size={17.25} color='#333333' />

    }
  ]

  const [reportProject, setReportProject] = useState(false);

  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  const [layoutModal, setLayoutModal] = useState(false);

  const isWishlist = wishlistItems?.find(item => item?.propertyDetails?._id === data?.data._id);

  const [layoutSelected, setLayoutSelected] = useState<string>(layoutOption[0]?.value);

  const handleReportProjectModal = () => setReportProject(prev => !prev);

  const handleLayoutModal = () => setLayoutModal(prev => !prev);

  const [loanAmount, setLoanAmount] = useState(0);

  const handleLayoutSelect = (item: any) => setLayoutSelected(item)

  const [amenitiesModal, setAmenitiesModal] = useState(false);

  const [loanAmountModal, setLoanAmountModal] = useState<boolean>(false);

  const formattedPrice = formatPrice(data.data.priceInAED);

  const [EnquiryForm, setEnquiryForm] = useState({ status: false, id: '', count: 0 });

  const handleAmenitiesModal = () => setAmenitiesModal(prev => !prev);

  const furnishing =
    data?.data.furnishing === 'fully-furnished'
      ? 'Fully Furnish'
      : data?.data.furnishing === 'semi-furnished'
        ? 'Semi Furnish'
        : data?.data.furnishing === 'un-furnishing'
          ? 'Under Furnish'
          : data?.data.furnishing;

  const layoutImages = data?.data?.layoutImages ?? [];

  const { width, height } = useWindowSize();
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  const { data: portraitBannerData } = useFetchAllPortraitBannersQuery({});

  const banners = (portraitBannerData?.data && portraitBannerData?.data?.filter(item => item.projectDetails.slug !== data?.data?.slug) || []);

  const [totalPrice, setTotalPrice] = useState<number>(); // default
  const [downPayment, setDownPayment] = useState(100000); // default
  const [years, setYears] = useState(15); // default
  const [interestRate, setInterestRate] = useState(3.5); // default
  const shuffledImages = useMemo(() => shuffle(banners), [banners]);


  const [formDataReportProject, setFormDataReportProject] = useState<{
    message: string;
    userId: string;
    projectId: string;
  }>({
    message: '',
    userId: "",
    projectId: ""
  });

   

  const [loadingReportProject, setReportProjectLoading] = useState(false);

  const handleSubmitReportedProject = async (e: React.FormEvent) => {
    e.preventDefault();



    if (!formDataReportProject.message) {
      return errorToast('Please enter a message');
    }


    try {
      setReportProjectLoading(true);

      if (!id) {
        return errorToast('project not found');
      }

      const payload: any = {
        projectId: id,
        message: formDataReportProject.message,
      };

      const userDataString = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_DATA);


      if (userDataString) {

        const userData: UserData = JSON.parse(userDataString);
        if (userData) payload.userId = userData._id
      }

      const token = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN); // or get from Redux store


      const response = await axios.post(`${baseUrl}/report-project`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });


      successToast('Reported successfully!');
      setFormDataReportProject({
        message: '',
        userId: "",
        projectId: ""
      });
      handleReportProjectModal();
    } catch (error: any) {
      errorToast(error?.response?.data?.message || error?.data?.message || error?.response?.message || error?.message || 'Error occurred, please try again later');
      // console.error(err);
    } finally {
      setReportProjectLoading(false);
    }
  };

  const handleChangeReportProject = (e: any) => {
    setFormDataReportProject({ ...formDataReportProject, [e.target.name]: e.target.value })
  }


  const initialValues = {
    loanAmount: 0,
    interestRate: 3.5,
    downPayment: 100000,
    years: 15,
    monthlyPayment: 0
  };


  const handleReset = () => {
    setLoanAmount(initialValues.loanAmount);
    setInterestRate(initialValues.interestRate);
    setDownPayment(initialValues.downPayment);
    setYears(initialValues.years);
    setMonthlyPayment(initialValues.monthlyPayment);
  };

  const handleLoanAmountModal = () => setLoanAmountModal(prev => !prev);

  const options = [
    {
      label: "Images",
      value: "images",
      icon: <FaImage size={17.25} />
    },
    {
      label: "Map",
      value: "map",
      icon: <FaMap size={17.25} />

    },
    {
      label: "Layout",
      value: "layouts",
      icon: <MdFullscreen size={17.25} />

    },
    {
      label: "Video",
      value: "video",
      icon: <FaVideo size={17.25} />

    }
  ];


  const [toggleWishlist] = useToggleWishlistItemMutation();


  const toggleWishlistItem = async () => {

    if (!logic.userId) {
      errorToast("Please login to favorite this project");
      return;
    };



    if (!data?.data._id) {
      return errorToast('project not found');
    }


    const payload = {
      projectId: data?.data._id,
      userId: logic.userId
    };

    try {
      await toggleWishlist(payload).unwrap();
    } catch (error: any) {
      console.error("Failed to toggle wishlist item:", error);
      errorToast(error?.response?.data?.message || error?.data?.message || error?.response?.message || error?.message || 'Error occurred, please try again later');

    }
  };

  const { open: isImageContaier, show: showImageContainer, hide: hideImageContainer } = useOverlaySheet();
  const { open: isDescriptionContaier, show: showDescriptionContainer, hide: hideDescriptionContainer } = useOverlaySheet();
  const { open: isLayoutContaier, show: showLayoutContainer, hide: hideLayoutContainer } = useOverlaySheet();
  const { open: isAmenitiesContaier, show: showAmenitiesContainer, hide: hideAmenitiesContainer } = useOverlaySheet();
  const { open: isMortageContainer, show: showMortageContainer, hide: hideMortageContainer } = useOverlaySheet();

  const [activeTab, setActiveTab] = useState<GalleryTab>("images");
  const dispatch = useDispatch();
  const normalizePriceToNumber = (v: unknown): number => {
    if (typeof v === "number") return v;
    if (!v) return 0;
    return Number(String(v).replace(/[^\d.]/g, ""));
  };

  const { submitEnquiry, error: submitEnquiryError, loading: submitEnquiryLoading, sucess: submitEnquirySucess } = useEnquirySubmit()


  const { isOpen: isEnquiryOpen, successIsOpen } = useSelector((state: RootState) => state.enquiry);

  const DEFAULT_MORTGAGE = {
    price: normalizePriceToNumber(data?.data?.priceInAED),
    years: 10,
    downPaymentPercent: 15,
    interestRate: 4,
  };

  const [mortgage, setMortgage] = useState(DEFAULT_MORTGAGE);
  const [showMortgage, setShowMortgage] = useState(false);

   useEffect(()=>{
      dispatch(setProjectId(data?.data?._id))
    },[data?.data?._id])

  return (
    <div className=" mx-auto w-full   ">

      <div className="hidden sm:block">
        <Header />
      </div>

      <div className="">
        <div className="h-[1px] w-full bg-[#DEDEDE]"></div>
      </div>




      {data?.data._id && <StickyScrollHeader
        projectType={data.data.projectType}
        promotionId={promoId}
        projectId={data?.data._id}
        promotion={lead === 'promotion'}
        currency={logic.currency}
        value={logic.value}
        title={data?.data?.projectTitle || ''}
      />}

      <div className="mb-20">
        <Container>
          <BreadcrumbNavigation
            backToFun={logic.handleBackTo}
          />

          <div className="md:flex hidden flex-col mb-14 md:flex-row gap-[6px]">
            <div className="flex-1">
              <div className="relative"
                onClick={() => {
                  logic.setGalleryModal(true);
                  logic.setGallerySelected('images');
                }}
              >

                <div className="left-[14px] md:block hidden absolute z-20 top-[14px]">

                  {(data?.data?.handOverQuarter && data?.data?.handOverQuarter) && <div className="bg-white font-poppins font-medium flex text-[9.5px] items-center rounded-[2px] py-1  px-2">
                    Handover Date : {data?.data.handOverQuarter} {data?.data.handOverYear}
                  </div>}

                  {(data?.data.projectType) && <div className="bg-white mt-1  w-fit flex font-poppins font-medium text-[9.5px] items-center rounded-[2px] py-1  px-2">
                    {logic.getProjectTypeLabel(data.data.projectType)}
                  </div>}
                </div>

                {data?.data?.discount && (
                  <span className="bg-[#44B842]  ms-3 absolute right-[14px] z-20 top-[14px] rounded-[2px] text-white text-[10px] font-normal font-poppins px-2 py-0.5 capitalize w-fit flex sm:hidden">
                    {data?.data?.discount} Discount
                  </span>
                )}


                <div className="md:block hidden">
                  <MainImageDisplay
                    mainImage={mainImage}
                    selectedIndex={logic.imagesIndex}
                    onSelectImage={logic.setImagesIndex}
                  />
                </div>




                <div onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  logic.setGalleryModal(true);
                  logic.setGallerySelected('map');
                }} className="absolute hidden sm:flex bottom-[24.75px] left-[24.75px] items-center gap-2 p-2 rounded-[3.75px] z-40 bg-black/[77%]">
                  <TfiLocationPin size={18} color='#fff' />
                  <span className="text-white font-poppins text-[12px] font-normal">Map</span>
                </div>
              </div>



              <ModalViewButtons
                handleGalleryModal={logic.handleGalleryModal}
                handleGallerySelect={logic.handleGallerySelect}
              />

              <ProjectBasicInfo
                type={data?.data?.type || ''}
                discount={data?.data?.discount || ''}
                projectId={data?.data._id || ''}
                projectType={data?.data?.projectType}
                title={data?.data?.projectTitle}
                address={data?.data?.address}
                propertyType={logic.propertyType}
                beds={data?.data?.numberOfBeds || ''}
                baths={data?.data?.numberOfBath || ''}
                currency={logic.currency}
                value={logic.value}
                totalFloors={data?.data?.totalFloors || ''}
                squareFeet={data?.data?.squareFeet || ''}
              />


              <div className="mt-[24.75px]">

                {(data?.data?.description || data?.data?.descriptionInArabic) ? <ProjectDescription
                  userId={logic.userId || ''}
                  setEnquiryForm={setEnquiryForm}
                  EnquiryForm={EnquiryForm}
                  projectId={data?.data?._id || ''}
                  projectTitle={data?.data?.projectTitle || ''}
                  descriptionInArabic={data?.data?.descriptionInArabic?.html || data?.data?.descriptionInArabic?.text || ''}
                  descriptionInEnglish={data?.data.description?.html || data?.data?.description?.text || ''}
                  // descriptionInRussian={data?.data.descriptionInRussian || ''}
                  title="Description"
                /> :
                  <div className="w-full h-[130px] rounded bg-gray-50"></div>
                }
              </div>

              <PropertyDetailsSection
                headerTitle="Project Information"
                icon
                data={[
                  { title: 'Type', content: data?.data?.propertyTypes?.slice(0, 1).map(item => item) || 'NOT SELECTED' },
                  { title: 'Furnishing', content: furnishing || 'NOT SELECTED' },
                  // { title: 'Purpose', content: data?.data.purpose },
                  { title: 'Added on', content: data?.data?.createdAt && formatCustomDate(data?.data?.createdAt || '') },
                  // { title: 'Reference no', content: 'Bayut - NANCY102368-Um..' },
                  { title: 'Handover Date', content: ((data?.data?.handOverQuarter && data?.data?.handOverYear) ? `${data?.data?.handOverQuarter} ${data?.data?.handOverYear}` : 'NOT SELECTED') },
                  { title: 'Completion', content: data?.data?.completionType === 'all' ? 'All' : data?.data?.completionType === 'just-launched' ? 'Just Launched' : data?.data?.completionType === 'under-construction' ? 'Under Construction' : 'NOT SELECTED' },
                  { title: 'Developer', content: data?.data?.developerDetails?.name || 'NOT ASSIGNED' },
                  // { title: 'Usage', content: data?.data?.usage },
                  { title: 'Ownership', content: data?.data?.ownerShip || 'Freehold' },
                  // { title: 'Parking Availability', content: data?.data?.parkingAvailability },
                  { title: 'Built-up Area', content: data?.data?.buildUpArea || 'NOT PROVIDED' },
                  { title: 'Total Parking Spaces', content: data?.data?.totalParkingSpaces || 'NOT PROVIDED' },
                  { title: 'Total Floors', content: data?.data?.totalFloors || 'NOT PROVIDED' },
                  { title: 'Total Building Area', content: data?.data?.totalBuildingArea || 'NOT PROVIDED' },
                  { title: 'Retail Centres', content: data?.data?.retailCenters || 'NOT PROVIDED' },
                  { title: 'Elevators', content: data?.data?.elevators || 'NOT PROVIDED' },
                  { title: 'Swimming Pools', content: data?.data?.swimmingPool || 'NOT PROVIDED' },
                  { title: 'Search Id', content: data?.data?.uniqueId || 'NOT PROVIDED' },
                  { title: 'Project No', content: data?.data?.projectNumber || 'NOT PROVIDED' },
                ]}
              />


              <div className="mt-[24.75px]">

                {
                  layoutImages && layoutImages.length > 0 ? <LayoutInformation
                    images={layoutImages}
                    handleGallerySelect={logic.handleGallerySelect}
                    handleGalleryModal={logic.handleGalleryModal}
                  />
                    :
                    <div className="sm:flex grid grid-cols-1 gap-2  w-full ">

                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="w-full sm:w-[271px] h-[175px] rounded bg-gray-50"></div>
                      ))}
                    </div>
                }

              </div>


              <div className="mt-[24.75px]">

                {
                  data?.data.nearByAreas && data?.data.nearByAreas.length > 0 ?

                    <AreaNearBy
                      headerTitle="Areas Nearby"
                      sectionId="areas-near-by"
                      data={data?.data.nearByAreas || []}
                    />
                    :
                    <div className="gap-2  grid sm:pe-10 mt-3 sm:mt-0 grid-cols-1 sm:grid-cols-2 ">

                      {Array.from({ length: width < 640 ? 6 : 10 }).map((_, i) => (
                        <div key={i} className="w-full h-[24px] rounded bg-gray-50"></div>
                      ))}
                    </div>
                }
              </div>


              {/* Features and Amenities */}
              <div className="mt-[24.75px]">


                {
                  data?.data.facilitiesAmenitiesDetails && data?.data.facilitiesAmenitiesDetails.length > 0
                    ?

                    <FeaturesAndAmenities
                      handleModal={handleAmenitiesModal}
                      headerTitle="Features / Amenities"
                      data={data?.data.facilitiesAmenitiesDetails.map((item) => {
                        return {
                          name: item.name,
                          icon: item.image?.webp?.url
                        }
                      }) || []}
                    /> :
                    <div className="gap-2 grid grid-cols-3 sm:flex ">
                      {Array.from({ length: 7 }).map((_, i) => (
                        <div key={i} className="sm:w-[99px] h-[99px] rounded bg-gray-50"></div>
                      ))}
                    </div>

                }


              </div>



              {/* Loan Amount Options */}
              <div className="mt-[24.75px]">
                {totalPrice && <LoanAmountOptions
                  monthlyPayment={monthlyPayment}
                  totalPrice={totalPrice}
                  downPayment={downPayment}
                  years={years}
                  handleLoanAmountModal={handleLoanAmountModal}
                  interestRate={interestRate}
                />}


                {
                  data?.data?.paymentOptions ?
                    <PropertyDetailsSectionStringArray
                      headerTitle="Payment Plan"
                      data={data?.data?.paymentOptions}
                    />
                    :
                    <div className="gap-2 mt-4 sm:grid pe-0  grid-cols-1 sm:grid-cols-4 ">

                      {Array.from({ length: width < 640 ? 6 : 24 }).map((_, i) => (
                        <div key={i} className="w-full mt-2 sm:mt-0.5 h-[30px] sm:h-[26px] rounded bg-gray-50"></div>
                      ))}
                    </div>
                }

                {/* Desktop view */}
                {<div className="hidden mt-[24.75px] sm:block">
                  <MortgageCalculator
                    headerTitle="Mortgage"
                    data={({ monthlyPayment, loanAmount, interestRate, downPayment, years }) => {
                      setMonthlyPayment(monthlyPayment);
                      setLoanAmount(loanAmount);
                      setInterestRate(interestRate);
                      setDownPayment(downPayment);
                      setYears(years);
                      // console.log(monthlyPayment, loanAmount, interestRate, downPayment, years,'ddd')
                    }}
                    defaultTotalPrice={mortgage.price}
                    defaultYears={mortgage.years}
                    defaultDownPayment={mortgage.downPaymentPercent}
                    defaultInterestRate={mortgage.interestRate}
                  />
                </div>}






              </div>


              {<div className="mt-[18px] flex sm:hidden mt:mt-0">
                <CustomSlider
                  images={shuffledImages}
                  containerClassName="h-[95px] border border-[#DEDEDE] "
                />
              </div>}

              <div className="sm:mt-4">

                {
                  projects?.data && projects.data.length > 0 ?
                    <RecommendedProjects
                      projects={projects?.data && data?.data._id && projects.data.filter(item => item._id !== data?.data?._id) || []}
                    /> :
                    <div className="gap-3  grid sm:pe-10 grid-cols-2 sm:grid-cols-3 ">
                      {Array.from({ length: width < 640 ? 8 : 9 }).map((_, i) => (
                        <div className="" key={i}>
                          <div className="h-[143px] w-full rounded bg-gray-50" />
                          <div className="h-[20px] w-[90px] mt-1 rounded bg-gray-50" />
                          <div className="h-[27px] w-full sm:w-[180px] mt-1 rounded bg-gray-50" />

                        </div>
                      ))}
                    </div>
                }
              </div>



              <div className="sm:hidden rounded-[5.11px] z-40 px-[16px] flex bg-white left-0 fixed bottom-0 w-full justify-center items-center h-[85.2px]">

                <PrimaryButton
                  onClick={() => setEnquiryForm({ status: true, id: data?.data?._id || '', count: 1 })}
                  type="button"
                  className="bg-[#FF1645]  h-[47px] w-full border-none text-white font-poppins rounded "

                >
                  <div className="flex items-center gap-2">
                    <div className="relative w-[20px] h-[20px]">

                      <PiNotePencilLight size={20} color='white' />
                    </div>
                    {/* <Image src={enquiry_icon} alt="share icon" width={21} /> */}
                    <label className="text-sm font-medium text-white font-poppins">Enquire Now </label>
                  </div>
                </PrimaryButton>
              </div>



              <div className="flex sm:hidden">
                <RecommendedText
                  title="Recommended For You"
                  items={shuffle(siteMap)?.slice(0, 6)}

                />
              </div>




              <FAQQuestions
                values={data?.data?.faqQuestions}
              />




            </div>

            <SidePanel
              siteMap={siteMap}
              projectId={data?.data?._id || ''}
              shuffledImages={logic.shuffledImages}
              handleGalleryModal={logic.handleGalleryModal}
              mainImage={mainImage}
              promotion={lead === 'promotion'}
              promotionId={promoId}
              handleGallerySelect={logic.handleGallerySelect}
              images={images}
              videoLink={data?.data.youtubeVideoLink}
              selectedIndex={logic.imagesIndex}
              filteredProjectAdsCard={logic.filteredProjectAdsCard ? logic.filteredProjectAdsCard : []}
            />

          </div>
        </Container>







        <div className="block md:hidden">


          <OverlaySheet open={isImageContaier} onClose={hideImageContainer}>
            <div className="fixed inset-0 flex flex-col bg-white">

              {/* 🔝 FIXED HEADER */}
              <div className="sticky top-0 z-30  border-b rounded-b-1 border-[#DEDEDE]">
                {(activeTab === 'video' || activeTab === 'map' || activeTab === 'images') && <GalleryHeader
                  onBack={hideImageContainer}
                  onChange={(tab) => {
                    setActiveTab(tab)
                  }}
                  defaultTab={activeTab}
                  tabs={[
                    { id: "images", label: "Images", count: 18, icon: <FaImage size={18} /> },
                    { id: "map", label: "Map", icon: <MapPin size={18} /> },
                    { id: "video", label: "Video", icon: <Video size={18} /> },
                  ]}
                />}
              </div>

              {/* 🟡 SCROLLABLE MIDDLE */}
              <div className="flex-1 px-3 overflow-y-auto no-scrollbar">
                {activeTab === 'images' && <VerticalImageScroll
                  images={data?.data?.mainImages.map((i) => i.webp.url) || []}
                // onImageClick={(i) => alert(`Clicked image ${i}`)}
                />}

                {activeTab === 'video' && <div className="h-full flex justify-center items-center">
                  <YouTubeEmbed videoId={data?.data?.youtubeVideoLink || ''} />
                </div>}

                {activeTab === 'map' && <div className="h-full flex justify-center items-center">
                  <MapEmbed embedUrl={data?.data?.googleMapsUrl} />
                </div>}


              </div>

              {/* 🔻 STICKY BOTTOM ACTION BAR */}
              <div className="sticky bottom-0 z-30  bg-white ">
                <ActionBar
                  actions={[
                    { id: "save", label: "Save", icon: <Bookmark size={18} />, onClick: () => { } },
                    {
                      id: "share", label: "Share", icon: <Share2 size={18} />, onClick: () => {
                        handleShare(data?.data?.projectTitle || '')

                      }
                    },
                    {
                      id: "enquire", label: "Enquire Now", icon: <UserPlus size={18} />, onClick: () => {
                        dispatch(openEnquiry());
                        dispatch(setProjectId(data?.data?._id))
                      }
                    },
                  ]}
                />
              </div>

            </div>
          </OverlaySheet>


          <OverlaySheet open={isDescriptionContaier} onClose={hideDescriptionContainer}>
            <div className="fixed inset-0 flex flex-col bg-white">

              {/* 🔝 FIXED HEADER */}
              <div className="sticky top-0 z-30 bg-red-300 border-b rounded-b-1 border-[#DEDEDE]">
                {(activeTab === 'description-english' || activeTab === 'description-arabic') && <GalleryHeader
                  onBack={hideDescriptionContainer}
                  onChange={(tab) => {
                    setActiveTab(tab)
                  }}
                  defaultTab={activeTab}
                  tabs={[
                    { id: "description-english", label: "English" },
                    { id: "description-arabic", label: "عربي" },
                  ]}
                />}
              </div>

              {/* 🟡 SCROLLABLE MIDDLE */}
              <div className="flex-1 px-3 overflow-y-auto no-scrollbar">
                <div className="py-3">
                  <Title
                    title='Description'
                  />
                </div>
                {activeTab === 'description-english' && <DescriptionBlock
                  html={data?.data.description?.html}
                />}

                {activeTab === 'description-arabic' && <DescriptionBlock
                  html={data?.data.descriptionInArabic?.html}
                />}



              </div>

              {/* 🔻 STICKY BOTTOM ACTION BAR */}
              <div className="sticky bottom-0 z-30  bg-white ">
                <ActionBar
                  actions={[
                    { id: "save", label: "Save", icon: <Bookmark size={22} />, onClick: () => { } },
                    {
                      id: "share", label: "Share", icon: <Share2 size={22} />, onClick: () => {
                        handleShare(data?.data?.projectTitle || '')

                      }
                    },
                    {
                      id: "enquire", label: "Enquire Now", icon: <UserPlus size={22} />, onClick: () => {
                        dispatch(openEnquiry());
                        dispatch(setProjectId(data?.data?._id))
                      }
                    },
                  ]}
                />
              </div>

            </div>
          </OverlaySheet>

          <OverlaySheet open={isLayoutContaier} onClose={hideLayoutContainer}>
            <div className="fixed inset-0 flex flex-col bg-white">

              {/* 🔝 FIXED HEADER */}
              <div className="sticky top-0 z-30  ">
                <LayoutHeader
                  title='Floor Plan'
                  onBack={hideLayoutContainer}
                />
              </div>

              {/* 🟡 SCROLLABLE MIDDLE */}
              <div className="flex-1 px-3 overflow-y-auto no-scrollbar">
                {<VerticalImageScroll
                  images={data?.data?.layoutImages.map((i) => i.webp.url) || []}
                />}


              </div>

              {/* 🔻 STICKY BOTTOM ACTION BAR */}
              <div className="sticky bottom-0 z-30  bg-white ">
                <ActionBar
                  actions={[
                    { id: "save", label: "Save", icon: <Bookmark size={22} />, onClick: () => { } },
                    {
                      id: "share", label: "Share", icon: <Share2 size={22} />, onClick: () => {
                        handleShare(data?.data?.projectTitle || '')

                      }
                    },
                    {
                      id: "enquire", label: "Enquire Now", icon: <UserPlus size={22} />, onClick: () => {
                        dispatch(openEnquiry());
                        dispatch(setProjectId(data?.data?._id))
                      }
                    },
                  ]}
                />
              </div>

            </div>
          </OverlaySheet>

          <OverlaySheet open={isAmenitiesContaier} onClose={hideAmenitiesContainer}>
            <div className="fixed inset-0 flex flex-col bg-white">

              {/* 🔝 FIXED HEADER */}
              <div className="sticky top-0 z-30  ">
                <LayoutHeader
                  title='Amenities'
                  onBack={() => {
                    hideAmenitiesContainer()
                  }}
                />
              </div>

              {/* 🟡 SCROLLABLE MIDDLE */}
              <div className="flex-1 px-3 overflow-y-auto no-scrollbar">
                {<FacilitiesVerticalImageScroll
                  images={data?.data?.facilitiesAmenitiesDetails}
                />}


              </div>

              {/* 🔻 STICKY BOTTOM ACTION BAR */}
              <div className="sticky bottom-0 z-30  bg-white ">
                <ActionBar
                  actions={[
                    { id: "save", label: "Save", icon: <Bookmark size={22} />, onClick: () => { } },
                    {
                      id: "share", label: "Share", icon: <Share2 size={22} />, onClick: () => {
                        handleShare(data?.data?.projectTitle || '')

                      }
                    },
                    {
                      id: "enquire", label: "Enquire Now", icon: <UserPlus size={22} />, onClick: () => {
                        dispatch(openEnquiry());
                        dispatch(setProjectId(data?.data?._id))
                      }
                    },
                  ]}
                />
              </div>

            </div>
          </OverlaySheet>

          <OverlaySheet open={isMortageContainer} onClose={hideMortageContainer}>
            <div className="h-[75vh] border rounded-t-3xl border-[#DEDEDE] bg-white p-3">

              <div className="pt-3">
                <Title
                  title='Mortgage Calculator'
                />
              </div>

              <MortgageCalculatorFilter
                initialValues={mortgage}
                onApply={(v) => {
                  setMortgage(v);        // ✅ APPLY updates parent
                  setShowMortgage(false);
                  hideMortageContainer();
                }}
                onChange={() => { }}      // optional live preview
              />

            </div>
          </OverlaySheet>




          <Container>
            {/* Header */}
            <HeaderActions
              rightActions={[
                {
                  icon:
                    <CiBookmark
                      size={20}
                    />
                  , onClick: () => { }
                },
                { icon: <RiShare2Line size={20} />, onClick: handleShare },
              ]}
            />
          </Container>

          {/* Image Carousel */}
          <ImageCarouselMobile
            images={[...images.map(i => i.webp.url), ...images.map(i => i.webp.url)]}
            onImageClick={() => {
              showImageContainer()
              setActiveTab('images')
              dispatch(setProjectId(data?.data?._id))
            }}
          />

          {/* Bed and Bath */}
          <Container
            className='py-4'
          >
            <p className='capitalize text-sm font-poppins font-normal text-[#767676]'>{logic.propertyType}</p>
            <h3 className='text-[24px] pt-1 font-poppins font-semibold text-black'>{data?.data?.projectTitle}</h3>
            <div className="flex gap-3 justify-start items-center mt-3">
              <div className="flex items-center gap-2">
                <IoBedOutline size={20} />
                <p className='text-xs font-poppins font-normal text-[#767676]'>{data?.data?.type}</p>
              </div>

              <div className="flex items-center gap-2">
                <PiBuildingLight size={18} />
                <p className='text-xs font-poppins font-normal text-[#767676]'>{data?.data?.totalFloors}</p>
              </div>

              <div className="flex items-center gap-2">
                <CgMaximize size={20} />
                <p className='text-xs font-poppins font-normal text-[#767676]'>{data?.data?.squareFeet}</p>
              </div>
            </div>


            <div className="mt-3">
              <ActionTabs
                tabs={[
                  {
                    icon: <PiMapTrifoldLight
                      size={22}
                    />,
                    label: "Map",
                    onClick: () => {
                      showImageContainer()
                      setActiveTab('map')
                    }
                  },

                  {
                    icon: <CiPlay1
                      size={20}
                    />,
                    label: "Play",
                    onClick: () => {
                      showImageContainer()
                      setActiveTab('video')
                    }
                  },

                ]}
              />
            </div>


            <div

              className="flex items-center mt-4 justify-between">
              <p className="text-red-500 items-center flex text-xl font-semibold">

                <span className='me-1'>AED</span>
                <span className="truncate text-2xl font-poppins"> {formattedPrice}</span>
                <span className="text-[#767676] mt-1 font-poppins text-xs font-normal ml-1">Onwards</span>
              </p>

            </div>


            <div className="mt-5">
              <MobileDescription
                // onClick={showImageContainer}
                onClick={() => {
                  showDescriptionContainer()
                  setActiveTab('description-english')
                }}
                data={data?.data.description?.text?.slice(0, 600)}

              />
            </div>


            <div className="mt-8">


              <PropertyInformation
                items={[
                  { label: 'Type', value: data?.data?.type },
                  { label: 'Furnishing', value: furnishing },
                  { label: 'Added on', value: data?.data?.createdAt && formatCustomDate(data?.data?.createdAt || '') },
                  { label: 'Handover Date', value: ((data?.data?.handOverQuarter && data?.data?.handOverYear) ? `${data?.data?.handOverQuarter} ${data?.data?.handOverYear}` : 'NOT SELECTED') },
                  { label: 'Completion', value: data?.data?.completionType === 'all' ? 'All' : data?.data?.completionType === 'just-launched' ? 'Just Launched' : data?.data?.completionType === 'under-construction' ? 'Under Construction' : 'NOT SELECTED' },
                  { label: 'Developer', value: data?.data?.developerDetails?.name || 'NOT ASSIGNED' },
                  { label: 'Ownership', value: data?.data?.ownerShip || 'Freehold' },
                  { label: 'Built-up Area', value: data?.data?.buildUpArea || 'NOT PROVIDED' },
                  { label: 'Total Parking Spaces', value: data?.data?.totalParkingSpaces || 'NOT PROVIDED' },
                  { label: 'Total Floors', value: data?.data?.totalFloors || 'NOT PROVIDED' },
                  { label: 'Total Building Area', value: data?.data?.totalBuildingArea || 'NOT PROVIDED' },
                  { label: 'Retail Centres', value: data?.data?.retailCenters || 'NOT PROVIDED' },
                  { label: 'Elevators', value: data?.data?.elevators || 'NOT PROVIDED' },
                  // { label: 'Search ID', value: data?.data?.searchId || 'NOT PROVIDED' },
                ]}
              />
            </div>


            <div className="pt-3">
              <SectionHeader
                icon={<PiBlueprint size={26} />}
                title="Floor Plans and Layouts"
              />



              <FloorPlanScroller
                plans={data.data.layoutImages.map((i) => {
                  return {
                    id: i.webp.url,
                    src: i.webp.url,
                    alt: i.webp.url
                  }
                })}
                onSelect={() => {
                  showLayoutContainer();
                }}
              />
            </div>


            <div className="pt-3">
              <SectionHeader
                icon={<FaLocationDot size={22} />}
                title="Areas Nearby"
              />


              <NearbyLocations
                items={[
                  "05 Minutes from Dubai Hills Mall",
                  "12 Minutes from Dubai Marina",
                  "12 Minutes from Mall of the Emirates",
                  "12 Minutes from Meydan Racecourse",
                ]}
              />
            </div>

          </Container>


          {/* Features and Amenities */}
          <div className="pt-3 pb-4 px-[12px] bg-[#F5F5F5]">
            <div className="pb-2">
              <SectionHeader
                icon={<FaWaterLadder size={22} />}
                title="Features / Amenities"
              />
            </div>

            <AmenitiesSection
              // images={d}
              handleViewAll={showAmenitiesContainer}
              data={
                data.data.facilitiesAmenitiesDetails.map(item => {
                  return {
                    id: item._id,
                    label: item.name,
                    link: item.image?.webp?.url
                  }
                })
              }
            />





          </div>


          {/* Payment Plan */}
          <Container>
            <div className="pt-3">

              <SectionHeader
                icon={<IoIosPie size={22} />}
                title="Payment Plan"
              />
              <PaymentPlanSection />

            </div>


            <div className="pt-5">

              <SectionHeader
                icon={<FaHouseMedicalCircleCheck
                  size={26}
                />}
                title="Mortgage"
              />
              <p
                className='font-poppins text-base leading-[24px] font-normal'
              >Calculate and view the monthly mortgage on this apartment</p>
            </div>

            <div className="pt-5">
              <LoanSummarySection
                price={mortgage.price}
                downPaymentPercent={mortgage.downPaymentPercent}
                years={mortgage.years}
                interestRate={mortgage.interestRate}
                toggleEdit={() => showMortageContainer()}
              />

            </div>


            <div className="pt-6">
              <div className="flex items-center gap-2 py-3">
                <div className="">
                  <IoSparklesSharp
                    color='red'
                    size={26}
                  />
                </div>
                <h3 className='text-[18px] font-poppins font-medium'>Recommended Properties</h3>
              </div>
            </div>

            <div className="">
              <PropertyCardSlider
              />
            </div>




          </Container>



          <div className="py-2 sticky bottom-0 mx-[12px]">
            <div className="">
              <PriceEnquireBar
              onEnquire={()=>{
                dispatch(openEnquiry());
                dispatch(setProjectId(data?.data?._id));
              }}
                price={data?.data?.priceInAED}
              />
            </div>
          </div>
        </div>
      </div>









      <NewModal
        onClose={logic.handleGalleryModal}
        isOpen={logic.galleryModal}
        contentClassName="flex rounded-[6px] max-w-[1200px]  flex-col bg-white p-0 w-full h-[100%] sm:h-[80vh]"

      >




        <Container
          className='h-full'
        >

          <div className="w-full sm:px-5 flex flex-col bg-white pb-3 pt-3 sm:py-[20px] rounded-[6px] h-full sm:h-[80vh]">

            <div className=" justify-end  sm:flex hidden items-end" onClick={logic.handleGalleryModal}>
              <IoMdClose
                className="w-[20px] h-[20px]"
                color="#333333"
              />
            </div>



            <div className=" w-full flex h-[48px] sm:py-2 px-1  sm:border-[#DEDEDE] bg-white sm:border mb-2 sm:my-2 items-center  text-sm gap-[4px] sm:gap-[7.5px] rounded-[3px]  ">
              {options?.map((item) => (
                <button
                  key={item.value}
                  className={` font-normal gap-[4px] sm:gap-[7.5px] font-poppins sm:text-[14px] rounded-[3px] sm:rounded-[3px] px-2 sm:px-4 py-0 sm:py-1 h-[34px] sm:h-[40px] flex items-center   justify-center transition-all w-full duration-200 ${logic.gallerySelected === item.value
                    ? 'bg-red-600/10 text-red-600'
                    : 'bg-white text-[#767676] hover:text-red-600 hover:bg-red-100'
                    }`}
                  onClick={() => logic.handleGallerySelect(item.value)}
                >
                  {item.icon}
                  <span className="font-poppins font-medium text-[10px] sm:text-[12px] text-nowrap">{item.label}  {item.value === 'images' && `(${images.length})`} {item.value === 'layouts' && `${layoutImages.length}`} </span>
                </button>
              ))}
            </div>

            {logic.gallerySelected === 'images' && <ImageContainer
              images={images}
              close={logic.handleGalleryModal}
            />}


            {logic.gallerySelected === 'map' && <MapContainer
              mapUrl={data?.data?.googleMapsUrl || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462563.0326686135!2d54.89783448251017!3d25.075658408264278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1747292411381!5m2!1sen!2sin'}
              close={logic.handleGalleryModal}
            />}


            {logic.gallerySelected === 'layouts' && <ImageContainer
              images={layoutImages}
              close={logic.handleGalleryModal}
            />}

            {logic.gallerySelected === 'video' && <VideoContainer
              close={logic.handleGalleryModal}

              videoUrl={data?.data?.youtubeVideoLink || ''}
            />}


            <div className="flex bg-white mt-[15px] gap-1 sm:gap-[7.5px] items-center sm:justify-end">
              <PrimaryButton
                type="button"
                className="bg-[#FFE7EC] !px-3 sm:!px-4 !py-2 sm:!py-[9px] !w-full sm:!w-fit  border-none text-[#FF1645] font-poppins rounded "

              >
                <div className="flex items-center h-[26px] justify-center gap-2">
                  {isWishlist ? (
                    <GoHeartFill onClick={toggleWishlistItem} color="red" className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]" />
                  ) : (
                    <GoHeart onClick={toggleWishlistItem} color="red" className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]" />
                  )}
                  <label className="text-[12px] sm:text-[14.25px] text-[#FF1645] font-medium font-poppins">Save</label>
                </div>
              </PrimaryButton>

              <PrimaryButton
                type="button"
                className="bg-[#FFE7EC] !px-3 sm:!px-4 !w-full sm:!w-fit  border-none text-[#FF1645] font-poppins rounded "

              >
                <div className="flex items-center gap-2 w-fit h-[25px]  sm:h-[28px] justify-center">
                  <div
                    onClick={() => handleShare(data?.data?.projectTitle || '')}
                    className="w-[18px] sm:w-[21px] h-[18px] sm:h-[21px] relative">
                    <PiShareFat
                      color='#FF1645'
                      size={20}
                    />
                  </div>
                  <label className="text-[12px] sm:text-[14.25px] text-nowrap text-[#FF1645] font-medium font-poppins">Share </label>
                </div>
              </PrimaryButton>


              <PrimaryButton
                type="button"
                className="bg-[#FFE7EC] !px-4  !w-full sm:!w-fit border-none text-[#FF1645] font-poppins rounded "

              >
                <div

                  onClick={() => setEnquiryForm({ status: true, id: data?.data?._id || '', count: 1 })}
                  className="flex items-center gap-2 w-fit h-[25px] sm:h-[28px] justify-center">
                  <div className="w-[18px] sm:w-[21px] h-[18px] sm:h-[21px] relative">
                    <PiNotePencil
                      className="w-[25px] h-[22px]"
                      color="#FF1645"
                    />
                  </div>
                  <label className="text-[12px] sm:text-[14.25px] text-nowrap text-[#FF1645] font-medium font-poppins">Enquire Now </label>
                </div>
              </PrimaryButton>

            </div>

          </div>
        </Container>

      </NewModal>



      <NewModal
        onClose={handleLayoutModal}
        isOpen={layoutModal}
        contentClassName="flex rounded-[6px] flex-col bg-white p-0 max-w-[1200px] m-auto w-full h-screen  sm:max-h-fit"

      >


        <div className=" flex flex-col bg-white px-[30px] py-[20px] rounded-[6px] max-w-[1200px] w-full h-screen sm:h-[85vh]">
          <div className=" flex justify-end  items-end" onClick={handleLayoutModal}>
            <Image src={close_icon} alt="save icon" width={12} height={12} />
          </div>




          <div className="  flex h-[48px] py-2 px-1  sm:border-[#DEDEDE] sm:border my-2 sm:my-2 items-center  text-sm gap-[7.5px] rounded-md  ">
            {[{ label: 'Floor Plan & Layouts', value: 'floor-layout', icon: <Image src={floor_plan} alt="floor plan" width={17.25} height={17.25} /> }].map((item) => (
              <button
                key={item.value}
                className={` font-normal gap-[7.5px] font-poppins text-[14px] rounded-md px-4 py-1 h-[40px] flex items-center   justify-center transition-all w-full duration-200 ${layoutSelected === item.value
                  ? 'bg-red-600/10 text-red-600'
                  : 'bg-white text-[#767676] hover:text-red-600 hover:bg-red-100'
                  }`}
                onClick={() => handleLayoutSelect(item.value)}
              >
                {item.icon}

                {/* <Image src={item.icon} alt='menu icon' width={20} /> */}

                <span className="font-poppins font-medium text-[12px]">{item.label}</span>
              </button>
            ))}
          </div>

          {/* {gallerySelected === 'floor-layout' && <ImageContainer
              images={images}
            />} */}
          <ImageContainer
            images={layoutImages}
          />



          <div className="flex mt-[17.25px] gap-[7.5px] items-center sm:justify-end">
            <PrimaryButton
              type="button"
              className="bg-[#FFE7EC] border-none text-[#FF1645] font-poppins rounded "

            >
              <div className="flex items-center w-[60px] h-[35.25px] justify-center gap-2">
                <Image src={save_icon} alt="save icon" width={21.75} height={21.75} />
                <label className="text-[14.25px] text-[#FF1645] font-medium font-poppins">Save</label>
              </div>
            </PrimaryButton>

            <PrimaryButton
              type="button"
              className="bg-[#FFE7EC] border-none text-[#FF1645] font-poppins rounded "

            >
              <div className="flex items-center gap-2 w-[60px] h-[35.25px] justify-center">
                <Image src={share_button_icon} alt="share icon" width={21.75} height={21.75} />
                <label className="text-[14.25px] text-[#FF1645] font-medium font-poppins">Share </label>
              </div>
            </PrimaryButton>


            <PrimaryButton
              type="button"
              className="bg-[#FFE7EC] border-none text-[#FF1645] font-poppins rounded "

            >
              <div className="flex items-center gap-2 w-[147.75px] h-[35.25px] justify-center">
                <Image src={notes_red_edit} alt="share icon" width={21.75} height={21.75} />
                <label className="text-[14.25px] text-[#FF1645] font-medium font-poppins">Enquire Now </label>
              </div>
            </PrimaryButton>

          </div>

        </div>

      </NewModal>



      {data?.data.facilitiesAmenitiesDetails && <Modal
        onClose={handleAmenitiesModal}
        isOpen={amenitiesModal}

      >


        <div className=" flex flex-col bg-white  px-4 py-3 rounded-md max-w-[1200px] m-auto w-full h-screen sm:max-h-[600px]">

          <div className="" onClick={handleAmenitiesModal}>
            <IoCloseOutline className="w-[25px] h-[25px]" color='#333333' />
          </div>




          <div className=" h-full">
            <FacilitiesAndAmenities
              data={data.data.facilitiesAmenitiesDetails}
            />
          </div>


        </div>

      </Modal>}


      {<Modal
        onClose={handleReportProjectModal}
        isOpen={reportProject}

      >


        <form onSubmit={handleSubmitReportedProject} className='border relative sm:w-[436px] rounded-[5px] m-auto bg-white pt-4 pb-3 p-3 flex flex-col gap-1  border-[#DEDEDE]'>


          <p className='text-start pb-2  text-[17.25px] font-poppins font-medium'>Report The Issue</p>

          <SpaceWrapper
            className='pb-1'
          >

            <TextareaField

              name='message'
              value={formDataReportProject.message}
              onChange={handleChangeReportProject}
              placeholder="Message"
            />
          </SpaceWrapper>




          <PrimaryButton
            type="submit"
            disabled={loadingReportProject}
            className="flex w-full h-[36px] items-center gap-2 rounded border-none bg-[#FF1645]"
          >
            <span className="text-[14px] text-white">Submit</span>
          </PrimaryButton>
        </form>
      </Modal>}


      <Footer />



      <Modal
        onClose={handleLoanAmountModal}
        isOpen={loanAmountModal}

      >
        <>
          <div className="relative bg-white w-full h-screen rounded-[5px]">

            <div className=" px-5 flex pt-5 items-center justify-between w-full">
              <ProjectHeader
                title='Mortgage'
              />


              <div className="" onClick={handleLoanAmountModal}>
                <IoCloseOutline className="w-[25px] h-[25px]" color='#333333' />

              </div>


            </div>

            <SectionDivider
              containerClassName="mt-[10.5px] mb-[12px]"
              lineClassName="h-[1px] w-full bg-[#DEDEDE]"
            />

            <SpaceWrapper
              className="px-5"
            >

              <MortgageCalculator
                wrapperContainerClassName="!border-none !p-0"
                data={({ monthlyPayment, loanAmount, interestRate, downPayment, years }) => {
                  setMonthlyPayment((prev) => (prev !== monthlyPayment ? monthlyPayment : prev));
                  setLoanAmount((prev) => (prev !== loanAmount ? loanAmount : prev));
                  setInterestRate((prev) => (prev !== interestRate ? interestRate : prev));
                  setDownPayment((prev) => (prev !== downPayment ? downPayment : prev));
                  setYears((prev) => (prev !== years ? years : prev));
                }}
                defaultTotalPrice={parsePrice(data?.data?.priceInAED ?? 0)}
                defaultDownPayment={downPayment}
                defaultYears={years}
                defaultInterestRate={interestRate}
              />



              <div className="flex h-20 gap-3 shadow-2xs border left-0 px-5  border-[#DEDEDE] rounded-t-2xl  w-full items-center absolute bottom-0">
                <PrimaryButton
                  type="button"
                  onClick={handleReset} // <- add this
                  className="flex border h-12 border-[#DEDEDE] bg-white text-black w-full sm:w-fit items-center gap-2 rounded-[5px]"
                >
                  <span className="text-sm font-poppins">Reset</span>
                </PrimaryButton>


                {/* Enquiry Button */}
                <PrimaryButton
                  onClick={handleLoanAmountModal}
                  type="button"
                  className="flex w-full h-12 items-center gap-2 sm:w-[160px] rounded-[5px] border-none bg-[#FF1645]"
                >
                  <span className="text-sm text-white font-poppins">Apply</span>
                </PrimaryButton>
              </div>

            </SpaceWrapper>

          </div>
        </>
      </Modal>





      <ApplicationSubmittedModal
        open={successIsOpen}
        onClose={() => dispatch(closeSuccessEnquiry())}
        onContinue={() => dispatch(closeSuccessEnquiry())}
      />
      <EnquiryModal
        open={isEnquiryOpen}
        onClose={() => dispatch(closeEnquiry())}
        onSubmit={submitEnquiry}
        reset={submitEnquirySucess}
      />



      <Modal
        isOpen={EnquiryForm.status}
        onClose={() => setEnquiryForm({ status: false, id: '', count: 0 })}
      >
        <Container>
          <div className="relative w-full h-[200px] rounded-[5px]">


            {EnquiryForm.count === 2 && <RegistrationSuccess
              onClose={() => setEnquiryForm({ status: false, id: '', count: 0 })}

            />}

            {EnquiryForm.count === 3 && <AlreadyEnquired
              onClose={() => setEnquiryForm({ status: false, id: '', count: 0 })}

            />}

          </div>
        </Container>
      </Modal>
    </div>
  )
}



