'use client'
import { MdFullscreen } from "react-icons/md";

import { useState, use, useEffect } from "react";
import {
  close_icon,
  details_icon,
  enquiry_icon,
  floor_plan,
  location_icon,
  no_image_placeholder,
  notes_icon,
  notes_red_edit,
  save_icon,
  share_button_icon,
} from "@/app/assets";
import { useFetchAllProjectsQuery, useFetchProjectByIdQuery } from "@/redux/project/projectApi";
import { formatCurrencyParts } from "@/utils/formateAmount";
import ProjectHeader from "./ProjectHeader";
import MainImageDisplay from "./MainImageDisplay";
import SidePanel from "./SidePanel";
import ProjectDescription from "./ProjectDescription";
import ProjectBasicInfo from "./ProjectBasicInfo";
import PropertyDetailsSection from "./PropertyDetailsSection";
import LayoutInformation from "./LayoutInformation";
import AreaNearBy from "./AreaNearBy";
import FeaturesAndAmenities from "./FeaturesAndAmenities";
import RegulatoryInformation from "./RegulatoryInformation";
import RecommendedProjects from "./RecommendedProjects";
import Image from "next/image";
import ImageContainer from "./ImageContainer";
import MapContainer from "./MapContainer";
import VideoContainer from "./VideoContainer";
import Header from "@/components/Header";
import { useViewAllProjectAdsCardsQuery } from "@/redux/projectAdsCard/projectAdsCardApi";
import FacilitiesAndAmenities from "./FacilitiesAndAmenities";
import PrimaryButton from "@/components/Buttons";
import { useFetchAllPortraitBannersQuery } from "@/redux/portraitBannerAd/portraitBannerAdApi";
import { shuffle } from "@/utils/shuffle";
import BreadcrumbNavigation from "./BreadcrumbNavigation";
import StickyScrollHeader from "./StickyScrollHeader";
import { Footer } from "@/components/Footer";
import MobileBreadcrumbNavigation from "./MobileBreadcrumbNavigation";
import ModalViewButtons from "./Mobile/ModalViewButtons";
import LoanAmountOptions from "./Mobile/LoanAmountOptions";
import MortgageCalculator from "./LoanCalculator";
import NewModal from "@/components/NewModal/NewModal";
import CustomMobileSlider from "@/components/CustomSlider/CustomMobileSlider";
import { useRouter } from "next/navigation";
import { FaImage, FaImages, FaLocationArrow, FaMap, FaPlane, FaVideo } from "react-icons/fa";
import { ProjectType } from "@/redux/types";
import { IoLocationOutline } from "react-icons/io5";
import CustomSlider from "@/components/CustomSlider/CustomSlider";
import RecommendedText from "@/components/RecomendedText/RecommendedText";
import Container from "@/components/atom/Container/Container";

const ProjectDetails = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const { id } = use(params);
  const { data } = useFetchProjectByIdQuery({ id });


  const handleBackTo = () => router.back();

  const [galleryModal, setGalleryModal] = useState(false);
  const [layoutModal, setLayoutModal] = useState(false);
  const [amenitiesModal, setAmenitiesModal] = useState(false);
  const [reportProject, setReportProject] = useState(false);

  const [imagesIndex, setImageIndex] = useState(0);
  const images = data?.data?.mainImages ?? [];
  const layoutImages = data?.data?.layoutImages ?? [];
  // console.log(data?.data?.layoutImages, 'data?.data?.layoutImages')
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

  const banners = portraitBannerData?.data || [];

  const shuffledImages = shuffle(banners);


  const options = [
    {
      label: "Images(12)",
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
  const [totalPrice] = useState(1500000); // default
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
        // This ensures TypeScript will warn us if we add a new ProjectType but forget to add a label
        const exhaustiveCheck: never = projectType;
        return exhaustiveCheck;
    }
  };

  return (
    <div className=" mx-auto w-full   ">
      <div className="hidden sm:flex">
      <Header />
      </div>

      <div className="">
        <div className="h-[1px] w-full bg-[#DEDEDE]"></div>
      </div>

      <MobileBreadcrumbNavigation />

     {  data?.data._id && <StickyScrollHeader
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
              {/* 
              <div className="left-5 absolute z-10 top-5">
                {(data?.data?.handOverQuarter && data?.data?.handOverYear) && <div className="bg-white flex text-[10px] items-center rounded-[2px] py-1  px-2">
                  Handover Date : {data?.data?.handOverQuarter} {data?.data?.handOverYear}
                </div>}

                {(data?.data?.paymentPlan) && <div className="bg-white mt-1  w-fit flex text-[10px] items-center rounded-[2px] py-1  px-2">
                  {data?.data?.paymentPlan === 'onHandover' ? 'On Handover Payment Plan' : data?.data?.paymentPlan === 'postHandover' ? 'Post Handover Payment Plan' : ''}
                </div>}
              </div> */}


              <div className="left-[14px] absolute z-20 top-[14px]">

                {(data?.data?.handOverQuarter && data?.data?.handOverQuarter) && <div className="bg-white font-poppins font-medium flex text-[9.5px] items-center rounded-[2px] py-1  px-2">
                  Handover Date : {data?.data.handOverQuarter} {data?.data.handOverYear}
                </div>}

                {(data?.data.projectType) && <div className="bg-white mt-1  w-fit flex font-poppins font-medium text-[9.5px] items-center rounded-[2px] py-1  px-2">
                  {getProjectTypeLabel(data?.data.projectType)}
                </div>}
              </div>


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
                <IoLocationOutline size={17.25} color="white" />
                <span className="text-white font-poppins text-[12px] font-normal">Map</span>
              </div>
            </div>


            <ModalViewButtons />


            <ProjectBasicInfo
              title={data?.data?.projectTitle}
              address={data?.data?.address}
              propertyType={propertyType}
              beds={data?.data?.numberOfBeds || ''}
              baths={data?.data?.numberOfBath || ''}
              currency={currency}
              value={value}
              squareFeet={data?.data?.squareFeet || ''}
            />

            <div className="mt-[24.75px]">

              <ProjectDescription
                descriptionInArabic={data?.data?.descriptionInArabic || ''}
                descriptionInEnglish={data?.data.description || ''}
                descriptionInRussian={data?.data.descriptionInRussian || ''}
                title="Description"
              />
            </div>



            <PropertyDetailsSection
              headerTitle="Property Information"
              data={[
                { title: 'Type', content: data?.data?.propertyTypes?.slice(0, 1).map(item => item) },
                { title: 'Furnishing', content: furnishing },
                { title: 'Purpose', content: data?.data.purpose },
                { title: 'Area', content: 'Downtown Dubai' },
                { title: 'Developer', content: 'Emaar' },
                { title: 'Status', content: 'Under Construction' },
              ]}
            />



            <div className="mt-[32.25px]">
              <PropertyDetailsSection
                headerTitle="Validated Information"
                icon
                data={[
                  { title: 'Type', content: 'Apartment' },
                  { title: 'Bedrooms', content: '3' },
                  { title: 'Handover', content: '2026' },
                  { title: 'Area', content: 'Downtown Dubai' },
                  { title: 'Developer', content: 'Emaar' },
                  { title: 'Status', content: 'Under Construction' },
                ]}
              />
            </div>


            <div className="mt-[32.25px]">

              <PropertyDetailsSection
                headerTitle="Building Information"
                icon
                data={[
                  { title: 'Type', content: 'Apartment' },
                  { title: 'Bedrooms', content: '3' },
                  { title: 'Handover', content: '2026' },
                  { title: 'Area', content: 'Downtown Dubai' },
                  { title: 'Developer', content: 'Emaar' },
                  { title: 'Status', content: 'Under Construction' },
                ]}
              />
            </div>


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
              <LoanAmountOptions
                monthlyPayment={monthlyPayment}
                totalPrice={totalPrice}
                downPayment={downPayment}
                years={years}
                handleLoanAmountModal={handleLoanAmountModal}
                interestRate={interestRate}
              />

              {/* Desktop view */}
              <div className="hidden mt-[24.75px] sm:block">
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
              </div>
            </div>


            {<div className="mt-[18px] flex sm:hidden mt:mt-0">
              <CustomSlider
                                 images={shuffledImages}
                                 containerClassName="h-[80px] "
                             />
            </div>}


            <PropertyDetailsSection
              headerTitle="Payment Plan"
              data={[
                { title: 'Type', content: 'Apartment' },
                { title: 'Bedrooms', content: '3' },
                { title: 'Developer', content: 'Emaar' },
                { title: 'Status', content: 'Under Construction' },
              ]}
            />


            <div className="flex mt-[18px] sm:mt-[25.5px] justify-between items-center w-full">
              <RegulatoryInformation
                qrCodeUrl={data?.data?.qrCodeImage?.secure_url || no_image_placeholder}
                icon
                reportedProjectHandler={handleReportProjectModal}
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
                projects={projects?.data && data?.data._id && projects.data.filter(item => item._id !== data?.data?._id)|| []}
              />
            </div>


<div className="sm:hidden rounded-[5.11px] z-50 px-[16.15px] flex bg-white left-0 fixed bottom-0 w-full justify-center items-center h-[85.2px]">

            <PrimaryButton
              type="button"
              className="bg-[#FF1645]  h-[47px] w-full border-none text-white font-poppins rounded "

            >
              <div className="flex items-center gap-2">
                <Image src={enquiry_icon} alt="share icon" width={21} />
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
            shuffledImages={shuffledImages}
            handleGalleryModal={handleGalleryModal}
            mainImage={mainImage}
            handleGallerySelect={handleGallerySelect}
            images={images}
            videoLink={data?.data.youtubeVideoLink || ''}
            selectedIndex={imagesIndex}
            filteredProjectAdsCard={filteredProjectAdsCard ? filteredProjectAdsCard : []}
          />


        </div>
        </Container>



        <NewModal
          onClose={handleGalleryModal}
          isOpen={galleryModal}
          contentClassName="flex rounded-[6px] flex-col bg-white p-0 max-w-[1200px] m-auto w-full h-screen  sm:max-h-fit"

        >


          <div className=" flex flex-col bg-white px-3  sm:px-[30px] py-[20px] rounded-[6px] max-w-[1200px] w-full h-screen sm:h-[85vh]">
            {/* <div className=" flex justify-end  items-end" onClick={handleGalleryModal}>
              <Image src={close_icon} alt="save icon" width={12} height={12} />
            </div> */}




            <div className="  flex h-[48px] py-2 px-1  sm:border-[#DEDEDE] sm:border my-2 sm:my-2 items-center  text-sm gap-[7.5px] rounded-md  ">
              {options.map((item) => (
                <button
                  key={item.value}
                  className={` font-normal gap-[4px] sm:gap-[7.5px] font-poppins sm:text-[14px] rounded-md px-2 sm:px-4 py-0 sm:py-1 h-[40px] flex items-center   justify-center transition-all w-full duration-200 ${gallerySelected === item.value
                    ? 'bg-red-600/10 text-red-600'
                    : 'bg-white text-[#767676] hover:text-red-600 hover:bg-red-100'
                    }`}
                  onClick={() => handleGallerySelect(item.value)}
                >
                  {item.icon}

                  {/* <Image src={item.icon} alt='menu icon' width={20} /> */}

                  <span className="font-poppins font-medium text-[10px] sm:text-[12px]">{item.label}</span>
                </button>
              ))}
            </div>

            {gallerySelected === 'images' && <ImageContainer
              images={images}
            />}


            {gallerySelected === 'map' && <MapContainer
              mapUrl={data?.data?.googleMapsUrl || ''}
            />}


{gallerySelected === 'layouts' &&    <ImageContainer
              images={layoutImages}
            />}

            {gallerySelected === 'video' && <VideoContainer

              videoUrl={data?.data?.youtubeVideoLink || ''}
            />}


            <div className="flex mt-[17.25px] ms-6 sm:ms-0 gap-[7.5px] items-center justify-center sm:justify-end">
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
                className="bg-[#FFE7EC] me-6 border-none text-[#FF1645] font-poppins rounded "

              >
                <div className="flex items-center gap-2 w-[120.75px] h-[35.25px] justify-center">
                  <Image src={notes_red_edit} alt="share icon" width={21.75} height={21.75} />
                  <label className="text-[14.25px] text-[#FF1645] font-medium font-poppins">Enquire Now </label>
                </div>
              </PrimaryButton>

            </div>

          </div>

        </NewModal>


        {/* for layout model */}
        {/* <NewModal

          onClose={handleLayoutModal}
          isOpen={layoutModal}
          contentClassName="flex rounded-md flex-col bg-white p-5 max-w-[1200px] m-auto w-full h-screen sm:max-h-[700px]"

        >

          <div className="" onClick={handleLayoutModal}>
            <Image src={close_icon} alt="save icon" width={21} height={21} />
          </div>

          <div className="  flex h-12 p-0 border-none sm:border-[#DEDEDE] sm:border my-3 sm:my-2 items-center  text-sm gap-2 rounded-md  ">
            {layoutOption.map((item) => (
              <button
                key={item.value}
                className={` font-normal gap-2 font-poppins text-[14px] rounded-md px-4 py-1 h-[40px] flex items-center   justify-center transition-all w-full duration-200 ${layoutSelected === item.value
                  ? 'bg-red-600/10 text-red-600'
                  : 'bg-white text-black hover:text-red-600 hover:bg-red-100'
                  }`}
                onClick={() => handleLayoutSelect(item.value)}
              >
                <Image src={item.icon} alt='menu icon' width={20} />

                {item.label}
              </button>
            ))}
          </div>

          <div className="flex w-full overflow-y-auto">

            <ImageContainer
              images={layoutImages}
            />

          </div>

          <div className=" ">










            <div className="flex mt-4 w-full items-center sm:justify-end gap-2">
              <PrimaryButton
                type="button"
                className="bg-[#FFE7EC] h-[47px] sm:h-[40px] border-none text-[#FF1645] font-poppins flex-[30%] sm:flex-none rounded "

              >
                <div className="flex items-center gap-2">
                  <Image src={save_icon} alt="save icon" width={21} />
                  <label className="text-sm font-light text-[#FF1645] font-poppins">Save</label>
                </div>
              </PrimaryButton>

              <PrimaryButton
                type="button"
                className="bg-[#FFE7EC]  h-[47px] sm:h-[40px] border-none text-[#FF1645] font-poppins flex-[30%] sm:flex-none rounded "

              >
                <div className="flex items-center gap-2">
                  <Image src={share_button_icon} alt="share icon" width={21} />
                  <label className="text-sm font-light text-[#FF1645] font-poppins">Share </label>
                </div>
              </PrimaryButton>


              <PrimaryButton
                type="button"
                className="bg-[#FFE7EC]  text-nowrap h-[47px] sm:h-[40px] border-none text-[#FF1645] font-poppins flex-[40%] sm:flex-none rounded "

              >
                <div className="flex items-center gap-2">
                  <Image src={share_button_icon} alt="share icon" width={21} />
                  <label className="text-sm font-light text-[#FF1645] font-poppins">Enquire Now </label>
                </div>
              </PrimaryButton>
            </div>

          </div>

        </NewModal> */}

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







        {data?.data.facilitiesAmenitiesDetails && <NewModal
          onClose={handleAmenitiesModal}
          isOpen={amenitiesModal}

        >


          <div className=" flex flex-col bg-white  p-7 rounded-md max-w-[1200px] m-auto w-full h-screen sm:max-h-[600px]">

            <div className="" onClick={handleAmenitiesModal}>
              <Image src={close_icon} alt="save icon" width={21} height={21} />
            </div>




            <div className="mt-4 h-full">
              <FacilitiesAndAmenities
                data={data.data.facilitiesAmenitiesDetails}
              />
            </div>

            {/* <div className="flex mt-4 w-full items-center sm:justify-end gap-2">
              <PrimaryButton
                type="button"
                className="bg-[#FFE7EC] h-[47px] sm:h-[40px] border-none text-[#FF1645] font-poppins flex-[30%] sm:flex-none rounded "

              >
                <div className="flex items-center gap-2">
                  <Image src={save_icon} alt="save icon" width={21} />
                  <label className="text-sm font-light text-[#FF1645] font-poppins">Save</label>
                </div>
              </PrimaryButton>
              <PrimaryButton
                type="button"
                className="bg-[#FFE7EC]  h-[47px] sm:h-[40px] border-none text-[#FF1645] font-poppins flex-[30%] sm:flex-none rounded "

              >
                <div className="flex items-center gap-2">
                  <Image src={share_button_icon} alt="share icon" width={21} />
                  <label className="text-sm font-light text-[#FF1645] font-poppins">Share </label>
                </div>
              </PrimaryButton>

              <PrimaryButton
                type="button"
                className="bg-[#FFE7EC]  text-nowrap h-[47px] sm:h-[40px] border-none text-[#FF1645] font-poppins flex-[40%] sm:flex-none rounded "

              >
                <div className="flex items-center gap-2">
                  <Image src={share_button_icon} alt="share icon" width={21} />
                  <label className="text-sm font-light text-[#FF1645] font-poppins">Enquire Now </label>
                </div>
              </PrimaryButton>
            </div> */}

          </div>

        </NewModal>}






        {<NewModal
          onClose={handleReportProjectModal}
          isOpen={reportProject}
          contentClassName="flex flex-col bg-white p-5  m-auto w-full max-w-[400px] rounded-md"

        >

          <p className="text-[18px] font-medium">Report The Issue</p>

          <textarea placeholder={'Please Enter The Issue'} name="" id="" className=" rounded px-3 py-3  border text-black/60 mt-4 h-[200px]  border-[#DEDEDE] text-sm">

          </textarea>
          <PrimaryButton
            type='submit'
            className='flex mt-2 justify-center bg-[#FF1645] rounded border-none items-center gap-1'

          >

            <div className='justify-center flex items-center gap-2'>
              <Image src={details_icon} alt='menu icon' width={21} />

              <label className='text-white text-sm' htmlFor="">Submit</label>
            </div>
          </PrimaryButton>
          <div className=" ">






          </div>

        </NewModal>}






      </div>
      <Footer />



      <NewModal
        onClose={handleLoanAmountModal}
        isOpen={loanAmountModal}
        contentClassName="flex flex-col bg-white p-5 h-screen  m-auto w-full  rounded-md"

      >

        <div className=" flex items-center justify-between w-full">
          <ProjectHeader
            title='Mortgage'
          />


          <div className="py-8" onClick={handleLoanAmountModal}>
            <Image src={close_icon} alt="save icon" width={21} height={21} />
          </div>


        </div>

        <MortgageCalculator
          wrapperContainerClassName="!border-none !p-0"
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


      </NewModal>


      
    </div>
  );
};

export default ProjectDetails;