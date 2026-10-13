"use client";

import { useMemo, useState } from "react";
import type { FederalConfig, FilingStatus, StateConfig } from "@/lib/engine/types";
import { overtimePay, weeklyPayTaxes, type WeeklyStateTax } from "@/lib/engine/tax";
import { usd2, usd } from "@/lib/format";

const FILING: { v: FilingStatus; label: string }[] = [
  { v: "single", label: "Single" },
  { v: "married_jointly", label: "Married, jointly" },
  { v: "married_separately", label: "Married, separately" },
  { v: "head_of_household", label: "Head of household" },
];

type StateMode = "none" | "ca" | "rate";

export function OvertimeCalculator({ federal, ca }: { federal: FederalConfig; ca: StateConfig }) {
  const [rate, setRate] = useState(22);
  const [regHours, setRegHours] = useState(40);
  const [otHours, setOtHours] = useState(8);
  const [mult, setMult] = useState(1.5);
  const [filing, setFiling] = useState<FilingStatus>("single");
  const [stateMode, setStateMode] = useState<StateMode>("none");
  const [stateRate, setStateRate] = useState(5);

  const r = useMemo(() => overtimePay(rate, regHours, otHours, mult), [rate, regHours, otHours, mult]);
  const st = useMemo<WeeklyStateTax>(
    () => (stateMode === "ca" ? { kind: "state", state: ca } : stateMode === "rate" ? { kind: "rate", pct: stateRate } : { kind: "none" }),
    [stateMode, stateRate, ca],
  );
  const t = useMemo(() => weeklyPayTaxes(r.total, filing, federal, st), [r.total, filing, federal, st]);
  const base = useMemo(() => weeklyPayTaxes(r.regularPay, filing, federal, st), [r.regularPay, filing, federal, st]);
  const otKept = t.net - base.net;

  return (
    <div className="calc">
      <div className="calc-inputs">
        <label className="field"><span>Hourly rate</span>
          <div className="money-input"><span aria-hidden>$</span>
            <input type="number" min={0} step={0.25} value={rate} onChange={(e) => setRate(Math.max(0, Number(e.target.value) || 0))} />
          </div>
        </label>
        <label className="field"><span>Regular hours (this week)</span>
          <input type="number" min={0} max={168} value={regHours} onChange={(e) => setRegHours(Math.max(0, Number(e.target.value) || 0))} />
        </label>
        <label className="field"><span>Overtime hours</span>
          <input type="number" min={0} max={168} value={otHours} onChange={(e) => setOtHours(Math.max(0, Number(e.target.value) || 0))} />
        </label>
        <label className="field"><span>Overtime multiplier</span>
          <select value={mult} onChange={(e) => setMult(Number(e.target.value))}>
            <option value={1.5}>1.5× (time and a half)</option>
            <option value={2}>2× (double time)</option>
          </select>
        </label>
        <label className="field"><span>Filing status</span>
          <select value={filing} onChange={(e) => setFiling(e.target.value as FilingStatus)}>
            {FILING.map((f) => <option key={f.v} value={f.v}>{f.label}</option>)}
          </select>
        </label>
        <label className="field"><span>State</span>
          <select value={stateMode} onChange={(e) => setStateMode(e.target.value as StateMode)}>
            <option value="none">No state income tax (TX, FL, WA, TN, NV, SD, WY, AK, NH)</option>
            <option value="ca">California</option>
            <option value="rate">Another state — enter a rate</option>
          </select>
        </label>
        {stateMode === "rate" && (
          <label className="field"><span>State income tax rate <em>(% of pay, a rough average is fine)</em></span>
            <input type="number" min={0} step={0.1} value={stateRate}
              onChange={(e) => setStateRate(Math.max(0, Number(e.target.value) || 0))} />
          </label>
        )}
        {stateMode === "ca" && (
          <p style={{ fontSize: "0.9rem", color: "var(--slate)" }}>
            Working in California? Overtime there also kicks in after 8 hours in a day. The{" "}
            <a href="/overtime-calculator/california/">California overtime calculator</a> takes
            your hours day by day.
          </p>
        )}
      </div>
      <aside className="stub calc-result" aria-live="polite">
        <div className="stub-head"><span>TAKE-HOME THIS WEEK</span><span>{regHours + otHours}h</span></div>
        <div className="headline-num money"><span className="cur">$</span>{t.net.toLocaleString("en-US", { maximumFractionDigits: 0 })}</div>
        <dl className="stub-lines money">
          <div className="line"><dt>Regular pay</dt><dd>{usd2(r.regularPay)}</dd></div>
          <div className="line"><dt>Overtime pay</dt><dd>{usd2(r.overtimePay)}</dd></div>
          <div className="line"><dt>Gross</dt><dd>{usd2(r.total)}</dd></div>
          <div className="line"><dt>Federal income tax</dt><dd>−{usd2(t.federal)}</dd></div>
          <div className="line"><dt>Social Security</dt><dd>−{usd2(t.socialSecurity)}</dd></div>
          <div className="line"><dt>Medicare</dt><dd>−{usd2(t.medicare)}</dd></div>
          {t.state > 0 && <div className="line"><dt>State income tax</dt><dd>−{usd2(t.state)}</dd></div>}
          {t.statePayroll > 0 && <div className="line"><dt>CA SDI (1.3%)</dt><dd>−{usd2(t.statePayroll)}</dd></div>}
          <div className="line take"><dt>Take-home</dt><dd>{usd2(t.net)}</dd></div>
        </dl>
        <div className="rate-note money">
          Of {usd2(r.overtimePay)} in overtime, about {usd2(otKept)} reaches you · effective hourly {usd2(r.effectiveHourly)} gross · ~{usd(r.total * 52)}/yr at this pace
        </div>
        <p className="disclaimer">
          Withholding estimate for {federal.taxYear}, as if every week looked like this one. Assumes a
          W-4 with no adjustments and no pre-tax deductions. The extra half of FLSA overtime may be
          deductible when you file: <a href="/no-tax-on-overtime-calculator/">see what it saves</a>.
        </p>
      </aside>
    </div>
  );
}
