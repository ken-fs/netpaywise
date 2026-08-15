import type { MetadataRoute } from "next";
import { statesWithData } from "@/lib/data";

const BASE = "https://netpaywise.com";

const PATHS = [
  "/",
  "/paycheck-calculator/",
  "/income-tax-calculator/",
  "/federal-income-tax-calculator/",
  "/self-employment-tax-calculator/",
  "/sales-tax-calculator/",
  "/reverse-sales-tax-calculator/",
  "/salary-to-hourly/",
  "/overtime-calculator/",
  "/bonus-tax-calculator/",
  "/w4-calculator/",
  "/loan-calculator/",
  "/mortgage-payoff-calculator/",
  "/amortization-calculator/",
  "/auto-loan-calculator/",
  "/mortgage-affordability-calculator/",
  "/about/",
  "/contact/",
  "/privacy/",
  "/terms/",
];

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = PATHS.map((p) => ({ url: `${BASE}${p}`, changeFrequency: "monthly" as const, priority: p === "/" ? 1 : 0.8 }));
  const states = statesWithData().map((s) => ({
    url: `${BASE}/paycheck-calculator/${s.abbr.toLowerCase()}/`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...pages, ...states];
}
