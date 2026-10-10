import type { Metadata } from "next";
import { loadFederal, loadAllStateConfigs } from "@/lib/data";
import { IncomeTaxCalculator } from "@/components/IncomeTaxCalculator";
import { ToolPage } from "@/components/ToolPage";

export const metadata: Metadata = {
  title: "Income Tax Calculator — Federal + State, This Year",
  description:
    "Free US income tax calculator. Estimate your federal and state income tax and your after-tax income. No signup, no email.",
  alternates: { canonical: "/income-tax-calculator/" },
};

export default function IncomeTaxHub() {
  const federal = loadFederal();
  const states = loadAllStateConfigs();
  return (
    <ToolPage
      appName="takehomepal Income Tax Calculator"
      title="How much income tax you actually owe."
      lede="Federal plus your state, on this year's brackets. See the bite and what's left."
      faq={[
        { q: "Is income tax the same as what comes out of my paycheck?", a: "No. Your paycheck also loses FICA (Social Security + Medicare). This tool is income tax only." },
        { q: "Which deductions does this use?", a: `The standard deduction for the ${federal.taxYear} tax year. It doesn't count itemized deductions or credits.` },
        { q: "Effective vs marginal rate?", a: "Marginal is the rate on your last dollar. Effective is total tax ÷ total income — the number that actually matters." },
      ]}
      prose={
        <>
          <h2>Federal and state, stacked</h2>
          <p>Most US workers pay two income taxes: federal, and — in 41 states — a state one on top. This tool adds both and shows your effective rate.</p>
          <p>Pre-tax contributions to a 401(k) or HSA lower the income that gets taxed. That's the cleanest way to owe less.</p>
        </>
      }
    >
      <IncomeTaxCalculator federal={federal} states={states} />
    </ToolPage>
  );
}
