"use client";

import { useMemo, useState } from "react";
import { overtimePay } from "@/lib/engine/tax";
import { usd2, usd } from "@/lib/format";

export function OvertimeCalculator() {
  const [rate, setRate] = useState(22);
  const [regHours, setRegHours] = useState(40);
  const [otHours, setOtHours] = useState(8);
  const [mult, setMult] = useState(1.5);
  const r = useMemo(() => overtimePay(rate, regHours, otHours, mult), [rate, regHours, otHours, mult]);

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
      </div>
      <aside className="stub calc-result" aria-live="polite">
        <div className="stub-head"><span>WEEKLY GROSS</span><span>{regHours + otHours}h</span></div>
        <div className="headline-num money"><span className="cur">$</span>{r.total.toLocaleString("en-US", { maximumFractionDigits: 0 })}</div>
        <dl className="stub-lines money">
          <div className="line"><dt>Regular pay</dt><dd>{usd2(r.regularPay)}</dd></div>
          <div className="line"><dt>Overtime pay</dt><dd>{usd2(r.overtimePay)}</dd></div>
          <div className="line take"><dt>Effective hourly</dt><dd>{usd2(r.effectiveHourly)}</dd></div>
        </dl>
        <div className="rate-note money">~{usd(r.total * 52)}/yr at this pace</div>
        <p className="disclaimer">
          Gross pay, before taxes. Overtime rules vary by state and job. The extra half may be
          deductible: <a href="/no-tax-on-overtime-calculator/">see what it saves</a>.
        </p>
      </aside>
    </div>
  );
}
