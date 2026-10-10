import type { Metadata } from "next";
import { loadFederal } from "@/lib/data";
import { NoTaxOvertimeCalculator } from "@/components/NoTaxOvertimeCalculator";
import { ToolPage } from "@/components/ToolPage";
import { usd } from "@/lib/format";

export const metadata: Metadata = {
  title: "No Tax on Overtime Calculator 2026 — Your Deduction & Refund",
  description:
    "See how much the new no tax on overtime deduction saves you in 2026: the qualified overtime, your deduction after the income phase-out, and the federal tax it cuts. Free, no signup.",
  alternates: { canonical: "/no-tax-on-overtime-calculator/" },
};

export default function NoTaxOnOvertime() {
  const federal = loadFederal();
  const od = federal.overtimeDeduction;
  const y = federal.taxYear;
  return (
    <ToolPage
      appName="takehomepal No Tax on Overtime Calculator"
      title="No tax on overtime: what it actually saves you."
      lede="The new deduction doesn't make overtime tax-free. It takes the extra half of time-and-a-half off your taxable income. Here's what that's worth."
      faq={[
        { q: "Is overtime really tax-free now?", a: `Not all of it. From ${od.firstYear} to ${od.lastYear} you can deduct the premium part of overtime the Fair Labor Standards Act requires — the extra half in time-and-a-half — up to ${usd(od.cap.single)} a year (${usd(od.cap.married_jointly)} filing jointly). Your regular rate for those hours is still taxed, and Social Security and Medicare still come out.` },
        { q: "How do I calculate the qualified overtime?", a: "Take your regular hourly rate, halve it, and multiply by your FLSA overtime hours (hours over 40 in a workweek). At $25 an hour, 8 overtime hours a week for 50 weeks: $12.50 × 400 = $5,000." },
        { q: "What if I'm paid double time?", a: "Only the part the FLSA requires counts, which is the half-time premium. A double-time hour still only qualifies for 0.5 × your regular rate. The same goes for overtime that only your state law or union contract requires." },
        { q: "Who can't claim it?", a: "Workers exempt from FLSA overtime (many salaried employees), married couples filing separately, and anyone without a valid Social Security number. Above the income limit the deduction shrinks and eventually disappears." },
        { q: "How does the income limit work?", a: `If your modified adjusted gross income is over ${usd(od.phaseOutStart.single)} (${usd(od.phaseOutStart.married_jointly)} filing jointly), the deduction drops by $${od.reductionPerThousand} for every full $1,000 over. The calculator does this for you.` },
        { q: "How much will my refund be?", a: "Roughly your deduction times your top tax bracket. If your employer withheld as usual during the year, that saving shows up as a bigger refund when you file. To get it in each paycheck instead, add the deduction to your W-4." },
        { q: "Do I need to itemize?", a: "No. It's a new deduction on Schedule 1-A that works with the standard deduction too." },
        { q: "Where does the overtime amount come from?", a: "Your employer reports qualified overtime separately on your W-2. For the first year it may be reported on a separate statement or estimated from your pay stubs, so keep them." },
      ]}
      prose={
        <>
          <h2>How the deduction works</h2>
          <p>
            Say you earn $25 an hour and work 48 hours a week. The 8 overtime hours pay $37.50
            each. $25 of that is your regular rate; the other $12.50 is the premium. Only the
            premium is deductible. Over a year of 50 weeks that&apos;s $5,000 off your taxable income.
          </p>
          <p>
            For a single filer earning about $67,000 in {y}, that saves roughly $650 in federal
            income tax. It doesn&apos;t touch Social Security or Medicare, which are still 7.65% of all
            your pay.
          </p>
          <h2>Get it in your paycheck, not just your refund</h2>
          <p>
            Payroll still withholds tax on overtime as normal. If you&apos;d rather see the money
            during the year, fill out a new W-4 and enter your expected deduction in the Step 4(b)
            deductions worksheet. Your employer will withhold a little less from each check.
          </p>
          <p>
            Just want to know what your overtime pays? Use the{" "}
            <a href="/overtime-calculator/">overtime calculator</a>. For your full take-home, try the{" "}
            <a href="/paycheck-calculator/">paycheck calculator</a>.
          </p>
        </>
      }
    >
      <NoTaxOvertimeCalculator federal={federal} />
    </ToolPage>
  );
}
