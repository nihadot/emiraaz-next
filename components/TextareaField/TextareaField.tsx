import React from "react";

interface TextareaFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
  name?: string;
  id?: string;
  required?: boolean;
  rows?: number;
}

const TextareaField: React.FC<TextareaFieldProps> = ({
  value,
  onChange,
  placeholder = "",
  className = "",
  name,
  id,
  required = false,
  rows = 4,
}) => {
  return (
    <div
      className={`border border-[#DEDEDE] rounded-[3.5px] px-3 py-3 w-full bg-white text-[#767676] text-sm ${className}`}
    >
      <textarea
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full resize-none outline-none text-[10.5px] font-normal font-poppins bg-transparent placeholder:text-[#767676]"
        required={required}
      />
    </div>
  );
};

export default TextareaField;
