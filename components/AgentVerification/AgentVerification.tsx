'use client'
import React, { useState } from 'react'
import HomePageContent from '../Home/HomePageContent'
import { Footer } from '../Footer'
import Header from '../Header'
import MobileHeaderTitle from '../atom/typography/MobileHeaderTitle'
import SectionDivider from '../atom/SectionDivider/SectionDivider'
import { Form, Formik } from 'formik'
import * as Yup from "yup"
import { errorToast } from '../Toast'
import InputField from '../Forms/InputField'
import ErrorMessageBox from '../Forms/ErrorMessageBox'
import Container from '../atom/Container/Container'
import { LuMoveLeft } from 'react-icons/lu'
import Image from 'next/image'
import shield from "../../app/assets/shield 1.png";
import Wrongshield from "../../app/assets/shield-wrong.png";
import ErrorWarning from "../../app/assets/error-warning.png";
import clsx from 'clsx'


function AgentVerification({
    content
}: {
    content: any
}) {

    const [status, setStatus] = useState({
        working: false,
        notWorking: false,
        notAvailable: false,
        reportAgent: false,
    });


    const [data, setData] = useState<any>();

    return (
        <main>


            <Header
                logoSection={
                    <div className='h-full w-full flex justify-center items-center'>
                        <MobileHeaderTitle
                            content='Agent Verification'
                        />
                    </div>
                }
            />
            <SectionDivider
                containerClassName="mt-[10.5px] mb-[12px]"
                lineClassName="h-[1px] w-full bg-[#DEDEDE]"
            />


            {!(status.working || status.notWorking || status.notAvailable) && <Section
                status={status}
                content={content}
                setStatus={setStatus}
                setData={setData}
                data={data}
            />}

            {status.working && data && <AgentAvailabilityCard
                success
                title='This agent is currently working with PropertySeller.'
                name={data?.name}
                nationality={data?.country}
                languagesSpoken={data?.languages?.join(', ')}
                setStatus={setStatus}
                card
                joiningDate={data?.joiningDate?.split('T')[0]}
                iconUrl={shield.src}
                imageUrl={data?.image?.webp?.url}
                footerTitle='Trusted PropertySeller Agent — feel free to proceed with confidence.'

            />}


            {status.notWorking && <AgentAvailabilityCard
                error
                title='This agent is no longer working with PropertySeller.'
                subtitle={
                    <p className='max-w-[400px] w-full m-auto  text-center'>If you are currently involved in a transaction with this agent, please email us at <span className='text-xs font-medium text-[#FF1645]'>hello@propertyseller.com</span>   so we can assist you.</p>
                }
                name={data?.name}
                nationality={data?.country}
                languagesSpoken={data?.languages?.join(', ')}
                setStatus={setStatus}
                iconUrl={Wrongshield.src}
                card
                resigningDate={`${new Date(data?.joiningDate?.split('T')[0]).getFullYear()} - ${new Date(data?.resigningDate?.split('T')[0]).getFullYear()}`}
                imageUrl={data?.image?.webp?.url}
                footerTitle='This agent was previously registered with us but is no longer affiliated.'
            />}

            {status.notAvailable && <AgentAvailabilityCard
                error
                setStatus={setStatus}
                title='This agent is not in our records.'
                subtitle={
                    <p className='w-full max-w-[480px] m-auto  text-center'>We could not verify this Agent ID. This agent is not affiliated with PropertySeller.
                        If you suspect this is a fake agent, please help us keep the community safe by reporting them.</p>
                }
                reportButton
                // card
                iconUrl={ErrorWarning.src}
            // footerTitle='This agent was previously registered with us but is no longer affiliated.'
            />}

            <Footer />

        </main>
    )
}

export default AgentVerification


// Validation Schema
const ValidationSchema = Yup.object().shape({
    agentId: Yup.string().required("Enter the agent ID")
        .trim()
        .min(4, "Must be at least 4 digits")
        .max(12, "Must be at most 12 digits")

})


function Section({
    status,
    content,
    setStatus,
    setData,
    data,
}: {
    status: any,
    setData: (data: any) => void,
    data: any,
    content: any,
    setStatus: ({
        notAvailable,
        working,
        notWorking,
        reportAgent,
    }: {
        notAvailable: boolean,
        working: boolean,
        notWorking: boolean,
        reportAgent: boolean,
    }) => void
}) {


    const [formData, setFormData] = useState({
        agentId: '',

    });





    const handleSubmit = async (values: typeof formData, { setSubmitting, resetForm }: any) => {

        try {
            // const response = await carrierEnquiry(values).unwrap();


            // setCarrierEnquiryState((prev: any) => ({
            //     status: true,
            //     count: 1,
            // }))

            const response = await apiClient.post(`${baseUrl}/agent-verification/verifying`, values);
            const data = await response?.data?.data;



            // console.log(data, 'Values')
            setData(data)
            if (data.workingStatus === "working") {
                setStatus({
                    ...status,
                    working: true,
                    notWorking: false,
                    notAvailable: false,
                    reportAgent: false,
                })
                return
            } else {
                setStatus({
                    ...status,
                    notWorking: true,
                    working: false,
                    notAvailable: false,
                    reportAgent: false,

                })
            }


            // resetForm();


        } catch (error: any) {
            setStatus({
                ...status,
                notAvailable: true,
                working: false,
                notWorking: false,
                reportAgent: false,
            })
            errorToast(error?.response?.data?.message || error?.data?.message || error?.response?.message || error?.message || 'Error occurred, please try again later')
        } finally {
            setSubmitting(false)
        }
    }


    return (
        <section className=' min-h-[60vh] py-10 flex flex-col justify-center items-center'>
            <Container>


                <div className="flex w-full m-auto flex-col justify-center items-center max-w-[460px]">
                    <h1 className='font-poppins  w-full text-center font-medium text-[20px] sm:text-[34px]'>
                        Agent Verification
                    </h1>


                    <p className='font-poppins  mt-2 w-full leading-[22px] text-sm font-normal text-[#666666] text-center'>Enter an Agent ID to confirm if they’re officially affiliated with PropertySeller. Stay protected, informed, and confident in your property journey.</p>


                </div>




                <div className="flex  justify-center w-full  items-center">


                    <Formik
                        enableReinitialize
                        initialValues={{
                            agentId: '',
                        }}
                        validationSchema={ValidationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="w-full max-w-[380px] mt-4 sm:mt-3 ">

                                <div className="grid grid-cols-1 w-full gap-2">

                                    <div className="mb-0  sm:mb-3 w-full">

                                        <InputField type="text" id="agentId" name="agentId" placeholder="Enter Agent ID" loading={isSubmitting} />
                                        <ErrorMessageBox
                                            name="agentId"
                                        />
                                    </div>


                                </div>



                                <div className="grid grid-cols-1 w-full gap-2 mt-3">


                                    <button type="submit" disabled={isSubmitting} className="w-full text-xs md:text-[14px] mb-2 cursor-pointer font-medium font-poppins bg-[#FF1645] text-white  h-[40px] rounded-[3px] hover:bg-[#D8133A] transition flex items-center justify-center">
                                        {isSubmitting ? (
                                            <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                            </svg>
                                        ) : null}
                                        {isSubmitting ? "loading..." : "Verify Agent"}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>


                <div className="border-[#DEDEDE] max-w-[900px] m-auto p-4 md:px-4  mb-10 mt-7 rounded-[5px] border-[1.5px]">
                    <div
                        className='prose text-[#333333] prose-sm content-wrapper-agent-verification max-w-none font-poppins'
                        dangerouslySetInnerHTML={{ __html: content?.html }}
                    ></div>
                </div>
            </Container>

        </section>
    )
}


function AgentAvailabilityCard({
    title,
    subtitle,
    card,
    footerTitle,
    reportButton,
    success,
    error,
    report,
    imageUrl,
    iconUrl,
    nationality,
    name,
    languagesSpoken,
    joiningDate,
    resigningDate,
    setStatus
}: {

    title: string,
    subtitle?: React.ReactNode,
    card?: boolean,
    footerTitle?: string,
    reportButton?: boolean
    success?: boolean,
    error?: boolean,
    report?: boolean,
    imageUrl?: string,
    iconUrl: string,
    name?: string,
    nationality?: string,
    languagesSpoken?: string,
    joiningDate?: string,
    resigningDate?: string,
    setStatus: ({
        notAvailable,
        working,
        notWorking,
        reportAgent,
    }: {
        notAvailable: boolean,
        working: boolean,
        notWorking: boolean,
        reportAgent: boolean,
    }) => void
}) {
    return (
        <div className='flex px-4  flex-col bg-[#13C00005] py-12 justify-center items-center m-auto max-w-[550px] '>
            <div className="relative w-12 h-12">
                <Image
                    src={iconUrl}
                    className='w-full h-full object-cover'
                    alt="shield"
                    fill
                // width={}
                />
                {/* <div className="w-20 h-20 rounded border-e-gray-300"></div> */}

            </div>
            <h3
                className='font-poppins mt-3 max-w-[340px] w-full  font-medium text-[18px] text-center sm:text-[22px]'
            >{title}</h3>

            {subtitle && <p className='font-poppins mt-3 w-full  leading-[22px] text-xs font-normal text-[#666666] text-center'>{subtitle}</p>
            }
            {card && <div className={clsx("max-w-[460px] w-fit md:w-full p-3.5 flex gap-3 mt-3 flex-col md:flex-row rounded-[10px] border ", {
                'border-[#13C000]': success,
                'border-[#FF1645]': error,
                'bg-[#FF164505]': error,
                'bg-[#13C00005]': success,
            })}>
                {/* <div className="w-40 h-44 bg-gray-200 rounded-[4px] "></div> */}
                {imageUrl && <div className="relative w-36  m-auto md:m-0 h-32 bg-center object-cover">
                    <Image
                        src={imageUrl}
                        className=' rounded-[4px]'
                        alt='agent profile'
                        fill


                    />
                </div>}
                <div className="flex w-fit gap-2 items-start flex-col">

                    {name && <Content
                        label='Full Name : '
                        value={name}
                    />}

                    {/* {nationality && <Content
                        label='Nationality : '
                        value={nationality}
                    />} */}
                    {languagesSpoken &&
                        <Content
                            label='Languages Spoken : '
                            value={languagesSpoken}
                        />}

                    {/* {joiningDate && <Content
                        label='Joined Date : '
                        value={joiningDate}
                    />} */}
                    {resigningDate && <Content
                        label='Tenure : '
                        value={resigningDate}
                    />}




                </div>
            </div>}

            <p className='font-poppins py-2 mt-1 w-full leading-[22px] text-xs font-normal text-[#666666] text-center'>{footerTitle}</p>


            <div className="flex gap-3">

                <div className=""
                    onClick={() => {
                        setStatus({
                            reportAgent: false,
                            notAvailable: false,
                            working: false,
                            notWorking: false,
                        })
                    }}
                >
                    <Button

                    />
                </div>
                {
                    reportButton && <ReportAgentButton />
                }

            </div>
        </div>
    )
}


function Button() {
    return (
        <button
            className='border-[#DEDEDE] cursor-pointer flex px-3 md:px-4 py-2 gap-2 md:gap-3 border rounded-[5px]'
        >
            <LuMoveLeft />
            <label htmlFor="" className='text-[12px] font-poppins'>Go Back</label>
        </button>
    )
}

// import { Info } from 'react-icons/io';
import { Info } from 'lucide-react';
import apiClient from '@/api/apiClient'
import { baseUrl } from '@/api'
import { join } from 'path'
import Link from 'next/link'

function ReportAgentButton() {
    return (

        <Link
            href={'/report-suspicious-agent'}
        >
            <button

                className='border-none bg-[#FF1645] text-white flex px-3  justify-center items-center py-2 gap-3 border rounded-[5px]'
            >
                <label htmlFor="" className='text-[12px] font-poppins font-medium'>Report Agent</label>
                <Info
                    size={18}
                    color='#fff'
                />

            </button>
        </Link>
    )
}


function Content({ label, value }: {
    label: string,
    value: string
}) {
    return (
        <div className="flex gap-2 items-start justify-start  w-full text-xs">
            <p className=' font-poppins font-medium text-nowrap'>{label}</p>
            <p className='font-poppins  text-wrap'>{value}</p>
        </div>
    )
}
