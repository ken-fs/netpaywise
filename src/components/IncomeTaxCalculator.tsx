"use client";

import { useMemo, useState } from "react";
import type { FederalConfig, StateConfig, FilingStatus } from "@/lib/engine/types";
import { computeIncomeTax } from "@/lib/engine/tax";
import { usd } from "@/lib/format";

const FILING: { v: FilingStatus; label: string }[] = [
  { v: "single", label: "Single" },
  { v: "married_jointly", label: "Married, jointly" },
  { v: "married_separately", label: "Married, separately" },
  { v: "head_of_household", label: "Head of household" },
];

export function IncomeTaxCalculator({
  federal,
  states = [],
  defaultIncome = 75000,
}: {
  federal: FederalConfig;
  states?: StateConfig[];
  defaultIncome?: number;
}) {
  const [income, setIncome] = useState(defaultIncome);
  const [filing, setFiling] = useState<FilingStatus>("single");
  const [preTax, setPreTax] = useState(0);
  const [stateAbbr, setStateAbbr] = useState(states[0]?.state ?? "");

  const state = useMemo(() => states.find((s) => s.state === stateAbbr), [states, stateAbbr]);
  const r = useMemo(
    () => computeIncomeTax(income, filing, preTax, federal, state),
    [income, filing, preTax, federal, state],
  );

  return (
    <div className="calc">
      <div className="calc-inputs">
        <label className="field">
          <span>Taxable income (gross)</span>
          <div className="money-input"><span aria-hidden>$</span>
            <input type="number" min={0} inputMode="decimal" value={income}
              onChange={(e) => setIncome(Math.max(0, Number(e.target.value) || 0))} />
          </div>
        </label>
        <label className="field">
          <span>Filing status</span>
          <select value={filing} onChange={(e) => setFiling(e.target.value as FilingStatus)}>
            {FILING.map((f) => <option key={f.v} value={f.v}>{f.label}</option>)}
          </select>
        </label>
        {states.length > 0 && (
          <label className="field">
            <span>State</span>
            <select value={stateAbbr} onChange={(e) => setStateAbbr(e.target.value)}>
              {states.map((s) => <option key={s.state} value={s.state}>{s.name}</option>)}
            </select>
          </label>
        )}
        <label className="field">
          <span>Pre-tax deductions <em>(401k, HSA — yearly)</em></span>
          <div className="money-input"><span aria-hidden>$</span>
            <input type="number" min={0} inputMode="decimal" value={preTax}
              onChange={(e) => setPreTax(Math.max(0, Number(e.target.value) || 0))} />
          </div>
        </label>
      </div>

      <aside className="stub calc-result" aria-live="polite">
        <div className="stub-head"><span>INCOME TAX · EST.</span><span>{federal.taxYear}</span></div>
        <div className="headline-num money">
          <span className="cur">$</span>
          {r.total.toLocaleString("en-US", { maximumFractionDigits: 0 })}
        </div>
        <dl className="stub-lines money">
          <div className="line"><dt>Federal</dt><dd>{usd(r.federal)}</dd></div>
          {state && <div className="line"><dt>{state.name}</dt><dd>{usd(r.state)}</dd></div>}
          <div className="line take"><dt>After income tax</dt><dd>{usd(r.afterTax)}</dd></div>
        </dl>
        <div className="rate-note money">{r.effectiveRate.toFixed(1)}% effective income-tax rate</div>
        <p className="disclaimer">Estimate. Standard deduction, no credits. Excludes FICA.</p>
      </aside>
    </div>
  );
}
