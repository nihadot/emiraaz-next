'use client';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { JSX, useState } from 'react';
import { useCountryCode } from '@/utils/useCountryCode';
import { useAddQuickEnquiryMutation } from '@/redux/quickEnquiry/quickEnquiryApi';
import { errorToast, successToast } from '@/components/Toast';

const Schema = Yup.object({
  name: Yup.string().min(3).required(),
  email: Yup.string().email().required(),
  number: Yup.string().min(10).required(),
  notes: Yup.string().min(6).required(),
});

type Props = {
  children: (args: {
    formik: any;
    submitted: boolean;
    onCloseSuccess: () => void;
  }) => JSX.Element;
};

export default function QuickEnquiryContainer({ children }: Props) {
  const countryCode = useCountryCode();
  const [submitted, setSubmitted] = useState(false);
  const [submitEnquiry] = useAddQuickEnquiryMutation();

  if (!countryCode) return null;

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        number: countryCode,
        notes: '',
      }}
      validationSchema={Schema}
      onSubmit={async (values, { resetForm }) => {
        try {
          await submitEnquiry(values).unwrap();
          successToast('Enquiry submitted');
          resetForm();
          setSubmitted(true);
        } catch (e: any) {
          errorToast(e?.message || 'Something went wrong');
        }
      }}
    >
      {(formik) =>
        children({
          formik,
          submitted,
          onCloseSuccess: () => setSubmitted(false),
        })
      }
    </Formik>
  );
}
