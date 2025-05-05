'use client'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { RootState } from '@/redux/store'
import Header from '@/components/Header'
import { Footer } from '@/components/Footer'
import Typography from '@/components/atom/typography/Typography'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from "yup"
import { errorToast, successToast } from '@/components/Toast'
import { useEditProfileMutation } from '@/redux/auth/authApi'
import { LOCAL_STORAGE_KEYS } from '@/api/storage'

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

const ProfilePage = () => {
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
      successToast("Profile updated successfully")
    } catch (error: any) {
      errorToast("Something went wrong")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main>
      <div className="max-w-[1440px] mx-auto">
        <Header />
        <div className="px-5 lg:px-8 xl:px-[144px] py-8">
          <Formik
            enableReinitialize
            initialValues={formData}
            validationSchema={ProfileSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="w-full max-w-[440px] bg-white space-y-5">
                <div>
                  <label htmlFor="name" className="block font-normal text-black">Name</label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    className="mt-1.5 p-2 px-4 rounded border placeholder:text-xs w-full bg-[#F7F7F7]"
                    disabled={isSubmitting}
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500 mt-1" />
                </div>

                <div>
                  <label htmlFor="nationality" className="block font-normal text-black">Nationality</label>
                  <Field
                    as="select"
                    name="nationality"
                    className="mt-1.5 p-2 px-4 rounded border placeholder:text-xs w-full bg-[#F7F7F7]"
                    disabled={isSubmitting}
                  >
                    <option value="">Select nationality</option>
                    <option value="Indian">Indian</option>
                    <option value="American">American</option>
                    <option value="British">British</option>
                    <option value="Other">Other</option>
                  </Field>
                  <ErrorMessage name="nationality" component="div" className="text-red-500 mt-1" />
                </div>

                <div>
                  <label htmlFor="email" className="block font-normal text-black">Email</label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    className="mt-1.5 p-2 px-4 rounded border placeholder:text-xs w-full bg-[#F7F7F7]"
                    disabled={isSubmitting}
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 mt-1" />
                </div>

                <div>
                  <label htmlFor="number" className="block font-normal text-black">Phone Number</label>
                  <Field
                    type="text"
                    id="number"
                    name="number"
                    placeholder="Enter your phone number"
                    className="mt-1.5 p-2 px-4 rounded border placeholder:text-xs w-full bg-[#F7F7F7]"
                    disabled={isSubmitting}
                  />
                  <ErrorMessage name="number" component="div" className="text-red-500 mt-1" />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#FF1645] text-white p-2 rounded-md hover:bg-[#D8133A] flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Updating...
                    </>
                  ) : (
                    "Update Profile"
                  )}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default ProfilePage
