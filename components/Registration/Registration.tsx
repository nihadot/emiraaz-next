'use client'
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import React from 'react'
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import { useSignUpMutation } from "@/redux/auth/authApi";
import { errorToast } from "@/components/Toast";
import SectionDivider from "@/components/atom/SectionDivider/SectionDivider";
import Container from "../atom/Container/Container";
import Link from "next/link";
import ErrorMessageBox from "../Forms/ErrorMessageBox";
import InputField from "../Forms/InputField";
import { LOCAL_STORAGE_KEYS } from "@/api/storage";
import { handleApiError } from "@/utils/handleApiError";

const LoginSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .required("Name is required"),
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    number: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
        .required("Phone Number is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], "Passwords must match")  // Confirm password matches password
        .required("Confirm password is required"),
});

type TogglePassword = "password" | "text";


function Registration() {

    const [togglePassword, setTogglePassword] = useState<TogglePassword>("password");
    const [toggleConfirmPassword, setToggleConfirmPassword] = useState('password');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleTogglePassword = (value: TogglePassword) => setTogglePassword(value);
    const handleToggleConfirmPassword = (type: TogglePassword) => setToggleConfirmPassword(type);

    const router = useRouter();

    // Initialize the login mutation hook
    const [signup, { isLoading, error }] = useSignUpMutation();

    const handleSubmit = async (values: { name: string; email: string; number: string; password: string, confirmPassword: string }, { setSubmitting }: any) => {
        try {
            setIsSubmitting(true); // Show loading state
            const { confirmPassword, ...others } = values
            // Call the signup mutation from Redux Toolkit query
            const response = await signup(others).unwrap();

            localStorage.setItem(LOCAL_STORAGE_KEYS.SIGNUP_OTP_TOKEN,response.token);
            localStorage.setItem(LOCAL_STORAGE_KEYS.SIGNUP_TEM_DATA,values.email);
            
            router.push('/otp-verification'); 
       
        } catch (error: any) {
            // console.error("Login Error:", error.message);
    handleApiError(error);     
   } finally {
            setIsSubmitting(false); // Reset loading state
        }
    };


    return (
        <>
            <Header />
            <SectionDivider
                containerClassName="mt-[10.5px] mb-[12px]"
                lineClassName="h-[1px] w-full bg-[#DEDEDE]"
            />
            <Container>

                <section className="flex flex-col min-h-[90vh] pb-20 items-center justify-center bg-white">


                    <p className='font-poppins max-w-[400px] mt-6 font-medium text-[19.5px]  sm:text-[24px]'>Sell Your Property Effortlessly with PropertySeller!</p>
                    <Formik
                        initialValues={{ name: "", email: "", number: "", password: "", confirmPassword: "" }}
                        validationSchema={LoginSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="w-full max-w-[400px] mt-4 smmt-6 bg-white">
                                <div className="mb-3">

                                    <InputField type="text" id="name" name="name" placeholder="Enter your Name" loading={isSubmitting} />
                                    <ErrorMessageBox
                                        name="name"
                                    />
                                </div>

                                <div className="mb-3">

                                    <InputField type="email" id="email" name="email" placeholder="Enter your email" loading={isSubmitting} />
                                    <ErrorMessageBox
                                        name="email"
                                    />
                                </div>

                                <div className="mb-3">


                                    <InputField type="text" id="number" name="number" placeholder="Enter your number" loading={isSubmitting} />
                                    <ErrorMessageBox
                                        name="number"
                                    />
                                </div>

                                <div className="mb-3 relative">

                                    <InputField type={togglePassword} id="password" name="password" placeholder="Enter your password" loading={isSubmitting} />
                                    <ErrorMessageBox
                                        name="password"
                                    />
                                    <div className="absolute top-3 right-3">
                                        {togglePassword === 'password' ? (
                                            <FaEye onClick={() => handleTogglePassword('text')} size={20} className={isSubmitting ? "cursor-not-allowed opacity-50" : "cursor-pointer"} />
                                        ) : (
                                            <FaEyeSlash onClick={() => handleTogglePassword("password")} size={20} className={isSubmitting ? "cursor-not-allowed opacity-50" : "cursor-pointer"} />
                                        )}
                                    </div>
                                </div>

                                <div className="mb-2 relative">

                                    <InputField type={toggleConfirmPassword} id="confirmPassword" name="confirmPassword" placeholder="Confirm your password" loading={isSubmitting} />
                                    <ErrorMessageBox
                                        name="confirmPassword"
                                    />
                                    <div className="absolute top-3 right-3">
                                        {toggleConfirmPassword === 'password' ? (
                                            <FaEye onClick={() => handleToggleConfirmPassword('text')} size={20} className={isSubmitting ? "cursor-not-allowed opacity-50" : "cursor-pointer"} />
                                        ) : (
                                            <FaEyeSlash onClick={() => handleToggleConfirmPassword("password")} size={20} className={isSubmitting ? "cursor-not-allowed opacity-50" : "cursor-pointer"} />
                                        )}
                                    </div>
                                </div>

                               
                                    <button type="submit" disabled={isSubmitting} className="w-full mt-3 text-[14px] cursor-pointer font-medium bg-[#FF1645] text-white  h-[35px] rounded-[3px] hover:bg-[#D8133A] transition flex items-center justify-center">
                                        {isSubmitting ? (
                                            <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                            </svg>
                                        ) : null}
                                        {isSubmitting ? "loading..." : "Sign Up"}
                                    </button>

<div className="flex w-full justify-center items-center py-3">

                                    <Link
                                    className="text-xs text-black/70"
                                    href={'/login'}>
                                    Already have an account?
                                    </Link>
                                        </div>
                               
                            </Form>
                        )}
                    </Formik>
                </section>
            </Container>

            <Footer />
        </>
    )
}

export default Registration





