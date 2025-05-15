'use client'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import { useLoginMutation, useSignUpMutation } from "@/redux/auth/authApi";
import { errorToast } from "@/components/Toast";
import SectionDivider from "@/components/atom/SectionDivider/SectionDivider";

const LoginSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "name must be at least 3 characters")
        .required("name is required"),
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    number: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
        .required("Phone number is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], "Passwords must match")  // Confirm password matches password
        .required("Confirm password is required"),
});

type TogglePassword = "password" | "text";

const AdminLogin = () => {
    const [togglePassword, setTogglePassword] = useState<TogglePassword>("password");
    const [toggleConfirmPassword, setToggleConfirmPassword] = useState('password');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleTogglePassword = (value: TogglePassword) => setTogglePassword(value);
    const handleToggleConfirmPassword = (type: TogglePassword) => setToggleConfirmPassword(type);

    const router = useRouter();

    // Initialize the login mutation hook
    const [signup, { isLoading, error }] = useSignUpMutation();

    const handleSubmit = async (values: { name: string; email: string; number: string; password: string,confirmPassword:string }, { setSubmitting }: any) => {
        try {
            setIsSubmitting(true); // Show loading state
            const {confirmPassword,...others} = values
            // Call the signup mutation from Redux Toolkit query
            const response = await signup(others).unwrap();

            router.push('/login'); // Redirect to dashboard on successful login

        } catch (error: any) {
            // console.error("Login Error:", error.message);
            errorToast(error?.response?.data?.message || error?.data?.message || error?.response?.message || error?.message || 'Error occurred, please try again later');
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
            <section className="flex flex-col max-w-[440px] m-auto p-6 items-center justify-center h-screen bg-white">
                <h1 className="text-start sm:text-center font-normal text-gray-900">
                    {/* Welcome Back <span className="text-[#FF1645]">Admin</span> */}
                </h1>
                <p className='font-poppins  font-medium text-[19.5px]  sm:text-[24px]'>Sell Your Property Effortlessly with PropertySeller!</p>

                <Formik
                    initialValues={{ name: "mac book", email: "macbook@gmail.com", number: "1212121212", password: "Macbook@123#", confirmPassword: "Macbook@123#" }}
                    validationSchema={LoginSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="w-full  mt-6 bg-white">
                            <div className="mb-4">
                            <LabelFields
                      title='Name'
                      htmlFor='name'
                    />
                                {/* <label htmlFor="name" className="block font-normal text-black">Name</label> */}
                                <InputField type="text" id="name" name="name" placeholder="Enter your Name"  loading={isSubmitting} />
                                <ErrorMessage name="name" component="div" className="text-red-500 mt-1" />
                            </div>

                            <div className="mb-4">
                            <LabelFields
                      title='Email'
                      htmlFor='email'
                    />
                                {/* <label htmlFor="email" className="block font-normal text-black">Email</label> */}
                                <InputField type="email" id="email" name="email" placeholder="Enter your email" loading={isSubmitting} />
                                <ErrorMessage name="email" component="div" className="text-red-500 mt-1" />
                            </div>

                            <div className="mb-4">
                            <LabelFields
                      title='Number'
                      htmlFor='number'
                    />
                                {/* <label htmlFor="number" className="block font-normal text-black">number Number</label> */}
                                <InputField type="text" id="number" name="number" placeholder="Enter your number number" loading={isSubmitting} />
                                <ErrorMessage name="number" component="div" className="text-red-500 mt-1" />
                            </div>

                            <div className="mb-4 relative">
                            <LabelFields
                      title='Password'
                      htmlFor='password'
                    />
                                {/* <label htmlFor="password" className="block font-normal text-black">Password</label> */}
                                <InputField type={togglePassword} id="password" name="password" placeholder="Enter your password" loading={isSubmitting} />
                                <ErrorMessage name="password" component="div" className="text-red-500 mt-1" />
                                <div className="absolute top-10 right-4">
                                    {togglePassword === 'password' ? (
                                        <FaEye onClick={() => handleTogglePassword('text')} size={20} className={isSubmitting ? "cursor-not-allowed opacity-50" : "cursor-pointer"} />
                                    ) : (
                                        <FaEyeSlash onClick={() => handleTogglePassword("password")} size={20} className={isSubmitting ? "cursor-not-allowed opacity-50" : "cursor-pointer"} />
                                    )}
                                </div>
                            </div>

                            <div className="mb-4 relative">
                                <LabelFields
                                title="Confirm Password"

                                htmlFor="confirmPassword"/>
                                <InputField type={toggleConfirmPassword} id="confirmPassword" name="confirmPassword" placeholder="Confirm your password" loading={isSubmitting} />
                                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 mt-1" />
                                <div className="absolute top-10 right-4">
                                    {toggleConfirmPassword === 'password' ? (
                                        <FaEye onClick={() => handleToggleConfirmPassword('text')} size={20} className={isSubmitting ? "cursor-not-allowed opacity-50" : "cursor-pointer"} />
                                    ) : (
                                        <FaEyeSlash onClick={() => handleToggleConfirmPassword("password")} size={20} className={isSubmitting ? "cursor-not-allowed opacity-50" : "cursor-pointer"} />
                                    )}
                                </div>
                            </div>

                            <div>
                                <button type="submit" disabled={isSubmitting} className="w-full bg-[#FF1645] text-white p-2 rounded-md hover:bg-[#D8133A] transition flex items-center justify-center">
                                    {isSubmitting ? (
                                        <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                        </svg>
                                    ) : null}
                                    {isSubmitting ? "Logging in..." : "Sign Up"}
                                </button>
                            </div>
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