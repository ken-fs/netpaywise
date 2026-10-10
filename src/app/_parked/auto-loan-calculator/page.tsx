import type { Metadata } from "next";
import { LoanCalculator } from "@/components/LoanCalculator";
import { ToolPage } from "@/components/ToolPage";

export const metadata: Metadata = {
  title: "Auto Loan Calculator — Car Payment & Interest",
  description:
    "Estimate your monthly car payment and total interest by loan amount, rate, and term. Free auto loan calculator, no signup.",
  alternates: { canonical: "/auto-loan-calculator/" },
};

export default function AutoLoan() {
  return (
    <ToolPage
      appName="takehomepal Auto Loan Calculator"
      title="What that car really costs per month."
      lede="Loan amount, rate, and term. See the monthly payment and how much interest rides along."
      faq={[
        { q: "Should I use price or loan amount?", a: "Loan amount — the price minus your down payment and trade-in, plus any tax or fees you're financing." },
        { q: "Does a longer term help?", a: "It lowers the monthly payment but raises total interest. Try a few terms to see the trade-off." },
      ]}
    >
      <LoanCalculator defaultPrincipal={35000} defaultRate={7} defaultYears={6} />
    </ToolPage>
  );
}
