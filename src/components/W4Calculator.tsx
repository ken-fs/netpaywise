"use client";

import { useMemo, useState } from "react";
import type { FederalConfig, FilingStatus, PayFrequency } from "@/lib/engine/types";
import { withholdingCheck } from "@/lib/engine/tax";
import { PERIODS_PER_YEAR } from "@/lib/engine/types";
import { usd } from "@/lib/format";

const FILING: { v: FilingStatus; label: string }[] = [
  { v: "single", label: "Single" },
  { v: "married_jointly", label: "Married, jointly" },
  { v: "head_of_household", label: "Head of household" },
];
const FREQ: { v: PayFrequency; label: string }[] = [
  { v: "biweekly", label: "Every 2 weeks" },
  { v: "semimonthly", label: "Semi-monthly" },
  { v: "monthly", label: "Monthly" },
  { v: "weekly", label: "Weekly" },
];

export function W4Calculator({ federal }: { federal: FederalConfig }) {
  const [income, setIncome] = useState(70000);
  const [filing, setFiling] = useState<FilingStatus>("single");
  const [freq, setFreq] = useState<PayFrequency>("biweekly");
  const [withheld, setWithheld] = useState(220);

  const periods = PERIODS_PER_YEAR[freq];
  const r = useMemo(
    () => withholdingCheck(income, filing, withheld, periods, federal),
    [income, filing, withheld, periods, federal],
  );
  const owe = r.difference < 0;

  return (
    <div className="calc">
      <div className="calc-inputs">
        <label className="field"><span>Annual salary</span>
          <div className="money-input"><span aria-hidden>$</span>
            <input type="number" min={0} value={income} onChange={(e) => setIncome(Math.max(0, Number(e.target.value) || 0))} />
          </div>
        </label>
        <label className="field"><span>Filing status</span>
          <select value={filing} onChange={(e) => setFiling(e.target.value as FilingStatus)}>
            {FILING.map((f) => <option key={f.v} value={f.v}>{f.label}</option>)}
          </select>
        </label>
        <label className="field"><span>Pay frequency</span>
          <select value={freq} onChange={(e) => setFreq(e.target.value as PayFrequency)}>
            {FREQ.map((f) => <option key={f.v} value={f.v}>{f.label}</option>)}
          </select>
        </label>
        <label className="field"><span>Federal tax withheld per paycheck</span>
          <div className="money-input"><span aria-hidden>$</span>
            <input type="number" min={0} value={withheld} onChange={(e) => setWithheld(Math.max(0, Number(e.target.value) || 0))} />
          </div>
        </label>
      </div>
      <aside className="stub calc-result" aria-live="polite">
        <div className="stub-head"><span>{owe ? "PROJECTED · YOU OWE" : "PROJECTED · REFUND"}</span><span>{federal.taxYear}</span></div>
        <div className="headline-num money">
          <span className="cur">$</span>{Math.abs(r.difference).toLocaleString("en-US", { maximumFractionDigits: 0 })}
        </div>
        <dl className="stub-lines money">
          <div className="line"><dt>Est. federal tax</dt><dd>{usd(r.estimatedAnnualTax)}</dd></div>
          <div className="line"><dt>You'll withhold</dt><dd>{usd(r.annualWithheld)}</dd></div>
          {owe && <div className="line take"><dt>Add per paycheck (W-4 line 4c)</dt><dd>{usd(r.suggestedExtraPerPaycheck)}</dd></div>}
        </dl>
        <p className="disclaimer">
          Federal income tax only, standard deduction, no credits. A rough W-4 gut-check,
          not the official IRS estimator.
        </p>
      </aside>
    </div>
  );
}
