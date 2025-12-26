'use client';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useLoginMutation } from '@/redux/auth/authApi';
import { useRouter } from 'next/navigation';
import { LOCAL_STORAGE_KEYS } from '@/api/storage';
import AuthContainer from './AuthContainer';
import AuthTabs from './AuthTabs';

const LoginSchema = Yup.object({
  email: Yup.string().required(),
  password: Yup.string().min(6).required(),
});

export default function LoginMobile() {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const [login] = useLoginMutation();

  return (
    <AuthContainer
      footer={
        <div className="space-y-3">
          {/* EXACTLY above button */}
          <div className="text-center text-[13px] text-gray-600">
            Continue without account →
          </div>

          <button
            type="submit"
            form="login-form"
            className="w-full h-[52px] rounded-xl bg-black text-white text-base font-medium"
          >
            Continue
          </button>
        </div>
      }
    >
      <AuthTabs />

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={async (values) => {
          const res = await login(values).unwrap();
          localStorage.setItem(
            LOCAL_STORAGE_KEYS.ACCESS_TOKEN,
            res.accessToken
          );
          router.push('/');
        }}
      >
        {() => (
          <Form id="login-form" className="mt-10 space-y-6">
            {/* Email */}
            <div>
              <label className="block text-[13px] font-medium mb-2">
                Email/Phone
              </label>
             <Field
  name="email"
  placeholder="Enter your Email/Phone"
  className="w-full h-[48px] rounded-xl border border-gray-200 px-4 text-sm
             focus:outline-none focus:border-black"
/>

            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-[13px] font-medium mb-2">
                Password
              </label>
             <Field
  name="password"
  type={show ? 'text' : 'password'}
  placeholder="Enter your Password"
  className="w-full h-[48px] rounded-xl border border-gray-200 px-4 text-sm
             focus:outline-none focus:border-black"
/>

              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-4 top-[38px] text-gray-400"
              >
                {show ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>

            {/* Remember / Forgot — FIXED */}
            <div className="flex justify-between items-center text-[13px] text-gray-500">
              <label className="flex items-center gap-2 leading-none">
                <input
                  type="checkbox"
                  className="w-4 h-4 align-middle"
                />
                <span className="leading-none">Remember me</span>
              </label>

              <span
                className="cursor-pointer leading-none"
                onClick={() => router.push('/forgot-password')}
              >
                Forgot Password?
              </span>
            </div>
          </Form>
        )}
      </Formik>
    </AuthContainer>
  );
}
