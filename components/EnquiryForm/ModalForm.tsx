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
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { LOCAL_STORAGE_KEYS } from '@/api/storage';
import { User } from '@/redux/userSlice/types';
import Container from '../atom/Container/Container';
type Props = {
    item: {
        id: string;
        status: boolean;
    }
    setEnquiry: (option: any) => void;
};

interface UserData {
    _id: string;
    // Add more fields if needed
}

function ModalForm({ item, setEnquiry }: Props) {
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
    const { isAuthentication } = useSelector((state: RootState) => state.user);

    // console.log(localStorage.getItem(LOCAL_STORAGE_KEYS.USER_DATA),'0000')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        // Simple validation
        if (!formData.name.trim()) {
            return errorToast('Please enter your name.');
        }

        if (!formData.number || formData.number.length < 6) {
            return errorToast('Please enter a valid mobile number.');
        }

        if (!item.id) {
            return errorToast('Please select a Project then submit');
        }

        try {
            setLoading(true);


            const payload: any = {
                name: formData.name,
                number: formData.number,
                projectId: item.id
            };

            const userDataString = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_DATA);
          

            if (userDataString) {
               
                    const userData: UserData = JSON.parse(userDataString);
                    if(userData) payload.userId = userData._id
            }



            await axios.post(`${baseUrl}/enquiry`, payload);
         
            setEnquiry((prev: any) => ({
                ...prev,
                count: 2,
            }))
            successToast('Enquiry submitted successfully!');
            setFormData({ name: '', number: '' });
        } catch (error: any) {
            errorToast(error?.response?.data?.message || error?.data?.message || error?.response?.message || error?.message || 'Error occurred, please try again later');
            // console.error(err);
        } finally {
            setLoading(false);
        }
    };


    return (
        <Container
        
        >
            <form className='sm:w-[436px] h-fit sm:h-[230px] flex flex-col gap-2 py-[20px]' onSubmit={handleSubmit}>

                <p className='text-center pb-2  text-[17.25px] font-poppins font-medium'>Please enter your details</p>

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
                        <label className='text-white text-[14.25px] font-poppins font-medium'>Submit</label>
                    </div>
                </PrimaryButton>
            </form>

        </Container>
    );
}

export default ModalForm;
