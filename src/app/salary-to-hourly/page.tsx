import type { Metadata } from "next";
import { SalaryHourlyCalculator } from "@/components/SalaryHourlyCalculator";
import { ToolPage } from "@/components/ToolPage";
import { AMOUNT_PAGES, labelOf } from "@/lib/amounts";

export const metadata: Metadata = {
  title: "Salary to Hourly Wage Calculator — Your Hourly Rate From a Salary",
  description:
    "Turn an annual salary into an hourly wage, or an hourly rate into a yearly salary. Set your real hours per week and weeks per year. Free, no signup.",
  alternates: { canonical: "/salary-to-hourly/" },
};

export default function SalaryToHourly() {
  return (
    <ToolPage
      appName="takehomepal Salary and Hourly Converter"
      title="Salary to hourly wage: what your pay works out to per hour."
      lede="Type a salary to get your hourly rate, or flip it to turn an hourly wage into a yearly salary. Tweak the hours and weeks to match the job you actually have."
      faq={[
        { q: "How do I convert my salary to an hourly wage?", a: "Divide your annual salary by the hours you work in a year. Full time is 40 hours × 52 weeks = 2,080 hours, so a $62,400 salary is $30 an hour. Work 45 hours a week and the same salary drops to about $26.67." },
        { q: "What's the default?", a: "40 hours a week, 52 weeks a year — the standard 2,080-hour full-time year." },
        { q: "Is an hourly rate the same as an hourly wage?", a: "Yes, people use them for the same thing: what one hour of work pays before tax. Payroll and job ads say \"rate\" more often, but the math is identical." },
        { q: "Should I count paid vacation?", a: "Leave weeks at 52 if your time off is paid — you're still earning the salary. Drop it only for unpaid weeks, like a seasonal job or unpaid leave." },
        { q: "Is this before or after taxes?", a: "Before. It's a gross-pay conversion. For take-home, use the paycheck calculator." },
        { q: "I only work part of the year — can I adjust?", a: "Yes. Drop the weeks-per-year to match your actual schedule and the numbers follow." },
        { q: "How much is $50,000 a year per hour?", a: "About $24.04 an hour at 40 hours a week for 52 weeks. $60,000 is $28.85, $75,000 is $36.06, and $100,000 is $48.08." },
      ]}
      prose={
        <>
          <h2>Salary to hourly rate: the quick rule</h2>
          <p>
            Divide an annual salary by 2,080 to get the hourly rate, or multiply an hourly
            rate by 2,080 to get the salary. A rougher shortcut: halve the salary and drop
            the thousands — $60,000 is about $30 an hour.
          </p>
          <p>
            These are gross numbers, before tax. To see what an offer pays after federal tax
            and FICA, put it into the <a href="/paycheck-calculator/">paycheck calculator</a>.
          </p>
          <h2>Long hours shrink your real hourly wage</h2>
          <p>
            A salary doesn&apos;t grow when the week does. $70,000 at 40 hours is $33.65 an hour; at 50
            hours it&apos;s $26.92. If you&apos;re comparing a salaried offer with an hourly one, put in the
            hours you&apos;d really work. An hourly job also pays overtime past 40 — run those hours through
            the <a href="/overtime-calculator/">overtime calculator</a> to compare fairly.
          </p>
          <p>
            Looking for a specific number? $65,000 a year is about $31.25 an hour at 40 hours a week.
            See the <a href="/salary-to-hourly/65000-a-year/">$65,000 a year breakdown</a> for monthly, weekly and after-tax pay.
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
