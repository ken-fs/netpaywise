"use client";

import { useMemo, useState } from "react";
import type { FederalConfig } from "@/lib/engine/types";
import { selfEmploymentTax } from "@/lib/engine/tax";
import { usd } from "@/lib/format";

export function SETaxCalculator({ federal, defaultProfit = 60000 }: { federal: FederalConfig; defaultProfit?: number }) {
  const [profit, setProfit] = useState(defaultProfit);
  const r = useMemo(() => selfEmploymentTax(profit, federal), [profit, federal]);

  return (
    <div className="calc">
      <div className="calc-inputs">
        <label className="field">
          <span>Net 1099 profit <em>(income − business expenses)</em></span>
          <div className="money-input"><span aria-hidden>$</span>
            <input type="number" min={0} inputMode="decimal" value={profit}
              onChange={(e) => setProfit(Math.max(0, Number(e.target.value) || 0))} />
          </div>
        </label>
        <p style={{ fontSize: "0.9rem", color: "var(--slate)" }}>
          Self-employment tax is Social Security + Medicare for people who work for
          themselves — 15.3% on 92.35% of your net profit.
        </p>
      </div>

      <aside className="stub calc-result" aria-live="polite">
        <div className="stub-head"><span>SELF-EMPLOYMENT TAX</span><span>{federal.taxYear}</span></div>
        <div className="headline-num money">
          <span className="cur">$</span>
          {r.seTax.toLocaleString("en-US", { maximumFractionDigits: 0 })}
        </div>
        <dl className="stub-lines money">
          <div className="line"><dt>Social Security (12.4%)</dt><dd>{usd(r.socialSecurity)}</dd></div>
          <div className="line"><dt>Medicare (2.9%)</dt><dd>{usd(r.medicare)}</dd></div>
          <div className="line"><dt>Deductible half</dt><dd>{usd(r.deductibleHalf)}</dd></div>
          <div className="line take"><dt>Set aside per quarter</dt><dd>{usd(r.quarterly)}</dd></div>
        </dl>
        <p className="disclaimer">
          SE tax only — income tax is separate. Estimate for the {federal.taxYear} tax year.
        </p>
      </aside>
    </div>
  );
}
