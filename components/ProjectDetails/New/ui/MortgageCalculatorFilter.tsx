"use client";

import { formatAmount } from "@/utils/formatAmount";
import {
  MortgageValues,
  useMortgageCalculator,
} from "../logic/useMortgageCalculator";
import MortgageField from "./MortgageField";

interface Props {
  initialValues: MortgageValues;
  onApply?: (values: MortgageValues) => void;
  onChange?: (values: MortgageValues) => void;
}

export default function MortgageCalculatorFilter({
  initialValues,
  onApply,
  onChange,
}: Props) {
  const {
    values,
    update,
    reset,
    downPaymentAmount,
    monthlyEmi,
  } = useMortgageCalculator(initialValues, onChange);

  
  return (
    <div className="w-full space-y-3">
      <MortgageField
        label="Total Price"
        value={values.price}
        suffix="AED"
        min={100000}
        max={100000000}
        step={100000}
        onChange={(v) => update("price", v)}
      />

      <MortgageField
        label="Loan Period"
        value={values.years}
        suffix="Years"
        min={1}
        max={30}
        onChange={(v) => update("years", v)}
      />

      <MortgageField
        label="Down Payment"
        value={values.downPaymentPercent}
        suffix="%"
        min={5}
        max={50}
        onChange={(v) => update("downPaymentPercent", v)}
      />

      <MortgageField
        label="Interest Rate"
        value={values.interestRate}
        suffix="%"
        min={1}
        max={15}
        step={0.1}
        onChange={(v) => update("interestRate", v)}
      />

      {/* RESULT */}
     <div className="pt-2 space-y-1">
  <p className="text-base font-normal  mt-2 font-poppins text-black">
    Down Payment Amount:{" "}
    <span className="font-poppins font-semibold">
      AED {formatAmount(downPaymentAmount)}
    </span>
  </p>

  <p className="text-base font-normal font-poppins mt-2 text-black">
    Monthly EMI:{" "}
    <span className="font-poppins font-semibold">
      AED {formatAmount(Math.round(monthlyEmi))}
    </span>
  </p>
</div>
      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={reset}
          className="flex-1 bg-[#F5F5F5] h-12 rounded-lg text-[#333333] border border-[#DFDFDF] text-sm font-poppins font-medium"
        >
          Reset
        </button>

        <button
          onClick={() => onApply?.(values)}
          className="flex-1 h-12 rounded-lg bg-black text-white border text-sm font-poppins font-medium"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
