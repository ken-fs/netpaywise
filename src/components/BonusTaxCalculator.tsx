"use client";

import { useMemo, useState } from "react";
import type { FederalConfig } from "@/lib/engine/types";
import { bonusAfterTax } from "@/lib/engine/tax";
import { usd } from "@/lib/format";

export function BonusTaxCalculator({ federal }: { federal: FederalConfig }) {
  const [bonus, setBonus] = useState(5000);
  const [stateRate, setStateRate] = useState(0);
  const r = useMemo(() => bonusAfterTax(bonus, federal, stateRate), [bonus, stateRate, federal]);

  return (
    <div className="calc">
      <div className="calc-inputs">
        <label className="field"><span>Bonus amount</span>
          <div className="money-input"><span aria-hidden>$</span>
            <input type="number" min={0} value={bonus} onChange={(e) => setBonus(Math.max(0, Number(e.target.value) || 0))} />
          </div>
        </label>
        <label className="field"><span>State supplemental rate <em>(%, optional)</em></span>
          <input type="number" min={0} step={0.1} value={stateRate} onChange={(e) => setStateRate(Math.max(0, Number(e.target.value) || 0))} />
        </label>
        <p style={{ fontSize: "0.9rem", color: "var(--slate)" }}>
          Employers usually withhold bonuses at a flat 22% federal rate, plus FICA. That's
          what this shows — your actual tax is settled when you file.
        </p>
      </div>
      <aside className="stub calc-result" aria-live="polite">
        <div className="stub-head"><span>BONUS · TAKE-HOME</span><span>{federal.taxYear}</span></div>
        <div className="headline-num money"><span className="cur">$</span>{r.net.toLocaleString("en-US", { maximumFractionDigits: 0 })}</div>
        <dl className="stub-lines money">
          <div className="line"><dt>Federal (22%)</dt><dd>−{usd(r.federal)}</dd></div>
          <div className="line"><dt>Social Security</dt><dd>−{usd(r.socialSecurity)}</dd></div>
          <div className="line"><dt>Medicare</dt><dd>−{usd(r.medicare)}</dd></div>
          {r.state > 0 && <div className="line"><dt>State</dt><dd>−{usd(r.state)}</dd></div>}
          <div className="line take"><dt>You keep</dt><dd>{usd(r.net)}</dd></div>
        </dl>
        <p className="disclaimer">Withholding estimate. Final tax depends on your full-year return.</p>
      </aside>
    </div>
  );
}
