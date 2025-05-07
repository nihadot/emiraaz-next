import { filter_icon } from '@/app/assets'
import PrimaryButton from '@/components/Buttons'
import Image from 'next/image'
import React from 'react'

type Props = {
    monthlyPayment: number;
    totalPrice: number;
    downPayment: number;
    years: number;
    handleLoanAmountModal:()=> void;
    interestRate: number;
  };
function LoanAmountOptions({
    monthlyPayment,
    totalPrice,
    downPayment,
    years,
    interestRate,
    handleLoanAmountModal
 }: Props) {
    return (
        <div className='sm:hidden px-[20px] pt-4 pb-[18px] border border-[#DEDEDE] rounded-md'>
      <h3 className='flex my-3 w-full justify-center items-center gap-3'>
        <p className=' text-[12.78px] sm:text-sm flex mt-2'>AED</p>
        <p className=' text-[28px] font-semibold sm:font-bold'>{monthlyPayment.toLocaleString()}</p>
        <p className='flex font-poppins font-normal text-[13px] justify-center items-center'>Per Month</p>
      </h3>

      <div>
        <p className='pt-2 text-[13px] font-poppins font-normal'>Loan Period : {years} Years</p>
        <p className='pt-2 text-[13px] font-poppins font-normal'>
          Down Payment : ({((downPayment / totalPrice) * 100).toFixed(0)}%) AED {downPayment.toLocaleString()}
        </p>
        <p className='pt-2 text-[13px] font-poppins font-normal'>Interest Rate : {interestRate}%</p>
      </div>


            <PrimaryButton
            onClick={handleLoanAmountModal}
                type="button"
                className="border-none w-full mt-3 text-[#FF1645] font-poppins rounded "
              
            >
               <div className="flex items-center gap-2">
                        <Image src={filter_icon} alt="save icon" width={14} />
                        <label className="text-[12.8px] font-medium text-[#FF1645] font-poppins">Edit Values</label>
                    </div>
              </PrimaryButton>


        </div>
    )
}

export default LoanAmountOptions