'use client';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import PasswordSuccessModal from './PasswordSuccessModal';

const Schema = Yup.object().shape({
  password: Yup.string().min(6).required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required'),
});

type Props = {
  onSubmit: (v: { password: string; confirmPassword: string }) => Promise<void>;
  loading: boolean;
};

export default function ResetPasswordMobile({ onSubmit, loading }: Props) {
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const handleSubmit = async (values: any) => {
    await onSubmit(values);
    setSuccessOpen(true);
  };

  return (
    <>
      <div className="px-4 pt-6 pb-32 bg-white min-h-screen">
        <Formik
          initialValues={{ password: '', confirmPassword: '' }}
          validationSchema={Schema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-6">
              {/* New Password */}
              <div>
                <label className="text-sm font-semibold">New Password</label>
                <div className="relative mt-2">
                  <input
                    name="password"
                    type={showPwd ? 'text' : 'password'}
                    className="w-full h-12 rounded-xl border px-4"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-4 top-3"
                  >
                    {showPwd ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && touched.password && (
                  <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-sm font-semibold">
                  Confirm New Password
                </label>
                <div className="relative mt-2">
                  <input
                    name="confirmPassword"
                    type={showConfirm ? 'text' : 'password'}
                    className="w-full h-12 rounded-xl border px-4"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-4 top-3"
                  >
                    {showConfirm ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.confirmPassword && touched.confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Sticky Button */}
              <div className="fixed bottom-0 left-0 right-0 p-4 bg-white">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 rounded-2xl bg-[#777] text-white text-lg"
                >
                  {loading ? 'Loading...' : 'Continue'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* SUCCESS MODAL */}
      <PasswordSuccessModal
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
      />
    </>
  );
}
