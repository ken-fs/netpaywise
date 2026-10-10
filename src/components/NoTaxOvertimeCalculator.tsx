"use client";

import { useMemo, useState } from "react";
import type { FederalConfig, FilingStatus } from "@/lib/engine/types";
import { noTaxOnOvertime } from "@/lib/engine/tax";
import { usd } from "@/lib/format";

const FILING: { v: FilingStatus; label: string }[] = [
  { v: "single", label: "Single" },
  { v: "married_jointly", label: "Married, jointly" },
  { v: "head_of_household", label: "Head of household" },
  { v: "married_separately", label: "Married, separately (not eligible)" },
];

export function NoTaxOvertimeCalculator({ federal }: { federal: FederalConfig }) {
  const [rate, setRate] = useState(25);
  const [regHours, setRegHours] = useState(40);
  const [otHours, setOtHours] = useState(8);
  const [otWeeks, setOtWeeks] = useState(50);
  const [filing, setFiling] = useState<FilingStatus>("single");
  const [otherIncome, setOtherIncome] = useState(0);

  const regularPay = rate * regHours * 52;
  const overtimePay = rate * 1.5 * otHours * otWeeks;
  const premium = rate * 0.5 * otHours * otWeeks;
  const magi = regularPay + overtimePay + otherIncome;

  const r = useMemo(() => noTaxOnOvertime(premium, magi, filing, federal), [premium, magi, filing, federal]);
  const od = federal.overtimeDeduction;

  return (
    <div className="calc">
      <div className="calc-inputs">
        <label className="field"><span>Hourly rate</span>
          <div className="money-input"><span aria-hidden>$</span>
            <input type="number" min={0} step={0.25} inputMode="decimal" value={rate}
              onChange={(e) => setRate(Math.max(0, Number(e.target.value) || 0))} />
          </div>
        </label>
        <label className="field"><span>Regular hours per week</span>
          <input type="number" min={0} max={40} value={regHours}
            onChange={(e) => setRegHours(Math.min(40, Math.max(0, Number(e.target.value) || 0)))} />
        </label>
        <label className="field"><span>Overtime hours per week <em>(over 40)</em></span>
          <input type="number" min={0} max={128} value={otHours}
            onChange={(e) => setOtHours(Math.max(0, Number(e.target.value) || 0))} />
        </label>
        <label className="field"><span>Weeks with overtime this year</span>
          <input type="number" min={0} max={52} value={otWeeks}
            onChange={(e) => setOtWeeks(Math.min(52, Math.max(0, Number(e.target.value) || 0)))} />
        </label>
        <label className="field"><span>Filing status</span>
          <select value={filing} onChange={(e) => setFiling(e.target.value as FilingStatus)}>
            {FILING.map((f) => <option key={f.v} value={f.v}>{f.label}</option>)}
          </select>
        </label>
        <label className="field"><span>Other household income <em>(spouse&apos;s pay, side work — yearly)</em></span>
          <div className="money-input"><span aria-hidden>$</span>
            <input type="number" min={0} inputMode="decimal" value={otherIncome}
              onChange={(e) => setOtherIncome(Math.max(0, Number(e.target.value) || 0))} />
          </div>
        </label>
      </div>

      <aside className="stub calc-result" aria-live="polite">
        <div className="stub-head"><span>FEDERAL TAX YOU SAVE</span><span>{federal.taxYear}</span></div>
        <div className="headline-num money">
          <span className="cur">$</span>
          {r.taxSaved.toLocaleString("en-US", { maximumFractionDigits: 0 })}
        </div>
        <dl className="stub-lines money">
          <div className="line"><dt>Overtime pay this year</dt><dd>{usd(overtimePay)}</dd></div>
          <div className="line"><dt>Qualified part (the extra half)</dt><dd>{usd(r.qualifiedOvertime)}</dd></div>
          <div className="line"><dt>Your deduction</dt><dd>{usd(r.deduction)}</dd></div>
          <div className="line"><dt>Income tax without it</dt><dd>{usd(r.taxWithout)}</dd></div>
          <div className="line take"><dt>Income tax with it</dt><dd>{usd(r.taxWith)}</dd></div>
        </dl>
        <div className="rate-note money">
          {filing === "married_separately"
            ? "Married couples have to file jointly to claim this deduction."
            : `Put ${usd(r.deduction)} in the W-4 Step 4(b) deductions worksheet to get it in your paychecks now.`}
        </div>
        <p className="disclaimer">
          Federal income tax only. Social Security and Medicare still apply to all overtime. Only
          overtime the FLSA requires counts, capped at {usd(od.cap.single)} ({usd(od.cap.married_jointly)} joint),
          {" "}{od.firstYear}–{od.lastYear}. Assumes the standard deduction. Estimate, not tax advice.
        </p>
      </aside>
    </div>
  );
}
