'use client'
import React, { useState } from 'react'
import Header from '../Header'
import * as Yup from "yup"
import SpaceWrapper from '../atom/SpaceWrapper/SpaceWrapper'
import { useRouter } from 'next/navigation'
import { baseUrl } from '@/api'
import { errorToast, successToast } from '../Toast'
import apiClient from '@/api/apiClient'
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa'
import {  Form, Formik } from 'formik'
import Container from '../atom/Container/Container'
import { Footer } from '../Footer'
import ErrorMessageBox from '../Forms/ErrorMessageBox'
import SelectField from '../Forms/SelectField'
import { nationalities } from '@/data'
import InputField from '../Forms/InputField'
import SectionDivider from '../atom/SectionDivider/SectionDivider'
import MobileHeaderTitle from '../atom/typography/MobileHeaderTitle'





const FreelancerSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    nationality: Yup.string().required("Nationality is required"),
    number: Yup.string()
        .matches(/^[0-9]+$/, "Only digits allowed")
        .min(10, "Must be at least 10 digits")
        .required("Phone number is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
})

const initialFormData = {
    name: '',
    nationality: '',
    number: '',
    email: '',
}

const Freelancer = () => {



    const router = useRouter()
    const [postingLoading, setPostingLoading] = useState<boolean>(false)

    const isSubmitting = true;
    const [formLoading, setFormLoading] = useState<boolean>(false);


    const handleSubmit = async (values: typeof initialFormData, { setSubmitting, resetForm }: any) => {
        setFormLoading(true)
        try {
            const data = {
                name: values.name,
                nationality: values.nationality,
                number: values.number,
                email: values.email,
            }

            const response = await apiClient.post(`${baseUrl}/freelancers`, data);
            if (response.data.success) {
                // console.log(response, 'response')
                successToast("Freelancer registered successfully")
                resetForm();
            }

        } catch (error: any) {

              errorToast(error?.response?.data?.message || error?.message || 'Something went wrong. Please try again later.');
            }finally{
            setFormLoading(false)

        }
    }


    // const handleSubmitPosting = async (values: typeof initialFormData, { setSubmitting, resetForm }: any) => {
    //     try {
    //         setPostingLoading(true)
    //         const data = {
    //             name: values.name,
    //             nationality: values.nationality,
    //             number: values.number,
    //             email: values.email,
    //             // comment: values.comment,
    //         }

    //         const response = await apiClient.post(`${baseUrl}/freelancers`, data);
    //         if (response.data.success) {
    //             // console.log(response, 'response')
    //             successToast("Freelancer registered successfully")
    //             resetForm();
    //         }

    //     } catch (error: any) {

    //           errorToast(error?.response?.data?.message || error?.message || 'Something went wrong. Please try again later.');
          
    //     }finally{
    //         setPostingLoading(false)

    //     }
    // }


    return (
        <main>
            <Header     logoSection={
                           <div className='h-full w-full flex justify-center items-center'>
                             <MobileHeaderTitle
                            content='Freelancer Registration'
                            />
                           </div>
                        }/>

            <SectionDivider
                containerClassName="mt-[10.5px] mb-[12px]"
                lineClassName="h-[1px] w-full bg-[#DEDEDE]"
            />


            <SpaceWrapper
                className=''
            >
                <Container>
                    <section className="mt-4 mb-5 md:gap-10 flex-col md:flex-row flex items-center justify-between w-full ">

                        <div className="max-w-[529px] sm:mt-20 sm:gap-0 w-full">
                            <p className='font-poppins  font-medium text-[26px]  sm:text-[34px] sm:leading-10'>Freelancer – Empowering Real Estate Agents</p>
                            <p className='font-poppins mt-[9px] text-[12px] font-normal text-[#666666]'>At PropertySeller, we provide freelance real estate agents in Dubai with a trusted platform to close their deals seamlessly. As a freelancer, you can finalize your transactions under PropertySeller with an 80/20 commission split, where you receive 80% commission on every successful deal.</p>
                            <div className="flex flex-col items-start">
                                <Points
                                    content='Maximize Your Earnings – Keep 80% of your commission'
                                />
                                <Points
                                    content='No Ties, No Limits – Work on your own terms'
                                />
                                <Points
                                    content='Close Deals with Confidence – Use PropertySeller as your platform'
                                />
                            </div>
                            <div className="flex border mt-2 p-1.5 border-[#DEDEDE] rounded-[3.5px] justify-start items-start capitalize gap-2">
                                <p className='font-poppins text-justify flex items-start text-[10.5px] sm:text-[12px] leading-[20px] font-normal text-[#666666] gap-1'>
                                    <FaExclamationTriangle size={14} color="#FFD700" className="mt-[2px] w-6 h-3" />
                                    Disclaimer: PropertySeller provides a platform for freelance agents to close deals but PropertySeller is not responsible for any promises, commitments, or agreements made by agents to their clients. Agents are fully accountable for their own transactions
                                </p>
                            </div>

                        </div>
                        <div className="flex justify-center items-center flex-1 w-full">
                            <Formik
                                initialValues={{
                                    name: '',
                                    nationality: '',
                                    number: '',
                                    email: '',
                                }}
                                validationSchema={FreelancerSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting }) => (
                                    <Form className="w-full max-w-[380px] mt-4 sm:mt-6 bg-white">


                                        <div className="mb-2 sm:mb-5">

                                            <InputField type="text" id="name" name="name" placeholder="Enter your Name" loading={isSubmitting} />
                                            <ErrorMessageBox
                                                name="name"
                                            />
                                        </div>

                                        <div className="mb-2 sm:mb-5">

                                            <SelectField
                                                name="nationality"
                                                id="nationality"

                                                loading={formLoading}
                                            >
                                                {nationalities.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </SelectField>
                                        </div>


                                        <div className="mb-2 sm:mb-5">

                                            <InputField


                                                type="text" id="number" name="number" placeholder="Enter your mobile no" loading={formLoading} />
                                            <ErrorMessageBox
                                                name="number"
                                            />
                                        </div>
                                        <div className=" mb-2 sm:mb-5">

                                            <InputField type="email" id="email" name="email" placeholder="Enter your email" loading={formLoading} />
                                            <ErrorMessageBox
                                                name="email"
                                            />
                                        </div>

                                        <button type="submit" disabled={formLoading} className="w-full text-[14px] mb-2 cursor-pointer font-medium bg-[#FF1645] text-white  h-[35px] rounded-[3px] hover:bg-[#D8133A] transition flex items-center justify-center">
                                            {formLoading ? (
                                                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                                </svg>
                                            ) : null}
                                            {formLoading ? "loading..." : "Submit"}
                                        </button>









                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </section>
                </Container>

            </SpaceWrapper>




            <Container>

                <section className='relative'>
                    <textarea name="" id="" className='rounded h-[180px] outline-none border-[#DEDEDE] bg-[#F7F7F7] border w-full font-poppins text-[12px] p-3 font-normal ' placeholder='Add Comment'></textarea>


                    <button
                        type="submit"
                        // onClick={handleSubmitPosting}
                        disabled={postingLoading}
                        className="bottom-[19px] right-[13px] w-[100px] absolute bg-[#FF1645] text-white p-2 text-[13.5px] rounded-md hover:bg-[#D8133A] flex items-center justify-center h-[37.5px]"
                    >
                        {postingLoading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                </svg>
                                Posting...
                            </>
                        ) : (
                            "POST"
                        )}
                    </button>

                </section>
            </Container>


            <Container>

                <div className="gap-[8.25px] mt-[18px] flex">

                    <label htmlFor="" className='text-[13.5px] font-poppins font-semibold'>Comments</label>
                    <span className='bg-[#FF1645] font-medium px-1 rounded-[2.25px] text-[12px] font-poppins text-white'>25</span>
                </div>

            </Container>



            {/* comments */}
            <SpaceWrapper
            className='pb-10'
            >
            <Container>

                <div className="mt-[19px]">
                    <div className="gap-[8.25px] flex items-center">

                        <label htmlFor="" className='text-[13.5px] font-poppins font-semibold'>Jhon Doe</label>
                        <p className='font-poppins sm:mt-0 text-[10.5px] sm:text-[12px] font-normal text-[#666666]'>1 Week ago</p>
                    </div>

                    <p className='font-poppins mt-[9px] sm:mt-0 text-[10.5px] sm:text-[12px] font-normal text-[#666666]'>At PropertySeller, we provide freelance real estate agents in Dubai with a trusted platform to close their deals seamlessly. As a freelancer, you can finalize your transactions under PropertySeller with an 80/20 commission split, where you receive 80% commission on every successful deal.</p>

                </div>




                <div className="mt-[19px]">
                    <div className="gap-[8.25px] flex items-center">

                        <label htmlFor="" className='text-[13.5px] font-poppins font-semibold'>Jhon Doe</label>
                        <p className='font-poppins sm:mt-0 text-[10.5px] sm:text-[12px] font-normal text-[#666666]'>1 Week ago</p>
                    </div>

                    <p className='font-poppins mt-[9px] sm:mt-0 text-[10.5px] sm:text-[12px] font-normal text-[#666666]'>At PropertySeller, we provide freelance real estate agents in Dubai with a trusted platform to close their deals seamlessly. As a freelancer, you can finalize your transactions under PropertySeller with an 80/20 commission split, where you receive 80% commission on every successful deal.</p>

                </div>




                <div className="mt-[19px]">
                    <div className="gap-[8.25px] flex items-center">

                        <label htmlFor="" className='text-[13.5px] font-poppins font-semibold'>Jhon Doe</label>
                        <p className='font-poppins sm:mt-0 text-[10.5px] sm:text-[12px] font-normal text-[#666666]'>1 Week ago</p>
                    </div>

                    <p className='font-poppins mt-[9px] sm:mt-0 text-[10.5px] sm:text-[12px] font-normal text-[#666666]'>At PropertySeller, we provide freelance real estate agents in Dubai with a trusted platform to close their deals seamlessly. As a freelancer, you can finalize your transactions under PropertySeller with an 80/20 commission split, where you receive 80% commission on every successful deal.</p>

                </div>


            </Container>

</SpaceWrapper>

            <Footer />
        </main>
    )
}

export default Freelancer




type PointsProps = {
    content: string;
    // icon: React.ReactNode;
}


function Points({
    content,
    // icon
}: PointsProps) {
    return (
        <div className="flex mt-[10.5px] items-center justify-center gap-[7.5px]">
            <FaCheckCircle size={12} fill='#FF1645' color='#FF1645' />
            <p className='font-poppins  text-[10.5px] sm:text-[12px] font-normal text-[#666666]'>{content}</p>
        </div>

    )
}
