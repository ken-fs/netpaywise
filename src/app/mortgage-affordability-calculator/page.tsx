import type { Metadata } from "next";
import { AffordabilityCalculator } from "@/components/AffordabilityCalculator";
import { ToolPage } from "@/components/ToolPage";

export const metadata: Metadata = {
  title: "Mortgage Affordability Calculator — How Much House?",
  description:
    "See how much house you can afford based on income, debts, and down payment, using the 28/36 rule. Free, no signup.",
  alternates: { canonical: "/mortgage-affordability-calculator/" },
};

export default function Affordability() {
  return (
    <ToolPage
      appName="netpaywise Mortgage Affordability Calculator"
      title="How much house, really?"
      lede="Income, debts, down payment. We use the 28/36 rule to size a comfortable price."
      faq={[
        { q: "What's the 28/36 rule?", a: "Lenders like housing costs under 28% of gross income, and all debt under 36%. We use the lower ceiling of the two." },
        { q: "Why is the number lower than a lender quotes?", a: "This is a principal + interest budget. Property tax, insurance, and PMI eat into it, so the real max price is lower." },
        { q: "Is this a pre-approval?", a: "No. It's a planning estimate. Your lender's numbers, credit, and reserves decide the real limit." },
      ]}
      prose={
        <>
          <h2>Know your take-home first</h2>
          <p>Affordability runs on income, but you live on take-home. Check your <a href="/paycheck-calculator/">paycheck by state</a> before you set a budget.</p>
        </>
      }
    >
      <AffordabilityCalculator />
    </ToolPage>
  );
}
