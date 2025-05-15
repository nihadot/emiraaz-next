import React, { useState, useEffect } from 'react'
import ProjectHeader from './ProjectHeader';

type Props = {
  headerTitle?: string;
  data?: (result: {
    monthlyPayment: number;
    loanAmount: number;
    interestRate: number;
    downPayment: number;
    years: number;
  }) => void; defaultTotalPrice?: number;
  defaultYears?: number;
  defaultDownPayment?: number;
  defaultInterestRate?: number;
  description?: string;
  wrapperContainerClassName?: string;
}

const MortgageCalculator = ({
  data,
  headerTitle,
  defaultTotalPrice = 1000000,
  defaultYears = 10,
  defaultDownPayment = 25000,
  defaultInterestRate = 4,
  description,
  wrapperContainerClassName
}: Props) => {
  const [totalPrice, setTotalPrice] = useState(defaultTotalPrice)
  const [years, setYears] = useState(defaultYears)
  const [downPayment, setDownPayment] = useState(defaultDownPayment)
  const [interestRate, setInterestRate] = useState(defaultInterestRate)

  const [monthlyPayment, setMonthlyPayment] = useState(0)
  const [loanAmount, setLoanAmount] = useState(0)

  useEffect(() => {
    const principal = totalPrice - downPayment
    const monthlyInterest = interestRate / 100 / 12
    const numberOfPayments = years * 12

    const numerator = principal * monthlyInterest * Math.pow(1 + monthlyInterest, numberOfPayments)
    const denominator = Math.pow(1 + monthlyInterest, numberOfPayments) - 1

    const monthly = numerator / denominator

    setMonthlyPayment(monthly || 0)
    setLoanAmount(principal)
  }, [totalPrice, downPayment, years, interestRate]);

  useEffect(() => {
    if (monthlyPayment && loanAmount && data) {
      data({
        monthlyPayment,
        loanAmount,
        interestRate,
        downPayment,
        years
      });
    }
  }, [monthlyPayment, loanAmount, interestRate, downPayment, years, data]);
  return (
    <div className="">
      <div className="py-3">
        {headerTitle && <ProjectHeader
          title={headerTitle || 'Mortgage'}
          contentClassName='font-medium text-[18.75px]'

        />}
      </div>
      {description && <p className='text-[14px] font-poppins text-gray-600 py-3'>Calculate and view the monthly mortgage on this apartment</p>}
      <div className={`flex  gap-6 p-6  border border-[#DEDEDE] rounded-[3px] ${wrapperContainerClassName}`}>

        <div className="flex-1  space-y-4">
          {/* Total Price */}
          <InputWithSlider
            label="Total Price"
            value={totalPrice}
            min={50000}
            max={5000000}
            step={10000}
            onChange={setTotalPrice}
            unit="AED"
          />

          {/* Years */}
          <InputWithSlider
            label="Loan Term"
            value={years}
            min={1}
            max={30}
            step={1}
            onChange={setYears}
            unit="Years"
          />

          {/* Down Payment */}
          <InputWithSlider
            label="Down Payment"
            value={downPayment}
            min={0}
            max={totalPrice}
            step={1000}
            onChange={setDownPayment}
            unit="AED"
          />

          {/* Interest Rate */}
          <InputWithSlider
            label="Interest Rate"
            value={interestRate}
            min={0}
            max={15}
            step={0.1}
            onChange={setInterestRate}
            unit="%"
          />
        </div>

        {/* Result */}
        <div className="sm:flex hidden  flex-col w-full font-poppins max-w-[280px] justify-center items-center pl-8 border-[#DEDEDE] border-l">
          <h2 className="text-[20px] font-poppins font-medium mb-[28.5px]">AED <span className="text-[33.75px] font-medium font-poppins">{monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span> <span className="text-[13.5px] font-normal font-poppins">Per Month</span></h2>
          <p className="font-normal text-[13.5px] text-[#373737] text-center w-full">Total Loan Amount</p>
          <h2 className="text-[20px] font-poppins font-medium mb-2 mt-1">AED <span className="text-[33.75px] font-medium font-poppins">{loanAmount.toLocaleString()}</span></h2>
        </div>
      </div>
    </div>
  )
}

export default MortgageCalculator

const InputWithSlider = ({ label, value, min, max, step, onChange, unit }: {
  label: string,
  value: number,
  min: number,
  max: number,
  step: number,
  onChange: (val: number) => void,
  unit: string
}) => {
  return (
    <div className='flex gap-8  items-center justify-center'>
      <div className="flex flex-1 h-full flex-col">
        <label className="block font-medium font-poppins text-[15px] mb-1">{label}</label>
        <div className="flex rounded px-2 border-[#DEDEDE] border items-center space-x-2 mb-1">
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="border border-none text-[13.5px] font-poppins font-medium rounded p-2 w-full"
          />
          <span className="text-[13.5px] font-medium font-poppins text-[#767676]">{unit}</span>
        </div>
      </div>
      <div className="flex flex-1 h-full mt-6 items-center ">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full custom-range"
        />
      </div>
    </div>
  )
}
