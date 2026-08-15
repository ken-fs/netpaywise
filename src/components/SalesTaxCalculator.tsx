"use client";

import { useMemo, useState } from "react";
import { salesTax, reverseSalesTax } from "@/lib/engine/tax";
import { usd2 } from "@/lib/format";

/** mode="forward": price → tax + total. mode="reverse": total → pre-tax price. */
export function SalesTaxCalculator({ mode = "forward" }: { mode?: "forward" | "reverse" }) {
  const [amount, setAmount] = useState(mode === "forward" ? 100 : 108.25);
  const [rate, setRate] = useState(8.25);

  const r = useMemo(
    () => (mode === "forward" ? salesTax(amount, rate) : reverseSalesTax(amount, rate)),
    [amount, rate, mode],
  );

  return (
    <div className="calc">
      <div className="calc-inputs">
        <label className="field">
          <span>{mode === "forward" ? "Price before tax" : "Total paid (with tax)"}</span>
          <div className="money-input"><span aria-hidden>$</span>
            <input type="number" min={0} step={0.01} inputMode="decimal" value={amount}
              onChange={(e) => setAmount(Math.max(0, Number(e.target.value) || 0))} />
          </div>
        </label>
        <label className="field">
          <span>Sales tax rate <em>(%)</em></span>
          <input type="number" min={0} step={0.01} inputMode="decimal" value={rate}
            onChange={(e) => setRate(Math.max(0, Number(e.target.value) || 0))} />
        </label>
      </div>

      <aside className="stub calc-result" aria-live="polite">
        <div className="stub-head"><span>SALES TAX</span><span>{mode === "forward" ? "PRICE → TOTAL" : "TOTAL → PRICE"}</span></div>
        {mode === "forward" ? (
          <>
            <div className="headline-num money"><span className="cur">$</span>{("total" in r ? r.total : 0).toFixed(2)}</div>
            <dl className="stub-lines money">
              <div className="line"><dt>Tax added</dt><dd>{usd2("tax" in r ? r.tax : 0)}</dd></div>
              <div className="line take"><dt>Total to pay</dt><dd>{usd2("total" in r ? r.total : 0)}</dd></div>
            </dl>
          </>
        ) : (
          <>
            <div className="headline-num money"><span className="cur">$</span>{("preTax" in r ? r.preTax : 0).toFixed(2)}</div>
            <dl className="stub-lines money">
              <div className="line"><dt>Tax removed</dt><dd>{usd2("tax" in r ? r.tax : 0)}</dd></div>
              <div className="line take"><dt>Price before tax</dt><dd>{usd2("preTax" in r ? r.preTax : 0)}</dd></div>
            </dl>
          </>
        )}
        <p className="disclaimer">Enter your local combined state + local rate for an exact figure.</p>
      </aside>
    </div>
  );
}
