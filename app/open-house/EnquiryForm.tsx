import React, { useState } from 'react'
import InputField from '@/components/InputField/InputField';
import PrimaryButton from '@/components/Buttons';
import Container from '@/components/atom/Container/Container';
import { IoMdClose } from 'react-icons/io';
import SpaceWrapper from '@/components/atom/SpaceWrapper/SpaceWrapper';
import { errorToast } from '@/components/Toast';
import { LOCAL_STORAGE_KEYS } from '@/api/storage';
import axios from 'axios';
import { baseUrl } from '@/api';

interface UserData {
    _id: string;
    // Add more fields if needed
}
function EnquiryForm({ onClose, setState, state }: {
    onClose: () => void, setState: React.Dispatch<React.SetStateAction<{
        status: boolean;
        id: string;
        count: number;
    }>>, state: {
        status: boolean;
        id: string;
        count: number;
    }
}) {

    const [formData, setFormData] = useState<{
        name: string;
        number: string;
        email: string;
    }>({ name: '', number: '', email: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        // Simple validation
        if (!formData.name.trim()) {
            return errorToast('Please enter your name.');
        }

        if (!formData.number || formData.number.length < 6) {
            return errorToast('Please enter a valid mobile number.');
        }

        if (!formData.email.trim()) {
            return errorToast('Please enter a valid email.');
        }

        if (!formData.email.includes('@')) {
            return errorToast('Please enter a valid email.');
        }

        if (!formData.email.includes('.')) {
            return errorToast('Please enter a valid email.');
        }

        if (!formData.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            return errorToast('Please enter a valid email.');
        }




        if (!state.id) {
            return errorToast('Please select a slot then submit');
        }

        try {
            setLoading(true);


            const payload: any = {
                name: formData.name,
                number: formData.number,
                slotId: state.id,
                email: formData.email,
            };

            const userDataString = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_DATA);


            if (userDataString) {

                const userData: UserData = JSON.parse(userDataString);
                if (userData) payload.userId = userData._id
            }



            const response = await axios.post(`${baseUrl}/booking-slot`, payload);

            if (response?.status === 201 && response?.data) {
                setState((prev: any) => ({
                    ...prev,
                    count: 2,
                }));
            } else {


                setState((prev: any) => ({
                    ...prev,
                    count: 1,
                }));
            }
            // successToast('Enquiry submitted successfully!');
            setFormData({ name: '', number: '', email: '' });
        } catch (error: any) {
            errorToast(error?.response?.data?.message || error?.data?.message || error?.response?.message || error?.message || 'Error occurred, please try again later');
            // console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <form onSubmit={handleSubmit} className='border relative sm:w-[436px] rounded-[5px] m-auto bg-white pt-4 pb-3 p-3 flex flex-col gap-1  border-[#DEDEDE]'>

                <button
                    type='button'
                    className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-red-500"
                    onClick={onClose}
                >
                    <IoMdClose size={18} color='#333333' />
                </button>
                <p className='text-center pb-2  text-[17.25px] font-poppins font-medium'>Please Enter your details for Registration</p>

                <SpaceWrapper
                    className='pb-1'
                >

                    <InputField
                        type="text"
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                    />
                </SpaceWrapper>


                <SpaceWrapper
                    className='pb-1'
                >
                    <InputField
                        type="number"
                        name='number'
                        value={formData.number}
                        onChange={handleChange}
                        placeholder="Mobile"
                    />
                </SpaceWrapper>


                <SpaceWrapper
                    className='pb-1'
                >
                    <InputField
                        type="email"
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                    />
                </SpaceWrapper>

                <PrimaryButton
                    type="submit"
                    disabled={loading}
                    className="flex w-full h-[36px] items-center gap-2 rounded border-none bg-[#FF1645]"
                >
                    <span className="text-[14px] text-white">Submit</span>
                </PrimaryButton>
            </form>
        </Container>
    )
}

export default EnquiryForm