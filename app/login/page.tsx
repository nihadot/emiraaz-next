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

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});

type TogglePassword = "password" | "text";

const AdminLogin = () => {


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

            dispatch(loginLoading())
            setIsSubmitting(true);
            const response = await login(values).unwrap();
            if (response.success) {
                localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, response.accessToken);
                localStorage.setItem(LOCAL_STORAGE_KEYS.USER_DATA, JSON.stringify(response.user));
                router.push('/');
            }
            successToast('Successfully logged in');

            dispatch(loginSuccess({
                user: response.user,
                token: response.accessToken
            }))
        } catch (error: any) {
            dispatch(loginFailure(error))
            errorToast(error?.response?.data?.message || error?.data?.message || error?.response?.message || error?.message || 'Error occurred, please try again later');

            console.error("Login Error:", error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Header />
            <section className="flex flex-col p-6 items-center justify-center h-screen bg-white">
                <p className="font-medium text-3xl mb-4">Admin Login</p>

                <Formik
                    initialValues={{ email: "macbook@gmail.com", password: "Macbook@123#" }}
                    validationSchema={LoginSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="w-full max-w-[440px] bg-white">
                            <div className="mb-4">
                                <label htmlFor="email" className="block font-normal text-black">Email</label>
                                <Field type="email" id="email" name="email" placeholder="Enter your email" className="mt-1.5 p-2 px-4 rounded border-slate-200 placeholder:text-xs border w-full bg-[#F7F7F7] focus:ring-[#FF1645] focus:border-[#FF1645]" disabled={isSubmitting} />
                                <ErrorMessage name="email" component="div" className="text-red-500 mt-1" />
                            </div>

                            <div className="mb-6 relative">
                                <label htmlFor="password" className="block font-normal text-black">Password</label>
                                <Field type={togglePassword} id="password" name="password" placeholder="Enter your password" className="mt-1.5 p-2 px-4 rounded border-slate-200 placeholder:text-xs border w-full bg-[#F7F7F7] focus:ring-[#FF1645] focus:border-[#FF1645]" disabled={isSubmitting} />
                                <ErrorMessage name="password" component="div" className="text-red-500 mt-1" />
                                <div className="absolute top-10 right-4">
                                    {togglePassword === 'password' ? (
                                        <FaEye onClick={() => setTogglePassword('text')} size={20} className={isSubmitting ? "cursor-not-allowed opacity-50" : "cursor-pointer"} />
                                    ) : (
                                        <FaEyeSlash onClick={() => setTogglePassword("password")} size={20} className={isSubmitting ? "cursor-not-allowed opacity-50" : "cursor-pointer"} />
                                    )}
                                </div>
                            </div>

                            <button type="submit" disabled={isSubmitting} className="w-full bg-[#FF1645] text-white p-2 rounded-md hover:bg-[#D8133A] transition flex items-center justify-center">
                                {isSubmitting ? (
                                    <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                    </svg>
                                ) : null}
                                {isSubmitting ? "Logging in..." : "Login"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </section>
            <Footer />
        </>
    );
};

export default AdminLogin;
