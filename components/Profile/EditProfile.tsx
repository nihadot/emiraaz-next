'use client'
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import { Suspense, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import React from 'react'
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import { useEditProfileMutation, useFetchUserProfileDetailsQuery, useSignUpMutation } from "@/redux/auth/authApi";
import SectionDivider from "@/components/atom/SectionDivider/SectionDivider";
import Container from "../atom/Container/Container";
import ErrorMessageBox from "../Forms/ErrorMessageBox";
import InputField from "../Forms/InputField";
import { handleApiError } from "@/utils/handleApiError";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import SelectField from "../Forms/SelectField";
import { nationalities } from "@/data";
import { useUserLocalStorage } from "@/app/useUserLocalStorage";
import MobileHeaderTitle from "../atom/typography/MobileHeaderTitle";

const ProfileSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .required("Name is required"),
    nationality: Yup.string().optional(),

});



function RegistrationComponent() {

    // Inside your component
    useAuthRedirect();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { data: fectchedUserProfileDetails, isLoading: isFetchingUserProfileDetails } = useFetchUserProfileDetailsQuery();


    const router = useRouter();

    const { localUser, updateLocalUser, clearUserData } = useUserLocalStorage();

    // Initialize the login mutation hook
    const [editProfile, { isLoading, error }] = useEditProfileMutation();

    const handleSubmit = async (values: { name?: string; nationality?: string; email?: string; number?: string; }) => {
        try {
            setIsSubmitting(true); // Show loading state
            // const { confirmPassword, ...others } = values
            // Call the signup mutation from Redux Toolkit query
            const data = {
                ...(values.nationality && { nationality: values.nationality }),
                name: values.name,
            }
            const response = await editProfile(data).unwrap();

            router.push('/profile');

            updateLocalUser(response.user)

        } catch (error: any) {
            // console.error("Login Error:", error.message);
            handleApiError(error);
        } finally {
            setIsSubmitting(false); // Reset loading state
        }
    };

    return (
        <>
            <Header     logoSection={
                           <div className='h-full w-full flex justify-center items-center'>
                             <MobileHeaderTitle
                            content='Profile'
                            />
                           </div>
                        }/>
            <SectionDivider
                containerClassName="mt-[10.5px] mb-[12px]"
                lineClassName="h-[1px] w-full bg-[#DEDEDE]"
            />
            <Container>

                <section className="flex flex-col min-h-[90vh] pb-20 items-start justify-center bg-white">


                    <p className='font-poppins max-w-[400px] mt-6 font-medium text-[19.5px]  sm:text-[24px]'>Edit Profile</p>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            name: fectchedUserProfileDetails?.user?.name || '',
                            nationality: fectchedUserProfileDetails?.user?.nationality || '',
                            email: fectchedUserProfileDetails?.user?.email || '',
                            number: fectchedUserProfileDetails?.user?.number || '',
                        }}
                        validationSchema={ProfileSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ }) => (
                            <Form className="w-full max-w-[400px] mt-4 smmt-6 bg-white">
                                <div className="mb-3">

                                    <InputField type="text" id="name" name="name" placeholder="Enter your Name" loading={isSubmitting} />
                                    <ErrorMessageBox
                                        name="name"
                                    />
                                </div>

                                <div className="mb-2">

                                    <SelectField
                                        name="nationality"
                                        id="nationality"
                                        loading={isSubmitting}
                                    >
                                        {nationalities.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </SelectField>
                                </div>


                                <div className="mb-3">

                                    <InputField className="cursor-not-allowed" type="email" id="email" name="email" placeholder="Enter your email" loading={true} />
                                    <ErrorMessageBox
                                        name="email"
                                    />
                                </div>

                                <div className="mb-3">

                                    <InputField


                                        type="number" className="cursor-not-allowed" id="number" name="number" placeholder="Enter your number" loading={true} />
                                    <ErrorMessageBox
                                        name="number"
                                    />
                                </div>




                                <button type="submit" disabled={isSubmitting} className="w-full mt-3 text-[14px] cursor-pointer font-medium bg-[#FF1645] text-white  h-[35px] rounded-[3px] hover:bg-[#D8133A] transition flex items-center justify-center">
                                    {isSubmitting ? (
                                        <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                        </svg>
                                    ) : null}
                                    {isSubmitting ? "loading..." : "Update"}
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

// export default Registration


export default function Registration() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegistrationComponent />
    </Suspense>
  );
}

