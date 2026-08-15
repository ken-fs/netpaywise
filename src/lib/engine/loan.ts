/**
 * Loan / mortgage math — pure, country-agnostic (formulas are universal).
 * All money values are plain numbers in the caller's currency unit.
 */

export interface AmortRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface LoanResult {
  monthlyPayment: number;
  totalPaid: number;
  totalInterest: number;
  schedule: AmortRow[];
}

const round2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

/**
 * Standard fixed-rate amortized monthly payment.
 * @param principal loan amount
 * @param annualRatePct nominal annual interest rate as a percent (e.g. 6.5)
 * @param termMonths number of monthly payments
 */
export function monthlyPayment(
  principal: number,
  annualRatePct: number,
  termMonths: number,
): number {
  if (principal <= 0 || termMonths <= 0) return 0;
  const r = annualRatePct / 100 / 12;
  if (r === 0) return round2(principal / termMonths);
  const factor = Math.pow(1 + r, termMonths);
  return round2((principal * r * factor) / (factor - 1));
}

/**
 * Full loan breakdown with amortization schedule.
 * @param extraMonthly optional extra payment applied to principal each month
 */
export function computeLoan(
  principal: number,
  annualRatePct: number,
  termMonths: number,
  extraMonthly = 0,
): LoanResult {
  const basePayment = monthlyPayment(principal, annualRatePct, termMonths);
  const r = annualRatePct / 100 / 12;
  const schedule: AmortRow[] = [];

  let balance = principal;
  let totalInterest = 0;
  let totalPaid = 0;
  let month = 0;

  // Cap iterations so a bad input can never loop forever.
  const maxMonths = termMonths + 1200;

  while (balance > 0.005 && month < maxMonths) {
    month += 1;
    const interest = round2(balance * r);
    let principalPaid = round2(basePayment + extraMonthly - interest);

    // Final payment: don't overpay past the remaining balance.
    if (principalPaid >= balance) {
      principalPaid = round2(balance);
    }

    const payment = round2(principalPaid + interest);
    balance = round2(balance - principalPaid);
    totalInterest = round2(totalInterest + interest);
    totalPaid = round2(totalPaid + payment);

    schedule.push({ month, payment, principal: principalPaid, interest, balance });
  }

  return { monthlyPayment: basePayment, totalPaid, totalInterest, schedule };
}

/** Invert amortization: the largest loan a given monthly payment can support. */
export function maxLoanFromPayment(
  payment: number,
  annualRatePct: number,
  termMonths: number,
): number {
  if (payment <= 0 || termMonths <= 0) return 0;
  const r = annualRatePct / 100 / 12;
  if (r === 0) return round2(payment * termMonths);
  return round2((payment * (1 - Math.pow(1 + r, -termMonths))) / r);
}

export interface Affordability {
  maxMonthlyPayment: number;
  maxLoan: number;
  maxHomePrice: number;
}

/**
 * How much house you can afford (principal + interest budget only).
 * Uses the lower of a front-end (housing) and back-end (total debt) DTI limit.
 * Excludes property tax, insurance, and PMI — real PITI will be lower.
 */
export function affordability(
  annualIncome: number,
  monthlyDebts: number,
  downPayment: number,
  annualRatePct: number,
  years: number,
  dtiFront = 0.28,
  dtiBack = 0.36,
): Affordability {
  const monthlyIncome = annualIncome / 12;
  const byFront = monthlyIncome * dtiFront;
  const byBack = monthlyIncome * dtiBack - Math.max(0, monthlyDebts);
  const maxMonthlyPayment = Math.max(0, round2(Math.min(byFront, byBack)));
  const maxLoan = maxLoanFromPayment(maxMonthlyPayment, annualRatePct, Math.round(years * 12));
  return {
    maxMonthlyPayment,
    maxLoan,
    maxHomePrice: round2(maxLoan + Math.max(0, downPayment)),
  };
}

export interface PayoffComparison {
  baseline: { months: number; totalInterest: number };
  accelerated: { months: number; totalInterest: number };
  monthsSaved: number;
  interestSaved: number;
}

/** Compare a loan with vs. without an extra monthly principal payment. */
export function comparePayoff(
  principal: number,
  annualRatePct: number,
  termMonths: number,
  extraMonthly: number,
): PayoffComparison {
  const base = computeLoan(principal, annualRatePct, termMonths, 0);
  const fast = computeLoan(principal, annualRatePct, termMonths, extraMonthly);
  return {
    baseline: { months: base.schedule.length, totalInterest: base.totalInterest },
    accelerated: { months: fast.schedule.length, totalInterest: fast.totalInterest },
    monthsSaved: base.schedule.length - fast.schedule.length,
    interestSaved: round2(base.totalInterest - fast.totalInterest),
  };
}
