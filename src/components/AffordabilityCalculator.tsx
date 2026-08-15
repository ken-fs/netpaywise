"use client";

import { useMemo, useState } from "react";
import { affordability } from "@/lib/engine/loan";
import { usd } from "@/lib/format";

export function AffordabilityCalculator() {
  const [income, setIncome] = useState(90000);
  const [debts, setDebts] = useState(500);
  const [down, setDown] = useState(40000);
  const [rate, setRate] = useState(6.5);
  const [years, setYears] = useState(30);

  const r = useMemo(
    () => affordability(income, debts, down, rate, years),
    [income, debts, down, rate, years],
  );

  return (
    <div className="calc">
      <div className="calc-inputs">
        <label className="field"><span>Annual household income</span>
          <div className="money-input"><span aria-hidden>$</span>
            <input type="number" min={0} value={income} onChange={(e) => setIncome(Math.max(0, Number(e.target.value) || 0))} />
          </div>
        </label>
        <label className="field"><span>Other monthly debt <em>(cards, car, loans)</em></span>
          <div className="money-input"><span aria-hidden>$</span>
            <input type="number" min={0} value={debts} onChange={(e) => setDebts(Math.max(0, Number(e.target.value) || 0))} />
          </div>
        </label>
        <label className="field"><span>Down payment</span>
          <div className="money-input"><span aria-hidden>$</span>
            <input type="number" min={0} value={down} onChange={(e) => setDown(Math.max(0, Number(e.target.value) || 0))} />
          </div>
        </label>
        <label className="field"><span>Interest rate <em>(%)</em></span>
          <input type="number" min={0} step={0.1} value={rate} onChange={(e) => setRate(Math.max(0, Number(e.target.value) || 0))} />
        </label>
        <label className="field"><span>Term <em>(years)</em></span>
          <input type="number" min={1} max={40} value={years} onChange={(e) => setYears(Math.min(40, Math.max(1, Number(e.target.value) || 1)))} />
        </label>
      </div>
      <aside className="stub calc-result" aria-live="polite">
        <div className="stub-head"><span>HOME PRICE · MAX</span><span>28/36 rule</span></div>
        <div className="headline-num money"><span className="cur">$</span>{r.maxHomePrice.toLocaleString("en-US", { maximumFractionDigits: 0 })}</div>
        <dl className="stub-lines money">
          <div className="line"><dt>Max loan</dt><dd>{usd(r.maxLoan)}</dd></div>
          <div className="line"><dt>+ your down payment</dt><dd>{usd(down)}</dd></div>
          <div className="line take"><dt>Comfortable payment</dt><dd>{usd(r.maxMonthlyPayment)}/mo</dd></div>
        </dl>
        <p className="disclaimer">
          Principal + interest budget only. Property tax, insurance, and PMI will lower the
          real number. A guide, not a pre-approval.
        </p>
      </aside>
    </div>
  );
}
