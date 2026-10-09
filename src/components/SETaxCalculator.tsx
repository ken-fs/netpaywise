"use client";

import { useMemo, useState } from "react";
import type { FederalConfig, FilingStatus } from "@/lib/engine/types";
import { freelanceTax } from "@/lib/engine/tax";
import { usd } from "@/lib/format";

const FILING: { v: FilingStatus; label: string }[] = [
  { v: "single", label: "Single" },
  { v: "married_jointly", label: "Married, jointly" },
  { v: "married_separately", label: "Married, separately" },
  { v: "head_of_household", label: "Head of household" },
];

export function SETaxCalculator({ federal, defaultProfit = 60000 }: { federal: FederalConfig; defaultProfit?: number }) {
  const [profit, setProfit] = useState(defaultProfit);
  const [filing, setFiling] = useState<FilingStatus>("single");
  const r = useMemo(() => freelanceTax(profit, filing, federal), [profit, filing, federal]);

  return (
    <div className="calc">
      <div className="calc-inputs">
        <label className="field">
          <span>Net 1099 profit <em>(income − business expenses, yearly)</em></span>
          <div className="money-input"><span aria-hidden>$</span>
            <input type="number" min={0} inputMode="decimal" value={profit}
              onChange={(e) => setProfit(Math.max(0, Number(e.target.value) || 0))} />
          </div>
        </label>
        <label className="field">
          <span>Filing status</span>
          <select value={filing} onChange={(e) => setFiling(e.target.value as FilingStatus)}>
            {FILING.map((f) => <option key={f.v} value={f.v}>{f.label}</option>)}
          </select>
        </label>
        <p style={{ fontSize: "0.9rem", color: "var(--slate)" }}>
          Two federal taxes hit 1099 income: self-employment tax (15.3% on 92.35% of
          profit) and regular income tax on what's left after your deductions.
        </p>
      </div>

      <aside className="stub calc-result" aria-live="polite">
        <div className="stub-head"><span>SET ASIDE PER QUARTER</span><span>{federal.taxYear}</span></div>
        <div className="headline-num money">
          <span className="cur">$</span>
          {r.quarterly.toLocaleString("en-US", { maximumFractionDigits: 0 })}
        </div>
        <dl className="stub-lines money">
          <div className="line"><dt>Self-employment tax</dt><dd>{usd(r.se.seTax)}</dd></div>
          <div className="line"><dt>Federal income tax</dt><dd>{usd(r.federalIncomeTax)}</dd></div>
          <div className="line"><dt>QBI deduction used</dt><dd>{usd(r.qbiDeduction)}</dd></div>
          <div className="line"><dt>Total federal tax</dt><dd>{usd(r.totalTax)}</dd></div>
          <div className="line take"><dt>You keep</dt><dd>{usd(r.keep)}</dd></div>
        </dl>
        <div className="rate-note money">{r.effectiveRate.toFixed(1)}% of your profit goes to federal tax</div>
        <p className="disclaimer">
          Federal only, assuming 1099 is your only income, the standard deduction, no
          employees, and no credits. State income tax is extra in most states. Estimate
          for the {federal.taxYear} tax year, not tax advice.
        </p>
      </aside>
    </div>
  );
}
