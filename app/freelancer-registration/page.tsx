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
import { FaCheckCircle } from 'react-icons/fa'
import { FaExclamationTriangle } from "react-icons/fa";
import Container from '@/components/atom/Container/Container'
import SpaceWrapper from '@/components/atom/SpaceWrapper/SpaceWrapper'


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

  const isSubmitting = true;
  // Fetch nationalities on mount
  useEffect(() => {
    const fetchNationalities = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${baseUrl}/countries`)
        setNationalities(response.data?.data) // Assuming the response contains an array of nationalities
        // console.log(response.data?.data, 'response.data')
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
        // console.log(response, 'response')
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
      <div className="max-w-[1200px] mx-auto">
        <Header />
        <SpaceWrapper
        className='mb-20'
        >
          
        <section className="mt-4 mb-28 gap-[19px] md:gap-0 flex-col md:flex-row flex items-center justify-between w-full ">

          <div className="max-w-[529px] px-5 sm:gap-0 w-full">
            <p className='font-poppins  font-medium text-[20px]  sm:text-[34px]'>Freelancer – Empowering Real Estate Agents</p>
            <p className='font-poppins mt-[9px] sm:mt-0 text-[10.5px] sm:text-[12px] font-normal text-[#666666]'>At PropertySeller, we provide freelance real estate agents in Dubai with a trusted platform to close their deals seamlessly. As a freelancer, you can finalize your transactions under PropertySeller with an 80/20 commission split, where you receive 80% commission on every successful deal.</p>
            <Points
              content='Exclusive Developer Partnerships – Get access to premium off-plan projects.'
            />
            <Points
              content='Exclusive Developer Partnerships – Get access to premium off-plan projects.'
            />
            <div className="flex border mt-2 p-1 border-[#DEDEDE] rounded-[3.5px] justify-start items-start ms-2 capitalize gap-2">
              <p className='font-poppins text-justify flex items-start text-[10.5px] sm:text-[12px] font-normal text-[#666666] gap-1'>
                <FaExclamationTriangle size={14} color="#FFD700" className="mt-[2px] w-6 h-6" />
                At PropertySeller, we provide freelance real estate agents in Dubai with a trusted platform to close their deals seamlessly. As a freelancer, you can finalize your transactions under PropertySeller with an 80/20 commission split, where you receive 80% commission on every successful deal.
              </p>
            </div>

          </div>
          <div className="flex justify-center items-center flex-1 w-full">
            <Formik
              initialValues={initialFormData}
              validationSchema={FreelancerSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, setFieldValue, values }) => (
                <Form className="w-full max-w-[372px]  bg-white space-y-5">
                  {/* Name */}
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

                    <ErrorMessage name="name" component="div" className="text-red-500 mt-1" />
                  </div>

                  {/* NAtionality */}
                  <div>
                    <LabelFields
                      title='Nationality'
                      htmlFor='nationality'
                    />
                    {/* <label htmlFor="nationality" className="block font-normal text-black">Nationality</label> */}
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
                    <ErrorMessage name="nationality" component="div" className="text-red-500 mt-1" />
                  </div>


                  {/* Phone Number */}
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



                  {/* Email */}

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


        <Container>

          <section className='relative'>
            <textarea name="" id="" className='rounded h-[117px] outline-none border-[#DEDEDE] border w-full font-poppins text-[10.5px] p-3 font-normal ' placeholder='Add Comment'></textarea>


            <button
              type="submit"
              disabled={isSubmitting}
              className="bottom-[19px] right-[13px] w-[100px] absolute bg-[#FF1645] text-white p-2 text-[13.5px] rounded-md hover:bg-[#D8133A] flex items-center justify-center h-[37.5px]"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Posting...
                </>
              ) : (
                "POST"
              )}
            </button>

          </section>
        </Container>


        <Container>

          <div className="gap-[8.25px] mt-[18px] flex">

            <label htmlFor="" className='text-[13.5px] font-poppins font-semibold'>Comments</label>
            <span className='bg-[#FF1645] font-medium px-1 rounded-[2.25px] text-[12px] font-poppins text-white'>25</span>
          </div>

        </Container>



        {/* comments */}
        <Container>

        <div className="mt-[19px]">
            <div className="gap-[8.25px] flex items-center">

              <label htmlFor="" className='text-[13.5px] font-poppins font-semibold'>Jhon Doe</label>
              <p className='font-poppins sm:mt-0 text-[10.5px] sm:text-[12px] font-normal text-[#666666]'>1 Week ago</p>
            </div>

            <p className='font-poppins mt-[9px] sm:mt-0 text-[10.5px] sm:text-[12px] font-normal text-[#666666]'>At PropertySeller, we provide freelance real estate agents in Dubai with a trusted platform to close their deals seamlessly. As a freelancer, you can finalize your transactions under PropertySeller with an 80/20 commission split, where you receive 80% commission on every successful deal.</p>

          </div>




          <div className="mt-[19px]">
            <div className="gap-[8.25px] flex items-center">

              <label htmlFor="" className='text-[13.5px] font-poppins font-semibold'>Jhon Doe</label>
              <p className='font-poppins sm:mt-0 text-[10.5px] sm:text-[12px] font-normal text-[#666666]'>1 Week ago</p>
            </div>

            <p className='font-poppins mt-[9px] sm:mt-0 text-[10.5px] sm:text-[12px] font-normal text-[#666666]'>At PropertySeller, we provide freelance real estate agents in Dubai with a trusted platform to close their deals seamlessly. As a freelancer, you can finalize your transactions under PropertySeller with an 80/20 commission split, where you receive 80% commission on every successful deal.</p>

          </div>




          <div className="mt-[19px]">
            <div className="gap-[8.25px] flex items-center">

              <label htmlFor="" className='text-[13.5px] font-poppins font-semibold'>Jhon Doe</label>
              <p className='font-poppins sm:mt-0 text-[10.5px] sm:text-[12px] font-normal text-[#666666]'>1 Week ago</p>
            </div>

            <p className='font-poppins mt-[9px] sm:mt-0 text-[10.5px] sm:text-[12px] font-normal text-[#666666]'>At PropertySeller, we provide freelance real estate agents in Dubai with a trusted platform to close their deals seamlessly. As a freelancer, you can finalize your transactions under PropertySeller with an 80/20 commission split, where you receive 80% commission on every successful deal.</p>

          </div>


        </Container>


      </SpaceWrapper>

      </div>
      <Footer />
    </main>
  )
}

export default FreelancerRegisterPage





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




type PointsProps = {
  content: string;
  // icon: React.ReactNode;
}


function Points({
  content,
  // icon
}: PointsProps) {
  return (
    <div className="flex mt-[10.5px] items-center justify-center gap-[7.5px]">
      <FaCheckCircle size={12} fill='#FF1645' color='#FF1645' />
      <p className='font-poppins  text-[10.5px] sm:text-[12px] font-normal text-[#666666]'>{content}</p>
    </div>

  )
}
