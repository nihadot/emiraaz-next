'use client';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
const Schema = Yup.object({
  agentName: Yup.string(),
  agentId: Yup.string(),
  description: Yup.string().required('Please describe what happened'),
});

export default function ReportAgentForm({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className="relative min-h-screen bg-white px-4 pt-4 pb-28 font-poppins">
      {/* Info Card */}
      <div className="rounded-[13px] border border-[#DEDEDE]  py-3 text-center">
        <h2 className="text-[20px] font-semibold text-gray-900">
          Report Suspicious Agent
        </h2>

        <p className="mx-auto mt-3 max-w-[300px] text-[13px] leading-[18px] text-gray-500">
          Help us investigate this agent by sharing any details you have — such
          as their name, ID, phone number, screenshots of conversations, or any
          documents. The more information you provide, the faster we can take
          action.
        </p>
      </div>

      <Formik
        initialValues={{
          agentName: '',
          agentId: '',
          description: '',
        }}
        validationSchema={Schema}
        onSubmit={() => {
          onClose();
        }}
      >
        {() => (
          <Form className="mt-6 space-y-5">
            {/* Agent Name */}
            <div>
              <label className="text-[13px] font-semibold text-gray-900">
                Agent Name (optional)
              </label>
              <input
                name="agentName"
                placeholder="Enter Agent Name"
                className="mt-2 h-12 w-full rounded-xl border border-[#DEDEDE] px-4 text-[14px] placeholder:text-gray-400"
              />
            </div>

            {/* Agent ID */}
            <div>
              <label className="text-[13px] font-semibold text-gray-900">
                Agent ID (optional)
              </label>
              <input
                name="agentId"
                placeholder="Enter Agent ID"
                className="mt-2 h-12 w-full rounded-xl border border-[#DEDEDE] px-4 text-[14px] placeholder:text-gray-400"
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-[13px] font-semibold text-gray-900">
                Description (textarea: “What happened?”)
              </label>
              <textarea
                name="description"
                placeholder="Enter what happened here"
                className="mt-2 h-40 w-full resize-none rounded-xl border border-[#DEDEDE] px-4 py-3 text-[14px] placeholder:text-gray-400"
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="text-[13px] font-semibold text-gray-900">
                File Upload (optional – to submit screenshots)
              </label>
              <div className="mt-2 flex h-12 items-center rounded-xl border  border-[#DEDEDE] px-4 text-[14px] text-gray-400">
                Drag or Choose files
              </div>
            </div>

            {/* Submit Button */}
            <div className="fixed bottom-4 left-4 right-4">
              <button
                type="submit"
                className="h-12 w-full rounded-xl bg-black text-[15px] font-medium text-white"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
