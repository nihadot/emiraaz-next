'use client';

import { Form } from 'formik';
import InputField from '@/components/Forms/InputField';
import ErrorMessageBox from '@/components/Forms/ErrorMessageBox';
import PhoneInput from 'react-phone-input-2';
import QuickEnquirySuccessModal from './QuickEnquirySuccessModal';

type Props = {
  formik: any;
  submitted: boolean;
  onCloseSuccess: () => void;
};

export default function QuickEnquiryMobile({
  formik,
  submitted,
  onCloseSuccess,
}: Props) {
  const { values, setFieldValue, isSubmitting } = formik;

  return (
    <main className="min-h-screen bg-white px-5 pb-6 pt-5 flex flex-col">
      <Form className="flex-1 flex flex-col">
        <div className="rounded-2xl border border-gray-200 bg-white px-5 py-4 text-sm text-gray-600 text-center leading-relaxed mb-7">
          Need help? Share your details and we&apos;ll get back to you
        </div>

        <div className="space-y-5 flex-1">
          <FieldBlock label="Name">
            <InputField
              id="name"
              name="name"
              placeholder="Enter your name"
              loading={isSubmitting}
              className="w-full h-[52px] rounded-xl border border-gray-200 px-4 text-sm
                         focus:outline-none focus:border-gray-300 bg-white text-gray-900 
                         placeholder:text-gray-400"
            />
            <ErrorMessageBox name="name" />
          </FieldBlock>

          <FieldBlock label="Phone no">
            <div className="relative">
              <PhoneInput
                value={values.number}
                country="ae"
                onChange={(v) => setFieldValue('number', v)}
                placeholder="Enter Phone no"
                enableSearch={false}
                disableSearchIcon={true}
                inputClass="!w-full !h-[52px] !rounded-xl !border !border-gray-200 !text-sm !pl-[70px] !pr-4 placeholder:!text-gray-400 focus:!border-gray-300 focus:!outline-none"
                buttonClass="!h-[52px] !rounded-l-xl !border-0 !bg-transparent !pl-3 !pr-2"
                containerClass="!w-full"
                dropdownClass="!rounded-lg !shadow-lg"
              />
            </div>
            <ErrorMessageBox name="number" />
          </FieldBlock>

          <FieldBlock label="Email">
            <InputField
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              loading={isSubmitting}
              className="w-full h-[52px] rounded-xl border border-gray-200 px-4 text-sm
                         focus:outline-none focus:border-gray-300 bg-white text-gray-900 
                         placeholder:text-gray-400"
            />
            <ErrorMessageBox name="email" />
          </FieldBlock>

          <FieldBlock label="Note">
            <InputField
              as="textarea"
              rows={6}
              id="notes"
              name="notes"
              placeholder="Enter note here"
              loading={isSubmitting}
              className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-sm
                         focus:outline-none focus:border-gray-300 bg-white text-gray-900 
                         placeholder:text-gray-400 resize-none leading-relaxed"
            />
            <ErrorMessageBox name="notes" />
          </FieldBlock>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="h-[52px] w-full rounded-xl bg-black text-white font-medium text-base mt-auto"
        >
          Submit
        </button>
      </Form>

      {submitted && (
        <QuickEnquirySuccessModal onClose={onCloseSuccess} />
      )}
    </main>
  );
}

function FieldBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2.5 text-black">
        {label}
      </label>
      {children}
    </div>
  );
}