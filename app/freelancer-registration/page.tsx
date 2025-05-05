'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Header from '@/components/Header'
import { Footer } from '@/components/Footer'
import { successToast, errorToast } from '@/components/Toast'
import axios from 'axios'
import { baseUrl } from '@/api'
import { LOCAL_STORAGE_KEYS } from '@/api/storage'
import apiClient from '@/api/apiClient'

const FreelancerSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  nationality: Yup.string().required("Nationality is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Only digits allowed")
    .min(10, "Must be at least 10 digits")
    .required("Phone number is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
})

const initialFormData = {
  name: '',
  nationality: '',
  phone: '',
  email: '',
}

const FreelancerRegisterPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [nationalities, setNationalities] = useState<{ name: string; slug: string; _id: string }[]>([])


 // Fetch nationalities on mount
 useEffect(() => {
  const fetchNationalities = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${baseUrl}/countries`)
      setNationalities(response.data?.data) // Assuming the response contains an array of nationalities
      console.log(response.data?.data,'response.data')
      setLoading(false)
    } catch (error) {
      setLoading(false)
      errorToast("Failed to fetch nationalities")
    }
  }
  fetchNationalities()
}, [])

  const handleSubmit = async (values: typeof initialFormData, { setSubmitting }: any) => {
    try {
      const data = {
        name: values.name,
        nationality: values.nationality,
        number: values.phone,
        email: values.email,
      }
      const token = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);

      const response = await apiClient.post(`${baseUrl}/freelancers`, data);
      if (response.data.success) {
        console.log(response, 'response')
        successToast("Freelancer registered successfully")
        router.push('/') // or any route you want
      } else {
        errorToast(response.data.message || "Something went wrong")
      }

      setSubmitting(false)
    } catch (error: any) {
      errorToast(error?.response?.data?.message || "Something went wrong")
      setSubmitting(false)
    }
  }

  return (
    <main>
      <div className="max-w-[1440px] mx-auto">
        <Header />
        <div className="px-5 lg:px-8 xl:px-[144px] py-8">
          <Formik
            initialValues={initialFormData}
            validationSchema={FreelancerSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form className="w-full max-w-[440px] bg-white space-y-5">
                <div>
                  <label htmlFor="name" className="block text-black">Name</label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1.5 p-2 px-4 w-full bg-[#F7F7F7] border rounded"
                    placeholder="Enter your name"
                    disabled={isSubmitting}
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500 mt-1" />
                </div>

                <div>
                  <label htmlFor="nationality" className="block text-black">Nationality</label>
                  <Field
                    as="select"
                    name="nationality"
                    className="mt-1.5 p-2 px-4 w-full bg-[#F7F7F7] border rounded"
                    disabled={loading || isSubmitting}
                  >
                    <option value="">Select Nationality</option>
                    {nationalities.map((nat) => (
                      <option key={nat._id} value={nat.slug}>
                        {nat.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="nationality" component="div" className="text-red-500 mt-1" />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-black">Phone</label>
                  <Field
                    type="text"
                    id="phone"
                    name="phone"
                    className="mt-1.5 p-2 px-4 w-full bg-[#F7F7F7] border rounded"
                    placeholder="Enter your phone number"
                    disabled={isSubmitting}
                  />
                  <ErrorMessage name="phone" component="div" className="text-red-500 mt-1" />
                </div>

                <div>
                  <label htmlFor="email" className="block text-black">Email</label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1.5 p-2 px-4 w-full bg-[#F7F7F7] border rounded"
                    placeholder="Enter your email"
                    disabled={isSubmitting}
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 mt-1" />
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
                      Submitting...
                    </>
                  ) : (
                    "Register Freelancer"
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

export default FreelancerRegisterPage
