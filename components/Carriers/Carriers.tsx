'use client'
import React, { useState } from 'react'
import Header from '../Header'
import SectionDivider from '../atom/SectionDivider/SectionDivider'
import SpaceWrapper from '../atom/SpaceWrapper/SpaceWrapper'
import Container from '../atom/Container/Container'
import { Form, Formik } from 'formik'
import { FaCheckCircle } from 'react-icons/fa'
import { useCarrierEnquiryMutation } from '@/redux/carriers/carriersApi'
import * as Yup from "yup"
import { errorToast } from '../Toast'
import Modal from '../Modal/Modal'
import RegistrationSuccess from '../EnquiryForm/RegistrationSuccess'
import InputField from '../Forms/InputField'
import ErrorMessageBox from '../Forms/ErrorMessageBox'
import SelectField from '../Forms/SelectField'
import { nationalities } from '@/data'
import MobileHeaderTitle from '../atom/typography/MobileHeaderTitle'
import { Footer } from '../Footer'

function Carriers() {



    const [formData, setFormData] = useState({
        name: '',
        nationality: '',
        email: '',
        number: '',
        languages: '',
        yearsOfExperience: '',
        linkedinProfileLink: '',
    });


    const [carrierEnquiry] = useCarrierEnquiryMutation();



    // Validation Schema
    const ProfileSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        nationality: Yup.string().required("Please select nationality"),
        email: Yup.string().email("Invalid email format").required("Email is required"),
        languages: Yup.string().required("Languages required"),
        yearsOfExperience: Yup.string().required("Year of experience required"),
        linkedinProfileLink: Yup.string().required("LinedIn profile required"),
    number: Yup.string()
  .trim()
  .matches(/^\d+$/, "Only digits allowed")
  .min(10, "Must be at least 10 digits")
  .max(15, "Must be at most 15 digits") // optional: limit to typical phone lengths
  .required("Phone number is required"),

    })

    const [carrierEnquiryState, setCarrierEnquiryState] = useState({
        status: false,
        count: 0
    })



    const handleSubmit = async (values: typeof formData, { setSubmitting, resetForm }: any) => {
console.log('first')
        try {
            const response = await carrierEnquiry(values).unwrap();


            setCarrierEnquiryState((prev: any) => ({
                status: true,
                count: 1,
            }))

            resetForm();


        } catch (error: any) {
            errorToast(error?.response?.data?.message || error?.data?.message || error?.response?.message || error?.message || 'Error occurred, please try again later')
        } finally {
            setSubmitting(false)
        }
    }
    return (
        <main>

            <Header 
               logoSection={
                           <div className='h-full w-full flex justify-center items-center'>
                             <MobileHeaderTitle
                            content='Careers'
                            />
                           </div>
                        }
                        />

            <SectionDivider
                containerClassName="mt-[10.5px] mb-[12px]"
                lineClassName="h-[1px] w-full bg-[#DEDEDE]"
            />

            <SpaceWrapper
                className='mb-28 mt-4'
            >
                <Container>
                    <div className=" m-auto w-full flex flex-col justify-center items-center">
                        <h1 className='font-poppins max-w-[580.5px] w-full text-center font-medium text-[19.5px] sm:text-[36px]'>
                            Join <span className='text-[#FF1645]'>PropertySeller</span> – Grow Your Real Estate Career
                        </h1>

                        <h2 className='text-[16.5px] mt-[13px] font-medium font-poppins text-black'>Why Work With Us?</h2>
                        <p className='font-poppins max-w-[763.5px] w-full mt-[16.5px] text-[10.5px] sm:text-[12px] font-normal text-[#666666] text-center'>At PropertySeller, we empower real estate agents with the best tools, training, and commission structures to help you succeed in Dubai’s competitive real estate market. Whether you’re an experienced agent or just starting, we provide a platform for you to maximize your earnings and grow your career.</p>

                        <div className="flex flex-col mt-[16.5px] justify-start items-start">

                            <h2 className='self-center text-[16.5px] mt-[13px] font-medium font-poppins text-black'>What We Offer</h2>

                            <Points
                                content='High Commission Payouts – Earn top-tier commissions on every deal.'
                            />

                            <Points
                                content='Exclusive Developer Partnerships – Get access to premium off-plan projects.'
                            />

                            <Points
                                content='Quality Leads – Benefit from our lead generation system.'
                            />

                            <Points
                                content='Advanced Technology – Use our innovative PropertySeller platform for seamless property sales.'
                            />

                            <Points
                                content='Marketing Support – Professional branding, digital promotions, and personalized marketing tools.'
                            />


                            <Points
                                content='Training & Mentorship – Enhance your skills with expert coaching and workshops.'
                            />

                        </div>





                        <div className="flex flex-col mt-[16.5px] justify-start items-start">

                            <h2 className='text-[16.5px] self-center mt-[13px] font-medium font-poppins text-black'>Who We Are Looking For:</h2>

                            <Points
                                content='Passionate individuals with a drive for sales and success.'
                            />

                            <Points
                                content='Strong communication and negotiation skills.'
                            />

                            <Points
                                content='Knowledge of Dubai’s real estate market (preferred but not mandatory).'
                            />

                            <Points
                                content='Self-motivated and target-driven professionals.'
                            />

                            <Points
                                content='Marketing Support – Professional branding, digital promotions, and personalized marketing tools.'
                            />


                            <Points
                                content='Ability to build and maintain client relationships.'
                            />

                        </div>

                    </div>





<div className="flex justify-center items-center">


                    <Formik
                        enableReinitialize
                        initialValues={{
                            name:'',
                            nationality:'',
                            email:'',
                            number:'',
                            languages:'',
                            yearsOfExperience:'',
                            linkedinProfileLink:'',
                        }}
                        validationSchema={ProfileSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="w-full max-w-[700px] mt-4 sm:mt-6 bg-white">

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">

                                    <div className="mb-0 sm:mb-3">

                                        <InputField type="text" id="name" name="name" placeholder="Enter your Name" loading={isSubmitting} />
                                        <ErrorMessageBox
                                            name="name"
                                        />
                                    </div>

                                    <div className="mb-2">

                                        <SelectField
                                            name="nationality"
                                            id="nationality"

                                            loading={isSubmitting}
                                        >
                                            {nationalities.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </SelectField>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    <div className="mb-0 sm:mb-3">

                                        <InputField


                                            type="text" id="number" name="number" placeholder="Enter your mobile no" loading={isSubmitting} />
                                        <ErrorMessageBox
                                            name="number"
                                        />
                                    </div>
                                    <div className="mb-2">

                                        <InputField type="email" id="email" name="email" placeholder="Enter your email" loading={isSubmitting} />
                                        <ErrorMessageBox
                                            name="email"
                                        />
                                    </div>


                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    <div className="mb-0 sm:mb-3">

                                        <InputField


                                            type="text" id="languages" name="languages" placeholder="Enter your Speaking Languages" loading={isSubmitting} />
                                        <ErrorMessageBox
                                            name="languages"
                                        />
                                    </div>

                                    <div className="mb-2">
                                        <InputField


                                            type="text" id="yearsOfExperience" name="yearsOfExperience" placeholder="Enter your Years Experience" loading={isSubmitting} />
                                        <ErrorMessageBox
                                            name="yearsOfExperience"
                                        />
                                    </div>


                                   
                                </div>


                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                     <div className="mb-0 sm:mb-3">
                                        <InputField


                                            type="text" id="linkedinProfileLink" name="linkedinProfileLink" placeholder="Paste your Linkedin Profile Link" loading={isSubmitting} />
                                        <ErrorMessageBox
                                            name="linkedinProfileLink"
                                        />
                                    </div>

                                     <button type="submit" disabled={isSubmitting} className="w-full text-[14px] mb-2 cursor-pointer font-medium bg-[#FF1645] text-white  h-[40px] rounded-[3px] hover:bg-[#D8133A] transition flex items-center justify-center">
                                    {isSubmitting ? (
                                        <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                        </svg>
                                    ) : null}
                                    {isSubmitting ? "loading..." : "Update"}
                                </button>
                                </div>





                               


                            </Form>
                        )}
                    </Formik>
</div>







                </Container>
            </SpaceWrapper>



            {/*  */}
            <Modal
                isOpen={carrierEnquiryState.status}
                // isOpen={true}
                onClose={() => setCarrierEnquiryState({ status: false, count: 0 })}
            >



                <Container>
                    <div className="relative w-full h-[200px] rounded-[5px]">

                        {carrierEnquiryState.count === 1 && <RegistrationSuccess
                        headline='Your Application Has Been Submitted'
                            content='Our HR Team will contact your shortly'
                            onClose={() => setCarrierEnquiryState({ status: false, count: 0 })}

                        />}

                    </div>

                </Container>
            </Modal>

            <Footer />

        </main>
    )
}

export default Carriers






type PointsProps = {
    content: string;
    // icon: React.ReactNode;
}

function Points({
    content,
    // icon
}: PointsProps) {
    return (
        <div className="flex mt-[16.5px] items-center justify-center gap-[9px]">
            <div className="">
                <FaCheckCircle size={12} fill='#FF1645' color='#FF1645' />

            </div>
            <p className='font-poppins  text-[10.5px] sm:text-[12px] font-normal text-[#666666]'>{content}</p>
        </div>

    )
}



