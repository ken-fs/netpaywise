import type { Metadata } from "next";
import { loadFederal, statesWithData } from "@/lib/data";

export const metadata: Metadata = {
  title: "About netpaywise",
  description: "Why netpaywise exists, how we calculate, and where our tax numbers come from.",
  alternates: { canonical: "/about/" },
};

export default function About() {
  const federal = loadFederal();
  const stateCount = statesWithData().length;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "netpaywise",
        url: "https://netpaywise.com",
        description: "Free US paycheck, bonus and 1099 tax calculators. See what you actually keep.",
        knowsAbout: ["paycheck calculation", "US income tax", "take-home pay", "self-employment tax"],
      },
      {
        "@type": "WebSite",
        name: "netpaywise",
        url: "https://netpaywise.com",
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="wrap">
        <div style={{ paddingTop: "clamp(36px,6vw,64px)" }}>
          <h1>Built so you're never surprised by your paycheck.</h1>
          <p className="lede" style={{ color: "var(--slate)", maxWidth: "54ch" }}>
            netpaywise turns a confusing pay stub into one clear number: what you actually
            keep. Free, fast, and honest about the taxes in between.
          </p>
        </div>

        <div className="prose">
          <h2>Why this exists</h2>
          <p>
            Most people know their salary but not their take-home. The gap — federal tax,
            state tax, Social Security, Medicare — is where the confusion lives. netpaywise is
            a set of tools that show that gap plainly, right when you're weighing a job, a
            move, or a freelance gig.
          </p>

          <h2>How we calculate</h2>
          <p>Every result comes from published rules, not guesses:</p>
          <ul>
            <li><strong>Federal income tax</strong> — current IRS brackets, applied after the standard deduction.</li>
            <li><strong>State income tax</strong> — we only publish a state once its numbers are checked. Today that's the {stateCount} states with no income tax on wages; states with their own tax tables come later.</li>
            <li><strong>FICA</strong> — 6.2% Social Security up to the annual wage cap, plus 1.45% Medicare (and the 0.9% surtax for high earners).</li>
            <li><strong>1099 income</strong> — self-employment tax on 92.35% of profit, then income tax after half of it, the standard deduction and the 20% QBI deduction.</li>
          </ul>
          <p>
            Estimates assume the standard deduction and don't include every credit or local
            rule, so treat them as a strong starting point — then confirm the specifics for
            your situation. That's why every tool says "estimate," not "advice."
          </p>

          <h2>Where the numbers come from</h2>
          <p>
            Tax figures are sourced from the IRS and each state's department of revenue, for
            the {federal.taxYear} tax year. Each tool shows the year it uses. Our calculation
            logic is tested against hand-worked examples so the math stays correct as the data
            updates.
          </p>

          <h2>Our accuracy pledge</h2>
          <p>
            Getting the number right is the entire job. When rates change, we update the data
            and re-check the results. If you ever spot a figure that looks off,{" "}
            <a href="/contact/">tell us</a> — corrections jump the queue ahead of everything
            else.
          </p>

          <h2>No signup, no email, no catch</h2>
          <p>
            The calculators run in your browser. We never see or store what you type. netpaywise
            is an independent project, supported by ads — not by selling your data, because we
            don't have it.
          </p>
        </div>
      </section>
    </>
  );
}
