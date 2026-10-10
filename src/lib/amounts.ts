/**
 * Salary ↔ hourly amount pages (/salary-to-hourly/<slug>/). Chosen from Google volume
 * (10-keyword-plan-google-2026-10.md §6.3): the 10 biggest "X an hour / X a year" clusters.
 * Experiment: check GSC four weeks after launch before adding more.
 */
export type AmountPage =
  | { kind: "hourly"; slug: string; hourly: number }
  | { kind: "annual"; slug: string; annual: number };

const HOURLY = [20, 25, 30, 35, 40];
const ANNUAL = [50000, 60000, 65000, 70000, 80000];

export const AMOUNT_PAGES: AmountPage[] = [
  ...HOURLY.map((h) => ({ kind: "hourly" as const, slug: `${h}-an-hour`, hourly: h })),
  ...ANNUAL.map((a) => ({ kind: "annual" as const, slug: `${a}-a-year`, annual: a })),
];

export const FULL_TIME_HOURS = 2080; // 40 h × 52 weeks

export function annualOf(p: AmountPage): number {
  return p.kind === "hourly" ? p.hourly * FULL_TIME_HOURS : p.annual;
}

export function labelOf(p: AmountPage): string {
  return p.kind === "hourly" ? `$${p.hourly} an hour` : `$${p.annual.toLocaleString("en-US")} a year`;
}
