'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Header from '@/components/Header'
import { Footer } from '@/components/Footer'
import { successToast, errorToast } from '@/components/Toast'
// import { useRegisterSellerMutation } from '@/redux/seller/sellerApi' // If applicable
import axios from 'axios'
import { baseUrl } from '@/api'
import { useFetchAllEmirateNamesQuery } from '@/redux/emirates/emiratesApi'
import { LOCAL_STORAGE_KEYS } from '@/api/storage'
import apiClient from '@/api/apiClient'

const SellerSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  number: Yup.string()
    .matches(/^[0-9]+$/, "Only digits allowed")
    .min(10, "Must be at least 10 digits")
    .required("Phone number is required"),
  propertyType: Yup.string().required("Property type is required"),
  emirateId: Yup.string().required("Emirate is required"),
  cityId: Yup.string().required("City is required"),
  numberOfBedrooms: Yup.string().required("Select number of bedrooms"),
  askingPrice: Yup.number().required("Asking price is required"),
  purchasingPrice: Yup.number().required("Purchasing price is required"),
})

const initialFormData = {
  name: 'asasa',
  number: '1212121212',
  propertyType: '',
  emirateId: '',
  cityId: '',
  numberOfBedrooms: '',
  askingPrice: '12122',
  purchasingPrice: '12121',
}

export const PropertyTypes: { id: number; value: string; label: string }[] = [
  { id: 1, value: "villa", label: "Villa" },
  { id: 2, value: "apartment", label: "Apartment" },
  { id: 3, value: "penthouse", label: "Penthouse" },
  { id: 4, value: "townhouse", label: "Townhouse" },
]



const SellerRegisterPage = () => {
  const router = useRouter()
  // const [registerSeller] = useRegisterSellerMutation() // if using RTK

    const { data: emiratesData } = useFetchAllEmirateNamesQuery();


       const emirateOptions = useMemo(() =>
            emiratesData?.data.map((item) => ({
                label: item.name,
                value: item._id,
                count: 100,
            })) || [],
            [emiratesData]);
  const handleSubmit = async (values: typeof initialFormData, { setSubmitting }: any) => {
    try {
      const data = {
        name: values.name,
        number: values.number,
        propertyType: values.propertyType,
        emirateId: values.emirateId,
        cityId: values.cityId,
        numberOfBeds: values.numberOfBedrooms,
        askingPrice: values.askingPrice,
        purchasedPrice: values.purchasingPrice,
      }
      const token = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN); // Or get from Redux

      // const response = await axios.post(`${baseUrl}/sellers`, values, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //     // You can add more headers here if needed
      //   },
      //   withCredentials: true, // If needed like in fetchBaseQuery's credentials: "include"
      // });

       const response = await apiClient.post(`${baseUrl}/sellers`, data);
      if (response.data.success) {
        console.log(response, 'response')
        successToast("Seller registered successfully")
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
            validationSchema={SellerSchema}
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
                  <label htmlFor="number" className="block text-black">Mobile Number</label>
                  <Field
                    type="text"
                    id="number"
                    name="number"
                    className="mt-1.5 p-2 px-4 w-full bg-[#F7F7F7] border rounded"
                    placeholder="Enter your phone number"
                    disabled={isSubmitting}
                  />
                  <ErrorMessage name="number" component="div" className="text-red-500 mt-1" />
                </div>

                <div>
                  <label htmlFor="propertyType" className="block text-black">Property Type</label>
                  <Field
                    as="select"
                    name="propertyType"
                    className="mt-1.5 p-2 px-4 w-full bg-[#F7F7F7] border rounded"
                  >
                    <option value="">Select Property Type</option>
                    {PropertyTypes.map((type) => (
                      <option key={type.id} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="propertyType" component="div" className="text-red-500 mt-1" />
                </div>
                <div>
  <label htmlFor="emirateId" className="block text-black">Emirate</label>
  <Field
    as="select"
    name="emirateId"
    className="mt-1.5 p-2 px-4 w-full bg-[#F7F7F7] border rounded"
  >
    <option value="">Select Emirate</option>
    {emirateOptions.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </Field>
  <ErrorMessage name="emirateId" component="div" className="text-red-500 mt-1" />
</div>


                <div>
                  <label htmlFor="cityId" className="block text-black">City</label>
                  <Field
                    type="text"
                    id="cityId"
                    name="cityId"
                    className="mt-1.5 p-2 px-4 w-full bg-[#F7F7F7] border rounded"
                    placeholder="Enter city"
                    disabled={isSubmitting}
                  />
                  <ErrorMessage name="cityId" component="div" className="text-red-500 mt-1" />
                </div>

                {/* Bedroom Selector */}
                <div>
                  <label className="block text-black">Number of Bedrooms</label>
                  <div className="flex gap-2 mt-2">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <button
                        type="button"
                        key={num}
                        className={`px-3 py-2 rounded border ${values.numberOfBedrooms === String(num)
                            ? 'bg-[#FF1645] text-white'
                            : 'bg-white text-black'
                          }`}
                        onClick={() => setFieldValue('numberOfBedrooms', String(num))}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                  <ErrorMessage name="numberOfBedrooms" component="div" className="text-red-500 mt-1" />
                </div>

                <div>
                  <label htmlFor="askingPrice" className="block text-black">Asking Price</label>
                  <Field
                    type="number"
                    id="askingPrice"
                    name="askingPrice"
                    className="mt-1.5 p-2 px-4 w-full bg-[#F7F7F7] border rounded"
                    placeholder="Enter asking price"
                  />
                  <ErrorMessage name="askingPrice" component="div" className="text-red-500 mt-1" />
                </div>

                <div>
                  <label htmlFor="purchasingPrice" className="block text-black">Purchasing Price</label>
                  <Field
                    type="number"
                    id="purchasingPrice"
                    name="purchasingPrice"
                    className="mt-1.5 p-2 px-4 w-full bg-[#F7F7F7] border rounded"
                    placeholder="Enter purchasing price"
                  />
                  <ErrorMessage name="purchasingPrice" component="div" className="text-red-500 mt-1" />
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
                    "Register Seller"
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

export default SellerRegisterPage
