'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import apiClient from '@/api/apiClient';
import { baseUrl } from '@/api';
import { X, ChevronDown } from 'lucide-react';

const Schema = Yup.object({
  name: Yup.string().required(),
  nationality: Yup.string().required(),
  number: Yup.string().required(),
  email: Yup.string().email().required(),
  comments: Yup.string(),
});

export default function FreelancerForm({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  return (
    <div className="bg-white rounded-t-3xl p-6 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Registration Form</h2>
        <button onClick={onClose} className="text-gray-600">
          <X size={20} />
        </button>
      </div>

      <p className="text-gray-500 text-sm mb-6">Tell us a bit about yourself.</p>

      <Formik
        initialValues={{ name: '', nationality: '', number: '', email: '', comments: '' }}
        validationSchema={Schema}
        onSubmit={async (values, { setSubmitting }) => {
          await apiClient.post(`${baseUrl}/freelancers`, values);
          setSubmitting(false);
          onSuccess();
        }}
      >
        {() => (
          <Form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Full Name
              </label>
              <Field
                name="name"
                placeholder="Enter your full name"
                className="w-full px-4 py-3 bg-gray-50 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Nationality
              </label>
              <div className="relative">
                <Field
                  as="select"
                  name="nationality"
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg text-sm text-gray-400 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-200"
                >
                  <option value="">Select Nationality</option>
                  <option value="Indian">Indian</option>
                  <option value="American">American</option>
                  <option value="British">British</option>
                  <option value="Canadian">Canadian</option>
                  <option value="Australian">Australian</option>
                </Field>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              </div>
              <ErrorMessage name="nationality" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Phone no
              </label>
              <div className="flex gap-2">
                <div className="flex items-center bg-gray-50 rounded-lg px-3 py-3">
                  <span className="text-xl mr-1">🇮🇳</span>
                  <ChevronDown size={16} className="text-gray-400" />
                </div>
                <Field
                  name="number"
                  placeholder="Enter Phone no"
                  className="flex-1 px-4 py-3 bg-gray-50 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <ErrorMessage name="number" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Email
              </label>
              <Field
                name="email"
                type="email"
                placeholder="Enter your email id"
                className="w-full px-4 py-3 bg-gray-50 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Comments
              </label>
              <Field
                as="textarea"
                name="comments"
                placeholder="Enter comments *optional"
                rows={3}
                className="w-full px-4 py-3 bg-gray-50 rounded-lg text-sm placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-4 rounded-xl font-medium text-base hover:bg-gray-900 transition-colors mt-6"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}