'use client'

import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import SectionDivider from "@/components/atom/SectionDivider/SectionDivider";
import InputField from "../Forms/InputField";
import ErrorMessageBox from "../Forms/ErrorMessageBox";
import Container from "../atom/Container/Container";

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
});


type Props = {
    handleSubmit: (e:{
        email: string;
    }) => void;
    loading: boolean;
    title: string;
}
const MailEnter = ({
    handleSubmit,
    loading,
    title = 'Reset Your Password'
}: Props) => {



    return (
        <>
            <Header />
            <SectionDivider
                containerClassName="mt-[10.5px] mb-[12px]"
                lineClassName="h-[1px] w-full bg-[#DEDEDE]"
            />
            <Container>


                <section className="flex min-h-[80vh] flex-col pb-20 items-center justify-center bg-white">
                    <p className=" font-poppins max-w-[400px] mt-6 font-medium text-[19.5px]  sm:text-[18px]">{title}</p>

                    <Formik
                        initialValues={{ email: "" }}
                        validationSchema={LoginSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="w-full max-w-[400px] mt-4 smmt-6 bg-white">


                                <div className="mb-2">

                                    <InputField
                                        type="text"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your Email"
                                        loading={loading}
                                    />
                                    <ErrorMessageBox
                                        name="email"
                                    />
                                </div>



                                <button type="submit" disabled={loading} className="w-full mt-3 text-[14px] cursor-pointer font-medium bg-[#FF1645] text-white  h-[35px] rounded-[3px] hover:bg-[#D8133A] transition flex items-center justify-center">
                                    {loading ? (
                                        <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                        </svg>
                                    ) : null}
                                    {loading ? "loading..." : "Submit"}
                                </button>


                            </Form>
                        )}
                    </Formik>
                </section>
            </Container>

            <Footer />
        </>
    );
};

export default MailEnter;
