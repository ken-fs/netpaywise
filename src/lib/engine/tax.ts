/**
 * US paycheck / income-tax engine — pure functions driven entirely by JSON config
 * (see /data/tax/us/<year>/). Logic here is stable across years; only data changes.
 *
 * Estimates only, not tax advice (YMYL disclaimer required on every UI surface).
 */
import type {
  Bracket,
  FederalConfig,
  FilingStatus,
  PayFrequency,
  StateConfig,
} from "./types";
import { PERIODS_PER_YEAR } from "./types";

const round2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

/** Progressive tax over a bracket table. Brackets must be ordered ascending. */
export function taxFromBrackets(taxable: number, brackets: Bracket[]): number {
  if (taxable <= 0) return 0;
  let tax = 0;
  let lower = 0;
  for (const b of brackets) {
    const upper = b.upTo ?? Infinity;
    if (taxable > lower) {
      const slice = Math.min(taxable, upper) - lower;
      tax += slice * b.rate;
    }
    lower = upper;
    if (taxable <= upper) break;
  }
  return round2(tax);
}

export function federalIncomeTax(
  grossAnnual: number,
  filingStatus: FilingStatus,
  preTaxDeductions: number,
  cfg: FederalConfig,
): { taxableIncome: number; tax: number } {
  const std = cfg.standardDeduction[filingStatus];
  const taxableIncome = Math.max(0, grossAnnual - preTaxDeductions - std);
  return { taxableIncome, tax: taxFromBrackets(taxableIncome, cfg.brackets[filingStatus]) };
}

export function fica(
  grossAnnual: number,
  filingStatus: FilingStatus,
  cfg: FederalConfig,
): { socialSecurity: number; medicare: number; total: number } {
  const ss = cfg.fica.socialSecurity;
  const med = cfg.fica.medicare;
  const socialSecurity = round2(Math.min(grossAnnual, ss.wageBase) * ss.rate);
  let medicare = grossAnnual * med.rate;
  const threshold = med.additionalThreshold[filingStatus];
  if (grossAnnual > threshold) {
    medicare += (grossAnnual - threshold) * med.additionalRate;
  }
  medicare = round2(medicare);
  return { socialSecurity, medicare, total: round2(socialSecurity + medicare) };
}

export function stateIncomeTax(
  grossAnnual: number,
  filingStatus: FilingStatus,
  preTaxDeductions: number,
  state: StateConfig,
): number {
  if (state.type === "none") return 0;

  const std = state.standardDeduction?.[filingStatus] ?? 0;
  const taxable = Math.max(0, grossAnnual - preTaxDeductions - std);

  if (state.type === "flat") {
    return round2(taxable * (state.rate ?? 0));
  }
  // progressive
  const brackets =
    state.brackets?.[filingStatus] ??
    (state.bracketFallback ? state.brackets?.[state.bracketFallback] : undefined);
  if (!brackets) return 0;
  return taxFromBrackets(taxable, brackets);
}

export interface PaycheckInput {
  grossAnnual: number;
  payFrequency: PayFrequency;
  filingStatus: FilingStatus;
  /** Annual pre-tax deductions (401k, HSA, etc.). */
  preTaxDeductions?: number;
}

export interface PaycheckResult {
  grossAnnual: number;
  federalIncomeTax: number;
  stateIncomeTax: number;
  socialSecurity: number;
  medicare: number;
  totalTax: number;
  takeHomeAnnual: number;
  takeHomePerPeriod: number;
  effectiveTaxRate: number;
}

/** Full take-home breakdown for one job / income. */
export function computePaycheck(
  input: PaycheckInput,
  federal: FederalConfig,
  state: StateConfig,
): PaycheckResult {
  const preTax = input.preTaxDeductions ?? 0;
  const fed = federalIncomeTax(input.grossAnnual, input.filingStatus, preTax, federal);
  const st = stateIncomeTax(input.grossAnnual, input.filingStatus, preTax, state);
  const f = fica(input.grossAnnual, input.filingStatus, federal);

  const totalTax = round2(fed.tax + st + f.total);
  const takeHomeAnnual = round2(input.grossAnnual - preTax - totalTax);
  const periods = PERIODS_PER_YEAR[input.payFrequency];

  return {
    grossAnnual: input.grossAnnual,
    federalIncomeTax: fed.tax,
    stateIncomeTax: st,
    socialSecurity: f.socialSecurity,
    medicare: f.medicare,
    totalTax,
    takeHomeAnnual,
    takeHomePerPeriod: round2(takeHomeAnnual / periods),
    effectiveTaxRate:
      input.grossAnnual > 0 ? round2((totalTax / input.grossAnnual) * 100) : 0,
  };
}

export interface IncomeTaxResult {
  federal: number;
  state: number;
  total: number;
  afterTax: number;
  effectiveRate: number;
}

/** Income tax only (federal + state) — no FICA. For the income-tax calculators. */
export function computeIncomeTax(
  grossAnnual: number,
  filingStatus: FilingStatus,
  preTaxDeductions: number,
  federal: FederalConfig,
  state?: StateConfig,
): IncomeTaxResult {
  const fed = federalIncomeTax(grossAnnual, filingStatus, preTaxDeductions, federal).tax;
  const st = state ? stateIncomeTax(grossAnnual, filingStatus, preTaxDeductions, state) : 0;
  const total = round2(fed + st);
  return {
    federal: fed,
    state: st,
    total,
    afterTax: round2(grossAnnual - preTaxDeductions - total),
    effectiveRate: grossAnnual > 0 ? round2((total / grossAnnual) * 100) : 0,
  };
}

export interface SelfEmploymentResult {
  netProfit: number;
  seTaxableBase: number;
  socialSecurity: number;
  medicare: number;
  seTax: number;
  deductibleHalf: number;
  quarterly: number;
}

/**
 * Self-employment (SE) tax for 1099 income. Rates derived from FICA config
 * (employee + employer halves): 12.4% SS up to the wage base + 2.9% Medicare,
 * plus the 0.9% Additional Medicare Tax above the filing-status threshold.
 */
export function selfEmploymentTax(
  netProfit: number,
  federal: FederalConfig,
  filingStatus: FilingStatus = "single",
): SelfEmploymentResult {
  const base = Math.max(0, round2(netProfit * 0.9235));
  const ssRate = federal.fica.socialSecurity.rate * 2; // 12.4%
  const medRate = federal.fica.medicare.rate * 2; // 2.9%
  const socialSecurity = round2(Math.min(base, federal.fica.socialSecurity.wageBase) * ssRate);
  const extraMedicare = Math.max(0, base - federal.fica.medicare.additionalThreshold[filingStatus]) * federal.fica.medicare.additionalRate;
  const medicare = round2(base * medRate + extraMedicare);
  const seTax = round2(socialSecurity + medicare);
  return {
    netProfit,
    seTaxableBase: base,
    socialSecurity,
    medicare,
    seTax,
    // Only the 15.3% part is deductible, not the Additional Medicare Tax.
    deductibleHalf: round2((socialSecurity + base * medRate) / 2),
    quarterly: round2(seTax / 4),
  };
}

/**
 * Section 199A deduction for a sole proprietor with no employees or business property.
 * Full 20% below the threshold; above it the W-2 wage limit is $0, so the deduction
 * phases out linearly and is gone at the end of the phase-in range.
 */
export function qbiDeduction(
  qbi: number,
  taxableBeforeQbi: number,
  filingStatus: FilingStatus,
  federal: FederalConfig,
): number {
  const q = federal.qbi;
  if (qbi <= 0 || taxableBeforeQbi <= 0) return 0;
  const start = q.threshold[filingStatus];
  const end = q.phaseInEnd[filingStatus];
  const kept = taxableBeforeQbi <= start ? 1 : taxableBeforeQbi >= end ? 0 : (end - taxableBeforeQbi) / (end - start);
  let deduction = qbi * q.rate * kept;
  if (qbi >= q.minimumQbi) deduction = Math.max(deduction, q.minimumDeduction);
  return round2(Math.min(deduction, taxableBeforeQbi * q.rate));
}

export interface FreelanceTaxResult {
  se: SelfEmploymentResult;
  qbiDeduction: number;
  taxableIncome: number;
  federalIncomeTax: number;
  totalTax: number;
  keep: number;
  quarterly: number;
  effectiveRate: number;
}

/**
 * Whole federal bill on 1099 income with no other job: SE tax + income tax
 * (after half of SE tax, the standard deduction and the QBI deduction).
 */
export function freelanceTax(
  netProfit: number,
  filingStatus: FilingStatus,
  federal: FederalConfig,
): FreelanceTaxResult {
  const se = selfEmploymentTax(netProfit, federal, filingStatus);
  const agi = Math.max(0, netProfit - se.deductibleHalf);
  const taxableBeforeQbi = Math.max(0, agi - federal.standardDeduction[filingStatus]);
  const qbi = qbiDeduction(netProfit - se.deductibleHalf, taxableBeforeQbi, filingStatus, federal);
  const taxableIncome = round2(Math.max(0, taxableBeforeQbi - qbi));
  const incomeTax = taxFromBrackets(taxableIncome, federal.brackets[filingStatus]);
  const totalTax = round2(se.seTax + incomeTax);
  return {
    se,
    qbiDeduction: qbi,
    taxableIncome,
    federalIncomeTax: incomeTax,
    totalTax,
    keep: round2(netProfit - totalTax),
    quarterly: round2(totalTax / 4),
    effectiveRate: netProfit > 0 ? round2((totalTax / netProfit) * 100) : 0,
  };
}

export interface OvertimeResult {
  regularPay: number;
  overtimePay: number;
  total: number;
  effectiveHourly: number;
}

/** Weekly gross pay with overtime (default time-and-a-half). */
export function overtimePay(
  hourlyRate: number,
  regularHours: number,
  overtimeHours: number,
  otMultiplier = 1.5,
): OvertimeResult {
  const regularPay = round2(hourlyRate * Math.max(0, regularHours));
  const otPay = round2(hourlyRate * otMultiplier * Math.max(0, overtimeHours));
  const total = round2(regularPay + otPay);
  const hours = Math.max(0, regularHours) + Math.max(0, overtimeHours);
  return { regularPay, overtimePay: otPay, total, effectiveHourly: hours > 0 ? round2(total / hours) : 0 };
}

export interface BonusResult {
  bonus: number;
  federal: number;
  socialSecurity: number;
  medicare: number;
  state: number;
  totalWithheld: number;
  net: number;
}

/**
 * After-tax bonus using the IRS supplemental flat method: 22% federal
 * (37% on any portion over $1M) + FICA + an optional flat state rate.
 * Assumes you're under the Social Security wage cap.
 */
export function bonusAfterTax(
  bonus: number,
  federal: FederalConfig,
  stateRatePct = 0,
): BonusResult {
  const b = Math.max(0, bonus);
  const sw = federal.supplementalWithholding;
  const fed = round2(Math.min(b, sw.highThreshold) * sw.rate + Math.max(0, b - sw.highThreshold) * sw.highRate);
  const ss = round2(b * federal.fica.socialSecurity.rate);
  const med = round2(b * federal.fica.medicare.rate);
  const state = round2(b * (stateRatePct / 100));
  const totalWithheld = round2(fed + ss + med + state);
  return { bonus: b, federal: fed, socialSecurity: ss, medicare: med, state, totalWithheld, net: round2(b - totalWithheld) };
}

export interface BonusAggregateResult {
  /** Federal withheld from the regular check alone. */
  regularWithholding: number;
  /** Federal withheld when the bonus rides on the same check. */
  combinedWithholding: number;
  /** The extra federal withholding caused by the bonus. */
  federal: number;
}

/**
 * Aggregate method: the bonus is added to a regular paycheck and the whole check is withheld
 * as if you earned that much every period. Annualized wages minus the standard deduction run
 * through the normal brackets — the IRS percentage method for a W-4 with no adjustments.
 */
export function bonusAggregate(
  bonus: number,
  regularPerPeriod: number,
  periodsPerYear: number,
  filingStatus: FilingStatus,
  federal: FederalConfig,
): BonusAggregateResult {
  const perCheck = (wages: number) => {
    const annual = Math.max(0, wages) * periodsPerYear;
    const taxable = Math.max(0, annual - federal.standardDeduction[filingStatus]);
    return round2(taxFromBrackets(taxable, federal.brackets[filingStatus]) / periodsPerYear);
  };
  const regularWithholding = perCheck(regularPerPeriod);
  const combinedWithholding = perCheck(regularPerPeriod + Math.max(0, bonus));
  return { regularWithholding, combinedWithholding, federal: round2(combinedWithholding - regularWithholding) };
}

export interface WithholdingResult {
  estimatedAnnualTax: number;
  annualWithheld: number;
  difference: number; // positive = refund, negative = you owe
  suggestedExtraPerPaycheck: number;
}

/**
 * W-4 helper: compare estimated annual federal tax to what you're withholding
 * and suggest a per-paycheck adjustment to break even. Federal income tax only.
 */
export function withholdingCheck(
  grossAnnual: number,
  filingStatus: FilingStatus,
  perPaycheckWithholding: number,
  periodsPerYear: number,
  federal: FederalConfig,
): WithholdingResult {
  const estimatedAnnualTax = federalIncomeTax(grossAnnual, filingStatus, 0, federal).tax;
  const annualWithheld = round2(perPaycheckWithholding * periodsPerYear);
  const difference = round2(annualWithheld - estimatedAnnualTax);
  return {
    estimatedAnnualTax,
    annualWithheld,
    difference,
    suggestedExtraPerPaycheck: difference < 0 ? round2(-difference / periodsPerYear) : 0,
  };
}

/** Forward sales tax: price → tax + total. */
export function salesTax(amount: number, ratePct: number) {
  const tax = round2(Math.max(0, amount) * (ratePct / 100));
  return { tax, total: round2(amount + tax) };
}

/** Reverse sales tax: gross total → pre-tax price + tax removed. */
export function reverseSalesTax(total: number, ratePct: number) {
  const pre = round2(total / (1 + ratePct / 100));
  return { preTax: pre, tax: round2(total - pre) };
}

/** Salary ↔ hourly helpers (2080 = 40h × 52wk default full-time year). */
export function hourlyToAnnual(hourlyRate: number, hoursPerWeek = 40, weeksPerYear = 52): number {
  return round2(hourlyRate * hoursPerWeek * weeksPerYear);
}
export function annualToHourly(annual: number, hoursPerWeek = 40, weeksPerYear = 52): number {
  const hours = hoursPerWeek * weeksPerYear;
  return hours > 0 ? round2(annual / hours) : 0;
}
