import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { loadFederal, loadState, statesWithData } from "@/lib/data";
import { PaycheckCalculator } from "@/components/PaycheckCalculator";
import type { StateConfig } from "@/lib/engine/types";
import { usd } from "@/lib/format";

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
    title: `${meta.name} Paycheck Calculator 2026 — Take-Home Pay After Taxes`,
    description: meta.noIncomeTax
      ? `Calculate your 2026 ${meta.name} take-home pay. ${meta.name} has no state income tax, so see exactly what federal tax and FICA leave you — free, no signup.`
      : `Calculate your 2026 ${meta.name} take-home pay. See federal tax, ${meta.name} state tax, and FICA taken from your salary — free, no signup.`,
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
  const others = statesWithData().filter((s) => s.abbr !== meta.abbr);
  const noTax = state.type === "none";
  const premiums = state.payrollTaxes ?? [];
  const premiumNames = premiums.map((t) => t.name).join(" and ");
  const rate = topRate(state);

  const faq = [
    {
      q: `Does ${meta.name} have a state income tax?`,
      a: noTax
        ? premiums.length
          ? `No. ${meta.name} takes no state income tax. Besides federal tax and FICA, the only state deductions are the ${premiumNames} premiums.`
          : `No. ${meta.name} takes no state income tax, so only federal tax and FICA come out of your paycheck.`
        : `Yes. ${meta.name} taxes income${rate ? `, topping out around ${rate.toFixed(2)}%` : ""}. It comes out on top of federal tax and FICA.`,
    },
    {
      q: `How much is take-home pay in ${meta.name}?`,
      a: `Enter your salary above to see it. Take-home is your gross pay minus federal tax${noTax ? "" : `, ${meta.name} state tax`}${premiums.length ? `, the ${premiumNames} premiums` : ""}, and FICA.`,
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
        { "@type": "ListItem", position: 1, name: "Paycheck Calculator", item: "https://takehomepal.com/paycheck-calculator/" },
        { "@type": "ListItem", position: 2, name: meta.name, item: `https://takehomepal.com/paycheck-calculator/${meta.abbr.toLowerCase()}/` },
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
              ? premiums.length
                ? `Good news: ${meta.name} takes no state income tax. Federal tax, FICA and two small state premiums are all that come out.`
                : `Good news: ${meta.name} takes no state income tax. Only federal and FICA touch your pay.`
              : `See exactly what federal tax, ${meta.name} tax, and FICA leave in your pocket.`}
          </p>
        </div>

        <PaycheckCalculator federal={federal} states={[state]} lockedState={meta.abbr} />

        <div className="prose">
          <h2>Taxes on a {meta.name} paycheck</h2>
          <p>
            Everyone working in {meta.name} pays federal income tax and FICA (6.2% Social
            Security up to {usd(federal.fica.socialSecurity.wageBase)} of wages + 1.45% Medicare).{" "}
            {noTax
              ? `${meta.name} adds no state income tax, which is why paychecks here stretch further than in high-tax states.`
              : `On top of that, ${meta.name} takes its own income tax${rate ? `, up to about ${rate.toFixed(2)}% at the highest bracket` : ""}.`}
          </p>
          <p>
            Want to keep more? Pre-tax contributions to a 401(k) or HSA lower the income
            that gets taxed. Punch in a deduction above and watch the take-home move.
          </p>
          {state.notes && state.notes.length > 0 && (
            <>
              <h2>What&apos;s different about {meta.name}</h2>
              {state.notes.map((n) => <p key={n}>{n}</p>)}
            </>
          )}
          <h2>Other ways you get paid</h2>
          <p>
            Freelancing on the side? The <a href="/1099-tax-calculator/">1099 tax calculator</a> shows
            what to set aside each quarter. Got a bonus? The{" "}
            <a href="/bonus-tax-calculator/">bonus tax calculator</a> shows what&apos;s left after
            the flat 22% withholding.
          </p>
          <h2>Other states with no income tax</h2>
          <p>
            {others.map((s, i) => (
              <span key={s.abbr}>
                {i > 0 && " · "}
                <a href={`/paycheck-calculator/${s.abbr.toLowerCase()}/`}>{s.name}</a>
              </span>
            ))}
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
