import type { Metadata } from "next";
import { loadFederal, loadAllStateConfigs, statesWithData } from "@/lib/data";
import { PaycheckCalculator } from "@/components/PaycheckCalculator";

export const metadata: Metadata = {
  title: "Paycheck Calculator — Your Real Take-Home Pay by State",
  description:
    "Free US paycheck calculator. Enter your salary and state to see federal tax, state tax, and FICA taken out — and the take-home pay you actually keep.",
  alternates: { canonical: "/paycheck-calculator/" },
};

export default function PaycheckHub() {
  const federal = loadFederal();
  const states = loadAllStateConfigs();
  const ready = statesWithData();

  const faq = [
    { q: "What is take-home pay?", a: "It's what lands in your bank account after federal tax, state tax, and FICA come out of your gross salary." },
    { q: "Does this calculator ask for my email?", a: "No. Nothing to sign up for. You type your salary, you see the number." },
    { q: "Why is my paycheck smaller than my salary ÷ pay periods?", a: "Taxes. Federal income tax, your state's income tax, and FICA (Social Security + Medicare) all come out first." },
    { q: "Are these numbers exact?", a: `They're estimates for the ${federal.taxYear} tax year, using the standard deduction and no credits. Your real paycheck can differ.` },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebApplication", name: "netpaywise Paycheck Calculator", applicationCategory: "FinanceApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } },
      { "@type": "FAQPage", mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="wrap">
        <div style={{ paddingTop: 40 }}>
          <h1>What you earn, minus what they take.</h1>
          <p className="lede" style={{ color: "var(--slate)", maxWidth: "60ch" }}>
            Pick your state, type your pay, and watch the split. No signup — just the math
            behind your take-home.
          </p>
        </div>

        <PaycheckCalculator federal={federal} states={states} />

        <div className="prose">
          <h2>How your paycheck gets split</h2>
          <p>Your gross salary never hits your account whole. Four cuts come first:</p>
          <ul>
            <li><strong>Federal income tax</strong> — progressive brackets on income after the standard deduction.</li>
            <li><strong>State income tax</strong> — depends where you live. Nine states take nothing.</li>
            <li><strong>Social Security</strong> — 6.2% up to the annual wage cap.</li>
            <li><strong>Medicare</strong> — 1.45%, plus 0.9% more on high earners.</li>
          </ul>
          <p>
            Pre-tax deductions like a 401(k) or HSA come out before income tax, so they
            shrink the taxable slice. That's the lever most people forget.
          </p>
          {ready.length < 50 && (
            <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
              State coverage is rolling out. Live now: {ready.map((s) => s.name).join(", ")}.
            </p>
          )}
        </div>

        <div className="prose faq">
          <h2>Questions people actually ask</h2>
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
