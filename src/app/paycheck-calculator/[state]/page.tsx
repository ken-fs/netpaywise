import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { loadFederal, loadState, statesWithData } from "@/lib/data";
import { PaycheckCalculator } from "@/components/PaycheckCalculator";
import type { StateConfig } from "@/lib/engine/types";

export function generateStaticParams() {
  return statesWithData().map((s) => ({ state: s.abbr.toLowerCase() }));
}

const getState = (slug: string) =>
  statesWithData().find((s) => s.abbr.toLowerCase() === slug.toLowerCase());

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state } = await params;
  const meta = getState(state);
  if (!meta) return {};
  return {
    title: `${meta.name} Paycheck Calculator — Take-Home Pay After Taxes`,
    description: `Calculate your ${meta.name} take-home pay. See federal tax, ${meta.name} state tax, and FICA taken from your salary — free, no signup.`,
    alternates: { canonical: `/paycheck-calculator/${meta.abbr.toLowerCase()}/` },
  };
}

function topRate(state: StateConfig): number | null {
  if (state.type === "none") return null;
  if (state.type === "flat") return (state.rate ?? 0) * 100;
  const b = state.brackets?.[state.bracketFallback ?? "single"];
  const last = b?.[b.length - 1];
  return last ? last.rate * 100 : null;
}

export default async function StatePaycheck({ params }: { params: Promise<{ state: string }> }) {
  const { state: slug } = await params;
  const meta = getState(slug);
  if (!meta) notFound();

  const federal = loadFederal();
  const state = loadState(meta.abbr);
  const noTax = state.type === "none";
  const rate = topRate(state);

  const faq = [
    {
      q: `Does ${meta.name} have a state income tax?`,
      a: noTax
        ? `No. ${meta.name} takes no state income tax, so only federal tax and FICA come out of your paycheck.`
        : `Yes. ${meta.name} taxes income${rate ? `, topping out around ${rate.toFixed(2)}%` : ""}. It comes out on top of federal tax and FICA.`,
    },
    {
      q: `How much is take-home pay in ${meta.name}?`,
      a: `Enter your salary above to see it. Take-home is your gross pay minus federal tax${noTax ? "" : `, ${meta.name} state tax`}, and FICA.`,
    },
    {
      q: "Do I need to sign up?",
      a: "No. No email, no account. Type your numbers and read the result.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebApplication", name: `${meta.name} Paycheck Calculator`, applicationCategory: "FinanceApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Paycheck Calculator", item: "https://netpaywise.com/paycheck-calculator/" },
        { "@type": "ListItem", position: 2, name: meta.name, item: `https://netpaywise.com/paycheck-calculator/${meta.abbr.toLowerCase()}/` },
      ] },
      { "@type": "FAQPage", mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="wrap">
        <nav aria-label="Breadcrumb" style={{ paddingTop: 24, fontSize: "0.85rem", color: "var(--muted)" }}>
          <a href="/paycheck-calculator/">Paycheck</a> › {meta.name}
        </nav>
        <div style={{ paddingTop: 8 }}>
          <h1>Your {meta.name} paycheck, after taxes.</h1>
          <p className="lede" style={{ color: "var(--slate)", maxWidth: "60ch" }}>
            {noTax
              ? `Good news: ${meta.name} takes no state income tax. Only federal and FICA touch your pay.`
              : `See exactly what federal tax, ${meta.name} tax, and FICA leave in your pocket.`}
          </p>
        </div>

        <PaycheckCalculator federal={federal} states={[state]} lockedState={meta.abbr} />

        <div className="prose">
          <h2>Taxes on a {meta.name} paycheck</h2>
          <p>
            Everyone working in {meta.name} pays federal income tax and FICA (6.2% Social
            Security + 1.45% Medicare).{" "}
            {noTax
              ? `${meta.name} adds no state income tax, which is why paychecks here stretch further than in high-tax states.`
              : `On top of that, ${meta.name} takes its own income tax${rate ? `, up to about ${rate.toFixed(2)}% at the highest bracket` : ""}.`}
          </p>
          <p>
            Want to keep more? Pre-tax contributions to a 401(k) or HSA lower the income
            that gets taxed. Punch in a deduction above and watch the take-home move.
          </p>
        </div>

        <div className="prose faq">
          <h2>{meta.name} paycheck questions</h2>
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
