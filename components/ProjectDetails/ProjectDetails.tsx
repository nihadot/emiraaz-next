'use client'
import { close_icon, enquiry_icon, floor_plan, location_icon, notes_red_edit, save_icon, share_button_icon } from '@/app/assets';
import { useFetchAllPortraitBannersQuery } from '@/redux/portraitBannerAd/portraitBannerAdApi';
import { useFetchAllProjectsQuery, useFetchProjectByIdQuery } from '@/redux/project/projectApi';
import { useViewAllProjectAdsCardsQuery } from '@/redux/projectAdsCard/projectAdsCardApi';
import { ProjectType } from '@/redux/types';
import { formatCurrencyParts } from '@/utils/formateAmount';
import { shuffle } from '@/utils/shuffle';
import { useRouter } from 'next/navigation';
import React, { use, useEffect, useMemo, useState } from 'react'
import { FaImage, FaMap, FaVideo } from 'react-icons/fa';
import { MdFullscreen } from 'react-icons/md';
import { errorToast, successToast } from '../Toast';
import { LOCAL_STORAGE_KEYS } from '@/api/storage';
import { baseUrl } from '@/api';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useToggleWishlistItemMutation, useViewAllWishlistsQuery } from '@/redux/wishlist/wishlistApi';
import { setWishlist } from '@/redux/wishlistSlice/wishlistSlice';
import { extractNumber } from '@/utils/extractAmount';
import Container from '../atom/Container/Container';
import Modal from '../Modal/Modal';
import PrimaryButton from '../Buttons';
import MortgageCalculator from './LoanCalculator';
import SpaceWrapper from '../atom/SpaceWrapper/SpaceWrapper';
import SectionDivider from '../atom/SectionDivider/SectionDivider';
import { IoCloseOutline, IoLocationOutline } from 'react-icons/io5';
import ProjectHeader from './ProjectHeader';
import { Footer } from '../Footer';
import TextareaField from '../TextareaField/TextareaField';
import FacilitiesAndAmenities from './FacilitiesAndAmenities';
import Image from 'next/image';
import ImageContainer from './ImageContainer';
import NewModal from "../NewModal/NewModal";
import BreadcrumbNavigation from './BreadcrumbNavigation';
import MainImageDisplay from './MainImageDisplay';
import ModalViewButtons from '@/components/ProjectDetails/Mobile/ModalViewButtons';
import ProjectBasicInfo from './ProjectBasicInfo';
import ProjectDescription from './ProjectDescription';
import PropertyDetailsSection from './PropertyDetailsSection';
import { formatCustomDate } from '@/utils/formateCustomDate';
import AreaNearBy from './AreaNearBy';
import LayoutInformation from './LayoutInformation';
import FeaturesAndAmenities from './FeaturesAndAmenities';
import LoanAmountOptions from '@/components/ProjectDetails/Mobile/LoanAmountOptions';
import RegulatoryInformation from './RegulatoryInformation';
import CustomSlider from '../CustomSlider/CustomSlider';
import PropertyDetailsSectionStringArray from './PropertyDetailsSectionStringArray';
import RecommendedProjects from './RecommendedProjects';
import RecommendedText from '../RecomendedText/RecommendedText';
import SidePanel from './SidePanel';
import { IoMdClose } from 'react-icons/io';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { handleShare } from '@/utils/shareOption';
import { PiNotePencil, PiNotePencilLight, PiShareFat } from 'react-icons/pi';
import { parsePrice } from '@/utils/parsePrice';
import ModalForm from '../EnquiryForm/ModalForm';
import RegistrationSuccess from '../EnquiryForm/RegistrationSuccess';
import AlreadyEnquired from '../EnquiryForm/AlreadyEnquired';
import VideoContainer from './VideoContainer';
import MapContainer from './MapContainer';
import MobileBreadcrumbNavigation from './MobileBreadcrumbNavigation';
import StickyScrollHeader from './StickyScrollHeader';
import Header from '../Header';
import { TfiLocationPin } from 'react-icons/tfi';


interface UserData {
  _id: string;
  // Add more fields if needed
}

function ProjectDetails({ id }: { id: string }) {


  const router = useRouter();
  //   const { id } = use(params);
  const { data } = useFetchProjectByIdQuery({ id });


  const handleBackTo = () => router.back();

  const [galleryModal, setGalleryModal] = useState(false);
  const [layoutModal, setLayoutModal] = useState(false);
  const [amenitiesModal, setAmenitiesModal] = useState(false);
  const [reportProject, setReportProject] = useState(false);

  const [imagesIndex, setImageIndex] = useState(0);
  const images = data?.data?.mainImages ?? [];
  const layoutImages = data?.data?.layoutImages ?? [];
  const mainImage = images[imagesIndex]?.secure_url;
  const propertyType = data?.data?.propertyTypes?.[0] ?? '';
  const { currency, value } = formatCurrencyParts(data?.data?.priceInAED || 0);
  const { data: projects } = useFetchAllProjectsQuery(
    {
      limit: 6,
      page: 1,

    }
  );
  const { data: portraitBannerData } = useFetchAllPortraitBannersQuery({});

  const banners = (portraitBannerData?.data && portraitBannerData?.data?.filter(item => item.projectDetails.slug !== data?.data?.slug) || []);

  // console.log(portraitBannerData,'portraitBannerData')
  // console.log(banners,'banners')
  const shuffledImages = useMemo(() => shuffle(banners), [router]);


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

  const layoutOption = [
    {
      label: 'Floor Plans & Layouts',
      value: 'floor-plans-layouts',
      icon: location_icon

    }
  ]

  const [EnquiryForm, setEnquiryForm] = useState({ status: false, id: '', count: 0 });

  const handleLayoutModal = () => setLayoutModal(prev => !prev);
  const handleGalleryModal = () => setGalleryModal(prev => !prev);
  const handleAmenitiesModal = () => setAmenitiesModal(prev => !prev);
  const handleReportProjectModal = () => setReportProject(prev => !prev);
  const handleLoanAmountModal = () => setLoanAmountModal(prev => !prev);
  const [gallerySelected, setGallerySelected] = useState<string>(options[0]?.value);
  const [layoutSelected, setLayoutSelected] = useState<string>(layoutOption[0]?.value);
  const [loanAmountModal, setLoanAmountModal] = useState<boolean>(false);

  const handleGallerySelect = (value: string) => {
    setGallerySelected(value);
    // onSelect(value);
  };

  // const handleGalleryModal = (value: any) => {
  //   setSelected(value)
  //   setGalleryModal(prev => !prev);
  // }

  const initialValues = {
    loanAmount: 0,
    interestRate: 3.5,
    downPayment: 100000,
    years: 15,
    monthlyPayment: 0
  };


  const handleLayoutSelect = (item: any) => setLayoutSelected(item)
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [loanAmount, setLoanAmount] = useState(0);
  const [totalPrice, setTotalPrice] = useState<number>(); // default
  const [downPayment, setDownPayment] = useState(100000); // default
  const [years, setYears] = useState(15); // default
  const [interestRate, setInterestRate] = useState(3.5); // default

  const furnishing =
    data?.data.furnishing === 'fully-furnished'
      ? 'Fully Furnish'
      : data?.data.furnishing === 'semi-furnished'
        ? 'Semi Furnish'
        : data?.data.furnishing === 'un-furnishing'
          ? 'Under Furnish'
          : data?.data.furnishing;


  const { data: projectAdsCard } = useViewAllProjectAdsCardsQuery({});

  const [filteredProjectAdsCard, setFilteredProjectAdsCard] = useState<any[]>()

  useEffect(() => {
    if (projectAdsCard && projectAdsCard?.data.length > 0 && data && data.data) {
      const filteredProjectAdsCard = projectAdsCard.data.filter(item => data.data?._id.toString() !== item?.projectDetails?._id);
      setFilteredProjectAdsCard(filteredProjectAdsCard);
    }

  }, [projectAdsCard]);




  const handleReset = () => {
    setLoanAmount(initialValues.loanAmount);
    setInterestRate(initialValues.interestRate);
    setDownPayment(initialValues.downPayment);
    setYears(initialValues.years);
    setMonthlyPayment(initialValues.monthlyPayment);
  };


  const getProjectTypeLabel = (projectType: ProjectType): string => {
    switch (projectType) {
      case 'commercial-residential':
        return 'Commercial & Residential';
      case 'project-commercial':
        return 'Commercial Project';
      case 'project-residential':
        return 'Residential Project';
      case 'resale-commercial':
        return 'Commercial Resale';
      case 'resale-residential':
        return 'Residential Resale';
      case 'secondary-residential':
        return 'Secondary Residential';
      case 'land-commercial':
        return 'Commercial Land';
      case 'land-residential':
        return 'Residential Land';
      case 'secondary-commercial':
        return 'Secondary Commercial';
      default:
        const exhaustiveCheck: never = projectType;
        return exhaustiveCheck;
    }
  };




  const [formDataReportProject, setFormDataReportProject] = useState<{
    message: string;
    userId: string;
    projectId: string;
  }>({
    message: '',
    userId: "",
    projectId: ""
  });

  const handleChangeReportProject = (e: any) => {
    setFormDataReportProject({ ...formDataReportProject, [e.target.name]: e.target.value })
  }

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

  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);


  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    const userDataString = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_DATA);
    if (userDataString) {
      const userData: UserData = JSON.parse(userDataString);
      setUserId(userData._id);
    }
  }, []);
  const [toggleWishlist] = useToggleWishlistItemMutation();

  const { data: wishlistDataItem } = useViewAllWishlistsQuery(
    { userId: userId! }, // assert it's non-null
    { skip: !userId }     // make sure it's skipped if null
  );
  const isWishlist = wishlistItems?.find(item => item?.propertyDetails?._id === data?.data._id);
  const dispatch = useDispatch();


  useEffect(() => {
    if (wishlistDataItem?.data) {
      dispatch(setWishlist(wishlistDataItem?.data))
      // setWishlistData(wishlistDataItem?.data)
    }


  }, [wishlistDataItem]);


  const toggleWishlistItem = async () => {

    if (!userId) {
      errorToast("Please login to favorite this project");
      return;
    };



    if (!data?.data._id) {
      return errorToast('project not found');
    }


    const payload = {
      projectId: data?.data._id,
      userId: userId
    };

    try {
      await toggleWishlist(payload).unwrap();
    } catch (error: any) {
      console.error("Failed to toggle wishlist item:", error);
      errorToast(error?.response?.data?.message || error?.data?.message || error?.response?.message || error?.message || 'Error occurred, please try again later');

    }
  };


  useEffect(() => {
    if (data && data?.data?.priceInAED) {
      setTotalPrice(extractNumber(data.data.priceInAED))
    }
  }, [data]);


  return (
    <div className=" mx-auto w-full   ">
      <div className="hidden sm:block">
        <Header />
      </div>

      <div className="">
        <div className="h-[1px] w-full bg-[#DEDEDE]"></div>
      </div>

      <MobileBreadcrumbNavigation
        projectTitle={data?.data?.projectTitle || ''}
      />

      {data?.data._id && <StickyScrollHeader
        projectType={data.data.projectType}
        projectId={data?.data._id}
        currency={currency}
        value={value}
        title={data?.data?.projectTitle || ''}
      />}



      <div className="">
        <Container>

          <BreadcrumbNavigation
            backToFun={handleBackTo}
          />

          <div className="flex flex-col mb-14 md:flex-row gap-[6px]">
            <div className="flex-1">


              <div className="relative" onClick={() => {
                handleGalleryModal()
                handleGallerySelect('images')
              }}>

                <div className="left-[14px] absolute z-20 top-[14px]">

                  {(data?.data?.handOverQuarter && data?.data?.handOverQuarter) && <div className="bg-white font-poppins font-medium flex text-[9.5px] items-center rounded-[2px] py-1  px-2">
                    Handover Date : {data?.data.handOverQuarter} {data?.data.handOverYear}
                  </div>}

                  {(data?.data.projectType) && <div className="bg-white mt-1  w-fit flex font-poppins font-medium text-[9.5px] items-center rounded-[2px] py-1  px-2">
                    {getProjectTypeLabel(data?.data.projectType)}
                  </div>}
                </div>

                {data?.data?.discount && (
                  <span className="bg-[#44B842] ms-3 absolute right-[14px] z-20 top-[14px] rounded-[2px] text-white text-[10px] font-normal font-poppins px-2 py-0.5 capitalize w-fit flex sm:hidden">
                    {data?.data?.discount} Discount
                  </span>
                )}




                <MainImageDisplay
                  mainImage={mainImage}
                  images={images}
                  selectedIndex={imagesIndex}
                  onSelectImage={setImageIndex}
                />


                <div onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleGalleryModal()
                  handleGallerySelect('map')
                }} className="absolute hidden sm:flex bottom-[24.75px] left-[24.75px] items-center gap-2 p-2 rounded-[3.75px] z-40 bg-black/[77%]">
                     <TfiLocationPin size={20} color='#333333' />
                  <span className="text-white font-poppins text-[12px] font-normal">Map</span>
                </div>
              </div>


              <ModalViewButtons

                handleGalleryModal={handleGalleryModal}
                handleGallerySelect={handleGallerySelect}
              />
              {/* handleGalleryModal()
              handleGallerySelect('images') */}


              <ProjectBasicInfo
                type={data?.data?.type || ''}
                discount={data?.data?.discount || ''}
                projectId={data?.data._id || ''}
                projectType={data?.data?.projectType}
                title={data?.data?.projectTitle}
                address={data?.data?.address}
                propertyType={propertyType}
                beds={data?.data?.numberOfBeds || ''}
                baths={data?.data?.numberOfBath || ''}
                currency={currency}
                value={value}
                totalFloors={data?.data?.totalFloors || ''}
                squareFeet={data?.data?.squareFeet || ''}
              />

              <div className="mt-[24.75px]">

                <ProjectDescription
                  userId={userId || ''}
                  setEnquiryForm={setEnquiryForm}
                  projectId={data?.data?._id || ''}
                  projectTitle={data?.data?.projectTitle || ''}
                  descriptionInArabic={data?.data?.descriptionInArabic || ''}
                  descriptionInEnglish={data?.data.description || ''}
                  // descriptionInRussian={data?.data.descriptionInRussian || ''}
                  title="Description"
                />
              </div>



              <PropertyDetailsSection
                headerTitle="Project Information"
                icon
                data={[
                  { title: 'Type', content: data?.data?.propertyTypes?.slice(0, 1).map(item => item) },
                  { title: 'Furnishing', content: furnishing },
                  // { title: 'Purpose', content: data?.data.purpose },
                  { title: 'Added on', content: formatCustomDate(data?.data?.createdAt || '') },
                  // { title: 'Reference no', content: 'Bayut - NANCY102368-Um..' },
                  { title: 'Handover Date', content: `${data?.data?.handOverQuarter} ${data?.data?.handOverYear}` },
                  { title: 'Completion', content: data?.data?.completionType === 'all' ? 'All' : data?.data?.completionType === 'just-launched' ? 'Just Launched' : data?.data?.completionType === 'under-construction' ? 'Under Construction' : 'Ready' },
                  { title: 'Developer', content: data?.data?.developerDetails?.name },
                  // { title: 'Usage', content: data?.data?.usage },
                  { title: 'Ownership', content: data?.data?.ownerShip },
                  // { title: 'Parking Availability', content: data?.data?.parkingAvailability },
                  { title: 'Built-up Area', content: data?.data?.buildUpArea },
                  { title: 'Total Parking Spaces', content: data?.data?.totalParkingSpaces },
                  { title: 'Total Floors', content: data?.data?.totalFloors },
                  { title: 'Total Building Area', content: data?.data?.totalBuildingArea },
                  { title: 'Retail Centres', content: data?.data?.retailCenters },
                  { title: 'Elevators', content: data?.data?.elevators },
                  { title: 'Swimming Pools', content: data?.data?.swimmingPool },
                  { title: 'Unique ID', content: data?.data?.uniqueId },
                  { title: 'Project No', content: data?.data?.projectNumber },
                ]}
              />


              {/* 
              <div className="mt-[32.25px]">
                <PropertyDetailsSection
                  headerTitle="Validated Information"
                  icon
                  data={[
                    { title: 'Type', content: data?.data.propertyTypes?.slice(0, 1).map(item => item) || 'Apartment' },
                    { title: 'Bedrooms', content: data?.data.numberOfBeds || '3' },
                    { title: 'Handover', content: data?.data.handOverQuarter || '2026' },
                    { title: 'Area', content: data?.data.citiesDetails?.[0]?.name || 'Downtown Dubai' },

                  ]}
                />
              </div> */}


              {/* <div className="mt-[32.25px]">

                <PropertyDetailsSection
                  headerTitle="Building Information"
                  icon
                  data={[
                    { title: 'Type', content: data?.data?.propertyTypes?.slice(0, 1).map(item => item) },
                    { title: 'Furnishing', content: furnishing },
                    { title: 'Purpose', content: data?.data.purpose },
                    { title: 'Area', content: data?.data.citiesDetails?.[0]?.name || 'Downtown Dubai' },
                    { title: 'Developer', content: data?.data?.developerDetails?.name || 'Emaar' },
                    { title: 'Status', content: data?.data.projectStatus },
                  ]}
                />
              </div> */}


              <div className="mt-[24.75px]">

                <LayoutInformation
                  images={layoutImages}
                  handleGallerySelect={handleGallerySelect}
                  handleGalleryModal={handleGalleryModal}
                />

              </div>


              <div className="mt-[24.75px]">

                <AreaNearBy
                  headerTitle="Areas Nearby"
                  sectionId="areas-near-by"
                  data={data?.data.nearByAreas || []}
                />
              </div>


              {/* Features and Amenities */}
              <div className="mt-[24.75px]">


                <FeaturesAndAmenities
                  handleModal={handleAmenitiesModal}
                  headerTitle="Features / Amenities"
                  data={data?.data.facilitiesAmenitiesDetails.map((item) => {
                    return {
                      name: item.name,
                      icon: item.image?.secure_url
                    }
                  }) || []}
                />


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

                {/* Desktop view */}
                {totalPrice ? <div className="hidden mt-[24.75px] sm:block">
                  <MortgageCalculator
                    headerTitle="Mortgage"
                    data={({ monthlyPayment, loanAmount, interestRate, downPayment, years }) => {
                      setMonthlyPayment(monthlyPayment);
                      setLoanAmount(loanAmount);
                      setInterestRate(interestRate);
                      setDownPayment(downPayment);
                      setYears(years);
                    }}
                    defaultTotalPrice={totalPrice}
                    defaultDownPayment={downPayment}
                    defaultYears={years}
                    defaultInterestRate={interestRate}
                  />
                </div> :
                  <div className="w-full h-[468px] bg-slate-50 rounded-[5px]"></div>
                }
              </div>


              {<div className="mt-[18px] flex sm:hidden mt:mt-0">
                <CustomSlider
                  images={shuffledImages}
                  containerClassName="h-[95px] border border-[#DEDEDE] "
                />
              </div>}

              {/* {console.log(data?.data.paymentOptions,'data?.data.paymentPlan')} */}
              {data?.data?.paymentOptions ? <PropertyDetailsSectionStringArray
                headerTitle="Payment Plan"
                data={data?.data?.paymentOptions}
              /> : 'Payment Plan not available'}


              <div className="flex mt-[18px] sm:mt-[25.5px] justify-between items-center w-full">
                <RegulatoryInformation
                  qrCodeUrl={data?.data?.qrCodeImage?.secure_url}
                  icon
                  reportedProjectHandler={() => {
                    const userDataString = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_DATA);

                    if (!userDataString) {
                      return errorToast('Please login to report this project');
                    }

                    handleReportProjectModal();
                  }}
                  // reportedProjectHandler={handleReportProjectModal}
                  headerTitle="Regulatory Information "
                  data={[
                    {
                      label: 'Permit Number',
                      value: '889359955004'
                    },
                    {
                      label: 'DED',
                      value: '1058671'
                    },
                    {
                      label: 'ORN',
                      value: '44709'
                    },
                    {
                      label: 'BRN',
                      value: '74446'
                    }

                  ]}
                />






              </div>

              <div className="sm:mt-4">

                <RecommendedProjects
                  projects={projects?.data && data?.data._id && projects.data.filter(item => item._id !== data?.data?._id) || []}
                />
              </div>


              <div className="sm:hidden rounded-[5.11px] z-50 px-[16.15px] flex bg-white left-0 fixed bottom-0 w-full justify-center items-center h-[85.2px]">

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
                  items={[
                    'Studio Properties For Sale in Dubai',
                    '1 BHK Flats in Downtown',
                    'Luxury Villas in Palm Jumeirah',
                    'Affordable Apartments in JVC',
                    'Beachfront Homes in Dubai Marina',
                  ]}
                />
              </div>

            </div>
            <SidePanel
              projectId={data?.data?._id || ''}
              shuffledImages={shuffledImages}
              handleGalleryModal={handleGalleryModal}
              mainImage={mainImage}
              handleGallerySelect={handleGallerySelect}
              images={images}
              videoLink={data?.data.youtubeVideoLink}
              selectedIndex={imagesIndex}
              filteredProjectAdsCard={filteredProjectAdsCard ? filteredProjectAdsCard : []}
            />


          </div>
        </Container>



      <NewModal
          onClose={handleGalleryModal}
          isOpen={galleryModal}
          contentClassName="flex  rounded-[6px] max-w-[1200px]  flex-col bg-white p-0 w-full h-screen  sm:max-h-fit"

        >




          <Container>

            <div className="w-full sm:px-5 flex flex-col bg-white pb-4 pt-3 sm:py-[20px] rounded-[6px] h-screen sm:h-[80vh]">

              <div className=" justify-end  sm:flex hidden items-end" onClick={handleGalleryModal}>
                <IoMdClose
                  className="w-[20px] h-[20px]"
                  color="#333333"
                />
              </div>



              <div className=" w-full flex h-[48px] sm:py-2 px-1  sm:border-[#DEDEDE] sm:border mb-2 sm:my-2 items-center  text-sm gap-[4px] sm:gap-[7.5px] rounded-md  ">
                {options.map((item) => (
                  <button
                    key={item.value}
                    className={` font-normal gap-[4px] sm:gap-[7.5px] font-poppins sm:text-[14px] rounded-[3px] sm:rounded-[5px] px-2 sm:px-4 py-0 sm:py-1 h-[34px] sm:h-[40px] flex items-center   justify-center transition-all w-full duration-200 ${gallerySelected === item.value
                      ? 'bg-red-600/10 text-red-600'
                      : 'bg-white text-[#767676] hover:text-red-600 hover:bg-red-100'
                      }`}
                    onClick={() => handleGallerySelect(item.value)}
                  >
                    {item.icon}
                    <span className="font-poppins font-medium text-[10px] sm:text-[12px] text-nowrap">{item.label}  {item.value === 'images' && `(${images.length})`} {item.value === 'layouts' && `${layoutImages.length}`} </span>
                  </button>
                ))}
              </div>

              {gallerySelected === 'images' && <ImageContainer
                images={images}
                close={handleGalleryModal}
              />}


              {gallerySelected === 'map' && <MapContainer
                mapUrl={data?.data?.googleMapsUrl || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462563.0326686135!2d54.89783448251017!3d25.075658408264278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1747292411381!5m2!1sen!2sin'}
                close={handleGalleryModal}
              />}


              {gallerySelected === 'layouts' && <ImageContainer
                images={layoutImages}
                close={handleGalleryModal}
              />}

              {gallerySelected === 'video' && <VideoContainer
                close={handleGalleryModal}

                videoUrl={data?.data?.youtubeVideoLink || ''}
              />}


              <div className="flex mt-[15px] gap-1 sm:gap-[7.5px] items-center sm:justify-end">
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
                      {/* <Image src={share_button_icon} alt="share icon" fill /> */}
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
                      {/* <Image src={notes_red_edit} alt="share icon" fill /> */}
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






      </div>
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









      <Modal
        isOpen={EnquiryForm.status}
        onClose={() => setEnquiryForm({ status: false, id: '', count: 0 })}
      >
        <Container>
          <div className="relative w-full h-[200px] rounded-[5px]">


            {EnquiryForm.count === 1 && <ModalForm
              onClose={() => setEnquiryForm({ status: false, id: '', count: 0 })}
              item={EnquiryForm}
              setEnquiry={setEnquiryForm}
            />}

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

export default ProjectDetails