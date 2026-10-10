import type { PaycheckResult } from "@/lib/engine/tax";
import { usd } from "@/lib/format";

/** Signature device: gross pay split into take-home + tax segments. Presentational only. */
export function SplitBar({ r }: { r: PaycheckResult }) {
  const g = r.grossAnnual || 1;
  const w = (n: number) => `${(n / g) * 100}%`;
  const fica = r.socialSecurity + r.medicare;
  const state = r.stateIncomeTax + r.statePayroll;

  return (
    <div>
      <div className="split" role="img" aria-label="Pay split into take-home and taxes">
        <span className="s-take" style={{ width: w(r.takeHomeAnnual) }} />
        <span className="s-fed" style={{ width: w(r.federalIncomeTax) }} />
        <span className="s-state" style={{ width: w(state) }} />
        <span className="s-fica" style={{ width: w(fica) }} />
      </div>
      <div className="legend money">
        <div className="row">
          <span><span className="dot" style={{ background: "var(--take)" }} />Take-home</span>
          <span>{usd(r.takeHomeAnnual)}</span>
        </div>
        <div className="row">
          <span><span className="dot" style={{ background: "var(--fed)" }} />Federal</span>
          <span>{usd(r.federalIncomeTax)}</span>
        </div>
        <div className="row">
          <span><span className="dot" style={{ background: "var(--clay)" }} />State</span>
          <span>{usd(state)}</span>
        </div>
        <div className="row">
          <span><span className="dot" style={{ background: "var(--fica)" }} />FICA</span>
          <span>{usd(fica)}</span>
        </div>
      </div>
    </div>
  );
}
