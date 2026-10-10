"use client";

import { useMemo, useState } from "react";
import { hourlyToAnnual, annualToHourly } from "@/lib/engine/tax";
import { usd, usd2 } from "@/lib/format";

export function SalaryHourlyCalculator({
  defaultMode = "toHourly",
  defaultValue,
}: { defaultMode?: "toHourly" | "toSalary"; defaultValue?: number } = {}) {
  const [mode, setMode] = useState<"toHourly" | "toSalary">(defaultMode);
  const [value, setValue] = useState(defaultValue ?? (defaultMode === "toHourly" ? 65000 : 31));
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [weeks, setWeeks] = useState(52);

  const out = useMemo(() => {
    if (mode === "toHourly") return annualToHourly(value, hoursPerWeek, weeks);
    return hourlyToAnnual(value, hoursPerWeek, weeks);
  }, [mode, value, hoursPerWeek, weeks]);

  return (
    <div className="calc">
      <div className="calc-inputs">
        <div className="seg" role="tablist" aria-label="Convert direction">
          <button role="tab" aria-selected={mode === "toHourly"} className={mode === "toHourly" ? "on" : ""} onClick={() => { setMode("toHourly"); setValue(65000); }}>Salary → hourly</button>
          <button role="tab" aria-selected={mode === "toSalary"} className={mode === "toSalary" ? "on" : ""} onClick={() => { setMode("toSalary"); setValue(31); }}>Hourly → salary</button>
        </div>
        <label className="field">
          <span>{mode === "toHourly" ? "Annual salary" : "Hourly rate"}</span>
          <div className="money-input"><span aria-hidden>$</span>
            <input type="number" min={0} inputMode="decimal" value={value}
              onChange={(e) => setValue(Math.max(0, Number(e.target.value) || 0))} />
          </div>
        </label>
        <label className="field">
          <span>Hours per week</span>
          <input type="number" min={1} max={168} value={hoursPerWeek}
            onChange={(e) => setHoursPerWeek(Math.min(168, Math.max(1, Number(e.target.value) || 1)))} />
        </label>
        <label className="field">
          <span>Weeks per year</span>
          <input type="number" min={1} max={52} value={weeks}
            onChange={(e) => setWeeks(Math.min(52, Math.max(1, Number(e.target.value) || 1)))} />
        </label>
      </div>

      <aside className="stub calc-result" aria-live="polite">
        <div className="stub-head"><span>{mode === "toHourly" ? "HOURLY RATE" : "ANNUAL SALARY"}</span><span>{hoursPerWeek}h × {weeks}wk</span></div>
        <div className="headline-num money">
          <span className="cur">$</span>
          {mode === "toHourly" ? out.toFixed(2) : out.toLocaleString("en-US", { maximumFractionDigits: 0 })}
          <span className="per"> / {mode === "toHourly" ? "hour" : "year"}</span>
        </div>
        <div className="rate-note money">
          {mode === "toHourly"
            ? `${usd(value)}/yr = ${usd2(out)}/hr`
            : `${usd2(value)}/hr = ${usd(out)}/yr`}
        </div>
        <p className="disclaimer">Gross pay. Before taxes and deductions.</p>
      </aside>
    </div>
  );
}
