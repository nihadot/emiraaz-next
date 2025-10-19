'use client'
import React, { useState } from 'react'
import Header from '../Header'
import SectionDivider from '../atom/SectionDivider/SectionDivider'
import { Footer } from '../Footer'
import Container from '../atom/Container/Container'
import { Form, Formik } from 'formik'
import * as Yup from "yup";
import { errorToast, successToast } from '../Toast'
import InputField from '../Forms/InputField'
import ErrorMessageBox from '../Forms/ErrorMessageBox'
import PhoneInput from 'react-phone-input-2'
import { useCountryCode } from '@/utils/useCountryCode'
import clsx from 'clsx'
import cookies from "../../app/assets/cookie.png";
import Image from 'next/image'
import { registration_success } from '@/app/assets'
import { X } from 'lucide-react'
import ImageUploader from './ImageUploader'
import { AiOutlineClose } from 'react-icons/ai'
import { IoMdTrash } from 'react-icons/io'
import apiClient from '@/api/apiClient'
import { baseUrl } from '@/api'
import Link from 'next/link'


const ValidationSchema = Yup.object().shape({
    agentName: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .required("Name is required"),
    agentId: Yup.string()
        .optional(),
    description: Yup.string().required("Description is required").min(10, "Description must be at least 10 characters").max(500, "Description must be at most 500 characters"),


});

function ReportSuspiciousAgent() {

    const [isSubmited,setIsSubmited] = useState(false);

    const handleSubmited = () => {
        setIsSubmited(true)
    }

    return (
        <main>
            <Header />
            <SectionDivider
                containerClassName="mt-[10.5px] mb-[12px]"
                lineClassName="h-[1px] w-full bg-[#DEDEDE]"
            />

            <Container>
                { !isSubmited && <Content
                handleSubmited={handleSubmited}
                />}
                { isSubmited && <SubmitSuccess/>}
                {/* <CookiesSection /> */}
            </Container>
            <Footer />
        </main>
    )
}

export default ReportSuspiciousAgent



function Content({handleSubmited}:{handleSubmited:() => void}) {

    const countryCode = useCountryCode();

    const [_isSubmitting, setIsSubmitting] = useState(false);
    const [file,setFile] = useState<any>();
    const handleSubmit = async (values: { agentName: string; agentId: string; description: string }, { setSubmitting, resetForm }: any) => {
        try {
            setIsSubmitting(true); // Show loading state

            // Call the signup mutation from Redux Toolkit query
            // const response = await quickEnquiry({
            //     name: values.name,
            //     email: values.email,
            //     number: values.number,
            //     notes: values.notes,
            // }).unwrap();

              const response = await apiClient.post(`${baseUrl}/report-suspicious-agent`, {
                agentName: values.agentName,
                ...(values.agentId && { agentId: values.agentId }),
                description: values.description,
              });
                        // const data = await response?.data?.data?._id;
                        // console.log(response.data.data._id,'response')
            

            // console.log(values, 'Values')

            // localStorage.setItem(LOCAL_STORAGE_KEYS.SIGNUP_OTP_TOKEN, response.token);
            // localStorage.setItem(LOCAL_STORAGE_KEYS.SIGNUP_TEM_DATA, values.email);
            handleSubmited()
            // router.push('/otp-verification');
            successToast('Successfully submitted');
            resetForm();
        } catch (error: any) {
            // console.error("Login Error:", error.message);
            errorToast(error?.response?.data?.message || error?.data?.message || error?.response?.message || error?.message || 'Error occurred, please try again later');

        } finally {
            setIsSubmitting(false); // Reset loading state
        }
    };

    return (
        <section className="flex flex-col min-h-[90vh] pb-20 items-center justify-center bg-white">


            <h1 className='font-poppins max-w-[400px] mt-6 font-medium text-[19.5px]  sm:text-[24px]'>Report Suspicious Agent</h1>
            <p
                className="text-sm max-w-[400px] text-center leading-[24px] pt-3 text-[#666666] font-poppins font-normal"
            >Help us investigate this agent by sharing any details you have — such as their name, ID, phone number, screenshots of conversations, or any documents. The more information you provide, the faster we can take appropriate action.</p>
            <Formik
                initialValues={{ agentName: "", agentId: "", description: "" }}
                validationSchema={ValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, setFieldValue, values }) => (
                    <Form className="w-full max-w-[400px] mt-4 bg-white">
                        <div className="mb-3">
                            <label className="text-sm text-gray-800 font-poppins font-medium" htmlFor="">Agent Name </label>
                            <InputField
                                className="mt-1"
                                type="text" id="agentName" name="agentName" placeholder="Enter Agent Name " loading={isSubmitting} />
                            <ErrorMessageBox
                                name="agentName"
                            />
                        </div>


                        <div className="mb-3">
                            <label className="text-sm text-gray-800 font-poppins font-medium" htmlFor="">Agent ID (optional)</label>
                            <InputField
                                className="mt-1"
                                type="text" id="agentId" name="agentId" placeholder="Enter Agent ID" loading={isSubmitting} />
                            <ErrorMessageBox
                                name="agentId"
                            />
                        </div>



                        <div className="mb-3">
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




                        <div className="mb-3">



                            {/* <div
                                className="h-[40px] mt-1 bg-[#F7F7F7] border-[#DEDEDE] border-[2px] flex px-[16px] justify-start rounded-[3px] items-center"
                            >
                                <p className='text-base sm:text-xs font-normal  text-gray-500'>Drag or Choose files</p>
                            </div> */}


                            {/* <ErrorMessageBox
                                name="file"
                            /> */}

                            {/* <ImageUploader
                            
                            renderControls= {
 <label
                                className="text-sm text-gray-800 font-poppins font-medium"
                                htmlFor="file"
                            >
                                File Upload (optional – to submit screenshots)
                            </label>
                            }
                            /> */}
                        </div>


{/* 
                        <ImageUploader
                            onUpload={(file) => setFile(file)}
                            renderControls={(handleFileChange) => (

                                <label
                                    className="h-[40px] mt-1 bg-[#F7F7F7] border-[#DEDEDE] border-[2px] flex px-[16px] justify-start rounded-[3px] items-center"
                                >
                                    <span className='text-base sm:text-xs font-normal  text-gray-500'>Drag or Choose files</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />

                                </label>

                            )}
                            renderPreview={(preview, handleDelete) => (
                                <div className='relative w-[200px] '>
                                   { preview && <img
                                        src={preview}
                                        alt="preview"
                                        className="w-[200px] h-40 object-cover rounded"
                                    />}
                                    <button
                                        onClick={handleDelete}
                                        className="bg-red-500 rounded-full absolute top-0 right-2 mt-2 z-20 text-white  p-2"
                                    >
                                        <IoMdTrash
                                        size={18}
                                        />
                                    </button>
                                </div>
                            )}
                        /> */}








                        <button type="submit" disabled={isSubmitting} className="w-full mt-5 text-[14px] cursor-pointer font-medium bg-[#FF1645] text-white  h-[35px] rounded-[3px] hover:bg-[#D8133A] transition flex items-center justify-center">
                            {isSubmitting ? (
                                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                </svg>
                            ) : null}
                            {isSubmitting ? "loading..." : "Submit"}
                        </button>


                    </Form>
                )}
            </Formik>
        </section>
    )
}




function SubmitSuccess() {
    return (
        <div className=" py-20 sm:pb-40 px-4 flex justify-center items-center flex-col">


            <div className="flex gap-3 m-auto max-w-[600px] justify-center items-center flex-col">
                <div className="relative  w-full h-[50px] rounded-[5px]">
                    <Image
                        src={registration_success}
                        alt='registration success'
                        className='w-full h-full'
                        fill
                    />
                </div>
                <h2
                    className='font-poppins text-center max-w-[400px]  font-medium text-[19.5px]  sm:text-[24px]'
                >Report Submitted Successfully</h2>
                <p
                    className="text-sm text-center  text-[#666666] font-poppins font-normal"
                >Thank you for helping us keep the PropertySeller community safe. Our team will review your report and take necessary action.</p>
                <Link  href={'/'}
                >
                    <Button />
                </Link>
            </div>

        </div>
    )
}




function Button() {
    return (
        <button
            className='border-none pt-2 cursor-pointer bg-[#FF1645] text-white flex px-3  justify-center items-center py-2 gap-3 border rounded-[5px]'
        >
            <label htmlFor="" className='text-[12px] cursor-pointer font-poppins font-medium'>Go To Home</label>


        </button>
    )
}



function CookiesSection() {
    return (
        <section
            className='rounded-[8px] relative right-0 gap-3 top-0 pb-5 pt-5 px-4  max-w-[400px] border border-[#DEDEDE] flex flex-col justify-center items-center'
        >
            <div className="absolute right-3 top-3">
                <X
                    size={18}
                    color='#333333'
                />
            </div>
            <div className="w-14 h-14 relative object-cover">
                <Image
                    src={cookies}
                    alt='cookies'
                    className=''
                    fill
                />
            </div>
            <h2
                className='font-poppins max-w-[340px] w-full  font-medium text-[18px] text-center '

            >Cookies, but Make It Useful</h2>
            <p className='font-poppins py-0 w-full leading-[20px] text-xs font-normal text-[#666666] text-center'>
                We use cookies to make your experience smoother, smarter, and a little more awesome. No tracking for fun — just the stuff that helps us help you better.
            </p>

            <div className="flex gap-3">
                <button
                    className='border-[#DEDEDE] flex px-4 py-2 gap-3 border rounded-[5px]'
                >
                    <label htmlFor="" className='text-[12px] font-medium font-poppins'>Cancel</label>
                </button>
                <button
                    className='bg-[#FF1645] flex px-4 py-2 gap-3 rounded-[5px]'
                >
                    <label htmlFor="" className='text-[12px] text-white font-medium font-poppins'>Accept</label>
                </button>
            </div>

        </section>
    )
}