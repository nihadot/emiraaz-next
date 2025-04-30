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
        <div className='sm:hidden p-4 border border-[#DEDEDE] rounded-md'>
      <h3 className='flex my-3 w-full justify-center items-center gap-3'>
        <p className='text-sm flex self-end pb-0'>AED</p>
        <p className='text-[28px] font-bold'>{monthlyPayment.toLocaleString()}</p>
        <p className='flex justify-center items-center'>Per Month</p>
      </h3>

      <div>
        <p className='pt-2 text-sm font-medium'>Loan Period : {years} Years</p>
        <p className='pt-2 text-sm font-medium'>
          Down Payment : ({((downPayment / totalPrice) * 100).toFixed(0)}%) AED {downPayment.toLocaleString()}
        </p>
        <p className='pt-2 text-sm font-medium'>Interest Rate : {interestRate}%</p>
      </div>


            <PrimaryButton
            onClick={handleLoanAmountModal}
                type="button"
                className="bg-[#FFE7EC] border-none w-full mt-3 text-[#FF1645] font-poppins rounded "
              
            >
               <div className="flex items-center gap-2">
                        <Image src={filter_icon} alt="save icon" width={21} />
                        <label className="text-sm font-light text-[#FF1645] font-poppins">Edit Values</label>
                    </div>
              </PrimaryButton>


        </div>
    )
}

export default LoanAmountOptions