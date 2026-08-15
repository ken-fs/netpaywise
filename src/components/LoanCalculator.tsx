"use client";

import { useMemo, useState } from "react";
import { computeLoan, comparePayoff } from "@/lib/engine/loan";
import { usd, usd2 } from "@/lib/format";

export function LoanCalculator({
  defaultPrincipal = 250000,
  defaultRate = 6.5,
  defaultYears = 30,
}: {
  defaultPrincipal?: number;
  defaultRate?: number;
  defaultYears?: number;
}) {
  const [principal, setPrincipal] = useState(defaultPrincipal);
  const [rate, setRate] = useState(defaultRate);
  const [years, setYears] = useState(defaultYears);
  const [extra, setExtra] = useState(0);

  const months = Math.round(years * 12);
  const loan = useMemo(() => computeLoan(principal, rate, months, extra), [principal, rate, months, extra]);
  const payoff = useMemo(
    () => (extra > 0 ? comparePayoff(principal, rate, months, extra) : null),
    [principal, rate, months, extra],
  );

  return (
    <div className="calc">
      <div className="calc-inputs">
        <label className="field">
          <span>Loan amount</span>
          <div className="money-input"><span aria-hidden>$</span>
            <input type="number" min={0} inputMode="decimal" value={principal}
              onChange={(e) => setPrincipal(Math.max(0, Number(e.target.value) || 0))} />
          </div>
        </label>
        <label className="field">
          <span>Interest rate <em>(APR %)</em></span>
          <input type="number" min={0} step={0.1} inputMode="decimal" value={rate}
            onChange={(e) => setRate(Math.max(0, Number(e.target.value) || 0))} />
        </label>
        <label className="field">
          <span>Term <em>(years)</em></span>
          <input type="number" min={1} max={50} value={years}
            onChange={(e) => setYears(Math.min(50, Math.max(1, Number(e.target.value) || 1)))} />
        </label>
        <label className="field">
          <span>Extra monthly payment <em>(optional)</em></span>
          <div className="money-input"><span aria-hidden>$</span>
            <input type="number" min={0} inputMode="decimal" value={extra}
              onChange={(e) => setExtra(Math.max(0, Number(e.target.value) || 0))} />
          </div>
        </label>
      </div>

      <aside className="stub calc-result" aria-live="polite">
        <div className="label">Monthly payment</div>
        <div className="headline-num money">
          <span className="cur">$</span>
          {loan.monthlyPayment.toLocaleString("en-US", { maximumFractionDigits: 0 })}
          <span className="per"> / month</span>
        </div>
        <div className="legend money" style={{ marginTop: 16 }}>
          <div className="row"><span>Total interest</span><span>{usd(loan.totalInterest)}</span></div>
          <div className="row"><span>Total paid</span><span>{usd(loan.totalPaid)}</span></div>
          <div className="row"><span>Payments</span><span>{loan.schedule.length} mo</span></div>
          <div className="row"><span>Base payment</span><span>{usd2(loan.monthlyPayment)}</span></div>
        </div>
        {payoff && payoff.monthsSaved > 0 && (
          <div className="rate-note money">
            Paying ${extra}/mo extra clears it {payoff.monthsSaved} months early and saves{" "}
            {usd(payoff.interestSaved)} in interest.
          </div>
        )}
        <p className="disclaimer">Estimate. Assumes a fixed rate and equal monthly payments.</p>
      </aside>
    </div>
  );
}
