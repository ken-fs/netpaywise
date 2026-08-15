import type { Metadata } from "next";
import { loadFederal } from "@/lib/data";
import { SETaxCalculator } from "@/components/SETaxCalculator";
import { ToolPage } from "@/components/ToolPage";

export const metadata: Metadata = {
  title: "1099 Self-Employment Tax Calculator — What to Set Aside",
  description:
    "Freelancer or 1099 contractor? Estimate your self-employment tax (Social Security + Medicare) and what to set aside each quarter. Free, no signup.",
  alternates: { canonical: "/self-employment-tax-calculator/" },
};

export default function SelfEmploymentTax() {
  const federal = loadFederal();
  return (
    <ToolPage
      appName="netpaywise Self-Employment Tax Calculator"
      title="1099 taxes, before they surprise you."
      lede="Work for yourself? You owe both halves of Social Security and Medicare. Here's the number to set aside."
      faq={[
        { q: "Why 15.3%?", a: "As your own employer you pay both sides of FICA: 12.4% Social Security + 2.9% Medicare, on 92.35% of your net profit." },
        { q: "Is this my whole tax bill?", a: "No. Self-employment tax is on top of federal and state income tax. Budget for all three." },
        { q: "Can I deduct any of it?", a: "Yes — half of your SE tax is deductible against income tax. The tool shows that half." },
      ]}
      prose={
        <>
          <h2>Set aside every quarter</h2>
          <p>The IRS wants estimated tax four times a year. Take the quarterly figure above and move it to a separate account the day you get paid. Future-you will be calm in April.</p>
        </>
      }
    >
      <SETaxCalculator federal={federal} />
    </ToolPage>
  );
}
