import type { Metadata } from "next";
import { loadFederal } from "@/lib/data";
import { BonusTaxCalculator } from "@/components/BonusTaxCalculator";
import { ToolPage } from "@/components/ToolPage";

export const metadata: Metadata = {
  title: "Bonus Tax Calculator — Your Take-Home Bonus",
  description:
    "See what's left of your bonus after federal withholding (22%) and FICA. Free bonus tax calculator, no signup.",
  alternates: { canonical: "/bonus-tax-calculator/" },
};

export default function BonusTax() {
  const federal = loadFederal();
  return (
    <ToolPage
      appName="netpaywise Bonus Tax Calculator"
      title="Your bonus, after the withholding hit."
      lede="Bonuses get withheld at a flat 22% federal, plus FICA. Here's what actually lands."
      faq={[
        { q: "Why was so much taken out?", a: "The IRS treats bonuses as supplemental wages, withheld at a flat 22% federal rate — often more than your normal paycheck rate." },
        { q: "Do I get some back?", a: "Maybe. Withholding isn't your final tax. If 22% was more than your real rate, the difference comes back at filing." },
        { q: "What about state?", a: "Many states withhold bonuses at their own flat rate. Add it in the state field for a closer number." },
      ]}
    >
      <BonusTaxCalculator federal={federal} />
    </ToolPage>
  );
}
