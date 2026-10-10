import type { Metadata } from "next";
import { SalaryHourlyCalculator } from "@/components/SalaryHourlyCalculator";
import { ToolPage } from "@/components/ToolPage";
import { AMOUNT_PAGES, labelOf } from "@/lib/amounts";

export const metadata: Metadata = {
  title: "Salary to Hourly Calculator — Convert Either Way",
  description:
    "Convert an annual salary to an hourly rate, or hourly to salary. Adjust hours per week and weeks per year. Free, no signup.",
  alternates: { canonical: "/salary-to-hourly/" },
};

export default function SalaryToHourly() {
  return (
    <ToolPage
      appName="takehomepal Salary and Hourly Converter"
      title="Salary or hourly — same pay, different label."
      lede="Convert either direction. Tweak your weekly hours and working weeks to match real life."
      faq={[
        { q: "What's the default?", a: "40 hours a week, 52 weeks a year — the standard 2,080-hour full-time year." },
        { q: "Is this before or after taxes?", a: "Before. It's a gross-pay conversion. For take-home, use the paycheck calculator." },
        { q: "I only work part of the year — can I adjust?", a: "Yes. Drop the weeks-per-year to match your actual schedule and the numbers follow." },
        { q: "How much is $50,000 a year per hour?", a: "About $24.04 an hour at 40 hours a week for 52 weeks. $60,000 is $28.85, $75,000 is $36.06, and $100,000 is $48.08." },
      ]}
      prose={
        <>
          <h2>The quick rule</h2>
          <p>
            Divide an annual salary by 2,080 to get the hourly rate, or multiply an hourly
            rate by 2,080 to get the salary. A rougher shortcut: halve the salary and drop
            the thousands — $60,000 is about $30 an hour.
          </p>
          <p>
            These are gross numbers, before tax. To see what an offer pays after federal tax
            and FICA, put it into the <a href="/paycheck-calculator/">paycheck calculator</a>.
          </p>
          <h2>Common amounts, worked out</h2>
          <ul className="amount-links">
            {AMOUNT_PAGES.map((o) => <li key={o.slug}><a href={`/salary-to-hourly/${o.slug}/`}>{labelOf(o)}</a></li>)}
          </ul>
        </>
      }
    >
      <SalaryHourlyCalculator />
    </ToolPage>
  );
}
