// usePaymentPlan.ts
"use client";

import { useState } from "react";

export function usePaymentPlan(initialDown = 20) {
  const [downPayment, setDownPayment] = useState(initialDown);

  const completionPayment = 100 - downPayment;

  return {
    downPayment,
    completionPayment,
    setDownPayment,
  };
}
