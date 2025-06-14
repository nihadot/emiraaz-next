import { Field } from 'formik'
import React from 'react'


function InputField({
    loading,
    type,
    id,
    name,
    placeholder,
    className,
}: {
    loading: boolean,
    type: string,
    id: string,
    name: string,
    placeholder: string,
    className?: string
}) {
    return (
        <Field
            type={type}
            id={id}
            name={name}
            placeholder={placeholder}
            className="w-full outline-none border-[#DEDEDE] border-[2px] bg-[#F7F7F7] rounded-[3px] px-[16px] font-poppins text-[12px] font-normal  text-black h-[40px]"
            disabled={loading}
        />
    )
}


export default InputField