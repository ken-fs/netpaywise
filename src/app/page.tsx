import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { computePaycheck } from "@/lib/engine/tax";
import { statesWithData } from "@/lib/data";
import type { FederalConfig, StateConfig } from "@/lib/engine/types";

const load = (p: string) =>
  JSON.parse(readFileSync(resolve(process.cwd(), p), "utf8"));

const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const TOOLS = [
  { href: "/paycheck-calculator/", name: "Paycheck calculator", sub: "Your take-home pay after federal tax and FICA", feature: true },
  { href: "/1099-tax-calculator/", name: "1099 tax calculator", sub: "Self-employment + income tax, per quarter" },
  { href: "/bonus-tax-calculator/", name: "Bonus tax", sub: "What's left after the 22% withholding" },
  { href: "/no-tax-on-overtime-calculator/", name: "No tax on overtime", sub: "What the new deduction saves you" },
  { href: "/overtime-calculator/", name: "Overtime pay", sub: "Time and a half or double time" },
  { href: "/salary-to-hourly/", name: "Salary and hourly", sub: "Convert either direction" },
];

const Arrow = () => (
  <svg className="arw" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function Home() {
  const federal = load("data/tax/us/2026/federal.json") as FederalConfig;
  const tx = load("data/tax/us/2026/states/tx.json") as StateConfig;
  const states = statesWithData();

  const ex = computePaycheck(
    { grossAnnual: 65000, payFrequency: "biweekly", filingStatus: "single" },
    federal,
    tx,
  );
  const g = ex.grossAnnual;
  const w = (n: number) => `${(n / g) * 100}%`;
  const fica = ex.socialSecurity + ex.medicare;

  return (
    <>
      <section className="wrap hero">
        <div className="hero-copy">
          <h1>
            See what <span className="mark">actually</span> hits your bank account.
          </h1>
          <p className="lede">
            Type your salary. Watch it split into federal tax and FICA — and the part you
            keep. No signup. No email. Just the math.
          </p>
          <div className="hero-cta">
            <a className="btn" href="/paycheck-calculator/">Calculate my take-home <Arrow /></a>
            <a className="btn ghost" href="/1099-tax-calculator/">I&apos;m self-employed</a>
          </div>
        </div>

        {/* Signature: a real pay stub. The split bar tears open on load. */}
        <aside className="stub hero-stub" aria-label="Example pay stub: $65,000 salary, single, Texas">
          <div className="stub-head">
            <span>PAY STUB · EXAMPLE</span>
            <span>$65,000 · single · TX</span>
          </div>
          <div className="split" role="img" aria-label="Gross pay split into take-home and taxes">
            <span className="s-take" style={{ width: w(ex.takeHomeAnnual) }} />
            <span className="s-fed" style={{ width: w(ex.federalIncomeTax) }} />
            <span className="s-state" style={{ width: w(ex.stateIncomeTax) }} />
            <span className="s-fica" style={{ width: w(fica) }} />
          </div>
          <dl className="stub-lines money">
            <div className="line take">
              <dt><span className="tick" style={{ background: "var(--take)" }} />Take-home</dt>
              <dd>{usd(ex.takeHomeAnnual)}</dd>
            </div>
            <div className="line">
              <dt><span className="tick" style={{ background: "var(--fed)" }} />Federal tax</dt>
              <dd>−{usd(ex.federalIncomeTax)}</dd>
            </div>
            <div className="line">
              <dt><span className="tick" style={{ background: "var(--clay)" }} />Texas tax</dt>
              <dd>{usd(ex.stateIncomeTax)}</dd>
            </div>
            <div className="line">
              <dt><span className="tick" style={{ background: "var(--fica)" }} />FICA</dt>
              <dd>−{usd(fica)}</dd>
            </div>
          </dl>
          <div className="stub-total money">
            <span>Every 2 weeks</span>
            <strong>${ex.takeHomePerPeriod.toLocaleString("en-US", { maximumFractionDigits: 0 })}</strong>
          </div>
        </aside>
      </section>

      <section className="wrap tools">
        <h2>The tools</h2>
        <div className="ledger">
          {TOOLS.map((t) => (
            <a className={`ledger-row${t.feature ? " feature" : ""}`} key={t.href} href={t.href}>
              <div className="lr-main">
                <span className="lr-name">{t.name}</span>
                <span className="lr-sub">{t.sub}</span>
              </div>
              <Arrow />
            </a>
          ))}
        </div>
      </section>

      <section className="wrap tools">
        <h2>States with no income tax</h2>
        <div className="ledger">
          {states.map((s) => (
            <a className="ledger-row" key={s.abbr} href={`/paycheck-calculator/${s.abbr.toLowerCase()}/`}>
              <div className="lr-main">
                <span className="lr-name">{s.name} paycheck calculator</span>
              </div>
              <Arrow />
            </a>
          ))}
        </div>
        <p className="disclaimer">
          Estimates for the {federal.taxYear} tax year using IRS figures, the standard
          deduction and no credits. Not tax or financial advice.
        </p>
      </section>
    </>
  );
}
