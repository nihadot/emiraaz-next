import clsx from 'clsx'
import { Field } from 'formik'
import React from 'react'


function InputField({
    loading,
    type,
    id,
    name,
    placeholder,
    className,
    as,
    rows,
}: {
    loading: boolean,
    type?: string,
    id: string,
    name: string,
    placeholder: string,
    className?: string,
    as?: string
    rows?: number
}) {
    return (
        <Field
        as={as}
            type={type}
            id={id}
            name={name}
            placeholder={placeholder}
            className={clsx("w-full outline-none border-[#DEDEDE] border-[2px] bg-[#F7F7F7] rounded-[3px] px-[16px] font-poppins text-base sm:text-xs font-normal  text-black h-[40px]", className)}
            disabled={loading}
            rows={rows}
        />
    )
}


export default InputField