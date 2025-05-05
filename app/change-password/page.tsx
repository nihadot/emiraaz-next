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
        console.log(response,'response');
        const token = response.token;
        localStorage.setItem(LOCAL_STORAGE_KEYS.RESET_PASSWORD_TOKEN, token);

        router.push('/profile')
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
              <label htmlFor="newPassword" className="block">New Password</label>
              <Field
                type="password"
                name="newPassword"
                id="newPassword"
                className="w-full p-2 mt-1 border rounded bg-[#F7F7F7]"
              />
              <ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block">Confirm Password</label>
              <Field
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className="w-full p-2 mt-1 border rounded bg-[#F7F7F7]"
              />
              <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#FF1645] text-white py-2 rounded hover:bg-[#D8133A]"
            >
              {isSubmitting ? "Updating..." : "Change Password"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
         <Footer />
    </main>

  )
}

export default ChangePassword
