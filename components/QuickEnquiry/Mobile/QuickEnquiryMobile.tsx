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
    <main className="min-h-screen bg-white px-4 pt-5 pb-6 flex flex-col">
      <Form className="flex flex-col flex-1">
        {/* INFO CARD */}
        <div className="rounded-2xl border border-[#E5E7EB] bg-white px-5 py-4 text-center text-[13px] text-[#6B7280] leading-[1.6] mb-6">
          Need help? Share your details and we&apos;ll get back to you
        </div>

        {/* FORM */}
        <div className="flex-1 space-y-4">
          <FieldBlock label="Name">
            <InputField
              id="name"
              name="name"
              placeholder="Enter your name"
              loading={isSubmitting}
              className="w-full h-[48px] rounded-xl border border-[#E5E7EB] bg-white
                         px-4 text-[14px] text-[#111827] placeholder:text-[#9CA3AF]
                         focus:outline-none focus:border-[#D1D5DB] focus:ring-0"
            />
            <ErrorMessageBox name="name" />
          </FieldBlock>

          <FieldBlock label="Phone no">
            <PhoneInput
              value={values.number}
              country="ae"
              onChange={(v) => setFieldValue('number', v)}
              placeholder="Enter Phone no"
              enableSearch={false}
              disableSearchIcon
              inputClass="!w-full !h-[48px] !rounded-xl !border !border-[#E5E7EB] !bg-white
                           !text-[14px] !pl-[70px] !pr-4 !text-[#111827]
                           placeholder:!text-[#9CA3AF]
                           focus:!border-[#D1D5DB] focus:!outline-none focus:!ring-0 focus:!shadow-none"
              buttonClass="!h-[48px] !rounded-l-xl !border-0 !bg-transparent !pl-3 !pr-2"
              containerClass="!w-full"
              dropdownClass="!rounded-xl !shadow-lg"
            />
            <ErrorMessageBox name="number" />
          </FieldBlock>

          <FieldBlock label="Email">
            <InputField
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              loading={isSubmitting}
              className="w-full h-[48px] rounded-xl border border-[#E5E7EB] bg-white
                         px-4 text-[14px] text-[#111827] placeholder:text-[#9CA3AF]
                         focus:outline-none focus:border-[#D1D5DB] focus:ring-0"
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
              className="w-full min-h-[140px] rounded-xl border border-[#E5E7EB] bg-white
                         px-4 py-3 text-[14px] text-[#111827] placeholder:text-[#9CA3AF]
                         focus:outline-none focus:border-[#D1D5DB] focus:ring-0
                         resize-none leading-[1.6]"
            />
            <ErrorMessageBox name="notes" />
          </FieldBlock>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-8 h-[52px] w-full rounded-[14px] bg-black text-white
                     text-[15px] font-semibold disabled:opacity-60
                     shadow-sm"
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
      <label className="block mb-2 text-[13px] font-semibold text-[#111827]">
        {label}
      </label>
      {children}
    </div>
  );
}