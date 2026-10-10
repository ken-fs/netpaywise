import type { Metadata } from "next";
import { SalesTaxCalculator } from "@/components/SalesTaxCalculator";
import { ToolPage } from "@/components/ToolPage";

export const metadata: Metadata = {
  title: "Sales Tax Calculator — Add Tax to Any Price",
  description:
    "Free sales tax calculator. Enter a price and your local rate to get the tax and total. No signup.",
  alternates: { canonical: "/sales-tax-calculator/" },
};

export default function SalesTax() {
  return (
    <ToolPage
      appName="takehomepal Sales Tax Calculator"
      title="Price in, total out."
      lede="Type a price and your combined state + local rate. Get the tax and the total to pay."
      faq={[
        { q: "What rate should I use?", a: "Your combined state and local rate. It varies by city, so check your locality for the exact number." },
        { q: "Need to work backward from a total?", a: "Use the reverse sales tax calculator to pull the pre-tax price out of a receipt total." },
      ]}
    >
      <SalesTaxCalculator mode="forward" />
    </ToolPage>
  );
}
