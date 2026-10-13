/** Build-time data loaders (server-only; uses fs). Static export bakes results in. */
import "server-only";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { attachCaWithholding } from "./engine/tax";
import type { CaWithholdingConfig, FederalConfig, StateConfig, SupplementalState } from "./engine/types";

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

export function loadFederal(year = TAX_YEAR): FederalConfig {
  return readJson(`data/tax/us/${year}/federal.json`) as FederalConfig;
}

/** States with a state bonus page (verified supplemental withholding rates). */
export function loadSupplementalStates(): SupplementalState[] {
  return readJson(`data/tax/us/${TAX_YEAR}/supplemental-states.json`).states as SupplementalState[];
}

export function loadStateMeta(): StateMeta[] {
  return (readJson("data/meta/states.json").states as StateMeta[]).slice();
}

/** States that have a verified tax config and can be rendered as pages. */
export function statesWithData(): StateMeta[] {
  return loadStateMeta().filter((s) => s.hasData);
}

export function loadState(abbr: string): StateConfig {
  const state = readJson(`data/tax/us/${TAX_YEAR}/states/${abbr.toLowerCase()}.json`) as StateConfig;
  if (state.type === "withholding" && state.withholdingFile) {
    return attachCaWithholding(state, readJson(`data/tax/us/${TAX_YEAR}/${state.withholdingFile}`) as CaWithholdingConfig);
  }
  return state;
}

/** All available state configs (only those with data). */
export function loadAllStateConfigs(): StateConfig[] {
  return statesWithData().map((s) => loadState(s.abbr));
}
