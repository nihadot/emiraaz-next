'use client'
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import React from 'react'
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import SectionDivider from "@/components/atom/SectionDivider/SectionDivider";
import Container from "../atom/Container/Container";
import ErrorMessageBox from "../Forms/ErrorMessageBox";
import InputField from "../Forms/InputField";

const ResetNewPasswordSchema = Yup.object().shape({

    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], "Passwords must match")  // Confirm password matches password
        .required("Confirm password is required"),
});

type TogglePassword = "password" | "text";

type Props = {
    title: string;
    handleSubmit: (e: {
        password: string;
        confirmPassword: string;
    }) => void;
    loading: boolean;
}
function ResetPassword({
    title = 'Reset Your Password',
    handleSubmit,
    loading

}: Props) {

    const [togglePassword, setTogglePassword] = useState<TogglePassword>("password");
    const [toggleConfirmPassword, setToggleConfirmPassword] = useState('password');

    const handleTogglePassword = (value: TogglePassword) => setTogglePassword(value);
    const handleToggleConfirmPassword = (type: TogglePassword) => setToggleConfirmPassword(type);


    return (
        <>
            <Header />
            <SectionDivider
                containerClassName="mt-[10.5px] mb-[12px]"
                lineClassName="h-[1px] w-full bg-[#DEDEDE]"
            />
            <Container>

                <section className="flex flex-col min-h-[90vh] pb-20 items-center justify-center bg-white">


                    <p className=" font-poppins max-w-[400px] mt-6 font-medium text-[19.5px]  sm:text-[18px]">{title}</p>
                    <Formik
                        initialValues={{ password: "", confirmPassword: "" }}
                        validationSchema={ResetNewPasswordSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="w-full max-w-[400px] mt-4 smmt-6 bg-white">

                                <div className="mb-3 relative">

                                    <InputField type={togglePassword} id="password" name="password" placeholder="Enter your password" loading={loading} />
                                    <ErrorMessageBox
                                        name="password"
                                    />
                                    <div className="absolute top-3 right-3">
                                        {togglePassword === 'password' ? (
                                            <FaEye onClick={() => handleTogglePassword('text')} size={20} className={loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"} />
                                        ) : (
                                            <FaEyeSlash onClick={() => handleTogglePassword("password")} size={20} className={loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"} />
                                        )}
                                    </div>
                                </div>

                                <div className="mb-2 relative">

                                    <InputField type={toggleConfirmPassword} id="confirmPassword" name="confirmPassword" placeholder="Confirm your password" loading={loading} />
                                    <ErrorMessageBox
                                        name="confirmPassword"
                                    />
                                    <div className="absolute top-3 right-3">
                                        {toggleConfirmPassword === 'password' ? (
                                            <FaEye onClick={() => handleToggleConfirmPassword('text')} size={20} className={loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"} />
                                        ) : (
                                            <FaEyeSlash onClick={() => handleToggleConfirmPassword("password")} size={20} className={loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"} />
                                        )}
                                    </div>
                                </div>


                                <button type="submit" disabled={loading} className="w-full mt-3 text-[14px] cursor-pointer font-medium bg-[#FF1645] text-white  h-[35px] rounded-[3px] hover:bg-[#D8133A] transition flex items-center justify-center">
                                    {loading ? (
                                        <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                        </svg>
                                    ) : null}
                                    {loading ? "loading..." : "Submit"}
                                </button>


                            </Form>
                        )}
                    </Formik>
                </section>
            </Container>

            <Footer />
        </>
    )
}

export default ResetPassword





