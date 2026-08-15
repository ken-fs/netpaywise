import type { Metadata } from "next";
import { loadFederal } from "@/lib/data";
import { W4Calculator } from "@/components/W4Calculator";
import { ToolPage } from "@/components/ToolPage";

export const metadata: Metadata = {
  title: "W-4 Withholding Calculator — Refund or Owe?",
  description:
    "Check whether you're on track for a refund or a tax bill, and how much extra to withhold on your W-4. Free, no signup.",
  alternates: { canonical: "/w4-calculator/" },
};

export default function W4() {
  const federal = loadFederal();
  return (
    <ToolPage
      appName="netpaywise W-4 Withholding Calculator"
      title="Refund, or a surprise bill?"
      lede="Compare what you're withholding to what you'll owe. If you're short, we suggest the extra for W-4 line 4c."
      faq={[
        { q: "Where do I find my per-paycheck withholding?", a: "On your pay stub, look for 'Federal Income Tax' or 'Fed W/H'. Enter that amount." },
        { q: "Is a big refund good?", a: "It means you over-withheld — an interest-free loan to the IRS. Aim for close to zero either way." },
        { q: "Is this the official IRS tool?", a: "No. It's a quick gut-check on federal income tax only. For an exact W-4, use the IRS Tax Withholding Estimator." },
      ]}
    >
      <W4Calculator federal={federal} />
    </ToolPage>
  );
}
