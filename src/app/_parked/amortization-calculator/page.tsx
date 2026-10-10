import type { Metadata } from "next";
import { LoanCalculator } from "@/components/LoanCalculator";
import { ToolPage } from "@/components/ToolPage";

export const metadata: Metadata = {
  title: "Amortization Calculator — Loan Payment Schedule",
  description:
    "See your full loan amortization: monthly payment, total interest, and how principal and interest split over time. Free, no signup.",
  alternates: { canonical: "/amortization-calculator/" },
};

export default function Amortization() {
  return (
    <ToolPage
      appName="takehomepal Amortization Calculator"
      title="Where every payment actually goes."
      lede="Amortization is just the split between interest and principal each month. Here's yours."
      faq={[
        { q: "What is amortization?", a: "It's how a fixed loan is paid off: an equal payment each month that's mostly interest at first, then mostly principal near the end." },
        { q: "Why is early interest so high?", a: "Interest is charged on the balance. Early on the balance is largest, so more of each payment is interest." },
      ]}
    >
      <LoanCalculator defaultPrincipal={250000} defaultRate={6.5} defaultYears={30} />
    </ToolPage>
  );
}
