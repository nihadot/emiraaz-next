import React from 'react'
import Container from '../atom/Container/Container'
import { why_dubai_icon, } from '@/app/assets'
import HeaderSecondary from '../Header/HeaderSecondary'
import SpaceWrapper from '../atom/SpaceWrapper/SpaceWrapper'
import InfoCardRight, { ColorsTypes } from '@/app/why-dubai/InfoCardRight'
import InfoCardLeft from '@/app/why-dubai/InfoCardLeft'
import { Footer } from '../Footer'

import high_roi_icon from "@/app/assets/high_roi_icon.png";
import no_tax from "@/app/assets/no-tax.png";
import ownership_icon from "@/app/assets/ownership_icon.png";
import economy_icon from "@/app/assets/economy_icon.png";
import tourism_icon from "@/app/assets/tourism_icon.png";
import world_class_icon from "@/app/assets/world_class_icon.png";
import security_icon from "@/app/assets/security_icon.png";
import residency_icon from "@/app/assets/residency_icon.png";
import property_options_icon from "@/app/assets/property_options_icon.png";
import flexible_icon from "@/app/assets/flexible_icon.png";
import mega_projects_icon from "@/app/assets/mega_projects_icon.png";
import explore_icon from "@/app/assets/explore_icon.png";


function WhyDubai() {
  return (
     <main>
            <div style={{ backgroundImage: `url(${why_dubai_icon?.src})`,backgroundSize:"100% 125%",backgroundRepeat:"no-repeat",backgroundPosition:"center center" }} className="w-full flex flex-col justify-center items-center  relative h-[619px] bg-slate-50">
                <Container>
                    <div className="absolute z-40 top-0 left-0 w-full h-full">
                        <HeaderSecondary />
                    </div>
               
                    <div className=" max-w-[730px] w-full sm:h-[214px] px-[41px] py-[34px] rounded-[7.5px] mt-20 bg-white/60 backdrop-blur-md">
                        <h2 className='text-[12px] font-medium font-poppins text-black'>Why Dubai</h2>
                        <h1 className='text-[37.5px] font-poppins font-medium text-black'>Why Invest in Dubai Real Estate?</h1>
                        <p className='text-[12px] font-poppins font-normal'>
                            Dubai has emerged as one of the world’s most attractive destinations for real estate investment. With its thriving economy, world-class infrastructure, and investor-friendly policies, the city offers unparalleled opportunities for both local and international investors. Here’s why you should consider investing in Dubai real estate
                        </p>
                    </div>

                </Container>

                {/* <Card /> */}

            </div>

            <section>

                <Container>



                    <SpaceWrapper
                        className='my-[37.5px] sm:my-[60px]'
                    >
                        <InfoCardRight
                            color={ColorsTypes.ROI}
                            description='Dubai offers some of the highest rental yields globally, ranging between 6% to 10% annually. Compared to other major cities like New York, London, or Hong Kong, Dubai provides better value for money with relatively affordable property prices and strong rental demand.'
                            icon={high_roi_icon}
                        >
                            <h3 className='text-[19.5px] sm:text-[37.5px] font-medium font-poppins text-black'>High Return on Investment <span className='text-[#3CA8E2]'>(ROI)</span></h3>

                        </InfoCardRight>


                    </SpaceWrapper>


                    <SpaceWrapper
                        className='mb-[37.5px] sm:mb-[60px]'
                    >   <InfoCardLeft
                        description='One of the biggest advantages of investing in Dubai real estate is the absence of property taxes. Investors enjoy tax-free rental income, capital gains, and no inheritance tax, making it a highly profitable investment environment.'
                        icon={no_tax}
                        color={ColorsTypes.TAX_FREE}

                    >

                            <h3 className='text-[19.5px] sm:text-[37.5px] font-medium font-poppins text-black'><span className='text-[#345F4C]'>Tax-Free</span> Investment</h3>

                        </InfoCardLeft>
                    </SpaceWrapper>




                    <SpaceWrapper
                        className='mb-[37.5px] sm:mb-[60px]'
                    >        <InfoCardRight
                        color={ColorsTypes.FORE_OWNERSHIP}
                        description='With the introduction of freehold property laws, foreign investors can now own properties outright in designated areas, providing full ownership rights and long-term security.'
                        icon={ownership_icon}
                    >
                            <h3 className='text-[19.5px] sm:text-[37.5px] font-medium font-poppins text-black'>100% <span className='text-[#986F2D]'>Foreign Ownership</span></h3>

                        </InfoCardRight>

                    </SpaceWrapper>




                    <SpaceWrapper
                        className='mb-[37.5px] sm:mb-[60px]'
                    >   <InfoCardLeft
                        description='Dubai is renowned for its high quality of life, offering an unparalleled lifestyle that combines luxury and comfort. With world-class amenities, top-tier healthcare, and prestigious educational institutions, residents enjoy a safe and vibrant environment. The city’s cosmopolitan culture, coupled with a rich tapestry of dining, shopping, and entertainment options, makes it a desirable place to live and work.'
                        icon={economy_icon}
                        color={ColorsTypes.ECONOMY}

                    >

                            <h3 className='text-[19.5px] sm:text-[37.5px] font-medium font-poppins text-black'><span className='text-[#304FFF]'>Growing </span> Economy  and <span className='text-[#304FFF]'>Stability </span> </h3>

                        </InfoCardLeft>
                    </SpaceWrapper>




                    <SpaceWrapper
                        className='mb-[37.5px] sm:mb-[60px]'
                    >        <InfoCardRight
                        color={ColorsTypes.TOURISM}
                        description='Dubai is one of the world’s top tourist destinations, attracting millions of visitors annually. This high influx of tourists creates a strong demand for short-term rental properties, making holiday homes and Airbnb rentals highly profitable.'
                        icon={tourism_icon}
                    >
                            <h3 className='text-[19.5px] sm:text-[37.5px] font-medium font-poppins text-black'>Booming <span className='text-[#01BFA5]'>Tourism Industry</span></h3>

                        </InfoCardRight>

                    </SpaceWrapper>





                    <SpaceWrapper
                        className='mb-[37.5px] sm:mb-[60px]'
                    >   <InfoCardLeft
                        description='Dubai is known for its cutting-edge infrastructure, including modern skyscrapers, efficient transportation systems, and state-of-the-art amenities. The city continuously develops new projects, such as the Dubai Metro expansion, smart city initiatives, and sustainable developments, enhancing property value over time.'
                        icon={world_class_icon}
                        color={ColorsTypes.WORLD_CLASS}

                    >

                            <h3 className='text-[19.5px] sm:text-[37.5px] font-medium font-poppins text-black'><span className='text-[#6A1B9A]'>World-Class </span> Infrastructure </h3>

                        </InfoCardLeft>
                    </SpaceWrapper>




                    <SpaceWrapper
                        className='mb-[37.5px] sm:mb-[60px]'
                    >        <InfoCardRight
                        color={ColorsTypes.SAFE}
                        description='Dubai is ranked as one of the safest cities in the world, with low crime rates and strong law enforcement. This makes it an attractive option for investors, expatriates, and families looking for a secure place to live and invest.'
                        icon={security_icon}
                    >
                            <h3 className='text-[19.5px] sm:text-[37.5px] font-medium font-poppins text-black'><span className='text-[#986F2D]'>Safe </span>and <span className='text-[#986F2D]'>Secure</span> Environment</h3>

                        </InfoCardRight>

                    </SpaceWrapper>





      <SpaceWrapper
                        className='mb-[37.5px] sm:mb-[60px]'
                    >   <InfoCardLeft
                        description='Real estate investors can qualify for long-term residency visas, including 3-year, 5-year, and 10-year Golden Visas, depending on the property investment value. This provides added security and residency benefits for investors and their families.'
                        icon={residency_icon}
                        color={ColorsTypes.RESIDENCY}

                    >

                            <h3 className='text-[19.5px] sm:text-[37.5px] font-medium font-poppins text-black'><span className='text-[#0091EA]'>Residency Visa</span> for Investors </h3>

                        </InfoCardLeft>
                    </SpaceWrapper>






                    <SpaceWrapper
                        className='mb-[37.5px] sm:mb-[60px]'
                    >        <InfoCardRight
                        color={ColorsTypes.PROPERTY}
                        description='Dubai offers a wide range of properties to suit every investor’s needs, from luxury villas and high-end apartments to affordable townhouses and commercial spaces. Whether you’re looking for a high-end investment or an entry-level property, Dubai has options for all budgets.'
                        icon={property_options_icon}
                    >
                            <h3 className='text-[19.5px] sm:text-[37.5px] font-medium font-poppins text-black'>Diverse <span className='text-[#1A237E]'>Property Options</span></h3>

                        </InfoCardRight>

                    </SpaceWrapper>








      <SpaceWrapper
                        className='mb-[37.5px] sm:mb-[60px]'
                    >   <InfoCardLeft
                        description='Real estate investors can qualify for long-term residency visas, including 3-year, 5-year, and 10-year Golden Visas, depending on the property investment value. This provides added security and residency benefits for investors and their families.'
                        icon={flexible_icon}
                        color={ColorsTypes.FLEXIBLE}

                    >

                            <h3 className='text-[19.5px] sm:text-[37.5px] font-medium font-poppins text-black'><span className='text-[#D500F6]'>Flexible </span> Payment Plans </h3>

                        </InfoCardLeft>
                    </SpaceWrapper>









                    <SpaceWrapper
                        className='mb-[37.5px] sm:mb-[60px]'
                    >        <InfoCardRight
                        color={ColorsTypes.MEGA_PROJECTS}
                        description='Dubai continuously launches innovative mega projects like Dubai Creek Harbour, Mohammed Bin Rashid City, and Dubai South. These developments promise high appreciation potential and new investment opportunities.'
                        icon={mega_projects_icon}
                    >
                            <h3 className='text-[19.5px] sm:text-[37.5px] font-medium font-poppins text-black'>Upcoming <span className='text-[#00685A]'>Mega Projects</span></h3>

                        </InfoCardRight>

                    </SpaceWrapper>







      <SpaceWrapper
                        className='mb-[37.5px] sm:mb-[60px]'
                    >   <InfoCardLeft
                        description={`Explore the legacy of Expo 2020 and its lasting impact on Dubai's growth, innovation, and global connectivity. Discover how this landmark event has shaped the future of our city and the opportunities that lie ahead.`}
                        icon={explore_icon}
                        color={ColorsTypes.EXPO}

                    >

                            <h3 className='text-[19.5px] sm:text-[37.5px] font-medium font-poppins text-black'><span className='text-[#F9C12B]'>Expo 2020 </span> and Beyond </h3>

                        </InfoCardLeft>
                    </SpaceWrapper>




                </Container>

            </section>


            <Footer />


        </main>
  )
}

export default WhyDubai