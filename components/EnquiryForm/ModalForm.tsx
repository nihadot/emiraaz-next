import React, { useState } from 'react';
import InputField from '../InputField/InputField';
import PrimaryButton from '../Buttons';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { errorToast, successToast } from '../Toast';
import axios from "axios";
import { baseUrl } from '@/api';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { LOCAL_STORAGE_KEYS } from '@/api/storage';
type Props = {
    item: {
        id: string;
        status: boolean;
    }
    setEnquiry: (option: any) => void;
    onClose: () => void;
};
import { IoMdClose } from "react-icons/io";
import { useCountryCode } from '@/utils/useCountryCode';

interface UserData {
    _id: string;
}

function ModalForm({ item, setEnquiry, onClose }: Props) {
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
                if (userData) payload.userId = userData._id
            }



            const response = await axios.post(`${baseUrl}/enquiry`, payload);
            if (response?.status === 201 && response?.data?.message && response?.data?.exist) {
                setEnquiry((prev: any) => ({
                    ...prev,
                    status: true,
                    count: 3,
                }))
            } else {


                setEnquiry((prev: any) => ({
                    ...prev,
                    status: true,

                    count: 2,
                }))
            }
            setFormData({ name: '', number: '' });
        } catch (error: any) {
            errorToast(error?.response?.data?.message || error?.data?.message || error?.response?.message || error?.message || 'Error occurred, please try again later');
        } finally {
            setLoading(false);
        }
    };

        const countryCode = useCountryCode();
 

    return (
        <>

            <form className='sm:w-[436px] m-auto relative p-3 rounded-[5px] bg-white max-w-[400px] flex flex-col gap-2 w-full pt-[20px]' onSubmit={handleSubmit}>
                <button
                    type='button'
                    className="absolute cursor-pointer top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-red-500"
                    onClick={onClose}
                >
                    <IoMdClose size={18} color='#333333' />
                </button>
                <p className='text-center pb-2  text-[17.25px] font-poppins font-medium'>Please enter your details</p>

                <InputField
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    placeholder='Enter your name'
                />

                <PhoneInput
                    value={countryCode}
                    placeholder='Your Phone Number'
                    onChange={handlePhoneChange}
                    inputProps={{
                        name: 'phone',
                        required: true,
                    }}
                    inputStyle={{
                        width: '100%',
                        height: '40px',
                        borderRadius: '3.5px',
                        fontSize: '16px',
                        borderColor: '#ccc',
                    }}
                    countryCodeEditable={false} 
                />

                <PrimaryButton
                    loading={loading}
                    type='submit'
                    className='flex mt-1 cursor-pointer justify-center bg-[#FF1645] rounded-[3.75px] border-none items-center gap-1'

                >

                    <div className='cursor-pointer justify-center flex items-center gap-2'>
                        <label className='text-white text-[14.25px] font-poppins font-medium cursor-pointer'>Submit</label>
                    </div>
                </PrimaryButton>
            </form>

        </>
    );
}

export default ModalForm;
