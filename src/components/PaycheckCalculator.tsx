"use client";

import { useMemo, useState } from "react";
import type { FederalConfig, StateConfig, FilingStatus, PayFrequency } from "@/lib/engine/types";
import { computePaycheck, hourlyToAnnual } from "@/lib/engine/tax";
import { SplitBar } from "./SplitBar";
import { usd } from "@/lib/format";

const FILING: { v: FilingStatus; label: string }[] = [
  { v: "single", label: "Single" },
  { v: "married_jointly", label: "Married, jointly" },
  { v: "married_separately", label: "Married, separately" },
  { v: "head_of_household", label: "Head of household" },
];
const FREQ: { v: PayFrequency; label: string }[] = [
  { v: "annual", label: "Annually" },
  { v: "monthly", label: "Monthly" },
  { v: "semimonthly", label: "Semi-monthly" },
  { v: "biweekly", label: "Every 2 weeks" },
  { v: "weekly", label: "Weekly" },
];

interface Props {
  federal: FederalConfig;
  /** All selectable state configs (national page); or a single locked state. */
  states: StateConfig[];
  lockedState?: string; // abbr — hides the state selector on state pages
  defaultSalary?: number;
}

export function PaycheckCalculator({ federal, states, lockedState, defaultSalary = 65000 }: Props) {
  const [mode, setMode] = useState<"salary" | "hourly">("salary");
  const [amount, setAmount] = useState(defaultSalary);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [freq, setFreq] = useState<PayFrequency>("biweekly");
  const [filing, setFiling] = useState<FilingStatus>("single");
  const [stateAbbr, setStateAbbr] = useState(lockedState ?? states[0]?.state ?? "CA");
  const [preTax, setPreTax] = useState(0);

  const state = useMemo(
    () => states.find((s) => s.state === stateAbbr) ?? states[0],
    [states, stateAbbr],
  );

  const grossAnnual = mode === "salary" ? amount : hourlyToAnnual(amount, hoursPerWeek);

  const result = useMemo(
    () =>
      computePaycheck(
        { grossAnnual, payFrequency: freq, filingStatus: filing, preTaxDeductions: preTax },
        federal,
        state,
      ),
    [grossAnnual, freq, filing, preTax, federal, state],
  );

  return (
    <div className="calc">
      <div className="calc-inputs">
        <div className="seg" role="tablist" aria-label="Pay type">
          <button role="tab" aria-selected={mode === "salary"} className={mode === "salary" ? "on" : ""} onClick={() => setMode("salary")}>Salary</button>
          <button role="tab" aria-selected={mode === "hourly"} className={mode === "hourly" ? "on" : ""} onClick={() => setMode("hourly")}>Hourly</button>
        </div>

        <label className="field">
          <span>{mode === "salary" ? "Annual salary" : "Hourly rate"}</span>
          <div className="money-input">
            <span aria-hidden>$</span>
            <input type="number" min={0} inputMode="decimal" value={amount}
              onChange={(e) => setAmount(Math.max(0, Number(e.target.value) || 0))} />
          </div>
        </label>

        {mode === "hourly" && (
          <label className="field">
            <span>Hours per week</span>
            <input type="number" min={1} max={168} value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(Math.min(168, Math.max(1, Number(e.target.value) || 1)))} />
          </label>
        )}

        <label className="field">
          <span>Pay frequency</span>
          <select value={freq} onChange={(e) => setFreq(e.target.value as PayFrequency)}>
            {FREQ.map((f) => <option key={f.v} value={f.v}>{f.label}</option>)}
          </select>
        </label>

        <label className="field">
          <span>Filing status</span>
          <select value={filing} onChange={(e) => setFiling(e.target.value as FilingStatus)}>
            {FILING.map((f) => <option key={f.v} value={f.v}>{f.label}</option>)}
          </select>
        </label>

        {!lockedState && (
          <label className="field">
            <span>State</span>
            <select value={stateAbbr} onChange={(e) => setStateAbbr(e.target.value)}>
              {states.map((s) => <option key={s.state} value={s.state}>{s.name}</option>)}
            </select>
          </label>
        )}

        <label className="field">
          <span>Pre-tax deductions <em>(401k, HSA — yearly)</em></span>
          <div className="money-input">
            <span aria-hidden>$</span>
            <input type="number" min={0} inputMode="decimal" value={preTax}
              onChange={(e) => setPreTax(Math.max(0, Number(e.target.value) || 0))} />
          </div>
        </label>
      </div>

      <aside className="stub calc-result" aria-live="polite">
        <div className="label">Your take-home · {state?.name}</div>
        <div className="headline-num money">
          <span className="cur">$</span>
          {result.takeHomePerPeriod.toLocaleString("en-US", { maximumFractionDigits: 0 })}
          <span className="per"> / {freq === "annual" ? "year" : "paycheck"}</span>
        </div>
        <SplitBar r={result} />
        <div className="rate-note money">
          {usd(result.takeHomeAnnual)}/yr kept · {result.effectiveTaxRate.toFixed(1)}% effective tax rate
        </div>
        <p className="disclaimer">
          Estimate for the {federal.taxYear} tax year. Not tax advice. Assumes standard
          deduction, no credits.{state?.notIncluded ? ` ${state.notIncluded}` : ""}
        </p>
      </aside>
    </div>
  );
}
