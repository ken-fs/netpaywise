import type { Metadata } from "next";
import { loadFederal } from "@/lib/data";
import { SETaxCalculator } from "@/components/SETaxCalculator";
import { ToolPage } from "@/components/ToolPage";
import { usd } from "@/lib/format";

export const metadata: Metadata = {
  title: "1099 Tax Calculator With Deductions — 2026 and 2025",
  description:
    "Free 1099 tax calculator for 2026 and 2025. Enter your income and business expenses, plus SEP-IRA or health insurance deductions, to see self-employment tax, income tax and what to set aside.",
  alternates: { canonical: "/1099-tax-calculator/" },
};

export default function TenNinetyNineTax() {
  const federal = loadFederal();
  const prior = loadFederal(federal.taxYear - 1);
  const y = federal.taxYear;
  return (
    <ToolPage
      appName="takehomepal 1099 Tax Calculator"
      title="1099 tax calculator, with your deductions in."
      lede="Work for yourself? Nobody withholds anything, so the whole bill lands on you. Put in what you earned and what you spent, and see what you owe for 2026 — or 2025 if you're still filing."
      faq={[
        { q: "How much should I set aside for 1099 taxes?", a: "Use the quarterly number above. For a single filer with no other income, federal tax on $60,000 of profit is roughly a fifth of it. Add your state's income tax on top unless you live in a no-tax state." },
        { q: "What deductions can I take on 1099 income?", a: "Business expenses come off first: software, equipment, supplies, business miles at the IRS standard mileage rate, a home office, phone and internet for work. Those cut both self-employment tax and income tax. Then SEP-IRA or solo 401(k) contributions and self-employed health insurance come off before income tax, but not before self-employment tax." },
        { q: `Can I use this for my ${y - 1} taxes?`, a: `Yes. Switch the year to ${y - 1}. It uses the ${y - 1} brackets, the ${usd(prior.standardDeduction.single)} standard deduction for single filers (${usd(prior.standardDeduction.married_jointly)} married filing jointly) and the ${usd(prior.fica.socialSecurity.wageBase)} Social Security wage cap. If you filed an extension, the ${y - 1} return is due October 15, ${y}.` },
        { q: "Why is self-employment tax 15.3%?", a: "As your own employer you pay both halves of Social Security and Medicare: 12.4% Social Security (up to the wage cap) plus 2.9% Medicare, on 92.35% of your net profit." },
        { q: "What is the QBI deduction?", a: `The qualified business income deduction lets most freelancers take 20% of their business profit off their taxable income. In ${y} it's in full below ${usd(federal.qbi.threshold.single)} of taxable income (${usd(federal.qbi.threshold.married_jointly)} married filing jointly), then shrinks if you have no employees.` },
        { q: "Can I deduct part of my self-employment tax?", a: "Yes. Half of the 15.3% comes off your income before income tax is figured. The calculator already does this." },
        { q: "When are quarterly payments due?", a: `For the ${y} tax year: April 15, June 15 and September 15 of ${y}, and January 15 of ${y + 1}. Pay through IRS Direct Pay or EFTPS.` },
        { q: "I also have a W-2 job. Does this still work?", a: "Not exactly. Your W-2 pay fills the lower tax brackets first, so your 1099 income gets taxed at a higher rate. Treat this number as a floor." },
      ]}
      prose={
        <>
          <h2>Two taxes, no withholding</h2>
          <p>
            A W-2 paycheck has tax taken out before you see it. 1099 money doesn&apos;t.
            The IRS still wants it during the year, in four estimated payments, and charges
            an underpayment penalty if you wait until April.
          </p>
          <p>The bill has two parts:</p>
          <ul>
            <li><strong>Self-employment tax</strong> — Social Security and Medicare, both halves. Social Security stops at {usd(federal.fica.socialSecurity.wageBase)} of earnings in {y}.</li>
            <li><strong>Federal income tax</strong> — the normal brackets, on profit minus half your SE tax, the standard deduction ({usd(federal.standardDeduction.single)} single in {y}) and the QBI deduction.</li>
          </ul>
          <h2>Deductions, in the order they count</h2>
          <ul>
            <li><strong>Business expenses</strong> — anything ordinary and necessary for the work. They lower your profit, so both taxes shrink.</li>
            <li><strong>Half your SE tax</strong> — taken off automatically before income tax.</li>
            <li><strong>Retirement and health insurance</strong> — SEP-IRA, solo 401(k) and self-employed health premiums lower income tax only.</li>
            <li><strong>Standard or itemized deduction</strong> — whichever is bigger ({usd(federal.standardDeduction.single)} single in {y}, {usd(prior.standardDeduction.single)} in {y - 1}).</li>
            <li><strong>QBI deduction</strong> — up to 20% of what&apos;s left of your business profit.</li>
          </ul>
          <h2>The simple habit</h2>
          <p>
            Every time a client pays you, move the calculator&apos;s percentage into a separate
            savings account. When a quarterly due date comes around, the money is already
            sitting there.
          </p>
        </>
      }
    >
      <SETaxCalculator years={[federal, prior]} />
    </ToolPage>
  );
}
