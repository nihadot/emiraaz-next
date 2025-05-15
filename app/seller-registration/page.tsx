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
import Container from '@/components/atom/Container/Container'
import SectionDivider from '@/components/atom/SectionDivider/SectionDivider'

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

const PropertyTypes: { id: number; value: string; label: string }[] = [
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
      <>
        <Header />
        <SectionDivider
          containerClassName="mt-[10.5px] mb-[12px]"
          lineClassName="h-[1px] w-full bg-[#DEDEDE]"
        />
        <Container>

          <section className="mt-4 mb-28 gap-[19px] md:gap-0 flex-col md:flex-row flex items-center justify-between w-full ">

            <div className="max-w-[518px] sm:gap-0 w-full">
              <p className='font-poppins  font-medium text-[20px]  sm:text-[34px]'>Sell Your Property Effortlessly with PropertySeller!</p>
              <p className='font-poppins mt-[9px] sm:mt-0 text-[10.5px] sm:text-[12px] font-normal text-[#666666]'>Ready to sell your property? Our Seller Registration form makes it simple to list your property on PropertySeller and connect with eager buyers. Fill out the required information, including your name, contact details, property type, location, and asking price. Once submitted, our dedicated team will review your listing to ensure it reaches a broad audience of interested buyers. Begin your selling journey today and let us help you achieve a successful sale!</p>
            </div>
            <div className="flex justify-center items-center flex-1 w-full">
              <Formik
                initialValues={initialFormData}
                validationSchema={SellerSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, setFieldValue, values }) => (
                  <Form className="w-full max-w-[372px]  bg-white space-y-5">
                    <div>
                      <LabelFields
                        title='Name'
                        htmlFor='name'
                      />

                      <InputField
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        loading={isSubmitting}
                      />
                      {/* <label htmlFor="name" className="block text-black">Name</label> */}
                      {/* <Field
                      type="text"
                      id="name"
                      name="name"
                      className="mt-1.5 p-2 px-4 w-full bg-[#F7F7F7] border rounded"
                      placeholder="Enter your name"
                      disabled={isSubmitting}
                    /> */}
                      <ErrorMessage name="name" component="div" className="text-red-500 mt-1" />
                    </div>

                    <div>
                      <LabelFields
                        title='Number'
                        htmlFor='number'
                      />
                      {/* <label htmlFor="number" className="block font-normal text-black">Phone Number</label> */}
                      <InputField
                        type="text"
                        id="number"
                        name="number"
                        placeholder="Enter your phone number"
                        loading={isSubmitting}
                      />
                      <ErrorMessage name="number" component="div" className="text-red-500 mt-1" />
                    </div>

                    <div>

                      <LabelFields
                        title='Property Type'
                        htmlFor='propertyType'
                      />
                      <Field
                        as="select"
                        name="propertyType"
                        className="border w-full outline-none border-[#DEDEDE] rounded px-4 font-poppins text-[11px] sm:text-[13.5px] font-medium py-2"
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
                      <LabelFields
                        title='Emirate'
                        htmlFor='emirateId'
                      />
                      <Field
                        as="select"
                        name="emirateId"
                        className="border w-full outline-none border-[#DEDEDE] rounded px-4 font-poppins text-[11px] sm:text-[13.5px] font-medium py-2"
                      >
                        <option value="">Select Emirate</option>
                        {emirateOptions.map((option) => (
                          <option className='capitalize' key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage name="emirateId" component="div" className="text-red-500 mt-1" />
                    </div>


                    <div>
                      <LabelFields
                        title='City'
                        htmlFor='cityId'
                      />
                      <InputField
                        type="text"
                        id="cityId"
                        name="cityId"
                        placeholder="Enter city"
                        loading={isSubmitting}
                      />
                      <ErrorMessage name="cityId" component="div" className="text-red-500 mt-1" />
                    </div>

                    {/* Bedroom Selector */}
                    <div>
                      <LabelFields
                        title='Number of Bedrooms'
                        htmlFor='bedrooms'
                      />
                      <div className="flex gap-2 mt-2">
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <button
                            type="button"
                            key={num}
                            className={`border w-[37px] h-[37px] flex items-center justify-center outline-none border-[#DEDEDE] rounded px-4 font-poppins text-[11px] sm:text-[13.5px] font-medium py-2 ${values.numberOfBedrooms === String(num)
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
                      <LabelFields
                        title='Asking Price'
                        htmlFor='askingPrice'
                      />
                      <InputField
                        type="number"
                        id="askingPrice"
                        name="askingPrice"
                        loading={isSubmitting}
                        placeholder="Enter asking price"
                      />
                      <ErrorMessage name="askingPrice" component="div" className="text-red-500 mt-1" />
                    </div>

                    <div>
                      <LabelFields
                        title='Purchasing Price'
                        htmlFor='purchasingPrice'
                      />
                      <InputField
                        type="number"
                        id="purchasingPrice"
                        name="purchasingPrice"
                        loading={isSubmitting}
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
                        "Submit"
                      )}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </section>
        </Container>

      </>
      <Footer />
    </main>
  )
}

export default SellerRegisterPage




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