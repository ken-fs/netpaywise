import type { Metadata } from "next";
import { LoanCalculator } from "@/components/LoanCalculator";

export const metadata: Metadata = {
  title: "Loan Calculator — Monthly Payment, Interest & Payoff",
  description:
    "Free loan calculator. Enter amount, rate, and term to see your monthly payment and total interest. Add an extra payment to see how much time and interest you save.",
  alternates: { canonical: "/loan-calculator/" },
};

export default function LoanHub() {
  const faq = [
    { q: "How is the monthly payment calculated?", a: "Standard amortization: the loan, its rate, and its term set a fixed payment that covers interest first, then principal." },
    { q: "Does an extra payment really help?", a: "A lot. Every extra dollar goes straight to principal, which cuts the interest you pay for the rest of the loan." },
    { q: "Can I use this for a mortgage, car, or personal loan?", a: "Yes. The math is the same for any fixed-rate amortized loan — just change the amount, rate, and term." },
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebApplication", name: "netpaywise Loan Calculator", applicationCategory: "FinanceApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } },
      { "@type": "FAQPage", mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="wrap">
        <div style={{ paddingTop: 40 }}>
          <h1>What the loan really costs.</h1>
          <p className="lede" style={{ color: "var(--slate)", maxWidth: "60ch" }}>
            Payment, total interest, and how fast a little extra each month clears it.
            Works for mortgages, cars, and personal loans.
          </p>
        </div>

        <LoanCalculator />

        <div className="prose faq">
          <h2>Loan questions</h2>
          {faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
