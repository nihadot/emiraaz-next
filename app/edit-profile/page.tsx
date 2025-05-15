'use client'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { RootState } from '@/redux/store'
import Header from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from "yup"
import { errorToast, successToast } from '@/components/Toast'
import { useEditProfileMutation } from '@/redux/auth/authApi'
import { LOCAL_STORAGE_KEYS } from '@/api/storage'
import SectionDivider from '@/components/atom/SectionDivider/SectionDivider'
import Container from '@/components/atom/Container/Container'
import { isUserLoad } from '@/redux/userSlice/userSlice'
import PrimaryButton from '@/components/Buttons'

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
      successToast("Profile updated successfully");
               dispatch(isUserLoad({ user:response.user }));
      

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

                  <div>
                    <LabelFields
                      title='Email'
                      htmlFor='email'
                    />
                    {/* <label htmlFor="email" className="block font-normal text-black">Email</label> */}
                    <InputField
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      loading={isSubmitting}
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 mt-1" />
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


                  {/* <PrimaryButton
                                onClick={() => router.push('/change-password')}
                                type="button"
                                className=" bg-[#FFE7EC] h-[37.5px] w-full border-none "
                              >
                                <div className="flex justify-center items-center gap-2">
                                  <label className="text-nowrap font-medium text-[#FF1645] text-[13px] font-poppins">Change Password</label>
                                </div>
                              </PrimaryButton> */}

<PrimaryButton
                            disabled={isSubmitting}
                            type="submit"
                            className=" bg-[#FFE7EC] disabled:!bg-[#FFE7EC]/60 max-w-[200px] mt-3 h-[45px] w-full border-none "
                          >
                            <div className="flex justify-center items-center gap-2">
                              <label className=" text-nowrap font-medium text-[#FF1645] text-[13px] font-poppins">{ isSubmitting ? 'Uploading...' : 'Update'}</label>
                            </div>
                          </PrimaryButton>
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

export default ProfilePage





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