import { useField } from 'formik';
import React from 'react';

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label?: string;
  loading?: boolean;
  
}

const SelectField: React.FC<SelectFieldProps> = ({ label, loading, children, ...props }) => {
  const [field, meta] = useField(props.name);

  return (
    <div className=''>
      {label && (
        <label htmlFor={props.id || props.name} className="block mb-1 font-medium">
          {label}
        </label>
      )}

      <select
        {...field}
        {...props}
        disabled={loading}
        className={`w-full outline-none border-[#DEDEDE] border-[2px] bg-[#F7F7F7] rounded-[3px] px-[16px] font-poppins text-[12px] font-normal  text-black h-[40px] ${
          meta.touched && meta.error ? 'border-red-500' : 'border-gray-300'
        }`}
      >
        {children}
      </select>

      {meta.touched && meta.error && (
        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
      )}
    </div>
  );
};

export default SelectField;
