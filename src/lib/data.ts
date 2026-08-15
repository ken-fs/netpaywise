/** Build-time data loaders (server-only; uses fs). Static export bakes results in. */
import "server-only";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { FederalConfig, StateConfig } from "./engine/types";

const TAX_YEAR = 2026;
const root = (p: string) => resolve(process.cwd(), p);
const readJson = (p: string) => JSON.parse(readFileSync(root(p), "utf8"));

export interface StateMeta {
  abbr: string;
  name: string;
  hasData: boolean;
  priority?: number;
  noIncomeTax?: boolean;
}

export function loadFederal(): FederalConfig {
  return readJson(`data/tax/us/${TAX_YEAR}/federal.json`) as FederalConfig;
}

export function loadStateMeta(): StateMeta[] {
  return (readJson("data/meta/states.json").states as StateMeta[]).slice();
}

/** States that have a verified tax config and can be rendered as pages. */
export function statesWithData(): StateMeta[] {
  return loadStateMeta().filter((s) => s.hasData);
}

export function loadState(abbr: string): StateConfig {
  return readJson(`data/tax/us/${TAX_YEAR}/states/${abbr.toLowerCase()}.json`) as StateConfig;
}

/** All available state configs (only those with data). */
export function loadAllStateConfigs(): StateConfig[] {
  return statesWithData().map((s) => loadState(s.abbr));
}
