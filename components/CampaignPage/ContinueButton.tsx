import React from 'react'

type Props = {
    isSubmitting: boolean;
    handleClick?: () => void;
    disabled?: boolean;
    label?: string;
    submit?: boolean;
}

function ContinueButton({ submit,isSubmitting, handleClick, disabled,label = "Next" }: Props) {
    return (
        <button
            onClick={handleClick}
            type={ submit ? "submit" : "button"}
            disabled={disabled || isSubmitting}
            className="w-full text-base mt-[20px] text-[14px] cursor-pointer font-normal font-poppins bg-[#FF1645] text-white h-[40px] rounded-[8px] hover:bg-[#D8133A] transition flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {isSubmitting ? (
                <>
                    <svg
                        className="animate-spin h-5 w-5 mr-2 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                    </svg>
                    Loading...
                </>
            ) : label}
        </button>
    )
}

export default ContinueButton;