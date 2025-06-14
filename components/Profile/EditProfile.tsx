'use client'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { RootState } from '@/redux/store'
import Header from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Field, Form, Formik } from 'formik'
import * as Yup from "yup"
import { errorToast, successToast } from '@/components/Toast'
import { useEditProfileMutation } from '@/redux/auth/authApi'
import { LOCAL_STORAGE_KEYS } from '@/api/storage'
import SectionDivider from '@/components/atom/SectionDivider/SectionDivider'
import Container from '@/components/atom/Container/Container'
import { isUserLoad } from '@/redux/userSlice/userSlice'
import PrimaryButton from '@/components/Buttons'
import InputField from '../Forms/InputField'
import ErrorMessageBox from '../Forms/ErrorMessageBox'

// Validation Schema
const ProfileSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    nationality: Yup.string().required("Please select nationality"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    number: Yup.string()
        .matches(/^[0-9]+$/, "Only digits allowed")
        .min(10, "Must be at least 10 digits")
        .required("Phone number is required"),
})

const EditProfile = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { ready, user, isAuthentication } = useSelector((state: RootState) => state.user)

    const [formData, setFormData] = useState({
        name: '',
        nationality: '',
        email: '',
        number: '',
    });
    const [editProfile] = useEditProfileMutation();

    useEffect(() => {
        if (ready && !isAuthentication) {
            router.push('/login')
        }
        if (user) {
            setFormData({
                name: user.name || '',
                nationality: user.nationality || '',
                email: user.email || '',
                number: user.number || '',
            });
        }
    }, [ready, isAuthentication, user]);

    const handleSubmit = async (values: typeof formData, { setSubmitting }: any) => {
        try {
            const response = await editProfile(values).unwrap();
            if (response.success) {
                // localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, response.accessToken);
                localStorage.setItem(LOCAL_STORAGE_KEYS.USER_DATA, JSON.stringify(response.user));
                // router.push('/');
            }

            router.push('/profile');
            successToast("Profile updated successfully");
            dispatch(isUserLoad({ user: response.user }));


        } catch (error: any) {
            errorToast("Something went wrong")
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <main>
            <div className="">
                <Header />

                <SectionDivider
                    containerClassName="mt-[10.5px] mb-[12px]"
                    lineClassName="h-[1px] w-full bg-[#DEDEDE]"
                />

                <Container>

                    <p className='text-[28.5px] mb-[16px] mt-[27px] sm:mb-[17px] font-poppins font-medium'>
                        Edit Profile
                    </p>

                    <p className='font-poppins font-medium mt-[17px] text-[14px] sm:text-[21px]'>Personal Details</p>

                    <div className="mt-[13px] mb-32">
                        <Formik
                            enableReinitialize
                            initialValues={formData}
                            validationSchema={ProfileSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form className="w-full max-w-[440px] bg-white space-y-4 ">
                                    <div className=''>

                                        <InputField
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="Enter your name"
                                            loading={isSubmitting}
                                        />
                                        <ErrorMessageBox
                                            name='name'
                                        />
                                    </div>

                                    <div>
                                        <Field
                                            className="border w-full outline-none border-[#DEDEDE] rounded px-4 font-poppins text-[11px] sm:text-[13.5px] font-medium py-2"


                                            as="select"
                                            name="nationality"
                                            disabled={isSubmitting}
                                        >
                                            <option value="">Select nationality</option>
                                            <option value="Indian">Indian</option>
                                            <option value="American">American</option>
                                            <option value="British">British</option>
                                            <option value="Other">Other</option>
                                        </Field>
                                        <ErrorMessageBox name="nationality" />
                                    </div>

                                    <div>
                                        <InputField
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="Enter your email"
                                            loading={isSubmitting}
                                        />
                                        <ErrorMessageBox name="email" />
                                    </div>

                                    <div>
                                        <InputField
                                            type="text"
                                            id="number"
                                            name="number"
                                            placeholder="Enter your phone number"
                                            loading={isSubmitting}
                                        />
                                        <ErrorMessageBox name="number" />
                                    </div>



                                    <button type="submit" disabled={isSubmitting} className="w-full mt-3 text-[14px] cursor-pointer font-medium bg-[#FF1645] text-white  h-[48px] rounded-[3px] hover:bg-[#D8133A] transition flex items-center justify-center">
                                {isSubmitting ? (
                                    <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                    </svg>
                                ) : null}
                                {isSubmitting ? "subming..." : "Update"}
                            </button>
                                </Form>
                            )}
                        </Formik>
                    </div>

                </Container>

            </div>
            <Footer />
        </main>
    )
}

export default EditProfile

