// useLoanSummary.ts
"use client";

import { useState } from "react";

export function useLoanSummary({
  price,
  downPaymentPercent,
  years,
  interestRate,
}: {
  price: number;
  downPaymentPercent: number;
  years: number;
  interestRate: number;
}) {
  const downPayment = Math.round((price * downPaymentPercent) / 100);
  const loanAmount = price - downPayment;

  const monthlyRate = interestRate / 100 / 12;
  const months = years * 12;

  const monthlyEMI =
    (loanAmount *
      monthlyRate *
      Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);

  const [isEditing, setIsEditing] = useState(false);

  return {
    monthlyEMI: Math.round(monthlyEMI),
    downPayment,
    loanPeriod: years,
    interestRate,
    downPaymentPercent,
    isEditing,
  };
}
