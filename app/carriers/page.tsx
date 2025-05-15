'use client'
import Container from '@/components/atom/Container/Container'
import SectionDivider from '@/components/atom/SectionDivider/SectionDivider'
import SpaceWrapper from '@/components/atom/SpaceWrapper/SpaceWrapper';
import RegistrationSuccess from '@/components/EnquiryForm/RegistrationSuccess';
import ErrorMessageLabel from '@/components/ErrorMessageLabel/ErrorMessageLabel';
import Header from '@/components/Header'
import Modal from '@/components/Modal/Modal';
import { errorToast } from '@/components/Toast';
import { useCarrierEnquiryMutation } from '@/redux/carriers/carriersApi';
import { getErrorMessage } from '@/utils/errorHandler';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react'
import { FaCheckCircle } from "react-icons/fa";
import * as Yup from "yup"

function Carrier() {


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
            .matches(/^[0-9]+$/, "Only digits allowed")
            .min(10, "Must be at least 10 digits")
            .required("Phone number is required"),
    })

    const [carrierEnquiryState, setCarrierEnquiryState] = useState({
        status: false,
        count: 0
    })



    const handleSubmit = async (values: typeof formData, { setSubmitting, resetForm }: any) => {

        try {
            const response = await carrierEnquiry(values).unwrap();
           

            setCarrierEnquiryState((prev: any) => ({
                status: true,
                count: 1,
            }))

            resetForm();
      

        } catch (error: any) {
            errorToast(getErrorMessage(error))
        } finally {
            setSubmitting(false)
        }
    }
    return (
        <main>

            <Header />

            <SectionDivider
                containerClassName="mt-[10.5px] mb-[12px]"
                lineClassName="h-[1px] w-full bg-[#DEDEDE]"
            />

            <SpaceWrapper
                className='mb-28'
            >
                <Container>
                    <div className="max-w-[763.5px] m-auto w-full flex flex-col justify-center items-center">
                        <h1 className='font-poppins text-center font-medium text-[19.5px] sm:text-[37.5px]'>
                            Join <span className='text-[#FF1645]'>PropertySeller</span> – Grow Your Real Estate Career
                        </h1>

                        <h2 className='text-[16.5px] mt-[13px] font-medium font-poppins text-black'>Why Work With Us?</h2>
                        <p className='font-poppins mt-[16.5px] text-[10.5px] sm:text-[12px] font-normal text-[#666666]'>At PropertySeller, we empower real estate agents with the best tools, training, and commission structures to help you succeed in Dubai’s competitive real estate market. Whether you’re an experienced agent or just starting, we provide a platform for you to maximize your earnings and grow your career.</p>

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








                    <Formik
                        enableReinitialize
                        initialValues={formData}
                        validationSchema={ProfileSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="w-full mt-[51px] max-w-[763.5px] gap-[24px] m-auto grid grid-cols-1 sm:grid-cols-2  bg-white">
                                <div className=''>
                                    <LabelFields
                                        title='Name'
                                        htmlFor='name'
                                    />
                                    <InputField
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Enter your name"
                                        loading={isSubmitting}
                                    />
                                    <ErrorMessageLabel name="name" />
                                </div>

                                <div>
                                    <LabelFields
                                        title='Nationality'
                                        htmlFor='nationality'
                                    />
                                    {/* <label htmlFor="nationality" className="block font-normal text-black">Nationality</label> */}
                                    <Field
                                        className="border w-full outline-none border-[#DEDEDE] rounded px-4 font-poppins text-[11px] sm:text-[13.5px] font-medium py-2"


                                        as="select"
                                        name="nationality"
                                        disabled={isSubmitting}
                                    >
                                        <option value="">Select nationality</option>
                                        <option value="Indian">Indian</option>
                                        <option value="American">American</option>
                                        <option value="British">British</option>
                                        <option value="Other">Other</option>
                                    </Field>
                                    <ErrorMessageLabel name="nationality" />
                                </div>

                                <div>
                                    <LabelFields
                                        title='Email'
                                        htmlFor='email'
                                    />
                                    {/* <label htmlFor="email" className="block font-normal text-black">Email</label> */}
                                    <InputField
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        loading={isSubmitting}
                                    />
                                    <ErrorMessageLabel name="email" />
                                </div>

                                <div>
                                    <LabelFields
                                        title='Number'
                                        htmlFor='number'
                                    />
                                    {/* <label htmlFor="number" className="block font-normal text-black">Phone Number</label> */}
                                    <InputField
                                        type="text"
                                        id="number"
                                        name="number"
                                        placeholder="Enter your phone number"
                                        loading={isSubmitting}
                                    />
                                    <ErrorMessageLabel name="number" />
                                </div>



                                <div>
                                    <LabelFields
                                        title='Languages'
                                        htmlFor='languages'
                                    />
                                    {/* <label htmlFor="number" className="block font-normal text-black">Phone Number</label> */}
                                    <InputField
                                        type="text"
                                        id="languages"
                                        name="languages"
                                        placeholder="Enter your spoken languages"
                                        loading={isSubmitting}
                                    />
                                    <ErrorMessageLabel name="languages" />
                                </div>




                                <div>
                                    <LabelFields
                                        title='Years of Experience'
                                        htmlFor='yearsOfExperience'
                                    />
                                    {/* <label htmlFor="number" className="block font-normal text-black">Phone Number</label> */}
                                    <InputField
                                        type="text"
                                        id="yearsOfExperience"
                                        name="yearsOfExperience"
                                        placeholder="Enter your years of Experience"
                                        loading={isSubmitting}
                                    />
                                    <ErrorMessageLabel name="yearsOfExperience" />

                                </div>




                                <div>
                                    <LabelFields
                                        title='Linkedin Profile'
                                        htmlFor='linkedinProfileLink'
                                    />
                                    {/* <label htmlFor="number" className="block font-normal text-black">Phone Number</label> */}
                                    <InputField
                                        type="text"
                                        id="linkedinProfileLink"
                                        name="linkedinProfileLink"
                                        placeholder="Paste your Linkedin Profile Link"
                                        loading={isSubmitting}
                                    />
                                    <ErrorMessageLabel name="linkedinProfileLink" />
                                </div>

                                <div className="flex justify-end items-end">




                                    <button type="submit" disabled={isSubmitting} className="w-full bg-[#FF1645] text-white p-0 rounded-md hover:bg-[#D8133A] transition flex h-[37px] items-center justify-center">
                                        {isSubmitting ? (
                                            <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                            </svg>
                                        ) : null}
                                        {isSubmitting ? "Submitting..." : "Submit"}
                                    </button>
                                </div>


                                {/* <PrimaryButton
                                                onClick={() => router.push('/change-password')}
                                                type="button"
                                                className=" bg-[#FFE7EC] h-[37.5px] w-full border-none "
                                              >
                                                <div className="flex justify-center items-center gap-2">
                                                  <label className="text-nowrap font-medium text-[#FF1645] text-[13px] font-poppins">Change Password</label>
                                                </div>
                                              </PrimaryButton> */}

                                {/* <PrimaryButton
                                disabled={isSubmitting}
                                type="submit"
                                className=" bg-[#FFE7EC] disabled:!bg-[#FFE7EC]/60 max-w-[200px] mt-3 py-2 w-full border-none "
                            >
                                <div className="flex justify-center items-center gap-2">
                                    <label className=" text-nowrap font-medium text-[#FF1645] text-[13px] font-poppins">{isSubmitting ? 'Uploading...' : 'Update'}</label>
                                </div>
                            </PrimaryButton> */}
                            </Form>
                        )}
                    </Formik>



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
                        content='Our HR Team will contact your shortly'
                            onClose={() => setCarrierEnquiryState({ status: false, count: 0 })}

                        />}

                    </div>

                </Container>
            </Modal>

        </main>
    )
}

export default Carrier



type PointsProps = {
    content: string;
    // icon: React.ReactNode;
}

function Points({
    content,
    // icon
}: PointsProps) {
    return (
        <div className="flex mt-[16.5px] items-center justify-center gap-[7.5px]">
            <div className="w-2 h-2">
            <FaCheckCircle size={12} fill='#FF1645' color='#FF1645' />

            </div>
            <p className='font-poppins  text-[10.5px] sm:text-[12px] font-normal text-[#666666]'>{content}</p>
        </div>

    )
}




function LabelFields({ title, htmlFor }: { title: string, htmlFor: string }) {
    return (
        <label htmlFor={htmlFor} className='block mb-2 text-[10.5px] font-poppins sm:text-[13.5px]  font-medium'>{title}</label>
    )
}



function InputField({
    loading,
    type,
    id,
    name,
    placeholder,
    className,
}: {
    loading: boolean,
    type: string,
    id: string,
    name: string,
    placeholder: string,
    className?: string
}) {
    return (
        <Field
            type={type}
            id={id}
            name={name}
            placeholder={placeholder}
            className="border w-full outline-none border-[#DEDEDE] rounded px-4 font-poppins text-[11px] sm:text-[13.5px] font-medium py-2"
            disabled={loading}
        />
    )
}



