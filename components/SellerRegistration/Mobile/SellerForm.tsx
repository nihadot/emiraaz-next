'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMemo, useState } from 'react';
import { baseUrl } from '@/api';
import apiClient from '@/api/apiClient';
import { successToast, errorToast } from '@/components/Toast';
import { useFetchAllEmirateNamesQuery } from '@/redux/emirates/emiratesApi';
import { useFetchAllCityNamesQuery } from '@/redux/cities/citiesApi';
import { X, ChevronDown } from 'lucide-react';
import { PhoneInput } from 'react-international-phone';

/* ===== SAME SCHEMA AS DESKTOP ===== */
const SellerSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  countryCode: Yup.string().required('Country code is required'),
  number: Yup.string()
    .matches(/^[0-9]+$/, 'Only digits allowed')
    .min(10)
    .required('Phone number is required'),
  propertyType: Yup.string().required('Property type is required'),
  emirateId: Yup.string().required('Emirate is required'),
  cityId: Yup.string().required('City is required'),
  numberOfBedrooms: Yup.string().required('Select bedrooms'),
  askingPrice: Yup.number().required('Asking price is required'),
  purchasedPrice: Yup.number().required('Purchased price is required'),
});

const initialValues = {
  name: '',
  countryCode: '+971',
  number: '',
  propertyType: '',
  emirateId: '',
  cityId: '',
  numberOfBedrooms: '',
  askingPrice: '',
  purchasedPrice: '',
};

const countryCodes = [
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+1', country: 'USA', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+974', country: 'Qatar', flag: '🇶🇦' },
  { code: '+965', country: 'Kuwait', flag: '🇰🇼' },
  { code: '+968', country: 'Oman', flag: '🇴🇲' },
];

export default function SellerForm({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [emirateId, setEmirateId] = useState<string>('');

  const { data: emiratesData } = useFetchAllEmirateNamesQuery();
  const { data: cities } = useFetchAllCityNamesQuery(
    { emirate: emirateId },
    { skip: !emirateId }
  );

  const emirateOptions = useMemo(
    () =>
      emiratesData?.data?.map((e) => ({
        label: e.name,
        value: e._id,
      })) || [],
    [emiratesData]
  );

  const cityOptions = useMemo(
    () =>
      cities?.data?.map((c) => ({
        label: c.name,
        value: c._id,
      })) || [],
    [cities]
  );

  const handleSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
    try {
      const payload = {
        name: values.name,
        number: values.countryCode + values.number,
        propertyType: values.propertyType,
        emirateId: values.emirateId,
        cityId: values.cityId,
        numberOfBeds: values.numberOfBedrooms,
        askingPrice: values.askingPrice,
        purchasedPrice: values.purchasedPrice,
      };

      await apiClient.post(`${baseUrl}/sellers`, payload);

     successToast('Seller registered successfully');
resetForm();
onSuccess();

    } catch (err: any) {
      errorToast(err?.response?.data?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center sm:justify-center z-50 p-0 sm:p-4">
      <div 
        className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-lg max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between rounded-t-3xl sm:rounded-t-3xl">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Seller Registeration Form
            </h3>
            <p className="text-xs text-gray-500 mt-2">
              Tell us a bit about yourself.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Scrollable Form */}
        <div className="overflow-y-auto px-5 py-4 flex-1">
          <Formik
            initialValues={initialValues}
            validationSchema={SellerSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Full Name
                  </label>
                  <Field
                    name="name"
                    placeholder="Enter your full name"
                    className="w-full h-12 rounded-xl border border-gray-200 px-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-300"
                  />
                  <ErrorMessage name="name" component="div" className="text-xs text-red-500 mt-1" />
                </div>
{/* Phone no */}
<div>
  <label className="block text-sm font-medium text-gray-900 mb-2">
    Phone no
  </label>

 <PhoneInput
  defaultCountry="ae"
  value={values.number ? values.countryCode + values.number : ''}
  onChange={(phone: string) => {
    const match = phone.match(/^(\+\d{1,4})(.*)$/);
    if (match) {
      setFieldValue('countryCode', match[1]);
      setFieldValue('number', match[2].replace(/\s/g, ''));
    }
  }}
  placeholder="Enter Phone no"
  className="w-full"
  inputClassName="input w-full"
  countrySelectorStyleProps={{
    buttonClassName: 'h-12 rounded-l-xl border-r border-gray-200',
  }}
/>


  <ErrorMessage
    name="number"
    component="div"
    className="text-xs text-red-500 mt-1"
  />
</div>

                {/* Property Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Property Type
                  </label>
                  <div className="relative">
                    <Field
                      as="select"
                      name="propertyType"
                      className="w-full h-12 rounded-xl border border-gray-200 px-4 text-sm text-gray-900 appearance-none focus:outline-none focus:border-gray-300"
                    >
                      <option value="" className="text-gray-400">Choose Property Type</option>
                      <option value="villa">Villa</option>
                      <option value="apartment">Apartment</option>
                      <option value="penthouse">Penthouse</option>
                      <option value="townhouse">Townhouse</option>
                    </Field>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                  <ErrorMessage name="propertyType" component="div" className="text-xs text-red-500 mt-1" />
                </div>

                {/* Emirate */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Emirate
                  </label>
                  <div className="relative">
                    <Field
                      as="select"
                      name="emirateId"
                      onChange={(e: any) => {
                        const value = e.target.value;
                        setEmirateId(value);
                        setFieldValue('emirateId', value);
                        setFieldValue('cityId', '');
                      }}
                      className="w-full h-12 rounded-xl border border-gray-200 px-4 text-sm text-gray-900 appearance-none focus:outline-none focus:border-gray-300"
                    >
                      <option value="" className="text-gray-400">Choose Emirate</option>
                      {emirateOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </Field>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                  <ErrorMessage name="emirateId" component="div" className="text-xs text-red-500 mt-1" />
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    City
                  </label>
                  <div className="relative">
                    <Field
                      name="cityId"
                      as="select"
                      disabled={!emirateId}
                      className="w-full h-12 rounded-xl border border-gray-200 px-4 text-sm text-gray-900 appearance-none focus:outline-none focus:border-gray-300 disabled:bg-gray-50 disabled:text-gray-400"
                    >
                      <option value="">Enter City</option>
                      {cityOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </Field>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                  <ErrorMessage name="cityId" component="div" className="text-xs text-red-500 mt-1" />
                </div>

                {/* No of Bedrooms */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    No of Bedrooms
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setFieldValue('numberOfBedrooms', `${num}`)}
                        className={`flex-1 h-12 rounded-xl border text-sm font-medium transition-colors ${
                          values.numberOfBedrooms === `${num}`
                            ? 'border-gray-900 bg-gray-900 text-white'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setFieldValue('numberOfBedrooms', '6+')}
                      className={`flex-1 h-12 rounded-xl border text-sm font-medium transition-colors ${
                        values.numberOfBedrooms === '6+'
                          ? 'border-gray-900 bg-gray-900 text-white'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      6+
                    </button>
                  </div>
                  <ErrorMessage name="numberOfBedrooms" component="div" className="text-xs text-red-500 mt-1" />
                </div>

                {/* Asking Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Asking Price
                  </label>
                  <Field
                    name="askingPrice"
                    type="number"
                    placeholder="Enter asking price"
                    className="w-full h-12 rounded-xl border border-gray-200 px-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-300"
                  />
                  <ErrorMessage name="askingPrice" component="div" className="text-xs text-red-500 mt-1" />
                </div>

                {/* Purchased Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Purchased Price
                  </label>
                  <Field
                    name="purchasedPrice"
                    type="number"
                    placeholder="Enter Purchased price"
                    className="w-full h-12 rounded-xl border border-gray-200 px-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-300"
                  />
                  <ErrorMessage name="purchasedPrice" component="div" className="text-xs text-red-500 mt-1" />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 rounded-2xl bg-black text-white text-base font-medium hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}