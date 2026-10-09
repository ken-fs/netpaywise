import type { Metadata } from "next";
import { loadFederal, loadAllStateConfigs, statesWithData } from "@/lib/data";
import { PaycheckCalculator } from "@/components/PaycheckCalculator";
import type { StateConfig } from "@/lib/engine/types";
import { usd } from "@/lib/format";

/** Federal + FICA only, for people in states we haven't published yet. */
const OTHER_STATE: StateConfig = {
  state: "OTHER",
  name: "Another state",
  type: "none",
  notIncluded: "State income tax isn't included for this option, so if your state has one your real check will be lower.",
};

export const metadata: Metadata = {
  title: "Paycheck Calculator 2026 — Your Real Take-Home Pay",
  description:
    "Free US paycheck calculator for 2026. Enter your salary to see federal income tax, Social Security and Medicare taken out — and the take-home pay you actually keep.",
  alternates: { canonical: "/paycheck-calculator/" },
};

export default function PaycheckHub() {
  const federal = loadFederal();
  const states = [...loadAllStateConfigs(), OTHER_STATE];
  const ready = statesWithData();

  const faq = [
    { q: "What is take-home pay?", a: "It's what lands in your bank account after federal tax, state tax, and FICA come out of your gross salary." },
    { q: "Does this calculator ask for my email?", a: "No. Nothing to sign up for. You type your salary, you see the number." },
    { q: "Why is my paycheck smaller than my salary ÷ pay periods?", a: "Taxes. Federal income tax, your state's income tax, and FICA (Social Security + Medicare) all come out first." },
    { q: "Are these numbers exact?", a: `They're estimates for the ${federal.taxYear} tax year, using the standard deduction and no credits. Your real paycheck can differ.` },
    { q: "My state isn't in the list. Can I still use this?", a: "Yes. Pick \"Another state\" to get federal tax and FICA. Your state's income tax isn't included yet, so subtract it on top." },
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
          <p>Your gross salary never hits your account whole. Up to four cuts come first:</p>
          <ul>
            <li><strong>Federal income tax</strong> — progressive brackets on income after the standard deduction.</li>
            <li><strong>State income tax</strong> — depends where you live. Nine states take nothing.</li>
            <li><strong>Social Security</strong> — 6.2% up to the {federal.taxYear} wage cap of {usd(federal.fica.socialSecurity.wageBase)}.</li>
            <li><strong>Medicare</strong> — 1.45%, plus 0.9% more on high earners.</li>
          </ul>
          <p>
            Pre-tax deductions like a 401(k) or HSA come out before income tax, so they
            shrink the taxable slice. That's the lever most people forget.
          </p>
          <h2>Paycheck calculators by state</h2>
          <p>These states don&apos;t tax wages, so federal tax and FICA are the whole story:</p>
          <ul>
            {ready.map((s) => (
              <li key={s.abbr}><a href={`/paycheck-calculator/${s.abbr.toLowerCase()}/`}>{s.name} paycheck calculator</a></li>
            ))}
          </ul>
          <p>
            Paid on a 1099 instead? Use the <a href="/1099-tax-calculator/">1099 tax calculator</a>.
            Getting a bonus? See what&apos;s left with the <a href="/bonus-tax-calculator/">bonus tax calculator</a>.
          </p>
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
