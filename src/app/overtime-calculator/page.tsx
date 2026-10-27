import type { Metadata } from "next";
import { loadFederal, loadState } from "@/lib/data";
import { OvertimeCalculator } from "@/components/OvertimeCalculator";
import { ToolPage } from "@/components/ToolPage";

export const metadata: Metadata = {
  title: "Overtime Tax Calculator 2026 — Overtime Pay After Tax",
  description:
    "Free overtime calculator with taxes. Enter your rate and hours to see time and a half or double time, the federal tax, Social Security, Medicare and state tax taken out, and your take-home.",
  alternates: { canonical: "/overtime-calculator/" },
};

export default function Overtime() {
  const federal = loadFederal();
  const ca = loadState("CA");
  return (
    <ToolPage
      appName="takehomepal Overtime Calculator"
      title="Overtime tax calculator: what the extra hours really pay after tax."
      lede="Overtime is taxed like the rest of your pay, so most people keep about 65–80% of it. Enter your rate, regular hours and overtime hours to see the week's gross at time and a half or double time, then what's left after taxes come out."
      faq={[
        { q: "How do I calculate time and a half?", a: "Multiply your hourly rate by 1.5. At $20 an hour, time and a half is $30. Then multiply by your overtime hours: 10 hours of overtime is $300 on top of your regular pay." },
        { q: "How much of my overtime do I keep after taxes?", a: "Usually 65–80%, depending on your bracket and state. At $22 an hour, 8 hours of time and a half is $264 gross. A single filer in a no-tax state working a 40-hour base week keeps about $212 of it after federal withholding, Social Security and Medicare. The calculator shows your number under the result." },
        { q: "Is overtime taxed more?", a: "No. Overtime is regular income taxed at the same rates as the rest of your pay. A bigger check can be withheld at a higher rate, because payroll treats that week as if you earned it every week. That's why it feels like overtime gets hit harder. Any extra withholding comes back when you file." },
        { q: "When does overtime start?", a: "Under federal law (the Fair Labor Standards Act), non-exempt workers get at least 1.5× their regular rate for hours over 40 in a workweek. A few states, like California, also pay overtime after 8 hours in a day." },
        { q: "When does double time apply?", a: "Federal law doesn't require it. California pays 2× after 12 hours in a day and after 8 hours on a seventh straight workday. Many union contracts and employers pay it for holidays. Switch the multiplier to check." },
        { q: "Does the no tax on overtime deduction lower my withholding?", a: "Not on its own. Payroll keeps withholding as normal, and you claim the deduction when you file. If you want more in each check now, you can lower your withholding on a new W-4." },
      ]}
      prose={
        <>
          <h2>The overtime formula</h2>
          <p>
            Weekly pay = (hourly rate × regular hours) + (hourly rate × 1.5 × overtime hours).
            For double time, swap 1.5 for 2. Your effective hourly rate is the week&apos;s total
            divided by every hour you worked.
          </p>
          <h2>How taxes on overtime work</h2>
          <p>Your overtime gets the same four cuts as the rest of your check:</p>
          <ul>
            <li><strong>Federal income tax</strong> — payroll annualizes the week (×52), takes off the standard deduction and runs it through the brackets. A fat overtime week looks like a raise, so more gets withheld.</li>
            <li><strong>Social Security</strong> — 6.2%, until your pay for the year passes the wage cap.</li>
            <li><strong>Medicare</strong> — 1.45%, plus 0.9% on pay above $200,000.</li>
            <li><strong>State tax</strong> — none in nine states. California withholds by its own tables plus 1.3% for SDI. Elsewhere, enter a rough rate.</li>
          </ul>
          <p>
            The line under the result shows how much of the overtime itself you keep. It&apos;s the
            take-home with overtime minus the take-home without it, so it already includes the
            higher bracket that overtime pushes you into.
          </p>
          <h2>What rate is overtime taxed at?</h2>
          <p>
            Overtime is taxed at your normal rate. There is no special overtime tax rate. It&apos;s added to your
            other pay and taxed by the same federal brackets, plus 6.2% Social Security, 1.45% Medicare and your
            state tax.
          </p>
          <p>
            Your paycheck can look like a higher rate was used. That&apos;s because payroll withholds as if you earn
            that big check every week. Any extra withholding comes back when you file your return.
          </p>
          <h2>How much tax will I pay if I work overtime?</h2>
          <p>
            You pay the same tax rates on overtime as on your other pay. The extra hours can push part of your income
            into a higher bracket, and the 7.65% for Social Security and Medicare comes out too. Most people keep
            about 65–80% of what they earn in overtime. Enter your rate and hours above to see your own number
            for 2026.
          </p>
          <h2>How to calculate tax on overtime</h2>
          <p>
            Work out the gross first: rate × 1.5 × overtime hours. Then take off Social Security (6.2%),
            Medicare (1.45%), federal income tax and any state tax. This OT calculator does all of that for you.
          </p>
          <p>
            Example: at $22 an hour, 8 hours of time and a half is $264 gross. A single filer in a no-tax state
            keeps about $212 of it. Your number will differ with your state, filing status and regular pay.
          </p>
          <h2>Overtime and the new tax deduction</h2>
          <p>
            From 2025 to 2028, the premium part of FLSA overtime — the extra half in time and a half — can
            come off your taxable income, up to $12,500 a year ($25,000 filing jointly). It doesn&apos;t
            change what&apos;s withheld; you get it back at filing. See what that&apos;s worth with the{" "}
            <a href="/no-tax-on-overtime-calculator/">no tax on overtime calculator</a>, or check your full
            take-home with the <a href="/paycheck-calculator/">paycheck calculator</a>.
          </p>
          <h2>Work in California?</h2>
          <p>
            California counts overtime by the day, not just the week, and adds double time and a
            seventh-day rule. The <a href="/overtime-calculator/california/">California overtime calculator</a>{" "}
            lets you enter each day&apos;s hours and does the sorting for you.
          </p>
        </>
      }
    >
      <OvertimeCalculator federal={federal} ca={ca} />
    </ToolPage>
  );
}
