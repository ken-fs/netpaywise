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

const money = (n: number) => Math.max(0, Number(n) || 0);

/** `years` newest first; the first one is the default. */
export function SETaxCalculator({ years, defaultIncome = 75000 }: { years: FederalConfig[]; defaultIncome?: number }) {
  const [year, setYear] = useState(years[0].taxYear);
  const [income, setIncome] = useState(defaultIncome);
  const [expenses, setExpenses] = useState(15000);
  const [adjustments, setAdjustments] = useState(0);
  const [itemized, setItemized] = useState(0);
  const [filing, setFiling] = useState<FilingStatus>("single");

  const federal = years.find((y) => y.taxYear === year) ?? years[0];
  const profit = Math.max(0, income - expenses);
  const r = useMemo(
    () => freelanceTax(profit, filing, federal, adjustments, itemized),
    [profit, filing, federal, adjustments, itemized],
  );
  const current = federal.taxYear === years[0].taxYear;
  const std = federal.standardDeduction[filing];

  return (
    <div className="calc">
      <div className="calc-inputs">
        {years.length > 1 && (
          <div className="seg" role="tablist" aria-label="Tax year">
            {years.map((y) => (
              <button key={y.taxYear} role="tab" aria-selected={year === y.taxYear} className={year === y.taxYear ? "on" : ""} onClick={() => setYear(y.taxYear)}>{y.taxYear}</button>
            ))}
          </div>
        )}
        <label className="field">
          <span>1099 income <em>(everything clients paid you, yearly)</em></span>
          <div className="money-input"><span aria-hidden>$</span>
            <input type="number" min={0} inputMode="decimal" value={income}
              onChange={(e) => setIncome(money(Number(e.target.value)))} />
          </div>
        </label>
        <label className="field">
          <span>Business expenses <em>(software, gear, mileage, home office…)</em></span>
          <div className="money-input"><span aria-hidden>$</span>
            <input type="number" min={0} inputMode="decimal" value={expenses}
              onChange={(e) => setExpenses(money(Number(e.target.value)))} />
          </div>
        </label>
        <label className="field">
          <span>Retirement + health insurance <em>(SEP-IRA, solo 401(k), self-employed premiums)</em></span>
          <div className="money-input"><span aria-hidden>$</span>
            <input type="number" min={0} inputMode="decimal" value={adjustments}
              onChange={(e) => setAdjustments(money(Number(e.target.value)))} />
          </div>
        </label>
        <label className="field">
          <span>Itemized deductions <em>(only if more than the {usd(std)} standard deduction)</em></span>
          <div className="money-input"><span aria-hidden>$</span>
            <input type="number" min={0} inputMode="decimal" value={itemized}
              onChange={(e) => setItemized(money(Number(e.target.value)))} />
          </div>
        </label>
        <label className="field">
          <span>Filing status</span>
          <select value={filing} onChange={(e) => setFiling(e.target.value as FilingStatus)}>
            {FILING.map((f) => <option key={f.v} value={f.v}>{f.label}</option>)}
          </select>
        </label>
        <p style={{ fontSize: "0.9rem", color: "var(--slate)" }}>
          Expenses cut both taxes. Retirement and health insurance only cut income tax —
          self-employment tax is still figured on your full profit.
        </p>
      </div>

      <aside className="stub calc-result" aria-live="polite">
        <div className="stub-head"><span>{current ? "SET ASIDE PER QUARTER" : "FEDERAL TAX FOR THE YEAR"}</span><span>{federal.taxYear}</span></div>
        <div className="headline-num money">
          <span className="cur">$</span>
          {(current ? r.quarterly : r.totalTax).toLocaleString("en-US", { maximumFractionDigits: 0 })}
        </div>
        <dl className="stub-lines money">
          <div className="line"><dt>Net profit</dt><dd>{usd(profit)}</dd></div>
          <div className="line"><dt>Self-employment tax</dt><dd>{usd(r.se.seTax)}</dd></div>
          <div className="line"><dt>Federal income tax</dt><dd>{usd(r.federalIncomeTax)}</dd></div>
          <div className="line"><dt>QBI deduction used</dt><dd>{usd(r.qbiDeduction)}</dd></div>
          <div className="line"><dt>Taxable income</dt><dd>{usd(r.taxableIncome)}</dd></div>
          <div className="line"><dt>Total federal tax</dt><dd>{usd(r.totalTax)}</dd></div>
          {current && <div className="line"><dt>Per quarter</dt><dd>{usd(r.quarterly)}</dd></div>}
          <div className="line take"><dt>You keep</dt><dd>{usd(r.keep)}</dd></div>
        </dl>
        <div className="rate-note money">{r.effectiveRate.toFixed(1)}% of your profit goes to federal tax</div>
        <p className="disclaimer">
          Federal only, assuming 1099 is your only income, no employees and no credits. State income
          tax is extra in most states. Estimate for the {federal.taxYear} tax year, not tax advice.
        </p>
      </aside>
    </div>
  );
}
