import React, { useState } from 'react';
import InputField from '../InputField/InputField';
import PrimaryButton from '../Buttons';
import { details_icon } from '@/app/assets';
import Image from 'next/image';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { errorToast, successToast } from '../Toast';
import axios from "axios";
import { baseUrl } from '@/api';
type Props = {
    item:{
        id:string;
        status:boolean;
    }
    setEnquiry: (option:any) => void;
};

function ModalForm({ item,setEnquiry}: Props) {
    const [formData, setFormData] = useState({
        name: '',
        number: '',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

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

        if(!item.id){
            return errorToast('Please select a Project then submit');
        }

        try {
            setLoading(true);

           await axios.post(`${baseUrl}/enquiry`, {
                name: formData.name,
                number: formData.number,
                projectId:item.id
              });
            // Reset form or show success
            console.log('Submitted:', formData);
          
        setEnquiry((prev: any) => ({
            ...prev,
            count: 2,
        }))
            successToast('Enquiry submitted successfully!');
            setFormData({ name: '', number: '' });
        } catch (error:any) {
            errorToast(error?.response?.data?.message || error?.response?.message || error?.message || 'Error occurred, please try again later');
            // console.error(err);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className=''>
            <form className='w-[450px] flex flex-col gap-2 p-4' onSubmit={handleSubmit}>

            <p className='text-center pb-2 font-semibold text-base'>Please enter your details</p>

            <InputField
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                placeholder='Enter your name'
            />

            <PhoneInput
                country={'in'}
                value={formData.number}
                onChange={handlePhoneChange}
                inputProps={{
                    name: 'phone',
                    required: true,
                }}
                inputStyle={{
                    width: '100%',
                    height: '45px',
                    borderRadius: '6px',
                    borderColor: '#ccc',
                }}
            />

            <PrimaryButton
                loading={loading}
                type='submit'
                className='flex mt-1 justify-center bg-red-600 rounded-md border-none items-center gap-1'
                
            >

<div className='justify-center flex items-center gap-2'>
                        <Image src={details_icon} alt='menu icon' width={21} />
                        <label className='text-white text-sm'>Enquiry Now</label>
                    </div>
                    </PrimaryButton>
            </form>

        </div>
    );
}

export default ModalForm;
