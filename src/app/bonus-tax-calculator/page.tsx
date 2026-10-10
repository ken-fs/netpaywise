import type { Metadata } from "next";
import { loadFederal } from "@/lib/data";
import { BonusTaxCalculator } from "@/components/BonusTaxCalculator";
import { ToolPage } from "@/components/ToolPage";
import { usd } from "@/lib/format";

export const metadata: Metadata = {
  title: "Bonus Tax Calculator 2026 — Your Bonus After Tax",
  description:
    "Free 2026 bonus tax calculator. See your bonus after tax with the flat 22% method or added to a paycheck (aggregate method), plus Social Security and Medicare. No signup.",
  alternates: { canonical: "/bonus-tax-calculator/" },
};

export default function BonusTax() {
  const federal = loadFederal();
  const y = federal.taxYear;
  const sw = federal.supplementalWithholding;
  const cap = usd(federal.fica.socialSecurity.wageBase);
  return (
    <ToolPage
      appName="takehomepal Bonus Tax Calculator"
      title="Bonus tax calculator: your bonus after tax."
      lede="Bonuses get withheld differently from your normal pay. See what actually lands, whether it comes as its own check or rides on a regular one."
      faq={[
        { q: "How much is a bonus taxed?", a: `Usually ${sw.rate * 100}% federal withholding plus 7.65% for Social Security and Medicare, so about 29.65% before any state tax. On a $5,000 bonus that's roughly $1,483 withheld and $3,518 kept in a state with no income tax.` },
        { q: `What is the bonus tax rate for ${y}?`, a: `The federal supplemental withholding rate is ${sw.rate * 100}% for ${y}, and ${sw.highRate * 100}% on supplemental wages over $1 million for the year. Social Security (6.2% up to ${cap} of total wages) and Medicare (1.45%) apply too.` },
        { q: "What is the supplemental tax rate?", a: "It's the flat rate the IRS lets employers use for pay outside your regular wages: bonuses, commissions, severance, back pay. It's a withholding shortcut, not a separate tax." },
        { q: "Why was so much taken out of my bonus?", a: "If your employer added the bonus to a regular paycheck, payroll software treats that big check as if you earned it every pay period. That pushes it into a higher bracket for withholding. Switch the calculator to “Added to a paycheck” to see the difference." },
        { q: "Do I get some of it back?", a: "Maybe. Withholding isn't your final tax. At filing, the bonus is just more income taxed at your real rate. If your top bracket is 12%, you'll likely get some back. At 24% or higher, the 22% may come up a little short." },
        { q: "Do states tax bonuses?", a: "Nine states don't tax wages at all: Texas, Florida, Washington, Tennessee, Nevada, South Dakota, Wyoming, Alaska and New Hampshire. Most others withhold bonuses at their own flat rate. Pick “Another state” and enter it." },
        { q: "What if my bonus is over $1 million?", a: `Everything above $1 million in supplemental wages for the year must be withheld at ${sw.highRate * 100}%. The calculator applies that automatically.` },
      ]}
      prose={
        <>
          <h2>Two ways your bonus gets withheld</h2>
          <ul>
            <li><strong>Paid separately (flat method)</strong> — the bonus comes as its own payment and your employer withholds a flat {sw.rate * 100}% federal. Simple and predictable. This is what most people get.</li>
            <li><strong>Added to a paycheck (aggregate method)</strong> — the bonus is lumped into a regular check. Payroll runs the normal withholding math on the combined amount as if you earned it every period, then subtracts what it would have taken from the regular pay alone. The bigger the bonus compared to your normal check, the bigger the jump.</li>
          </ul>
          <p>
            Either way, Social Security (6.2%) and Medicare (1.45%) come out too. Social Security
            stops once your total pay for {y} passes {cap}, so a big year-end bonus can skip it.
          </p>
          <h2>Withholding isn&apos;t the final tax</h2>
          <p>
            Your bonus is still just income. When you file, it&apos;s added to your salary and taxed at
            your real rate, and the withholding is credited against that. A bonus that looked
            brutal on the pay stub often comes back partly as a refund.
          </p>
          <p>
            Want the full picture of your regular pay? Try the{" "}
            <a href="/paycheck-calculator/">paycheck calculator</a>, or the{" "}
            <a href="/paycheck-calculator/tx/">Texas</a> and{" "}
            <a href="/paycheck-calculator/fl/">Florida</a> versions.
          </p>
        </>
      }
    >
      <BonusTaxCalculator federal={federal} />
    </ToolPage>
  );
}
