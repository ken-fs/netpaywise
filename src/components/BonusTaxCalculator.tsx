"use client";

import { useMemo, useState } from "react";
import type { FederalConfig, FilingStatus, PayFrequency } from "@/lib/engine/types";
import { PERIODS_PER_YEAR } from "@/lib/engine/types";
import { bonusAfterTax, bonusAggregate } from "@/lib/engine/tax";
import { usd } from "@/lib/format";

const FILING: { v: FilingStatus; label: string }[] = [
  { v: "single", label: "Single" },
  { v: "married_jointly", label: "Married, jointly" },
  { v: "married_separately", label: "Married, separately" },
  { v: "head_of_household", label: "Head of household" },
];
const FREQ: { v: Exclude<PayFrequency, "annual">; label: string }[] = [
  { v: "weekly", label: "Weekly" },
  { v: "biweekly", label: "Every 2 weeks" },
  { v: "semimonthly", label: "Twice a month" },
  { v: "monthly", label: "Monthly" },
];

type Method = "flat" | "aggregate";

export function BonusTaxCalculator({ federal }: { federal: FederalConfig }) {
  const [bonus, setBonus] = useState(5000);
  const [method, setMethod] = useState<Method>("flat");
  const [salary, setSalary] = useState(65000);
  const [freq, setFreq] = useState<Exclude<PayFrequency, "annual">>("biweekly");
  const [filing, setFiling] = useState<FilingStatus>("single");
  const [stateMode, setStateMode] = useState<"none" | "rate">("none");
  const [stateRate, setStateRate] = useState(0);

  const periods = PERIODS_PER_YEAR[freq];
  const rate = stateMode === "rate" ? stateRate : 0;
  const flat = useMemo(() => bonusAfterTax(bonus, federal, rate), [bonus, federal, rate]);
  const agg = useMemo(
    () => bonusAggregate(bonus, salary / periods, periods, filing, federal),
    [bonus, salary, periods, filing, federal],
  );

  const fed = method === "flat" ? flat.federal : agg.federal;
  const totalWithheld = fed + flat.socialSecurity + flat.medicare + flat.state;
  const net = flat.bonus - totalWithheld;
  const sw = federal.supplementalWithholding;

  return (
    <div className="calc">
      <div className="calc-inputs">
        <label className="field"><span>Bonus amount</span>
          <div className="money-input"><span aria-hidden>$</span>
            <input type="number" min={0} inputMode="decimal" value={bonus}
              onChange={(e) => setBonus(Math.max(0, Number(e.target.value) || 0))} />
          </div>
        </label>

        <div className="seg" role="tablist" aria-label="Withholding method">
          <button role="tab" aria-selected={method === "flat"} className={method === "flat" ? "on" : ""} onClick={() => setMethod("flat")}>Paid separately</button>
          <button role="tab" aria-selected={method === "aggregate"} className={method === "aggregate" ? "on" : ""} onClick={() => setMethod("aggregate")}>Added to a paycheck</button>
        </div>

        {method === "aggregate" && (
          <>
            <label className="field"><span>Annual salary <em>(before the bonus)</em></span>
              <div className="money-input"><span aria-hidden>$</span>
                <input type="number" min={0} inputMode="decimal" value={salary}
                  onChange={(e) => setSalary(Math.max(0, Number(e.target.value) || 0))} />
              </div>
            </label>
            <label className="field"><span>Pay frequency</span>
              <select value={freq} onChange={(e) => setFreq(e.target.value as Exclude<PayFrequency, "annual">)}>
                {FREQ.map((f) => <option key={f.v} value={f.v}>{f.label}</option>)}
              </select>
            </label>
            <label className="field"><span>Filing status on your W-4</span>
              <select value={filing} onChange={(e) => setFiling(e.target.value as FilingStatus)}>
                {FILING.map((f) => <option key={f.v} value={f.v}>{f.label}</option>)}
              </select>
            </label>
          </>
        )}

        <label className="field"><span>State</span>
          <select value={stateMode} onChange={(e) => setStateMode(e.target.value as "none" | "rate")}>
            <option value="none">No state income tax (TX, FL, WA, TN, NV, SD, WY, AK, NH)</option>
            <option value="rate">Another state — enter its bonus rate</option>
          </select>
        </label>
        {stateMode === "rate" && (
          <label className="field"><span>State bonus withholding rate <em>(%)</em></span>
            <input type="number" min={0} step={0.1} value={stateRate}
              onChange={(e) => setStateRate(Math.max(0, Number(e.target.value) || 0))} />
          </label>
        )}

        <p style={{ fontSize: "0.9rem", color: "var(--slate)" }}>
          {method === "flat"
            ? `Paid as its own check, most employers withhold a flat ${sw.rate * 100}% federal (${sw.highRate * 100}% on anything over $1 million), plus Social Security and Medicare.`
            : "Added to a regular paycheck, the whole check is withheld as if you earned that much every pay period, so withholding usually jumps."}
        </p>
      </div>

      <aside className="stub calc-result" aria-live="polite">
        <div className="stub-head"><span>BONUS AFTER TAX</span><span>{federal.taxYear}</span></div>
        <div className="headline-num money"><span className="cur">$</span>{net.toLocaleString("en-US", { maximumFractionDigits: 0 })}</div>
        <dl className="stub-lines money">
          <div className="line"><dt>Federal ({method === "flat" ? `${sw.rate * 100}% flat` : "aggregate"})</dt><dd>−{usd(fed)}</dd></div>
          <div className="line"><dt>Social Security (6.2%)</dt><dd>−{usd(flat.socialSecurity)}</dd></div>
          <div className="line"><dt>Medicare (1.45%)</dt><dd>−{usd(flat.medicare)}</dd></div>
          {flat.state > 0 && <div className="line"><dt>State</dt><dd>−{usd(flat.state)}</dd></div>}
          <div className="line take"><dt>You keep</dt><dd>{usd(net)}</dd></div>
        </dl>
        <div className="rate-note money">
          Flat 22%: {usd(flat.bonus - flat.totalWithheld)} · Aggregate: {usd(flat.bonus - (agg.federal + flat.socialSecurity + flat.medicare + flat.state))}
        </div>
        <p className="disclaimer">
          Withholding estimate for {federal.taxYear}, not your final tax. Assumes you haven&apos;t passed the
          Social Security wage cap this year and a W-4 with no extra adjustments.
        </p>
      </aside>
    </div>
  );
}
