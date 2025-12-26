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
        <button className="w-full h-14 rounded-xl bg-black text-white text-base font-medium">
          Continue
        </button>
      }
    >
      <AuthTabs />

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={async (values) => {
          const res = await login(values).unwrap();
          localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, res.accessToken);
          router.push('/');
        }}
      >
        {() => (
          <Form className="space-y-6">
            <div>
              <label className="text-sm font-medium">Email/Phone</label>
              <Field
                name="email"
                placeholder="Enter your Email/Phone"
                className="w-full h-12 mt-2 rounded-xl border px-4"
              />
            </div>

            <div className="relative">
              <label className="text-sm font-medium">Password</label>
              <Field
                name="password"
                type={show ? 'text' : 'password'}
                placeholder="Enter your Password"
                className="w-full h-12 mt-2 rounded-xl border px-4"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-4 top-11"
              >
                {show ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="flex justify-between text-sm text-gray-500">
              <label className="flex gap-2">
                <input type="checkbox" /> Remember me
              </label>
              <span onClick={() => router.push('/forgot-password')}>
                Forgot Password?
              </span>
            </div>

            <div className="text-center text-sm text-gray-600 mt-12">
              Continue without account →
            </div>
          </Form>
        )}
      </Formik>
    </AuthContainer>
  );
}
