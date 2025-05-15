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

            setIsSubmitting(true);
            dispatch(loginLoading())
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
            <SectionDivider
                containerClassName="mt-[10.5px] mb-[12px]"
                lineClassName="h-[1px] w-full bg-[#DEDEDE]"
            />


            <section className="flex w-full max-w-[440px] justify-center flex-col p-6 items-center m-auto my-32 bg-white">
                <p className=" text-[19.5px] sm:text-[27px] font-poppins text-center font-medium mb-4">Welcome Back to PropertySeller!</p>

                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={LoginSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="w-full bg-white">


                            <div className="mb-2">
                                <LabelFields
                                    title='Email'
                                    htmlFor='email'
                                />
                                <InputField
                                    type="text"
                                    id="email"
                                    name="email"
                                    placeholder="Enter your Email"
                                    loading={isSubmitting}
                                />
                                {/* <label htmlFor="email" className="block font-normal text-black">Email</label> */}
                                {/* <Field type="email" id="email" name="email" placeholder="Enter your email" className="mt-1.5 p-2 px-4 rounded border-slate-200 placeholder:text-xs border w-full bg-[#F7F7F7] focus:ring-[#FF1645] focus:border-[#FF1645]" disabled={isSubmitting} /> */}
                                <ErrorMessage name="email" component="div" className="text-red-500 mt-1" />
                                </div>

                            <div className="mb-6 relative">
                                <LabelFields
                                    title='Password'
                                    htmlFor='password'
                                />

                                <InputField
                                    type="text"
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    loading={isSubmitting}
                                />
                                {/* <label htmlFor="password" className="block font-normal text-black">Password</label> */}
                                {/* <Field type={togglePassword} id="password" name="password" placeholder="Enter your password" className="mt-1.5 p-2 px-4 rounded border-slate-200 placeholder:text-xs border w-full bg-[#F7F7F7] focus:ring-[#FF1645] focus:border-[#FF1645]" disabled={isSubmitting} /> */}
                                {/* <ErrorMessage name="password" component="div" className="text-red-500 mt-1" /> */}
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