import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputField from "../Forms/InputField";
import ErrorMessageBox from "../Forms/ErrorMessageBox";
import ContinueButton from "./ContinueButton";
import PhoneInput from "react-phone-input-2";
import { useCountryCode } from "@/utils/useCountryCode";
import { handleApiError } from "@/utils/handleApiError";
import { useAddCampaignEnquiryMutation } from "@/redux/campaign/campaignApi";
import 'react-phone-input-2/lib/style.css';

const FormSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    // email: Yup.string().email("Invalid email format").required("Email is required"),
number: Yup.string()
  .required("Phone number is required")
  .min(10, "Phone number must be at least 10 digits")
  .max(15, "Phone number must be at most 15 digits")});

function ContactForm({ selectedAnswer, setSelectedAnswer, slug, setIsSuccess }: { selectedAnswer: any, setSelectedAnswer: (selectedAnswer: any) => void, slug: string, setIsSuccess: (isSuccess: boolean) => void }) {

    const countryCode = useCountryCode();
    const [addEnquiry] = useAddCampaignEnquiryMutation();
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async (
        values: { name: string; number: string },
        { resetForm }: any
    ) => {
        try {
            setIsLoading(true);

            await addEnquiry({
                answers: selectedAnswer,
                ...values,
                slug,
            }).unwrap();

            setIsSuccess(true);
            setSelectedAnswer([]);
            resetForm();

        } catch (error: any) {
            handleApiError(error);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="">
            <h2 className="text-lg font-semibold font-poppins mb-3">Enter Your Details</h2>

            <Formik
                enableReinitialize
                initialValues={{ name: "", number: countryCode || '+971' }}
                validationSchema={FormSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, setFieldValue, values }) => (
                    <Form className="">
                        {/* Name */}
                        <div className="mb-2">
                            <label className="text-sm font-medium text-black font-poppins">Name</label>
                            <InputField
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter your Name"
                                loading={isSubmitting}
                                className="!text-base sm:!text-sm mt-1 !rounded-[5px] !border"
                            />
                            <ErrorMessageBox
                                name="name"
                            />
                        </div>

                        {/* Email */}
                        {/* <div className="mb-2">
                            <label className="text-sm font-medium text-black font-poppins">Email</label>
                            <InputField
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your Email"
                                loading={isSubmitting}
                                className="!text-base sm:!text-sm !border !rounded-[8px]"
                            />
                            <ErrorMessageBox
                                name="email"
                            />
                        </div> */}

                        {/* Number */}
                        <div className="mb-2">

                            <label className="text-sm font-medium text-black font-poppins">Number</label>
                            <PhoneInput
                                value={values.number}
                                specialLabel=" "
                                placeholder='Your Phone Number'
                                onChange={(e) => {
                                    setFieldValue("number", e)
                                }}
                                inputProps={{
                                    name: 'phone',
                                    required: true,
                                    fontSize: '16px',

                                }}

                                inputClass="cw-full outline-none mt-1 !border border-[#DEDEDE] border-[2px] bg-[#F7F7F7] rounded-[3px] px-[16px] font-poppins text-[12px] font-normal !rounded-[5px] text-black h-[40px]"
                                // searchClass="w-full bg-red-500 border"


                                inputStyle={{
                                    width: '100%',
                                    height: '40px',
                                    borderRadius: '3.5px',
                                    fontSize: '16px',
                                    borderColor: '#ccc',
                                    backgroundColor: '#F7F7F7',
                                }}
                                countryCodeEditable={false}
                            />
                            <ErrorMessageBox
                                name="number"
                            />
                        </div>

                        {/* Submit */}
                        <ContinueButton
                            label="Submit"
                            submit
                            isSubmitting={isLoading}
                            disabled={isLoading}

                        />
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default ContactForm;







