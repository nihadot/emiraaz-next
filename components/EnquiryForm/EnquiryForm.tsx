import React, { useState } from 'react'
import InputField from '../InputField/InputField'
import PrimaryButton from '../Buttons';
import { errorToast } from '../Toast';
import { LOCAL_STORAGE_KEYS } from '@/api/storage';
import axios from 'axios';
import { baseUrl } from '@/api';
import PhoneInput from 'react-phone-input-2';



interface UserData {
    _id: string;
}


function EnquiryForm({ projectId, setEnquiry }: { projectId: string, setEnquiry: (item: any) => void }) {

    const [formData, setFormData] = useState<{
        name: string;
        number: string;
    }>({ name: '', number: '' });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }


    const [loading, setLoading] = useState(false);


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

        if (!projectId) {
            return errorToast('Project Id is required');
        }

        try {
            setLoading(true);


            const payload: any = {
                name: formData.name,
                number: formData.number,
                projectId: projectId
            };



            const userDataString = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_DATA);


            if (userDataString) {

                const userData: UserData = JSON.parse(userDataString);
                if (userData) payload.userId = userData._id
            }



            const response = await axios.post(`${baseUrl}/enquiry`, payload);
            if (response?.status === 201 && response?.data?.message && response?.data?.exist) {
                setEnquiry((prev: any) => ({
                    status: true,
                    count: 2,
                }))
            } else {

                setEnquiry((prev: any) => ({
                    status: true,
                    count: 1,
                }))
            }
            setFormData({ name: '', number: '' });

        } catch (error: any) {
            errorToast(error?.response?.data?.message || error?.data?.message || error?.response?.message || error?.message || 'Error occurred, please try again later');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='border p-3 rounded-[3.5px] flex flex-col gap-1  border-[#DEDEDE]'>

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
                    height: '40px',
                    borderRadius: '3.5px',
                    borderColor: '#ccc',
                }}
            />
            <PrimaryButton
                loading={loading}
                type='submit'
                className='flex mt-1 justify-center bg-[#FF1645] rounded-[3.75px] border-none items-center gap-1'

            >

                <div className='justify-center flex items-center gap-2'>
                    <label className='text-white text-[14.25px] font-poppins font-medium'>Enquire Now</label>
                </div>
            </PrimaryButton>
        </form>
    )
}

export default EnquiryForm