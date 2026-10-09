import type { Metadata } from "next";
import { LoanCalculator } from "@/components/LoanCalculator";
import { ToolPage } from "@/components/ToolPage";

export const metadata: Metadata = {
  title: "Mortgage Payoff Calculator — See What Extra Payments Save",
  description:
    "See how much time and interest an extra monthly payment shaves off your mortgage. Free payoff calculator, no signup.",
  alternates: { canonical: "/mortgage-payoff-calculator/" },
};

export default function MortgagePayoff() {
  return (
    <ToolPage
      appName="netpaywise Mortgage Payoff Calculator"
      title="Pay a little extra. Finish years early."
      lede="Add an extra amount each month and watch the payoff date — and total interest — drop."
      faq={[
        { q: "Does an extra payment really help that much?", a: "Yes. Early in a mortgage most of your payment is interest, so extra dollars go straight to principal and compound in your favor." },
        { q: "Where do I enter the extra?", a: "The 'extra monthly payment' field. The result shows months saved and interest saved." },
        { q: "Should I pay extra or invest?", a: "Depends on your rate vs. expected returns and your risk tolerance. This tool shows the guaranteed interest savings side." },
      ]}
      prose={
        <>
          <h2>Why extra principal wins</h2>
          <p>Every dollar of extra principal erases all the future interest that dollar would have cost. On a 30-year loan, small monthly extras can cut years off the term.</p>
        </>
      }
    >
      <LoanCalculator defaultPrincipal={320000} defaultRate={6.5} defaultYears={30} />
    </ToolPage>
  );
}
