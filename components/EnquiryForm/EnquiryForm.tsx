import React, { useState } from 'react'
import InputField from '../InputField/InputField'
import PrimaryButton from '../Buttons';
import { notes_icon } from '@/app/assets';
import Image from 'next/image';


function EnquiryForm() {

    const [formData, setFormData] = useState<{
        name: string;
        number: string;
    }>({ name: '', number: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div className='border p-3 rounded-[3.5px] flex flex-col gap-1  border-[#DEDEDE]'>
            <InputField
                type="text"
                name='name'
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
            />

            <InputField
                type="number"
                name='number'
                value={formData.number}
                onChange={handleChange}
                placeholder="Mobile"
            />

            {/* <PrimaryButton
                type='submit'
                className='flex mt-1 justify-center bg-[#FF1645] rounded border-none items-center gap-1'
              
        >
              <div className='justify-center flex items-center gap-2'>
                        <Image src={details_icon} alt='menu icon' width={21} />

                        <label className='text-white text-sm' htmlFor="">Enquiry Now</label>
                    </div>
            </PrimaryButton> */}

            <PrimaryButton
                type="button"
                className="flex w-full h-[36px] items-center gap-2 rounded border-none bg-[#FF1645]"
            >
                <Image src={notes_icon} alt="enquiry icon" width={16.5} height={16.5} />
                <span className="text-[14px] text-white">Enquiry Now</span>
            </PrimaryButton>
        </div>
    )
}

export default EnquiryForm