"use client";

import { useMemo, useState } from "react";
import type { CaWithholdingConfig, FederalConfig, FilingStatus } from "@/lib/engine/types";
import { caOvertimeHours, weeklyPayTaxes } from "@/lib/engine/tax";
import { usd2 } from "@/lib/format";

const FILING: { v: FilingStatus; label: string }[] = [
  { v: "single", label: "Single" },
  { v: "married_jointly", label: "Married, jointly" },
  { v: "married_separately", label: "Married, separately" },
  { v: "head_of_household", label: "Head of household" },
];
const DAYS = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];

export function CaOvertimeCalculator({ federal, ca }: { federal: FederalConfig; ca: CaWithholdingConfig }) {
  const [rate, setRate] = useState(24);
  const [days, setDays] = useState([10, 10, 10, 10, 10, 0, 0]);
  const [filing, setFiling] = useState<FilingStatus>("single");

  const h = useMemo(() => caOvertimeHours(days), [days]);
  const pay = {
    regular: rate * h.regular,
    overtime: rate * 1.5 * h.overtime,
    doubleTime: rate * 2 * h.doubleTime,
  };
  const gross = pay.regular + pay.overtime + pay.doubleTime;
  const t = useMemo(() => weeklyPayTaxes(gross, filing, federal, { kind: "ca", cfg: ca }), [gross, filing, federal, ca]);
  const totalHours = days.reduce((a, b) => a + b, 0);
  const setDay = (i: number, v: number) => setDays((d) => d.map((x, j) => (j === i ? Math.min(24, Math.max(0, v)) : x)));

  return (
    <div className="calc">
      <div className="calc-inputs">
        <label className="field"><span>Hourly rate</span>
          <div className="money-input"><span aria-hidden>$</span>
            <input type="number" min={0} step={0.25} value={rate} onChange={(e) => setRate(Math.max(0, Number(e.target.value) || 0))} />
          </div>
        </label>
        <fieldset className="field days">
          <span>Hours worked each day <em>(one workweek, in order)</em></span>
          <div className="days-grid">
            {DAYS.map((d, i) => (
              <label key={d}><small>{d}</small>
                <input type="number" min={0} max={24} step={0.25} value={days[i]} aria-label={`${d} hours`}
                  onChange={(e) => setDay(i, Number(e.target.value) || 0)} />
              </label>
            ))}
          </div>
        </fieldset>
        <label className="field"><span>Filing status</span>
          <select value={filing} onChange={(e) => setFiling(e.target.value as FilingStatus)}>
            {FILING.map((f) => <option key={f.v} value={f.v}>{f.label}</option>)}
          </select>
        </label>
        <p style={{ fontSize: "0.9rem", color: "var(--slate)" }}>
          {h.seventhDay
            ? "You worked all seven days, so day 7 pays 1.5× for the first 8 hours and 2× after that."
            : "Over 8 hours in a day or 40 in the week pays 1.5×. Over 12 in a day pays 2×."}
        </p>
      </div>
      <aside className="stub calc-result" aria-live="polite">
        <div className="stub-head"><span>CA TAKE-HOME THIS WEEK</span><span>{totalHours}h</span></div>
        <div className="headline-num money"><span className="cur">$</span>{t.net.toLocaleString("en-US", { maximumFractionDigits: 0 })}</div>
        <dl className="stub-lines money">
          <div className="line"><dt>Regular · {h.regular}h</dt><dd>{usd2(pay.regular)}</dd></div>
          <div className="line"><dt>Overtime 1.5× · {h.overtime}h</dt><dd>{usd2(pay.overtime)}</dd></div>
          <div className="line"><dt>Double time 2× · {h.doubleTime}h</dt><dd>{usd2(pay.doubleTime)}</dd></div>
          <div className="line"><dt>Gross</dt><dd>{usd2(gross)}</dd></div>
          <div className="line"><dt>Federal income tax</dt><dd>−{usd2(t.federal)}</dd></div>
          <div className="line"><dt>Social Security + Medicare</dt><dd>−{usd2(t.socialSecurity + t.medicare)}</dd></div>
          <div className="line"><dt>California income tax</dt><dd>−{usd2(t.state)}</dd></div>
          <div className="line"><dt>CA SDI (1.3%)</dt><dd>−{usd2(t.statePayroll)}</dd></div>
          <div className="line take"><dt>Take-home</dt><dd>{usd2(t.net)}</dd></div>
        </dl>
        <div className="rate-note money">
          Counts for the federal no-tax-on-overtime deduction: {usd2(rate * 0.5 * h.flsaOvertime)} ({h.flsaOvertime}h over 40)
        </div>
        <p className="disclaimer">
          {ca.taxYear} withholding estimate: federal percentage method, California EDD Method B with one
          allowance (two if married), as if every week looked like this one. Doesn&apos;t cover meal or rest
          break premiums, alternative workweek schedules, or exempt jobs.
        </p>
      </aside>
    </div>
  );
}
