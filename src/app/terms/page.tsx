import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "netpaywise gives you estimates, not tax or financial advice. Here's the fine print, in plain English.",
  alternates: { canonical: "/terms/" },
};

export default function Terms() {
  return (
    <section className="wrap">
      <div style={{ paddingTop: "clamp(36px,6vw,64px)" }}>
        <h1>Terms of use</h1>
        <p className="lede" style={{ color: "var(--slate)", maxWidth: "52ch" }}>
          Use the tools freely. Just know they're estimates — not a substitute for a tax pro
          or your lender.
        </p>
      </div>
      <div className="prose">
        <h2>Estimates, not advice</h2>
        <p>
          netpaywise provides free calculators for education and planning. The results are
          estimates. They are not tax, legal, financial, or investment advice, and they don't
          create a professional relationship.
        </p>

        <h2>Accuracy</h2>
        <p>
          We work hard to keep tax brackets, rates, and formulas current, but rules change
          and edge cases exist. Calculations use standard assumptions (like the standard
          deduction) and won't capture every credit, deduction, or local rule. Always confirm
          important numbers with the IRS, your state tax authority, your lender, or a
          qualified professional before acting.
        </p>

        <h2>No warranty</h2>
        <p>
          The site is provided "as is," without warranties of any kind. We don't guarantee
          the results are accurate, complete, or right for your situation.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          To the fullest extent allowed by law, netpaywise isn't liable for any loss or damage
          arising from your use of the site or reliance on its results.
        </p>

        <h2>Your use</h2>
        <p>
          Don't misuse the site, attempt to disrupt it, or scrape it at a scale that degrades
          it for others. The site's design, code, and content are ours unless noted otherwise.
        </p>

        <p>Questions about these terms? Reach us on the <a href="/contact/">contact page</a>.</p>
      </div>
    </section>
  );
}
