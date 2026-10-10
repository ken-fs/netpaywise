/**
 * Engine correctness tests. Run: pnpm test  (tsx tests/engine.test.ts)
 * Verifies loan math and tax logic against hand-computed known values.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

import { monthlyPayment, computeLoan, comparePayoff, maxLoanFromPayment, affordability } from "../src/lib/engine/loan";
import {
  taxFromBrackets,
  fica,
  stateIncomeTax,
  computePaycheck,
  computeIncomeTax,
  selfEmploymentTax,
  qbiDeduction,
  freelanceTax,
  salesTax,
  reverseSalesTax,
  overtimePay,
  bonusAfterTax,
  bonusAggregate,
  noTaxOnOvertime,
  withholdingCheck,
  hourlyToAnnual,
  annualToHourly,
} from "../src/lib/engine/tax";
import type { FederalConfig, StateConfig } from "../src/lib/engine/types";

const here = dirname(fileURLToPath(import.meta.url));
const load = (p: string) => JSON.parse(readFileSync(resolve(here, "..", p), "utf8"));
const federal = load("data/tax/us/2026/federal.json") as FederalConfig;
const ca = load("data/tax/us/2026/states/ca.json") as StateConfig;
const tx = load("data/tax/us/2026/states/tx.json") as StateConfig;
const va = load("data/tax/us/2026/states/va.json") as StateConfig;
const wa = load("data/tax/us/2026/states/wa.json") as StateConfig;

let passed = 0;
function check(name: string, fn: () => void) {
  fn();
  passed += 1;
  console.log(`  ok  ${name}`);
}
const near = (a: number, b: number, tol = 0.02) =>
  assert.ok(Math.abs(a - b) <= tol, `expected ${a} ≈ ${b} (±${tol})`);

console.log("LOAN");
check("30yr $200k @6% monthly payment ≈ 1199.10", () => {
  near(monthlyPayment(200000, 6, 360), 1199.1, 0.5);
});
check("zero-interest loan splits evenly", () => {
  assert.equal(monthlyPayment(1200, 0, 12), 100);
});
check("amortization pays down to ~0 near term (cent-rounding may add 1 small payment)", () => {
  const r = computeLoan(200000, 6, 360);
  assert.ok(r.schedule.length >= 360 && r.schedule.length <= 362);
  near(r.schedule[r.schedule.length - 1].balance, 0, 0.05);
  assert.ok(r.totalInterest > 0);
});
check("extra payment saves time and interest", () => {
  const c = comparePayoff(200000, 6, 360, 200);
  assert.ok(c.monthsSaved > 0);
  assert.ok(c.interestSaved > 0);
});

console.log("TAX");
check("progressive brackets: single taxable $50k = $5752", () => {
  near(taxFromBrackets(50000, federal.brackets.single), 5752, 0.01);
});
check("2026 tables match Rev. Proc. 2025-32 bracket floors", () => {
  near(taxFromBrackets(105700, federal.brackets.single), 17966);
  near(taxFromBrackets(256225, federal.brackets.single), 58448);
  near(taxFromBrackets(211400, federal.brackets.married_jointly), 35932);
  near(taxFromBrackets(768700, federal.brackets.married_jointly), 206583.5);
  near(taxFromBrackets(105700, federal.brackets.head_of_household), 16155);
  near(taxFromBrackets(640600, federal.brackets.head_of_household), 191171);
  near(taxFromBrackets(384350, federal.brackets.married_separately), 103291.75);
});
check("2026 standard deduction and Social Security wage base", () => {
  assert.equal(federal.standardDeduction.single, 16100);
  assert.equal(federal.standardDeduction.married_jointly, 32200);
  assert.equal(federal.standardDeduction.head_of_household, 24150);
  assert.equal(federal.fica.socialSecurity.wageBase, 184500);
});
check("no tax on zero/negative taxable income", () => {
  assert.equal(taxFromBrackets(0, federal.brackets.single), 0);
  assert.equal(taxFromBrackets(-100, federal.brackets.single), 0);
});
check("FICA on $100k single = SS 6200 + Medicare 1450", () => {
  const f = fica(100000, "single", federal);
  near(f.socialSecurity, 6200);
  near(f.medicare, 1450);
  near(f.total, 7650);
});
check("SS caps at wage base", () => {
  const f = fica(300000, "single", federal);
  near(f.socialSecurity, federal.fica.socialSecurity.wageBase * 0.062);
});
check("additional Medicare over $200k (single)", () => {
  const f = fica(250000, "single", federal);
  // 250000*0.0145 + (250000-200000)*0.009
  near(f.medicare, 250000 * 0.0145 + 50000 * 0.009);
});
check("Texas has no state income tax", () => {
  assert.equal(stateIncomeTax(80000, "single", 0, tx), 0);
});
check("CA + VA progressive state tax > 0 for $80k", () => {
  assert.ok(stateIncomeTax(80000, "single", 0, ca) > 0);
  assert.ok(stateIncomeTax(80000, "single", 0, va) > 0);
});

console.log("PAYCHECK");
check("take-home < gross and breakdown sums to total tax", () => {
  const r = computePaycheck(
    { grossAnnual: 80000, payFrequency: "biweekly", filingStatus: "single" },
    federal,
    va,
  );
  assert.ok(r.takeHomeAnnual < r.grossAnnual && r.takeHomeAnnual > 0);
  near(
    r.federalIncomeTax + r.stateIncomeTax + r.socialSecurity + r.medicare,
    r.totalTax,
  );
  near(r.takeHomePerPeriod, r.takeHomeAnnual / 26, 0.02);
  assert.ok(r.effectiveTaxRate > 0 && r.effectiveTaxRate < 50);
});
check("pre-tax 401k lowers taxable income and total tax", () => {
  const base = computePaycheck(
    { grossAnnual: 80000, payFrequency: "annual", filingStatus: "single" },
    federal,
    tx,
  );
  const with401k = computePaycheck(
    { grossAnnual: 80000, payFrequency: "annual", filingStatus: "single", preTaxDeductions: 10000 },
    federal,
    tx,
  );
  assert.ok(with401k.federalIncomeTax < base.federalIncomeTax);
});

check("Washington: PFML employee share capped at the SS base + WA Cares uncapped", () => {
  const r = computePaycheck({ grossAnnual: 80000, payFrequency: "annual", filingStatus: "single" }, federal, wa);
  // 80,000 × (0.0113 × 0.7143) + 80,000 × 0.0058 = 645.73 + 464 = 1,109.73
  near(r.statePayroll, 1109.73, 0.05);
  assert.equal(r.stateIncomeTax, 0);
  const hi = computePaycheck({ grossAnnual: 300000, payFrequency: "annual", filingStatus: "single" }, federal, wa);
  near(hi.statePayroll, 184500 * 0.0113 * 0.7143 + 300000 * 0.0058, 0.05);
  near(r.takeHomeAnnual, 80000 - r.totalTax, 0.01);
});

console.log("INCOME TAX / 1099 / SALES TAX");
check("income tax = federal + state, no FICA", () => {
  const r = computeIncomeTax(80000, "single", 0, federal, va);
  near(r.federal, taxFromBrackets(80000 - federal.standardDeduction.single, federal.brackets.single));
  near(r.total, r.federal + r.state);
  assert.ok(r.afterTax < 80000 && r.effectiveRate > 0);
});
check("self-employment tax on $100k net ≈ $14,130", () => {
  const r = selfEmploymentTax(100000, federal);
  // base 92,350; SS 92,350*.124=11,451.40; Medicare 92,350*.029=2,678.15; total 14,129.55
  near(r.seTaxableBase, 92350, 0.5);
  near(r.seTax, 14129.55, 0.5);
  near(r.deductibleHalf, r.seTax / 2, 0.01);
  near(r.quarterly, r.seTax / 4, 0.01);
});
check("SE tax adds 0.9% Additional Medicare above the threshold, not deductible", () => {
  const r = selfEmploymentTax(300000, federal, "single");
  // base 277,050; SS capped 184,500*.124 = 22,878; Medicare 277,050*.029 + 77,050*.009 = 8,034.45 + 693.45
  near(r.socialSecurity, 22878, 0.5);
  near(r.medicare, 8727.9, 0.5);
  near(r.deductibleHalf, (22878 + 8034.45) / 2, 0.5);
});
check("QBI: full below threshold, half at midpoint, $400 floor at the end", () => {
  near(qbiDeduction(50000, 100000, "single", federal), 10000);
  near(qbiDeduction(100000, 239250, "single", federal), 10000);
  near(qbiDeduction(100000, 276750, "single", federal), 400);
  near(qbiDeduction(500, 100000, "single", federal), 100);
});
check("1099 total on $60k single ≈ $12,037 ($3,009/quarter)", () => {
  // SE 8,477.73; AGI 55,761.13; taxable before QBI 39,661.13; QBI capped at 20% of that = 7,932.23
  // taxable 31,728.90 → income tax 1,240 + 12% × 19,328.90 = 3,559.47
  const r = freelanceTax(60000, "single", federal);
  near(r.se.seTax, 8477.73, 0.5);
  near(r.qbiDeduction, 7932.23, 0.5);
  near(r.federalIncomeTax, 3559.47, 0.5);
  near(r.totalTax, 12037.2, 1);
  near(r.quarterly, r.totalTax / 4, 0.01);
});
check("sales tax forward + reverse round-trip", () => {
  const f = salesTax(100, 8.25);
  near(f.tax, 8.25);
  near(f.total, 108.25);
  const rev = reverseSalesTax(108.25, 8.25);
  near(rev.preTax, 100, 0.02);
  near(rev.tax, 8.25, 0.02);
});

console.log("OVERTIME / BONUS / W-4 / AFFORDABILITY");
check("overtime: 40h + 10h @1.5x on $20/hr = $1100/wk", () => {
  const r = overtimePay(20, 40, 10, 1.5);
  near(r.regularPay, 800);
  near(r.overtimePay, 300);
  near(r.total, 1100);
});
check("bonus $10k: 22% fed + FICA net", () => {
  const r = bonusAfterTax(10000, federal);
  near(r.federal, 2200);
  near(r.socialSecurity, 620);
  near(r.medicare, 145);
  near(r.net, 10000 - r.totalWithheld);
});
check("aggregate bonus method: $5k on a $2.5k biweekly single check", () => {
  // regular: 65,000 − 16,100 = 48,900 taxable → 5,620 / 26 = 216.15
  // combined: 7,500 × 26 = 195,000 − 16,100 = 178,900 → 17,966 + 24% × 73,200 = 35,534 / 26 = 1,366.69
  const r = bonusAggregate(5000, 2500, 26, "single", federal);
  near(r.regularWithholding, 216.15, 0.01);
  near(r.combinedWithholding, 1366.69, 0.01);
  near(r.federal, 1150.54, 0.02);
});
check("no tax on overtime: $25/hr, 8 OT h × 50 wk, single", () => {
  // premium 0.5 × 25 × 400 = 5,000; wages 52,000 + 15,000 = 67,000
  // taxable 50,900 → 5,800 + 22% × 500 = 5,910; with deduction 45,900 → 1,240 + 12% × 33,500 = 5,260
  const r = noTaxOnOvertime(5000, 67000, "single", federal);
  near(r.deduction, 5000);
  near(r.taxWithout, 5910, 0.01);
  near(r.taxWith, 5260, 0.01);
  near(r.taxSaved, 650, 0.01);
});
check("no tax on overtime: cap, $100 per full $1,000 phase-out, MFS excluded", () => {
  assert.equal(noTaxOnOvertime(20000, 100000, "single", federal).deduction, 12500);
  // MAGI 160,999 → 10 full thousands over → −1,000
  assert.equal(noTaxOnOvertime(20000, 160999, "single", federal).deduction, 11500);
  assert.equal(noTaxOnOvertime(20000, 400000, "single", federal).deduction, 0);
  assert.equal(noTaxOnOvertime(30000, 300500, "married_jointly", federal).deduction, 25000);
  assert.equal(noTaxOnOvertime(5000, 60000, "married_separately", federal).deduction, 0);
});
check("bonus over $1M: 37% on the excess", () => {
  near(bonusAfterTax(1200000, federal).federal, 220000 + 74000);
});
check("withholding: under-withholding suggests extra", () => {
  const r = withholdingCheck(80000, "single", 300, 26, federal);
  assert.ok(r.estimatedAnnualTax > 0);
  if (r.difference < 0) assert.ok(r.suggestedExtraPerPaycheck > 0);
  near(r.annualWithheld, 300 * 26);
});
check("maxLoanFromPayment inverts monthlyPayment", () => {
  const pay = monthlyPayment(200000, 6, 360);
  near(maxLoanFromPayment(pay, 6, 360), 200000, 5);
});
check("affordability returns sane price >= down payment", () => {
  const a = affordability(120000, 500, 40000, 6.5, 30);
  assert.ok(a.maxMonthlyPayment > 0);
  assert.ok(a.maxHomePrice >= 40000);
  assert.ok(a.maxLoan > 0);
});

console.log("SALARY/HOURLY");
check("hourly↔annual round-trip", () => {
  assert.equal(hourlyToAnnual(25), 52000);
  assert.equal(annualToHourly(52000), 25);
});

console.log(`\n${passed} checks passed.`);
