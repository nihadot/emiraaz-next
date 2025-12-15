"use client";

import { useState, useCallback, useMemo } from "react";

export interface MortgageValues {
  price: number;
  years: number;
  downPaymentPercent: number;
  interestRate: number;
}

export function useMortgageCalculator(
  initial: MortgageValues,
  onChange?: (v: MortgageValues) => void
) {
  const [values, setValues] = useState<MortgageValues>(initial);

  const update = useCallback(
    (key: keyof MortgageValues, value: number) => {
      const updated = { ...values, [key]: value };
      setValues(updated);
      onChange?.(updated);
    },
    [values, onChange]
  );

  const reset = () => {
    setValues(initial);
    onChange?.(initial);
  };

  /* ---------------- EMI CALCULATION ---------------- */

  const downPaymentAmount =
    (values.price * values.downPaymentPercent) / 100;

  const loanAmount = values.price - downPaymentAmount;

  const monthlyEmi = useMemo(() => {
    const r = values.interestRate / 12 / 100; // monthly rate
    const n = values.years * 12; // total months

    if (r === 0) return loanAmount / n;

    return (
      (loanAmount * r * Math.pow(1 + r, n)) /
      (Math.pow(1 + r, n) - 1)
    );
  }, [
    loanAmount,
    values.interestRate,
    values.years,
  ]);

  return {
    values,
    update,
    reset,
    downPaymentAmount,
    loanAmount,
    monthlyEmi,
  };
}
