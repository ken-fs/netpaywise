import type { ReactNode } from "react";

export interface Faq {
  q: string;
  a: string;
}

/** Shared scaffold for a calculator tool page: heading, tool, prose, FAQ, JSON-LD. */
export function ToolPage({
  appName,
  title,
  lede,
  children,
  prose,
  faq,
}: {
  appName: string;
  title: string;
  lede: string;
  children: ReactNode; // the interactive calculator
  prose?: ReactNode;
  faq: Faq[];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: appName,
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="wrap">
        <div style={{ paddingTop: "clamp(36px,6vw,64px)" }}>
          <h1>{title}</h1>
          <p className="lede" style={{ color: "var(--slate)", maxWidth: "48ch" }}>{lede}</p>
        </div>
        {children}
        {prose && <div className="prose">{prose}</div>}
        <div className="prose faq">
          <h2>Questions</h2>
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
