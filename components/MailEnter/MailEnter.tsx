'use client'

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import { useLoginMutation } from "@/redux/auth/authApi";
import { LOCAL_STORAGE_KEYS } from "@/api/storage";
import { useDispatch } from "react-redux";
import { loginFailure, loginLoading, loginSuccess } from "@/redux/userSlice/userSlice";
import { errorToast, successToast } from "@/components/Toast";
import SectionDivider from "@/components/atom/SectionDivider/SectionDivider";
import Link from "next/link";
import InputField from "../Forms/InputField";
import ErrorMessageBox from "../Forms/ErrorMessageBox";
import Container from "../atom/Container/Container";
import { handleApiError } from "@/utils/handleApiError";

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});

type TogglePassword = "password" | "text";


const MailEnter = () => {


    const [togglePassword, setTogglePassword] = useState<TogglePassword>("password");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const [login] = useLoginMutation();
    const dispatch = useDispatch();

    const handleSubmit = async (
        values: { email: string; password: string },
        { setSubmitting }: any
    ) => {
        try {

            setIsSubmitting(true);
            dispatch(loginLoading())
            const response = await login(values).unwrap();
            if (response.success) {
                localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, response.accessToken);
                localStorage.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken);
                localStorage.setItem(LOCAL_STORAGE_KEYS.USER_DATA, JSON.stringify(response.user));

                router.push('/');
            }
            successToast('Successfully logged in');

            dispatch(loginSuccess({
                user: response.user,
                token: response.accessToken,
            }))
        } catch (error: any) {
            dispatch(loginFailure(error))
            handleApiError(error);
        } finally {
            setIsSubmitting(false);
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


                <section className="flex min-h-[80vh] flex-col pb-20 items-center justify-center bg-white">
                    <p className=" font-poppins max-w-[400px] mt-6 font-medium text-[19.5px]  sm:text-[24px]">Welcome Back to PropertySeller!</p>

                    <Formik
                        initialValues={{ email: "", password: "" }}
                        validationSchema={LoginSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="w-full max-w-[400px] mt-4 smmt-6 bg-white">


                                <div className="mb-2">

                                    <InputField
                                        type="text"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your Email"
                                        loading={isSubmitting}
                                    />
                                    <ErrorMessageBox
                                        name="email"
                                    />
                                </div>

                             

                                <button type="submit" disabled={isSubmitting} className="w-full mt-3 text-[14px] cursor-pointer font-medium bg-[#FF1645] text-white  h-[35px] rounded-[3px] hover:bg-[#D8133A] transition flex items-center justify-center">
                                    {isSubmitting ? (
                                        <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                        </svg>
                                    ) : null}
                                    {isSubmitting ? "loading..." : "Log In"}
                                </button>

                                   <p className="text-[12px] font-poppins font-normal pt-3 text-[#333333]">Don’t Have an Account?

                                        <Link className="text-black ms-1 font-poppins text-[12px] font-medium" href={'/registration'}>Sign Up</Link>
                                    </p>
                            </Form>
                        )}
                    </Formik>
                </section>
            </Container>

            <Footer />
        </>
    );
};

export default MailEnter;
