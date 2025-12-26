'use client'
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Suspense, useState } from "react";
import { useRouter } from 'next/navigation';
import React from 'react'
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import SectionDivider from "@/components/atom/SectionDivider/SectionDivider";
import Container from "../atom/Container/Container";
import ErrorMessageBox from "../Forms/ErrorMessageBox";
import InputField from "../Forms/InputField";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useCountryCode } from "@/utils/useCountryCode";
import { useAddQuickEnquiryMutation } from "@/redux/quickEnquiry/quickEnquiryApi";
import { errorToast, successToast } from "../Toast";

const LoginSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .required("Name is required"),
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    number: Yup.string()
        .min(10, "Number must be at least 10 digits").max(15, "Number must be at most 15 digits")
        .required("Number is required"),

    notes: Yup.string()
        .min(6, "Notes must be at least 6 characters")
        .required("Notes is required"),

});



export default function QuickEnquiryComponent() {

    const [_isSubmitting, setIsSubmitting] = useState(false);
    const countryCode = useCountryCode();


    const router = useRouter();

    // Initialize the login mutation hook
    const [quickEnquiry, { isLoading, error }] = useAddQuickEnquiryMutation();

    const handleSubmit = async (values: { name: string; email: string; number: string; notes: string }, { setSubmitting, resetForm }: any) => {
        try {
            setIsSubmitting(true); // Show loading state

            // Call the signup mutation from Redux Toolkit query
            const response = await quickEnquiry({
                name: values.name,
                email: values.email,
                number: values.number,
                notes: values.notes,
            }).unwrap();

            // localStorage.setItem(LOCAL_STORAGE_KEYS.SIGNUP_OTP_TOKEN, response.token);
            // localStorage.setItem(LOCAL_STORAGE_KEYS.SIGNUP_TEM_DATA, values.email);

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

    if(!countryCode){
        return null
    }

  

    return (
        <>
            <Header />
            <SectionDivider
                containerClassName="mt-[10.5px] mb-[12px]"
                lineClassName="h-[1px] w-full bg-[#DEDEDE]"
            />
            <Container>

                <section className="flex flex-col min-h-[90vh] pb-20 items-center justify-center bg-white">


                    <h1 className='font-poppins max-w-[400px] mt-6 font-medium text-[19.5px]  sm:text-[24px]'>Quick Enquiry</h1>
                    <p
                        className="text-sm pt-3 text-[#666666] font-poppins font-normal"
                    >Need help? Share your details and we’ll get back to you.</p>
                    {<Formik
                        initialValues={{ name: "", email: "", number: countryCode, notes: "" }}
                        validationSchema={LoginSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, setFieldValue, values }) => (
                            <Form className="w-full max-w-[400px] mt-4 bg-white">
                                <div className="mb-3">
                                    <label className="text-sm text-gray-800 font-poppins font-medium" htmlFor="">Name</label>
                                    <InputField
                                        className="mt-1"
                                        type="text" id="name" name="name" placeholder="Enter your Name" loading={isSubmitting} />
                                    <ErrorMessageBox
                                        name="name"
                                    />
                                </div>


                                <div className="mb-3">
                                    <label className="text-sm text-gray-800 font-poppins font-medium" htmlFor="">Phone Number</label>
                                    <PhoneInput
                                        value={values.number}
                                        specialLabel=" "
                                        placeholder='Your Phone Number'
                                        onChange={(e) => {
                                            setFieldValue("number", e)
                                        }}

                                        inputProps={{
                                            name: 'phone',
                                            required: true,

                                            // fontSize: '16px',

                                        }}

                                        inputClass="cw-full outline-none border-[#DEDEDE] border-[2px] !rounded-[3px] bg-[#F7F7F7] px-[16px] font-poppins text-base sm:text-xs font-normal  text-black h-[40px]"
                                        // searchClass="w-full bg-red-500 border"


                                        inputStyle={{
                                            width: '100%',
                                            height: '40px',
                                            // borderRadius: '2px',
                                            // fontSize: '16px',
                                            // borderWidth: '2px',
                                            borderColor: '#ccc',
                                            backgroundColor: '#F7F7F7',
                                        }}
                                        countryCodeEditable={false}
                                    />
                                    <ErrorMessageBox
                                        name="number"
                                    />
                                </div>



                                <div className="mb-3">
                                    <label className="text-sm text-gray-800 font-poppins font-medium" htmlFor="">Email</label>

                                    <InputField
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        loading={isSubmitting}
                                        className="mt-1"
                                    />
                                    <ErrorMessageBox
                                        name="email"
                                    />
                                </div>



                                <div className="mb-3">
                                    <label
                                        className="text-sm text-gray-800 font-poppins font-medium"
                                        htmlFor="notes"
                                    >
                                        Note
                                    </label>

                                    <InputField
                                        as="textarea"
                                        id="notes"
                                        name="notes"
                                        placeholder="Enter note here"
                                        loading={isSubmitting}
                                        rows={4}

                                        className="mt-1 h-32! pt-3 resize-none"

                                    />

                                    <ErrorMessageBox
                                        name="notes"
                                    />
                                </div>



                                <button type="submit" disabled={isSubmitting} className="w-full mt-3 text-[14px] cursor-pointer font-medium bg-[#FF1645] text-white  h-[35px] rounded-[3px] hover:bg-[#D8133A] transition flex items-center justify-center">
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
                    </Formik>}
                </section>
            </Container>

            <Footer />
        </>
    )
}

