import type { MetadataRoute } from "next";
import { statesWithData } from "@/lib/data";
import { AMOUNT_PAGES } from "@/lib/amounts";

const BASE = "https://takehomepal.com";

const PATHS = [
  "/",
  "/paycheck-calculator/",
  "/1099-tax-calculator/",
  "/bonus-tax-calculator/",
  "/overtime-calculator/",
  "/no-tax-on-overtime-calculator/",
  "/salary-to-hourly/",
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
  const amounts = AMOUNT_PAGES.map((a) => ({
    url: `${BASE}/salary-to-hourly/${a.slug}/`,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));
  return [...pages, ...states, ...amounts];
}
