import type { Metadata } from "next";
import { loadFederal } from "@/lib/data";
import { BonusTaxCalculator } from "@/components/BonusTaxCalculator";
import { ToolPage } from "@/components/ToolPage";

export const metadata: Metadata = {
  title: "Bonus Tax Calculator 2026 — Your Take-Home Bonus",
  description:
    "See what's left of your 2026 bonus after the flat 22% federal withholding and FICA. Free bonus tax calculator, no signup.",
  alternates: { canonical: "/bonus-tax-calculator/" },
};

export default function BonusTax() {
  const federal = loadFederal();
  return (
    <ToolPage
      appName="takehomepal Bonus Tax Calculator"
      title="Your bonus, after the withholding hit."
      lede="Bonuses get withheld at a flat 22% federal, plus FICA. Here's what actually lands."
      faq={[
        { q: "Why was so much taken out?", a: "The IRS treats bonuses as supplemental wages, withheld at a flat 22% federal rate — often more than your normal paycheck rate." },
        { q: "Do I get some back?", a: "Maybe. Withholding isn't your final tax. If 22% was more than your real rate, the difference comes back at filing." },
        { q: "What about state?", a: "Many states withhold bonuses at their own flat rate. Add it in the state field for a closer number. In states with no income tax, leave it at 0." },
        { q: "What if my bonus is over $1 million?", a: "Everything above $1 million in supplemental wages for the year must be withheld at 37%, the top federal rate. The calculator applies that automatically." },
        { q: "Why do some employers withhold differently?", a: "If your bonus is added to a regular paycheck instead of paid separately, your employer may run it through the normal withholding tables. That can take out more or less than 22%." },
      ]}
      prose={
        <>
          <h2>Withholding isn&apos;t the final tax</h2>
          <p>
            The 22% is a flat estimate the IRS lets employers use. Your bonus is still just
            income: at filing time it&apos;s added to your salary and taxed at your real rate. If
            your top bracket is 12%, you&apos;ll likely get some back. If it&apos;s 24% or higher,
            you may owe a little.
          </p>
          <p>
            Social Security (6.2%) and Medicare (1.45%) come out of a bonus too. Social
            Security stops once your total pay for the year passes{" "}
            {federal.fica.socialSecurity.wageBase.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}.
          </p>
          <p>
            Want the full picture of your regular pay? Try the{" "}
            <a href="/paycheck-calculator/">paycheck calculator</a>.
          </p>
        </>
      }
    >
      <BonusTaxCalculator federal={federal} />
    </ToolPage>
  );
}
