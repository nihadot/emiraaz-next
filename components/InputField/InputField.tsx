import Image from "next/image";
import React from "react";
   
interface InputFieldProps {
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  icon?: string; // optional icon for the left side
  name?: string;
  id?: string;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  type = "text",
  value,
  onChange,
  placeholder = "",
  className = "",
  icon,
  name,
  id,
  required = false,
}) => {
  return (
    <div
      className={`flex gap-3 items-center border rounded px-3 py-3 w-full bg-white border-[#DEDEDE] text-[#767676] text-sm ${className}`}
    >
      {icon && <Image src={icon} alt="icon" width={24} height={24} />}
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="flex-1 outline-none bg-transparent text-gray-800 placeholder:text-gray-400"
        required={required}
      />
    </div>
  );
};

export default InputField;
