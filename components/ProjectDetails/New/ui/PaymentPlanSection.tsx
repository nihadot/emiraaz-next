import { usePaymentPlan } from "../logic/usePaymentPlan";
import PaymentPlanUI from "./PaymentPlanUI";

export default function PaymentPlanSection() {
  const { downPayment, completionPayment } = usePaymentPlan(20);

  return (
    <PaymentPlanUI
      downPayment={downPayment}
      completionPayment={completionPayment}
      startingPrice={100000}
      handover="Other"
    />
  );
}
