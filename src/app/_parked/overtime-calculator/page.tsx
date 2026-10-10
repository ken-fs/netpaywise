import type { Metadata } from "next";
import { OvertimeCalculator } from "@/components/OvertimeCalculator";
import { ToolPage } from "@/components/ToolPage";

export const metadata: Metadata = {
  title: "Overtime Calculator — Time-and-a-Half Pay",
  description:
    "Calculate your weekly gross pay with overtime. Enter your hourly rate, regular hours, and overtime hours at 1.5× or 2×. Free, no signup.",
  alternates: { canonical: "/overtime-calculator/" },
};

export default function Overtime() {
  return (
    <ToolPage
      appName="takehomepal Overtime Calculator"
      title="What those extra hours are worth."
      lede="Rate, regular hours, overtime hours. See the week's gross and your real effective rate."
      faq={[
        { q: "What's time and a half?", a: "Overtime is usually paid at 1.5× your regular hourly rate for hours over 40 in a week." },
        { q: "When does double time apply?", a: "Some states and contracts pay 2× for very long days or holidays. Switch the multiplier to check." },
        { q: "Is this before taxes?", a: "Yes — gross weekly pay. Run it through the paycheck calculator for take-home." },
      ]}
    >
      <OvertimeCalculator />
    </ToolPage>
  );
}
