import type { Metadata } from "next";
import { loadFederal } from "@/lib/data";
import { IncomeTaxCalculator } from "@/components/IncomeTaxCalculator";
import { ToolPage } from "@/components/ToolPage";

export const metadata: Metadata = {
  title: "Federal Income Tax Calculator — What You Owe the IRS",
  description:
    "Estimate your federal income tax for this year using the current IRS brackets and standard deduction. Free, no signup.",
  alternates: { canonical: "/federal-income-tax-calculator/" },
};

export default function FederalIncomeTax() {
  const federal = loadFederal();
  return (
    <ToolPage
      appName="takehomepal Federal Income Tax Calculator"
      title="Your federal income tax, bracket by bracket."
      lede="Enter your income and filing status. We apply this year's IRS brackets after the standard deduction."
      faq={[
        { q: "Does this include state tax?", a: "No — federal only. For your state too, use the full income tax calculator." },
        { q: "Why is my tax lower than my bracket?", a: "Brackets are marginal. Only the income inside each bracket is taxed at that rate, so your effective rate is lower than your top bracket." },
        { q: "Are credits included?", a: "No. Credits like the Child Tax Credit or EITC can lower your bill further — this is a pre-credit estimate." },
      ]}
      prose={
        <>
          <h2>How federal brackets work</h2>
          <p>The US taxes income in slices. Your first dollars are taxed at 10%, the next slice at 12%, and so on. Nobody pays their top rate on every dollar.</p>
        </>
      }
    >
      <IncomeTaxCalculator federal={federal} />
    </ToolPage>
  );
}
