'use client'
import React, { useState } from 'react'
import InputField from '../InputField/InputField'
import PhoneInput from 'react-phone-input-2';
import { useCountryCode } from '@/utils/useCountryCode';
// import "../../app/globals.css";
import 'react-phone-input-2/lib/style.css';
import { errorToast } from '../Toast';
import { LOCAL_STORAGE_KEYS } from '@/api/storage';
import { baseUrl } from '@/api';
import axios from 'axios';

type Props = {
    activeIndex: number
    itemId: string,
    onSubmitSuccess: () => void,
    onSubmitConflit: () => void
}

interface UserData {
    _id: string;
}


function EnquiryFormSection({
    activeIndex = 0,
    itemId,
    onSubmitSuccess,
    onSubmitConflit,
}: Props) {
    const countryCode = useCountryCode();
  
    const [formData, setFormData] = useState<{
        name: string;
        number: string;
        numberOfBeds: string;
        promoId:string;
    }>({ name: '', number: '',numberOfBeds: '',promoId:'' });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handlePhoneChange = (value: string) => {
        setFormData({ ...formData, number: value });
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        // Simple validation
        if (!formData.name.trim()) {
            return errorToast('Please enter your name.');
        }

        if (!formData.number || formData.number.length < 6) {
            return errorToast('Please enter a valid mobile number.');
        }


        if (!formData.numberOfBeds) {
            return errorToast('Please enter are you looking for no of bedrooms.');
        }

        if (!itemId) {
            return errorToast('Promo Id is required');
        }

        try {
            setLoading(true);


            const payload: any = {
                name: formData.name,
                number: formData.number,
                promoId: itemId,
                numberOfBeds:formData.numberOfBeds,
            };



            const userDataString = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_DATA);


            if (userDataString) {

                const userData: UserData = JSON.parse(userDataString);
                if (userData) payload.userId = userData._id
            }



            const response = await axios.post(`${baseUrl}/promo-page/enquiry`, payload);
            onSubmitSuccess()
            setFormData({ name: '', number: '',numberOfBeds:'',promoId:'',});

        } catch (error: any) {
            const statusCode = error?.response?.status || error?.status
            // console.log(statusCode,'sd')
            if(statusCode === 409){
                onSubmitConflit();
            }else{
                errorToast(error?.response?.data?.message || error?.data?.message || error?.response?.message || error?.message || 'Error occurred, please try again later');
            }
        } finally {
            setLoading(false);
        }
    };


    return (
       <>
       
       {
        true ?  <form
            onSubmit={handleSubmit}
            className='w-full max-w-[650px] mt-4 bg-white rounded-[22px] py-[20px] px-[30px]'
        >
        

            <div className="mb-3 mt-2">
                <label htmlFor=""
                    className='text-sm font-poppins font-medium text-black block mb-1'
                >Name</label>

                <input
                    type="text"
                    name='name'
                    onChange={handleChange}
                    placeholder='Enter Full Name'
                    className='border-[#DEDEDE] placeholder:text-[12px]   font-poppins w-full h-[42px] placeholder:text-[#666666] rounded text-base bg-[#F7F7F7] px-[14px] text-black  border-[1.5px]'
                />

            </div>

            <div className="sm:flex gap-[12px]">

                <div className="mb-3 mt-2 w-full ">
                    <label htmlFor=""
                        className='text-sm font-poppins font-medium text-black block mb-1'
                    >Phone no</label>


                    <PhoneInput
                        value={countryCode || '+971'}
                        placeholder='Your Phone Number'

                        onChange={handlePhoneChange}
                        inputProps={{
                            name: 'phone',
                            required: true,
                            fontSize: '16px',


                        }}
                        inputStyle={{
                            width: '100%',
                            height: '42px',
                            fontSize: '16px',
                            borderRadius: '2px',
                            borderColor: '#DEDEDE',
                            borderWidth: '1.5px',
                        }}
                        countryCodeEditable={false}

                    />
                </div>



                <div className="mb-3 mt-2 w-full ">
                    <label htmlFor=""
                        className='text-sm  font-poppins font-medium text-black block mb-1'
                    >No of bedrooms are you looking for?</label>

                    <input
                                        onChange={handleChange}

                        type="text"
                        name='numberOfBeds'
                        placeholder='Enter no of bedrooms'
                        className='border-[#DEDEDE] placeholder:text-[12px] font-poppins w-full h-[42px] placeholder:text-[#666666] rounded text-base bg-[#F7F7F7] px-[14px] text-black  border-[1.5px]'
                    />

                </div>

            </div>


            <button type="submit" disabled={loading} className="w-full mb-3 sm:mb-0 font-poppins sm:w-[100px] mt-[15px] sm:mt-2 md:ms-auto text-sm font-medium cursor-pointer bg-[#FF1645] text-white  h-[46px] sm:h-[38px] rounded-[9px] hover:bg-[#D8133A] transition flex items-center justify-center">
                {loading ? (
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                ) : null}
                {loading ? "" : "Submit"}
            </button>


        </form> :   <div 
        className='w-full max-w-[650px] h-[260px] mt-4 bg-gray-200 rounded-[22px] py-[20px] px-[30px]'
        ></div>
       }
       </>
    )
}

export default EnquiryFormSection