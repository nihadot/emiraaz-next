'use client'
import React, { useState } from 'react'
import Header from '../Header'
import MobileHeaderTitle from '../atom/typography/MobileHeaderTitle'
import SectionDivider from '../atom/SectionDivider/SectionDivider'
import clsx from 'clsx'
import { Footer } from '../Footer'
import Container from '../atom/Container/Container'
import { Form, Formik } from 'formik'
import * as Yup from "yup"
import { errorToast } from '../Toast'
import InputField from '../Forms/InputField'
import ErrorMessageBox from '../Forms/ErrorMessageBox'
import SelectField from '../Forms/SelectField'
import { nationalities } from '@/data'
import { Facebook, Instagram, Linkedin, Mail } from 'lucide-react'
import mailIcon from "@/app/assets/email.png";
import youtubeIcon from "@/app/assets/youtube.png";
import twitterIcon from "@/app/assets/twitter.png";
import linkedInIcon from "@/app/assets/linkedin.png";
import facebookIcon from "@/app/assets/facebook.png";
import instagramIcon from "@/app/assets/social.png";
import threadIcon from "@/app/assets/threads.png";
import Image from 'next/image'
import { IoLogoInstagram } from 'react-icons/io5'
import { SlSocialLinkedin } from 'react-icons/sl'
import { FaThreads } from "react-icons/fa6";
import { PiInstagramLogoThin, PiThreadsLogoLight, PiYoutubeLogoThin } from 'react-icons/pi'
import { LuFacebook } from 'react-icons/lu'
import { TbBrandFacebook } from "react-icons/tb";
import { SlSocialInstagram } from "react-icons/sl";
import apiClient from '@/api/apiClient'
import { baseUrl } from '@/api'

type Props = {
    data: any[];
}

function ContactPage({ data }: Props) {

    // Validation Schema
    const ValidationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        nationality: Yup.string().optional(),
        email: Yup.string().email("Invalid email format").required("Email is required"),
        description: Yup.string().required("Description is required"),
        number: Yup.string()
            .trim()
            .matches(/^\d+$/, "Only digits allowed")
            .min(10, "Must be at least 10 digits")
            .max(15, "Must be at most 15 digits") // optional: limit to typical phone lengths
            .required("Phone number is required"),

    })

    const [formData, setFormData] = useState({
        name: '',
        number: '',
        email: '',
        description: '',
        nationality: '',
    });



    const handleSubmit = async (values: typeof formData, { setSubmitting, resetForm }: any) => {

        try {
            // const response = await carrierEnquiry(values).unwrap();

  const response = await apiClient.post(`${baseUrl}/contact-us`, {
    name: values.name,
    email: values.email,
    number: values.number,
    description: values.description,
    nationality: values.nationality,
  });
            const data = await response?.data?.data;

            // setCarrierEnquiryState((prev: any) => ({
            //     status: true,
            //     count: 1,
            // }))

            // console.log(values,'Values')

            resetForm();


        } catch (error: any) {
            errorToast(error?.response?.data?.message || error?.data?.message || error?.response?.message || error?.message || 'Error occurred, please try again later')
        } finally {
            setSubmitting(false)
        }
    }



    return (
        <main>  <Header logoSection={
            <div className='h-full w-full flex justify-center items-center'>
                <MobileHeaderTitle
                    content='Contact Us'
                />
            </div>
        } />
            <SectionDivider
                containerClassName={clsx("mb-[12px] mt-[12px]")}
                lineClassName="h-[1px] w-full bg-[#DEDEDE]"
            />

            <Container
            className='py-24'
            >
                <div className="grid md:grid-cols-1 lg:grid-cols-2 justify-center gap-7 items-center w-full">


                    <div className="flex-1 h-full">

                        <h1
                            className='font-poppins  font-medium text-[19.5px]  sm:text-[32px]'
                        >Get in <span className='text-[#FF1645]'>Touch</span></h1>
                        <p className='font-poppins mt-[4px] leading-[22px] text-[12px] font-normal text-[#666666]'>Whether you have a question, need help, or just want to say hello — we’re here for you. Reach out and our team will respond as soon as possible.</p>

                        <div className="flex gap-3 mt-3">

                            <div className="p-[14px]  border border-[#DEDEDE] rounded-[5px] flex w-fit gap-2">
                                <div className="relative w-[26px] h-[26px] object-cover">
                                    <Image
                                    src={mailIcon.src}
                                    fill
                                    alt='mail icon'
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col mt-1 justify-start gap-1">
                                <label htmlFor="" className='text-sm font-poppins font-medium'>Email</label>
                                <label htmlFor="" className='text-sm font-poppins font-normal'>hello@propertyseller.com</label>
                            </div>
                        </div>


                        <div className="mt-5">
                            <p className='font-medium text-sm font-poppins'>Check out our Socials</p>
<div className="flex gap-3 mt-2">


  <PiInstagramLogoThin
  size={26}
  />
   <TbBrandFacebook
   size={24}
   />
   <SlSocialLinkedin
   size={22}
   />
  <PiThreadsLogoLight
  size={26}
  />
   <PiYoutubeLogoThin
   size={26}
   />

                           

</div>

                        </div>


                    </div>
                    <div className="flex-1 h-full bg-red-600">
                        <div className="flex bg-green-400">


                            <Formik
                                enableReinitialize
                                initialValues={{
                                    name: '',
                                    number: '',
                                    email: '',
                                    description: '',
                                    nationality: '',
                                }}
                                validationSchema={ValidationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting, setFieldValue }) => (
                                    <Form className="w-full max-w-[700px]  bg-white">

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">

                                            <div className="mb-0 sm:mb-3">
                                                <label className="text-sm text-gray-800 font-poppins font-medium" htmlFor="">Name</label>


                                                <InputField type="text" id="name" name="name" placeholder="Enter your Name" loading={isSubmitting} />
                                                <ErrorMessageBox
                                                    name="name"
                                                />
                                            </div>

                                            <div className="mb-0 sm:mb-3">
                                                <label className="text-sm text-gray-800 font-poppins font-medium" htmlFor="">Phone</label>

                                                <InputField


                                                    type="text" id="number" name="number" placeholder="Enter your Number" loading={isSubmitting} />
                                                <ErrorMessageBox
                                                    name="number"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">

                                            <div className="mb-4">

                                                <label
                                                    className="text-sm  text-gray-800 font-poppins font-medium"
                                                    htmlFor="email"
                                                >
                                                    Email
                                                </label>

                                                <InputField type="email" id="email" name="email" placeholder="Enter your email" loading={isSubmitting} />
                                                <ErrorMessageBox
                                                    name="email"
                                                />
                                            </div>


                                            <div className="mb-2">

                                                <label
                                                    className="text-sm mb-2 inline-block text-gray-800 font-poppins font-medium"
                                                    htmlFor="nationality"
                                                >
                                                    Nationality
                                                </label>
                                                <SelectField
                                                    name="nationality"
                                                    id="nationality"
                                                    onChange={(e) => {
                                                        const nationality = e?.target?.value
                                                        // handleChangeCities(nationality)
                                                        setFieldValue('nationality', nationality)

                                                    }}
                                                    loading={isSubmitting}
                                                >
                                                    <option value="">
                                                        Select Country
                                                    </option>
                                                    {data?.map((option: any, index: number) => (
                                                        <option key={index} value={option._id}>
                                                            {option.name}
                                                        </option>
                                                    ))}
                                                </SelectField>
                                            </div>





                                        </div>


                                        <div className="mb-2">
                                            <label
                                                className="text-sm text-gray-800 font-poppins font-medium"
                                                htmlFor="description"
                                            >
                                                Description
                                            </label>

                                            <InputField
                                                as="textarea"
                                                id="description"
                                                name="description"
                                                placeholder="Enter what happened here"
                                                loading={isSubmitting}
                                                rows={4}

                                                className="mt-1 !h-32 pt-3 resize-none"

                                            />

                                            <ErrorMessageBox
                                                name="description"
                                            />
                                        </div>


                                        <div className="grid grid-cols-1 max-w-[100px] gap-0">


                                            <button type="submit" disabled={isSubmitting} className="w-full text-sm mb-2 cursor-pointer font-medium bg-[#FF1645] text-white  h-[40px] rounded-[5px] hover:bg-[#D8133A] transition flex items-center justify-center">
                                                {isSubmitting ? (
                                                    <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                                    </svg>
                                                ) : null}
                                                {isSubmitting ? "loading..." : "Send"}
                                            </button>
                                        </div>








                                    </Form>
                                )}
                            </Formik>
                        </div>

                    </div>
                </div>

            </Container>


            <Footer />

        </main>
    )
}

export default ContactPage