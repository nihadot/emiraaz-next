import LoanSummaryUI from "./LoanSummaryUI";

export default function LoanSummarySection({toggleEdit,
    price,
    downPaymentPercent,
    years,
    interestRate
}: {toggleEdit:()=>void,
    price: number,
    downPaymentPercent: number,
    years: number,
    interestRate: number
}) {

const downPaymentAmount = (price * downPaymentPercent) / 100;
  const loanAmount = price - downPaymentAmount;

  const r = interestRate / 100 / 12;
  const n = years * 12;

  const monthlyEMI =
    r === 0
      ? loanAmount / n
      : (loanAmount * r * Math.pow(1 + r, n)) /
        (Math.pow(1 + r, n) - 1);


  return (
    <LoanSummaryUI
      monthlyEMI={Math?.round(monthlyEMI)}
      loanPeriod={years}
      downPayment={downPaymentPercent}
      downPaymentPercent={interestRate}
      interestRate={interestRate}
      onEdit={toggleEdit}
    />
  );
}
