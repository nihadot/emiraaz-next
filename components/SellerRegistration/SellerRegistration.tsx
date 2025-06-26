'use client'
import React, {  useMemo, useState } from 'react'
import Header from '../Header'
import SectionDivider from '../atom/SectionDivider/SectionDivider'
import Container from '../atom/Container/Container'
import {  Form, Formik } from 'formik'
// import { PropertyTypes } from '@/data'
import { useRouter } from 'next/navigation'
import { useFetchAllEmirateNamesQuery } from '@/redux/emirates/emiratesApi'
import { baseUrl } from '@/api'
import apiClient from '@/api/apiClient'
import { errorToast, successToast } from '../Toast'
import * as Yup from 'yup'
import { Footer } from '../Footer'
import ErrorMessageBox from '../Forms/ErrorMessageBox'
import SelectField from '../Forms/SelectField'
import {  propertyType } from '@/data'
import InputField from '../Forms/InputField'
import { useFetchAllCityNamesQuery } from '@/redux/cities/citiesApi'
import clsx from 'clsx'
import SpaceWrapper from '../atom/SpaceWrapper/SpaceWrapper'
import MobileHeaderTitle from '../atom/typography/MobileHeaderTitle'


const initialFormData = {
    name: '',
    number: '',
    propertyType: '',
    emirateId: '',
    cityId: '',
    numberOfBedrooms: null,
    askingPrice: '',
    purchasedPrice: '',
}


const SellerSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    number: Yup.string()
        .matches(/^[0-9]+$/, "Only digits allowed")
        .min(10, "Must be at least 10 digits")
        .required("Phone number is required"),
    propertyType: Yup.string().required("Property type is required"),
    emirateId: Yup.string().required("Emirate is required"),
    cityId: Yup.string().required("City is required"),
    numberOfBedrooms: Yup.string().required("Select number of bedrooms"),
    askingPrice: Yup.number().required("Asking price is required"),
    purchasedPrice: Yup.number().required("Purchasing price is required"),
})


const PropertyTypes: { id: number; value: string; label: string }[] = [
    { id: 1, value: "villa", label: "Villa" },
    { id: 2, value: "apartment", label: "Apartment" },
    { id: 3, value: "penthouse", label: "Penthouse" },
    { id: 4, value: "townhouse", label: "Townhouse" },
]

function SellerRegistration() {


    const [emirateId, setEmirateId] = useState<string>();
    const router = useRouter()
    // const [registerSeller] = useRegisterSellerMutation() // if using RTK
    const { data: cities } = useFetchAllCityNamesQuery({ emirate: emirateId });

    const { data: emiratesData } = useFetchAllEmirateNamesQuery();

    const emirateOptions = useMemo(() => {
        const preferredOrder = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ras Al Khaimah', 'Ajman', 'Umm Al-Quwain'];

        const mappedOptions = emiratesData?.data.map((item) => ({
            label: item.name,
            value: item._id,
            count: item.count,
        })) || [];

        const sortedOptions = mappedOptions.sort((a, b) => {
            const aIndex = preferredOrder.indexOf(a.label);
            const bIndex = preferredOrder.indexOf(b.label);

            // If both labels are in the preferredOrder list
            if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;

            // If only one is in the list, put it before the other
            if (aIndex !== -1) return -1;
            if (bIndex !== -1) return 1;

            // If neither is in the list, sort alphabetically (optional)
            return a.label.localeCompare(b.label);
        });

        return [
            ...sortedOptions,
        ];
    }, [emiratesData]);


    const cityOptions = useMemo(() => {
        const mappedOptions = cities?.data.map((item) => ({
            label: item.name,
            value: item._id,
            count: item.count,
        })) || [];

        return [
            {
                label:'Select City',
                value:'',
            },
            ...mappedOptions,
        ];
    }, [cities]);

    const handleSubmit = async (values: typeof initialFormData, { setSubmitting,resetForm }: any) => {
        try {
            const data = {
                name: values.name,
                number: values.number,
                propertyType: values.propertyType,
                emirateId: values.emirateId,
                cityId: values.cityId,
                numberOfBeds: values.numberOfBedrooms,
                askingPrice: values.askingPrice,
                purchasedPrice: values.purchasedPrice,
            }

            const response = await apiClient.post(`${baseUrl}/sellers`, data);
            if (response.data.success) {
                // console.log(response, 'response')
                resetForm();
                successToast("Seller registered successfully")
            } else {
                errorToast(response.data.message || "Something went wrong")
            }

            setSubmitting(false)
        } catch (error: any) {
            errorToast(error?.response?.data?.message || "Something went wrong")
            setSubmitting(false)
        }
    }


    const handleChangeCities = (e: string) => {
        setEmirateId(e)
    }

    return (
        <main>
            <>
                <Header  logoSection={
               <div className='h-full w-full flex justify-center items-center'>
                 <MobileHeaderTitle
                content='Seller Registration'
                />
               </div>
            }/>
                <SectionDivider
                    containerClassName="mt-[10.5px] mb-[12px]"
                    lineClassName="h-[1px] w-full bg-[#DEDEDE]"
                />
                <Container>

                    <section className="mt-4 mb-28 gap-[19px] md:gap-0 flex-col md:flex-row flex items-center justify-between w-full ">

                        <div className="max-w-[518px] sm:gap-0 w-full">
                            <p className='font-poppins  font-medium text-[26px]  sm:text-[34px] sm:leading-10'>Sell Your Property Effortlessly with PropertySeller!</p>
                            <p className='font-poppins mt-[9px] text-[12px] font-normal text-[#666666]'>Ready to sell your property? Our Seller Registration form makes it simple to list your property on PropertySeller and connect with eager buyers. Fill out the required information, including your name, contact details, property type, location, and asking price. Once submitted, our dedicated team will review your listing to ensure it reaches a broad audience of interested buyers. Begin your selling journey today and let us help you achieve a successful sale!</p>
                        </div>
                        <div className="flex justify-center items-center flex-1 w-full">
                            <Formik
                                enableReinitialize
                                initialValues={initialFormData}
                                validationSchema={SellerSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting, errors, values, setFieldValue }) => (
                                    <Form className="w-full max-w-[380px] mt-4 sm:mt-6 bg-white">

                                        <div className="mb-3">

                                            <InputField type="text" id="name" name="name" placeholder="Enter your Name" loading={isSubmitting} />
                                            <ErrorMessageBox
                                                name="name"
                                            />
                                        </div>

                                        <div className="mb-3">

                                            <InputField


                                                type="text" id="number" name="number" placeholder="Enter your mobile no" loading={isSubmitting} />
                                            <ErrorMessageBox
                                                name="number"
                                            />

                                        </div>


                                        <div className="mb-3">

                                            <SelectField
                                                name="propertyType"
                                                id="propertyType"

                                                loading={isSubmitting}
                                            >
                                                {propertyType.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </SelectField>
                                        </div>

                                        <div className="mb-3">

                                            <SelectField
                                                name="emirateId"
                                                id="emirateId"
                                                onChange={(e) => {
                                                    const emirateId = e?.target?.value
                                                    handleChangeCities(emirateId)
                                                    setFieldValue('emirateId', emirateId)

                                                }}
                                                loading={isSubmitting}
                                            >
                                                {emirateOptions.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </SelectField>
                                        </div>



                                        <div className="mb-3">

                                            <SelectField
                                                name="cityId"
                                                id="cityId"

                                                loading={isSubmitting}
                                            >
                                                {cityOptions.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </SelectField>
                                        </div>


                                       <SpaceWrapper
                                       className='pb-2'
                                       >

                                         <MultiBoxPickOption
                                                 value={values.numberOfBedrooms}

                                            options={[1, 2, 3, 4, 5]}
                                            onChange={(val) => setFieldValue('numberOfBedrooms', val)}
                                        />
                                       </SpaceWrapper>

                                         <div className="mb-3">
                                                <InputField


                                                    type="text" id="askingPrice" name="askingPrice" placeholder="Enter asking price" loading={isSubmitting} />
                                                <ErrorMessageBox
                                                    name="askingPrice"
                                                    
                                                />
                                            </div>

                                              <div className="mb-3">
                                                <InputField


                                                    type="text" id="purchasedPrice" name="purchasedPrice" placeholder="Enter Purchased Price" loading={isSubmitting} />
                                                <ErrorMessageBox
                                                    name="purchasedPrice"
                                                    
                                                />
                                            </div>


                                            <button type="submit" disabled={isSubmitting} className="w-full text-[14px] mb-2 cursor-pointer font-medium bg-[#FF1645] text-white  h-[40px] rounded-[3px] hover:bg-[#D8133A] transition flex items-center justify-center">
                                                {isSubmitting ? (
                                                    <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                                    </svg>
                                                ) : null}
                                                {isSubmitting ? "loading..." : "Update"}
                                            </button>
                             








                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </section>
                </Container>

            </>
            <Footer />
        </main>
    )
}

export default SellerRegistration


type PropsMultiBox = {
    options: number[]; // Example: [1, 2, 3, 4, 5]
    onChange?: (value: number | null) => void;
        value: number | null; // controlled value from Formik

};

function MultiBoxPickOption({ options, onChange,value }: PropsMultiBox) {

    const handleSelect = (val: number) => {
        const newValue = value === val ? null : val;
        onChange?.(newValue); // Optional callback to parent
    };

    return (
       <div className="flex gap-2 flex-wrap">
            {options.map((val) => (
                <div
                    key={val}
                    onClick={() => handleSelect(val)}
                    className={clsx(
                        "w-[37px] h-[38px] transition-all ease-in-out rounded-[3px] flex font-normal justify-center items-center font-poppins text-[12px] cursor-pointer",
                        value === val
                            ? "bg-[#FF1645] text-white"
                            : "bg-[#F7F7F7] border border-[#DEDEDE] text-[#333333]"
                    )}
                >
                    {val}
                </div>
            ))}
        </div>
    );
}