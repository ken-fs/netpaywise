import type { Metadata } from "next";
import { loadFederal, loadState } from "@/lib/data";
import { CaOvertimeCalculator } from "@/components/CaOvertimeCalculator";
import { ToolPage } from "@/components/ToolPage";

export const metadata: Metadata = {
  title: "California Overtime Calculator 2026 — Daily OT, Double Time, After Tax",
  description:
    "California overtime calculator: enter each day's hours to get 1.5× after 8 a day or 40 a week, double time after 12, the seventh-day rule, and your take-home after CA tax and SDI.",
  alternates: { canonical: "/overtime-calculator/california/" },
};

export default function CaliforniaOvertime() {
  const federal = loadFederal();
  const ca = loadState("CA");
  return (
    <ToolPage
      appName="takehomepal California Overtime Calculator"
      title="California overtime calculator: by the day, not just the week."
      lede="Type in each day's hours. It sorts them into regular, time and a half and double time the way California law does, then takes out federal tax, CA tax and SDI."
      faq={[
        { q: "When does overtime start in California?", a: "After 8 hours in a workday or 40 hours in a workweek, whichever gives you more. Those hours pay at least 1.5× your regular rate. This is California Labor Code section 510, and it's stricter than federal law, which only counts the 40-hour week." },
        { q: "When do I get double time in California?", a: "Two cases: every hour past 12 in one workday, and every hour past 8 on the seventh straight day you work in the same workweek." },
        { q: "How does the seventh-day rule work?", a: "If you work all seven days of a workweek, the first 8 hours on day seven pay 1.5× and anything past 8 pays 2×. It only applies when you've worked every day of that workweek, not seven days in a row across two weeks." },
        { q: "Do daily overtime hours also count toward 40?", a: "No, you don't get paid twice for the same hour. Hours already paid as daily overtime don't count again toward the 40-hour weekly total. The calculator handles that." },
        { q: "Is overtime taxed more in California?", a: "No. It's taxed like any other pay. A big overtime week gets withheld as if you earned that much every week, so more comes out of that check, and any extra comes back when you file. California also takes 1.3% for SDI from every dollar in 2026." },
        { q: "Does California's daily overtime count for no tax on overtime?", a: "Only part of it. The federal deduction covers the premium the FLSA requires, which is the extra half on hours over 40 in a week. Overtime you get only because of California's daily rule doesn't qualify, and California hasn't adopted the deduction for state income tax." },
      ]}
      prose={
        <>
          <h2>California overtime rules in one place</h2>
          <ul>
            <li><strong>1.5×</strong> for hours 8 through 12 in a workday.</li>
            <li><strong>1.5×</strong> for straight-time hours past 40 in a workweek.</li>
            <li><strong>2×</strong> for hours past 12 in a workday.</li>
            <li><strong>Seventh straight day:</strong> 1.5× for the first 8 hours, 2× after that.</li>
          </ul>
          <p>
            These come from California Labor Code section 510 and apply to most non-exempt hourly
            workers. Some jobs have their own wage orders, and employers can set up a voted
            alternative workweek (like four 10-hour days without daily overtime). If you&apos;re on one
            of those, your numbers will differ.
          </p>
          <h2>A worked example</h2>
          <p>
            Four 10-hour days at $24 an hour, then a 12-hour Friday. Each 10-hour day is 8 regular plus
            2 overtime. Friday is 8 regular plus 4 overtime. That&apos;s 40 regular hours ($960) and 12
            overtime hours at $36 ($432), so $1,392 gross for the week. Federal law alone would only
            pay overtime on the 12 hours past 40 here too, but change Friday to 14 hours and California
            pays the last 2 at double time ($48 an hour) while federal law wouldn&apos;t.
          </p>
          <h2>What comes out of a California check</h2>
          <ul>
            <li><strong>Federal income tax</strong> — withheld as if every week paid like this one.</li>
            <li><strong>Social Security and Medicare</strong> — 7.65% together.</li>
            <li><strong>California income tax</strong> — withheld with the EDD&apos;s 2026 tables: rates from 1.1% up to 14.63% on the top dollars.</li>
            <li><strong>SDI</strong> — 1.3% of all wages in 2026, with no yearly cap.</li>
          </ul>
          <p>
            Not in California? Use the regular <a href="/overtime-calculator/">overtime calculator</a>.
            To see a full year of pay, try the <a href="/paycheck-calculator/">paycheck calculator</a>, and
            for the federal deduction on the over-40 part, the{" "}
            <a href="/no-tax-on-overtime-calculator/">no tax on overtime calculator</a>.
          </p>
          <p style={{ fontSize: "0.88rem", color: "var(--muted)" }}>
            Sources: California Labor Code §510; California DIR, Overtime FAQ; EDD, 2026 Withholding
            Schedules (Method B) and 2026 SDI rate; IRS, overtime deduction Q&amp;A.
          </p>
        </>
      }
    >
      <CaOvertimeCalculator federal={federal} ca={ca} />
    </ToolPage>
  );
}
