'use client'
import React, { useCallback, useState } from 'react'
import { ReactNode } from "react";
import Link from 'next/link';
// import Header from '../Header';
import Image from 'next/image';
import { ps_logo } from '@/app/assets';
import BottomBanner from '@/app/home/BottomBannerasas';
import { Footer } from '../Footer';
import Header from './Header';
import StaticImage from "../../app/assets/ads-landing-page.webp"
import Container from '../atom/Container/Container';
import EnquiryFormSection from './EnquiryFormSection';
import RegistrationSuccess from '../EnquiryForm/RegistrationSuccess';
import { CircleX, X } from 'lucide-react';
import AlreadyEnquired from '../EnquiryForm/AlreadyEnquired';
import NoDataFound from '../Empty/NoDataFound';
import ProjectCard from '../ProjectCard/ProjectCard';
import { AllProjectsItems } from '@/redux/project/types';
import { useRouter, useSearchParams } from 'next/navigation';
import EnquiryFormModal from '../EnquiryFormModal/EnquiryFormModal';
type Props = {
    data: any[]
}

function LayoutForAdsLandingPage({ data }: Props) {

    const searchParams = useSearchParams();
    const [EnquiryForm, setEnquiryForm] = useState({ status: false, id: '', count: 0 });
//   const router = useRouter();


    const item = data?.[0]

    const [isActiveNumber, setIsActiveNumber] = useState(0);
    const [isActiveBottomNumber, setIsActiveBottomNumber] = useState(1);

    console.log(isActiveBottomNumber,'isActiveBottomNumber')

    const quickEnquiryFunction = () => {
        setIsActiveNumber(1)
    }

    const goBackToMain = () => {
        setIsActiveNumber(0)
    }

    const router = useRouter();

    // console.log(item,'Data')

    const enquiryConflit = () => {
        setIsActiveNumber(3)
    }

        const enquiryConflitBottom = () => {
        setIsActiveBottomNumber(3)
    }

    const enquirySuccess = () => {
        setIsActiveNumber(2)
    }
       const enquirySuccessBottom = () => {
        setIsActiveBottomNumber(2)
    }

    const onClose = () => {
        setIsActiveNumber(0)
    }

       const onCloseBottom = () => {
        setIsActiveBottomNumber(1)
    }

    const handleClick = (i: any) => {

        const currency = searchParams.get('currency');

        const slug = i.slug;
        const queryString = currency ? `?currency=${currency}` : '';

        sessionStorage.setItem('scroll-position', window.scrollY.toString());
        router.push(`/projects/${slug}${queryString}?lead=promotion&id=${item._id}`);
    };

    const projects: any[] = item?.products;

    const handleEnquiryFormClick = useCallback((item: any) => {
        setEnquiryForm({
            status: true,
            id: item._id,
            count: 1,
        });
        
    }, []);


    return (
        <div >

            <div className="relative w-full min-h-screen overflow-hidden">
                <div className="absolute z-10 w-full h-full bg-black/80"></div>

                <Container className="z-10 relative">
                    <div className="pt-4 pb-0">

                        <Header />
                    </div>
                    <div className=" w-full mb-10 md:mb-0 justify-center items-center flex flex-col min-h-[80vh] md:min-h-[600px] mt-6 px-3">
                        <p className='max-w-[790px]  font-poppins text-center font-medium text-[30px] md:text-[49px] leading-[36px] md:leading-[60px] text-white'>{item?.title ? item?.title : 'Offplan projects by Object 1 in Jumeirah village Circle'}</p>
                        <p
                            className='font-poppins  max-w-[700px] text-white text-center font-normal mt-3 mb-2 leading-4 text-base md:text-[17px]'
                        >{item?.subTitle ? item?.subTitle : 'Discover contemporary residences crafted for modern living — premium design, prime JVC location, and flexible payment plans by Object 1.'}</p>

                        {/* {JSON.stringify(isActiveNumber)} */}
                        {isActiveNumber === 1 && <div className='w-full gap-4 flex items-center relative justify-center'>

                            <div className="cursor-pointer hidden sm:block"
                                onClick={goBackToMain}
                            >
                                <CircleX
                                    size={32}
                                    color='white'
                                />
                            </div>

                             <div className="cursor-pointer absolute z-20 top-10 right-5 block sm:hidden"
                                onClick={goBackToMain}
                            >
                                <X
                                    size={20}
                                    color='black'
                                />
                            </div>
                            <EnquiryFormSection
                                activeIndex={isActiveNumber}
                                itemId={item?._id}
                                onSubmitConflit={enquiryConflit}
                                 onSubmitSuccess={()=>{
                                    router.push('/thank-you/property-enquiry')
                                }}

                            />
                        </div>}
                        {isActiveNumber === 0 && <ActionButtons
                            handleClick={quickEnquiryFunction}
                        />}
                     


                        {isActiveNumber === 3 &&
                            <div
                                className='mt-3'
                            >

                                <AlreadyEnquired
                                content='Seems like this number is always used. Try with different number.'
                                    containerClassName='!m-0'
                                    onClose={onClose}
                                    
                                /></div>
                        }


                        <Indicator
                            activeIndex={
                                isActiveNumber === 3 ? 2 : isActiveNumber
                            }
                        />
                    </div>


                </Container>

                <Image
                    src={item?.promoBanner?.webp?.url || StaticImage}
                    alt="banner"
                    fill
                    priority
                    className="absolute z-0 inset-0 w-full h-full object-cover"
                />


            </div>





            <Container>
                {
                    projects?.length === 0 ? <NoDataFound /> : (
                        <div
                            className='py-4 flex flex-col gap-2.5'
                            id='explore'
                        >
                            {projects?.length && (
                                projects?.map((item, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <ProjectCard
                                                navigateDetailsButton={true}
                                                item={item}
                                                handleClick={handleClick}
                                                handleEnquiryFormClick={handleEnquiryFormClick}
                                            />


                                        </React.Fragment>
                                    )
                                }
                                )
                            )}
                        </div>
                    )
                }
            </Container>

            <Container>
                <div className="w-full mb-10 relative h-[740px] md:h-[600px] overflow-hidden  rounded-[18px]">
                    <div className="absolute z-10 w-full h-full bg-black/60"></div>
                    <Container
                        className='z-20 relative flex w-full h-full'

                    >

                        <div className="flex flex-col  flex-1 justify-center items-center">


                            <p className=' pb-3 font-poppins text-center font-medium text-[30px] md:text-[39px] leading-[36px] md:leading-[40px] text-white'>{'Get detailed info from our portfolio advisors'}</p>
                            <p
                                className='font-poppins  max-w-[700px] text-white text-center font-normal mt-2 leading-4 text-base md:text-[17px]'
                            >{'Fill in your details and our portfolio team will reach out with pricing, availability and tailored recommendations.'}</p>


                               <div className='w-full gap-4 flex items-center justify-center'>

                           
                          {  isActiveBottomNumber === 1 &&  <EnquiryFormSection
                                activeIndex={isActiveBottomNumber}
                                itemId={item?._id}
                                onSubmitConflit={enquiryConflitBottom}
                                onSubmitSuccess={()=>{
                                    router.push('/thank-you/property-enquiry')
                                }}

                            />}

                      

                        {isActiveBottomNumber === 3 &&
                            <div
                                className='mt-3'
                            >

                                <AlreadyEnquired
                                    containerClassName='!m-0'
                                    onClose={onCloseBottom}
                                /></div>
                        }


                        </div>

                        </div>
                    </Container>
                    <Image
                        src={StaticImage}
                        alt="enquiry banner"
                        fill
                        priority
                        className="absolute z-0 inset-0 w-full h-full object-cover"
                    />


                </div>
            </Container>




            <Footer />


            <EnquiryFormModal
            
                promotion
                promotionId={item?._id}
                EnquiryForm={EnquiryForm}
                setEnquiryForm={setEnquiryForm}
            />

        </div>
    )
}

export default LayoutForAdsLandingPage


function ActionButtons({
    handleClick
}: {
    handleClick: () => void
}) {
    return (
        <div
            className='flex justify-center gap-3  mt-3'
        >
            <Link
                href={'#explore'}
                className='border px-3.5 py-2.5 flex text-white border-[#FFFFFF] rounded-[9px] font-poppins font-medium text-[14px]'
            >Explore Projects</Link>


            <button
                onClick={handleClick}
                className='text-white cursor-pointer bg-[#FF1645] py-2.5 px-[14px]  rounded-[9px] font-poppins font-medium text-[14px]'
            >Quick Enquiry</button>



        </div>
    )
}


function Indicator({ activeIndex = 0 }: { activeIndex: number }) {
    return (
        <div className="flex  justify-center items-end mt-5">
            <div className="flex gap-1 items-center">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div
                        key={i}
                        className={`w-[7px] h-[7px] cursor-pointer rounded-full transition-all duration-300 ${(activeIndex === i || activeIndex === i) ? "w-[10px] h-[10px] bg-white" : "scale-100 bg-gray-400"
                            }`}
                    ></div>
                ))}
            </div>
        </div>
    );
}
