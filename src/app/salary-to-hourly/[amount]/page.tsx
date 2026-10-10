import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { loadFederal, loadState } from "@/lib/data";
import { computePaycheck } from "@/lib/engine/tax";
import { ToolPage } from "@/components/ToolPage";
import { SalaryHourlyCalculator } from "@/components/SalaryHourlyCalculator";
import { AMOUNT_PAGES, FULL_TIME_HOURS, annualOf, labelOf, type AmountPage } from "@/lib/amounts";
import { usd, usd2 } from "@/lib/format";

export function generateStaticParams() {
  return AMOUNT_PAGES.map((p) => ({ amount: p.slug }));
}

const find = (slug: string) => AMOUNT_PAGES.find((p) => p.slug === slug);
const FED_MIN_WAGE = 7.25;

function question(p: AmountPage) {
  return p.kind === "hourly" ? `$${p.hourly} an hour is how much a year?` : `$${p.annual.toLocaleString("en-US")} a year is how much an hour?`;
}

export async function generateMetadata({ params }: { params: Promise<{ amount: string }> }): Promise<Metadata> {
  const { amount } = await params;
  const p = find(amount);
  if (!p) return {};
  const annual = annualOf(p);
  const answer = p.kind === "hourly" ? usd(annual) : usd2(annual / FULL_TIME_HOURS);
  const title = p.kind === "hourly"
    ? `$${p.hourly} an Hour Is How Much a Year? ${answer} (Before & After Tax)`
    : `$${p.annual.toLocaleString("en-US")} a Year Is How Much an Hour? ${answer} (Before & After Tax)`;
  return {
    title: { absolute: `${title} | takehomepal` },
    description: `${labelOf(p)} is ${p.kind === "hourly" ? `${usd(annual)} a year` : `${answer} an hour`} at 40 hours a week. See it by month, paycheck and week, at different hours, and after 2026 taxes in Texas, Florida and Washington.`,
    alternates: { canonical: `/salary-to-hourly/${p.slug}/` },
  };
}

export default async function AmountPageView({ params }: { params: Promise<{ amount: string }> }) {
  const { amount } = await params;
  const p = find(amount);
  if (!p) notFound();

  const federal = loadFederal();
  const y = federal.taxYear;
  const annual = annualOf(p);
  const hourly = annual / FULL_TIME_HOURS;
  const tx = computePaycheck({ grossAnnual: annual, payFrequency: "biweekly", filingStatus: "single" }, federal, loadState("TX"));
  const wa = computePaycheck({ grossAnnual: annual, payFrequency: "biweekly", filingStatus: "single" }, federal, loadState("WA"));
  const label = labelOf(p);

  const periods: [string, number][] = [
    ["Yearly", annual],
    ["Monthly", annual / 12],
    ["Every 2 weeks", annual / 26],
    ["Weekly", annual / 52],
    ["Daily (8 hours)", hourly * 8],
  ];

  const schedules: { label: string; hours: number }[] = [
    { label: "20 hours a week", hours: 20 },
    { label: "30 hours a week", hours: 30 },
    { label: "35 hours a week", hours: 35 },
    { label: "37.5 hours a week", hours: 37.5 },
    { label: "40 hours a week", hours: 40 },
  ];

  const lede = p.kind === "hourly"
    ? `${usd(annual)} a year, working 40 hours a week for 52 weeks. That's ${usd(annual / 12)} a month or ${usd(annual / 26)} every two weeks, before tax.`
    : `${usd2(hourly)} an hour, working 40 hours a week for 52 weeks. That's ${usd(annual / 12)} a month or ${usd(annual / 26)} every two weeks, before tax.`;

  const others = AMOUNT_PAGES.filter((o) => o.slug !== p.slug);

  return (
    <ToolPage
      appName="takehomepal Salary and Hourly Converter"
      title={question(p)}
      lede={lede}
      faq={[
        p.kind === "hourly"
          ? { q: `How much is $${p.hourly} an hour a month?`, a: `${usd(annual / 12)} a month before tax, at 40 hours a week. Multiply by 2,080 hours for the year, then divide by 12.` }
          : { q: `How much is $${p.annual.toLocaleString("en-US")} a year a month?`, a: `${usd(annual / 12)} a month before tax. After federal tax and FICA in a no-income-tax state like Texas, it's about ${usd(tx.takeHomeAnnual / 12)}.` },
        { q: `How much is ${label} after taxes?`, a: `For a single filer in ${y}, about ${usd(tx.takeHomeAnnual)} a year (${usd(tx.takeHomePerPeriod)} every two weeks) in Texas or Florida, which have no state income tax. In Washington it's ${usd(wa.takeHomeAnnual)} after its two small payroll premiums. States with an income tax take more.` },
        p.kind === "hourly"
          ? { q: `Is $${p.hourly} an hour ${usd(p.hourly * 2000)} a year?`, a: `Only if you work 2,000 hours, which is 40 hours a week with two weeks unpaid. With paid time off, a full year is 2,080 hours, or ${usd(annual)}.` }
          : { q: `What is ${label} biweekly?`, a: `${usd2(annual / 26)} every two weeks before tax, from 26 paychecks. Paid twice a month instead, it's ${usd2(annual / 24)} a check.` },
        { q: "Is this before or after tax?", a: "The main figures are gross pay, before tax. The after-tax table uses 2026 federal brackets, the standard deduction, Social Security and Medicare." },
      ]}
      prose={
        <>
          <h2>{label}, before tax</h2>
          <table>
            <thead><tr><th>Per</th><th className="num">Gross pay</th></tr></thead>
            <tbody>
              {periods.map(([k, v]) => <tr key={k}><td>{k}</td><td className="num">{usd2(v)}</td></tr>)}
            </tbody>
          </table>

          <h2>{p.kind === "hourly" ? "At different hours" : "Hourly rate at different hours"}</h2>
          <table>
            <thead><tr><th>Schedule (52 weeks)</th><th className="num">{p.kind === "hourly" ? "Per year" : "Per hour"}</th></tr></thead>
            <tbody>
              {schedules.map((s) => (
                <tr key={s.label}>
                  <td>{s.label}</td>
                  <td className="num">{p.kind === "hourly" ? usd(p.hourly * s.hours * 52) : usd2(annual / (s.hours * 52))}</td>
                </tr>
              ))}
              {p.kind === "hourly" ? (
                <tr><td>40 hours + 5 overtime at 1.5×</td><td className="num">{usd(p.hourly * 40 * 52 + p.hourly * 1.5 * 5 * 52)}</td></tr>
              ) : (
                <tr><td>45 hours, 5 paid as overtime at 1.5× (base rate)</td><td className="num">{usd2(annual / 52 / (40 + 5 * 1.5))}</td></tr>
              )}
            </tbody>
          </table>

          <h2>{label} after tax ({y}, single)</h2>
          <table>
            <thead><tr><th></th><th className="num">Texas / Florida</th><th className="num">Washington</th></tr></thead>
            <tbody>
              <tr><td>Federal income tax</td><td className="num">−{usd(tx.federalIncomeTax)}</td><td className="num">−{usd(wa.federalIncomeTax)}</td></tr>
              <tr><td>Social Security + Medicare</td><td className="num">−{usd(tx.socialSecurity + tx.medicare)}</td><td className="num">−{usd(wa.socialSecurity + wa.medicare)}</td></tr>
              <tr><td>State premiums</td><td className="num">$0</td><td className="num">−{usd(wa.statePayroll)}</td></tr>
              <tr><td><strong>Take-home per year</strong></td><td className="num"><strong>{usd(tx.takeHomeAnnual)}</strong></td><td className="num"><strong>{usd(wa.takeHomeAnnual)}</strong></td></tr>
              <tr><td>Per month</td><td className="num">{usd(tx.takeHomeAnnual / 12)}</td><td className="num">{usd(wa.takeHomeAnnual / 12)}</td></tr>
              <tr><td>Every 2 weeks</td><td className="num">{usd(tx.takeHomePerPeriod)}</td><td className="num">{usd(wa.takeHomePerPeriod)}</td></tr>
              <tr><td>Per hour you work</td><td className="num">{usd2(tx.takeHomeAnnual / FULL_TIME_HOURS)}</td><td className="num">{usd2(wa.takeHomeAnnual / FULL_TIME_HOURS)}</td></tr>
            </tbody>
          </table>
          <p>
            Texas and Florida have no state income tax, so federal tax and FICA are the whole bill.
            Washington adds Paid Family and Medical Leave and WA Cares premiums. To run your own
            numbers, filing status and 401(k), use the <a href="/paycheck-calculator/">paycheck calculator</a>.
          </p>

          <h2>How to work it out</h2>
          <p>
            {p.kind === "hourly"
              ? `Multiply the hourly rate by 2,080, the hours in a full-time year (40 × 52). $${p.hourly} × 2,080 = ${usd(annual)}. Shortcut: double the hourly rate and add three zeros — $${p.hourly} becomes about $${(p.hourly * 2).toLocaleString("en-US")},000.`
              : `Divide the salary by 2,080, the hours in a full-time year (40 × 52). ${usd(annual)} ÷ 2,080 = ${usd2(hourly)}. Shortcut: halve the salary and drop the thousands — ${usd(annual)} is about $${(annual / 2000).toLocaleString("en-US")} an hour.`}
            {" "}That&apos;s {(hourly / FED_MIN_WAGE).toFixed(1)}× the federal minimum wage of {usd2(FED_MIN_WAGE)}.
          </p>

          <h2>Other amounts</h2>
          <ul className="amount-links">
            {others.map((o) => <li key={o.slug}><a href={`/salary-to-hourly/${o.slug}/`}>{labelOf(o)}</a></li>)}
          </ul>
        </>
      }
    >
      <SalaryHourlyCalculator
        defaultMode={p.kind === "hourly" ? "toSalary" : "toHourly"}
        defaultValue={p.kind === "hourly" ? p.hourly : p.annual}
      />
    </ToolPage>
  );
}
