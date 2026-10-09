import type { Metadata } from "next";
import { SalesTaxCalculator } from "@/components/SalesTaxCalculator";
import { ToolPage } from "@/components/ToolPage";

export const metadata: Metadata = {
  title: "Reverse Sales Tax Calculator — Find the Pre-Tax Price",
  description:
    "Free reverse sales tax calculator. Enter a total that already includes tax and your rate to see the original price and the tax removed.",
  alternates: { canonical: "/reverse-sales-tax-calculator/" },
};

export default function ReverseSalesTax() {
  return (
    <ToolPage
      appName="netpaywise Reverse Sales Tax Calculator"
      title="Total in, pre-tax price out."
      lede="Got a receipt total but need the price before tax? Enter the total and your rate."
      faq={[
        { q: "When would I need this?", a: "Expense reports, bookkeeping, or splitting a bill — any time you have the final total but need the pre-tax amount." },
        { q: "How is it calculated?", a: "We divide the total by (1 + your rate). The difference is the tax that was baked in." },
      ]}
    >
      <SalesTaxCalculator mode="reverse" />
    </ToolPage>
  );
}
