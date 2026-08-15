import type { Metadata } from "next";
import { SalaryHourlyCalculator } from "@/components/SalaryHourlyCalculator";
import { ToolPage } from "@/components/ToolPage";

export const metadata: Metadata = {
  title: "Salary to Hourly Calculator — Convert Either Way",
  description:
    "Convert an annual salary to an hourly rate, or hourly to salary. Adjust hours per week and weeks per year. Free, no signup.",
  alternates: { canonical: "/salary-to-hourly/" },
};

export default function SalaryToHourly() {
  return (
    <ToolPage
      appName="netpaywise Salary and Hourly Converter"
      title="Salary or hourly — same pay, different label."
      lede="Convert either direction. Tweak your weekly hours and working weeks to match real life."
      faq={[
        { q: "What's the default?", a: "40 hours a week, 52 weeks a year — the standard 2,080-hour full-time year." },
        { q: "Is this before or after taxes?", a: "Before. It's a gross-pay conversion. For take-home, use the paycheck calculator." },
        { q: "I only work part of the year — can I adjust?", a: "Yes. Drop the weeks-per-year to match your actual schedule and the numbers follow." },
      ]}
    >
      <SalaryHourlyCalculator />
    </ToolPage>
  );
}
