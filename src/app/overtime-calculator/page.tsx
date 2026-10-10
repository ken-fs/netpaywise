import type { Metadata } from "next";
import { OvertimeCalculator } from "@/components/OvertimeCalculator";
import { ToolPage } from "@/components/ToolPage";

export const metadata: Metadata = {
  title: "Overtime Calculator — Time and a Half & Double Time Pay",
  description:
    "Free overtime calculator. Enter your hourly rate and hours to see overtime pay at time and a half or double time, your weekly gross and your effective hourly rate. No signup.",
  alternates: { canonical: "/overtime-calculator/" },
};

export default function Overtime() {
  return (
    <ToolPage
      appName="takehomepal Overtime Calculator"
      title="Overtime calculator: what those extra hours pay."
      lede="Rate, regular hours, overtime hours. See the week's gross pay at time and a half or double time, and your real effective rate."
      faq={[
        { q: "How do I calculate time and a half?", a: "Multiply your hourly rate by 1.5. At $20 an hour, time and a half is $30. Then multiply by your overtime hours: 10 hours of overtime is $300 on top of your regular pay." },
        { q: "When does overtime start?", a: "Under federal law (the Fair Labor Standards Act), non-exempt workers get at least 1.5× their regular rate for hours over 40 in a workweek. A few states, like California, also pay overtime after 8 hours in a day." },
        { q: "When does double time apply?", a: "Federal law doesn't require it. Some states (California after 12 hours in a day) and many union contracts or employers pay 2× for long days, holidays or a seventh straight day. Switch the multiplier to check." },
        { q: "Is overtime taxed more?", a: "No. Overtime is regular income, but a bigger check can be withheld at a higher rate, which is why it feels that way. From 2025 to 2028 you can also deduct the extra half of FLSA overtime at filing time." },
        { q: "Is this before taxes?", a: "Yes, it's gross pay. For take-home, use the paycheck calculator, and see the no tax on overtime calculator for the new deduction." },
      ]}
      prose={
        <>
          <h2>The overtime formula</h2>
          <p>
            Weekly pay = (hourly rate × regular hours) + (hourly rate × 1.5 × overtime hours).
            For double time, swap 1.5 for 2. Your effective hourly rate is the week&apos;s total
            divided by every hour you worked.
          </p>
          <h2>Overtime and the new tax deduction</h2>
          <p>
            Since 2025, the premium part of FLSA overtime — the extra half in time and a half — can
            come off your taxable income, up to $12,500 a year ($25,000 filing jointly). See what
            that&apos;s worth with the <a href="/no-tax-on-overtime-calculator/">no tax on overtime calculator</a>,
            or check your full take-home with the <a href="/paycheck-calculator/">paycheck calculator</a>.
          </p>
        </>
      }
    >
      <OvertimeCalculator />
    </ToolPage>
  );
}
