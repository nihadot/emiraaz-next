'use client'

import { useState, use, useEffect } from "react";
import {
  close_icon,
  details_icon,
  enquiry_icon,
  location_icon,
  no_image_placeholder,
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
  const mainImage = images[imagesIndex]?.secure_url || no_image_placeholder;
  const propertyType = data?.data?.propertyTypes?.[0] ?? '';
  const { currency, value } = formatCurrencyParts(data?.data?.priceInAED || 0);
  const { data: projects } = useFetchAllProjectsQuery(
    {
      limit: 6,
      page:1,

    }
  );
  const { data: portraitBannerData } = useFetchAllPortraitBannersQuery({});

  const banners = portraitBannerData?.data || [];

  const shuffledImages = shuffle(banners);


  const options = [
    {
      label: "Images",
      value: "images",
      icon: location_icon
    },
    {
      label: "Map",
      value: "map",
      icon: location_icon

    },
    {
      label: "Video",
      value: "video",
      icon: location_icon

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return (
    <div className=" mx-auto w-full   ">
      <Header />

      <div className="">
        <div className="h-[1px] w-full bg-[#DEDEDE]"></div>
      </div>

      <MobileBreadcrumbNavigation />

      <StickyScrollHeader
        currency={currency}
        value={value}
        title={data?.data?.projectTitle || ''}
      />



      <div className="px-5  lg:px-8 xl:px-24 m-auto max-w-[1440px]">
        <BreadcrumbNavigation
          backToFun={handleBackTo}
        />

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">


            <div className="relative" onClick={() => {
              handleGalleryModal()
              handleGallerySelect('images')
            }}>

              <div className="left-5 absolute z-10 top-5">
                {(data?.data?.handOverQuarter && data?.data?.handOverYear) && <div className="bg-white flex text-[10px] items-center rounded-[2px] py-1  px-2">
                  Handover Date : {data?.data?.handOverQuarter} {data?.data?.handOverYear}
                </div>}

                {(data?.data?.paymentPlan) && <div className="bg-white mt-1  w-fit flex text-[10px] items-center rounded-[2px] py-1  px-2">
                  {data?.data?.paymentPlan === 'onHandover' ? 'On Handover Payment Plan' : data?.data?.paymentPlan === 'postHandover' ? 'Post Handover Payment Plan' : ''  }
                </div>}
              </div>


              <MainImageDisplay
                mainImage={mainImage}
                images={images}
                selectedIndex={imagesIndex}
                onSelectImage={setImageIndex}
              />
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

            <div className="mt-4">

              <ProjectDescription
                descriptionInArabic={data?.data?.descriptionInArabic || ''}
                descriptionInEnglish={'halo how are you'.repeat(700) || data?.data.description || ''}
                descriptionInRussian={data?.data.descriptionInRussian || ''}
                title="Description"
              />
            </div>



            <PropertyDetailsSection
              data={[
                { title: 'Type', content: data?.data?.propertyTypes?.slice(0, 1).map(item => item) },
                { title: 'Furnishing', content: furnishing },
                { title: 'Purpose', content: data?.data.purpose },
                { title: 'Area', content: 'Downtown Dubai' },
                { title: 'Developer', content: 'Emaar' },
                { title: 'Status', content: 'Under Construction' },
              ]}
            />



            <div className="mt-8">
              <PropertyDetailsSection
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


            <div className="mt-8">

              <PropertyDetailsSection
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


            <div className="" onClick={handleLayoutModal}>

              <LayoutInformation
                images={layoutImages}
              />

            </div>


            <div className="mt-8">

              <AreaNearBy
                headerTitle="Areas Nearby"
                sectionId="areas-near-by"
                data={data?.data.nearByAreas || []}
              />
            </div>


            <div className="mt-8">


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


            <div className="mt-8">
              <LoanAmountOptions
                monthlyPayment={monthlyPayment}
                totalPrice={totalPrice}
                downPayment={downPayment}
                years={years}
                handleLoanAmountModal={handleLoanAmountModal}
                interestRate={interestRate}
              />
              <div className="hidden sm:block">
                <MortgageCalculator
                  headerTitle="Mortgage Plan"
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


            {shuffledImages && shuffledImages.length > 0 && <div className="">
              <CustomMobileSlider
                images={shuffledImages}
                containerClassName="max-w-xl mx-auto shadow-lg"
                imageClassName="h-[300px] mt-6 block sm:hidden"
                buttonClassName="hover:bg-white"
              />
            </div>}


            <PropertyDetailsSection
              headerTitle="Payment Plan"
              data={[
                { title: 'Type', content: 'Apartment' },
                { title: 'Bedrooms', content: '3' },
                { title: 'Handover', content: '2026' },
                { title: 'Area', content: 'Downtown Dubai' },
                { title: 'Developer', content: 'Emaar' },
                { title: 'Status', content: 'Under Construction' },
              ]}
            />


            <div className="flex mt-7 justify-between items-center w-full">
              <RegulatoryInformation
                qrCodeUrl={data?.data?.qrCodeImage?.secure_url || no_image_placeholder}
                icon
                reportedProjectHandler={handleReportProjectModal}
                headerTitle="Regulatory Information "
                data={[
                  {
                    label: 'Somethings',
                    value: 'Some Values'
                  },
                  {
                    label: 'Somethings',
                    value: 'Some Values'
                  },

                ]}
              />






            </div>

            <div className="mt-4">

              <RecommendedProjects
                projects={projects?.data || []}
              />
            </div>


            <PrimaryButton
              type="button"
              className="bg-[#FF1645] block sm:hidden h-[47px] w-full border-none text-white font-poppins rounded "
           
            >
               <div className="flex items-center gap-2">
                  <Image src={enquiry_icon} alt="share icon" width={21} />
                  <label className="text-sm font-medium text-white font-poppins">Enquire Now </label>
                </div>
                </PrimaryButton>

          </div>
          <SidePanel
            shuffledImages={shuffledImages}
            handleGalleryModal={handleGallerySelect}
            mainImage={mainImage}
            images={images}
            videoLink={data?.data.youtubeVideoLink || ''}
            selectedIndex={imagesIndex}
            filteredProjectAdsCard={filteredProjectAdsCard ? filteredProjectAdsCard : []}
          />


        </div>



        <NewModal
          onClose={handleGalleryModal}
          isOpen={galleryModal}
          contentClassName="flex rounded-md flex-col bg-white p-0 max-w-[1200px] m-auto w-full h-screen  sm:max-h-fit"

        >


          <div className=" flex flex-col bg-white  p-4 rounded-md max-w-[1200px] w-full h-screen sm:h-[85vh]">

            <div className="pb-2" onClick={handleGalleryModal}>
              <Image src={close_icon} alt="save icon" width={21} height={21} />
            </div>




            <div className="  flex h-12 sm:p-2  sm:border-[#DEDEDE] sm:border my-2 sm:my-2 items-center  text-sm gap-2 rounded-md  ">
              {options.map((item) => (
                <button
                  key={item.value}
                  className={` font-normal gap-2 font-poppins text-[14px] rounded-md px-4 py-1 h-[40px] flex items-center   justify-center transition-all w-full duration-200 ${gallerySelected === item.value
                    ? 'bg-red-600/10 text-red-600'
                    : 'bg-white text-black hover:text-red-600 hover:bg-red-100'
                    }`}
                  onClick={() => handleGallerySelect(item.value)}
                >
                  <Image src={item.icon} alt='menu icon' width={20} />

                  {item.label}
                </button>
              ))}
            </div>

            {gallerySelected === 'images' && <ImageContainer
              images={images}
            />}


            {gallerySelected === 'map' && <MapContainer
              mapUrl={data?.data?.googleMapsUrl || ''}
            />}


            {gallerySelected === 'video' && <VideoContainer

              videoUrl={data?.data?.youtubeVideoLink || ''}
            />}


            <div className="flex h-12 mt-4 w-full items-center sm:justify-end gap-2">
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

        </NewModal>


        {/* for layout model */}
        <NewModal

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