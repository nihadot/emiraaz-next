'use client'
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { errorToast, successToast } from '@/components/Toast'
import Header from '@/components/Header'
import { Footer } from '@/components/Footer'
import { usePasswordChangeRequestMutation } from '@/redux/auth/authApi'
import { LOCAL_STORAGE_KEYS } from '@/api/storage'
import { useRouter } from 'next/navigation'
import PrimaryButton from '@/components/Buttons'
import SectionDivider from '@/components/atom/SectionDivider/SectionDivider'

const ChangePasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Please confirm your password'),
})

const ChangePassword = () => {
  // const [changePassword] = useChangePasswordMutation()
  const router = useRouter()
  const [changePassword] = usePasswordChangeRequestMutation();


  const handleSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
    try {
      const { newPassword } = values
      const response = await changePassword({ newPassword }).unwrap()

      if (response.success) {
        // successToast('Password updated successfully')
        resetForm()
        // c
        const token = response.token;
        localStorage.setItem(LOCAL_STORAGE_KEYS.RESET_PASSWORD_TOKEN, token);

        router.push('/otp')
      } else {
        errorToast(response.message || 'Failed to change password')
      }
    } catch (err: any) {
      errorToast(err?.data?.message || 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main>

     <Header />

         <SectionDivider
               containerClassName="mt-[10.5px] mb-[12px]"
               lineClassName="h-[1px] w-full bg-[#DEDEDE]"
             />
    <div className="max-w-[440px] mx-auto bg-white p-5">
     
     
      <h2 className="text-xl font-semibold mb-4">Change Password</h2>
     
      <Formik
        initialValues={{
          newPassword: '',
          confirmPassword: '',
        }}
        validationSchema={ChangePasswordSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
        

            <div>
            <LabelFields
                      title='New Password'
                      htmlFor='newPassword'
                    />
              {/* <label htmlFor="newPassword" className="block">New Password</label> */}
              <InputField
                type="password"
                name="newPassword"
                id="newPassword"
                placeholder='New Password'
                loading={isSubmitting}
              />
              <ErrorMessage name="newPassword" component="div" className="text-red-500 border-[#DEDEDE] rounded mt-1 font-poppins text-[11px] sm:text-[13.5px] font-medium" />
            </div>

            <div>
            <LabelFields
                      title='Confirm Password'
                      htmlFor='confirmPassword'
                    />
              {/* <label htmlFor="confirmPassword" className="block">Confirm Password</label> */}
              <InputField
                type="password"
                name="confirmPassword"
                placeholder='Confirm Password'

                id="confirmPassword"
                loading={isSubmitting}

              />
                            <ErrorMessage name="confirmPassword" component="div" className="text-red-500 border-[#DEDEDE] rounded mt-1 font-poppins text-[11px] sm:text-[13.5px] font-medium" />

            </div>


           
<PrimaryButton
                            disabled={isSubmitting}
                            type="submit"
                            className=" bg-[#FFE7EC] disabled:!bg-[#FFE7EC]/60 max-w-[200px] mt-3 h-[45px] w-full border-none "
                          >
                            <div className="flex justify-center items-center gap-2">
                              <label className=" text-nowrap font-medium text-[#FF1645] text-[13px] font-poppins">{ isSubmitting ? 'Uploading...' : 'Update'}</label>
                            </div>
                          </PrimaryButton>

            {/* <button
                    type="submit"
                    disabled={isSubmitting}
                    className="text-[#FF1645] mt-0 sm:w-[200px] rounded-[4px] text-[13px] font-medium bg-[#FFE7EC] h-[37.5px] w-full font-poppins border-none "
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
                  </button> */}
          </Form>
        )}
      </Formik>
    </div>
         <Footer />
    </main>

  )
}

export default ChangePassword





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