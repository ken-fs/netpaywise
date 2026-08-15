/**
 * Generates remaining state tax config files (best-effort 2024/2025 values).
 * ALL emitted with verified:false — MUST be checked against each state's DoR before launch.
 * Progressive brackets are single-filer; MFJ approximated via bracketFallback:"single".
 * Run: node scripts/gen-states.mjs
 */
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const OUT = resolve(process.cwd(), "data/tax/us/2026/states");
const B = (upTo, rate) => ({ upTo, rate });
const top = null;

// Flat-rate states: [abbr, name, rate, stdDed(single), note?]
const flat = [
  ["AZ", "Arizona", 0.025, 14600],
  ["CO", "Colorado", 0.044, 14600],
  ["ID", "Idaho", 0.05695, 14600],
  ["IN", "Indiana", 0.03, 0, "Plus county income tax (not included)."],
  ["IA", "Iowa", 0.038, 0, "Iowa moved to a flat 3.8% for 2025."],
  ["KY", "Kentucky", 0.04, 0],
  ["LA", "Louisiana", 0.03, 12500, "Louisiana enacted a flat 3% effective 2025."],
  ["MI", "Michigan", 0.0425, 0, "Plus some city income taxes (not included)."],
  ["MS", "Mississippi", 0.044, 0, "Applies to taxable income over ~$10,000."],
  ["UT", "Utah", 0.0455, 0, "Utah uses a taxpayer credit rather than a standard deduction."],
];

// Progressive states: [abbr, name, brackets(single), stdDed(single), note?]
const prog = [
  ["AL", "Alabama", [B(500,0.02),B(3000,0.04),B(top,0.05)], 3000, "Plus local occupational taxes in some cities."],
  ["AR", "Arkansas", [B(4400,0.02),B(8800,0.04),B(top,0.044)], 2340],
  ["DE", "Delaware", [B(5000,0.022),B(10000,0.039),B(20000,0.048),B(25000,0.052),B(60000,0.0555),B(top,0.066)], 3250, "Wilmington adds a local wage tax (not included)."],
  ["DC", "District of Columbia", [B(10000,0.04),B(40000,0.06),B(60000,0.065),B(250000,0.085),B(500000,0.0925),B(1000000,0.0975),B(top,0.1075)], 14600],
  ["HI", "Hawaii", [B(2400,0.014),B(4800,0.032),B(9600,0.055),B(14400,0.064),B(19200,0.068),B(24000,0.072),B(36000,0.076),B(48000,0.079),B(150000,0.0825),B(175000,0.09),B(200000,0.10),B(top,0.11)], 4400],
  ["ID_SKIP", "", [], 0], // Idaho is flat; skip
  ["KS", "Kansas", [B(23000,0.052),B(top,0.0558)], 3605],
  ["ME", "Maine", [B(26050,0.058),B(61600,0.0675),B(top,0.0715)], 14600],
  ["MD", "Maryland", [B(1000,0.02),B(2000,0.03),B(3000,0.04),B(100000,0.0475),B(125000,0.05),B(150000,0.0525),B(250000,0.055),B(top,0.0575)], 2700, "Plus county income taxes ~2.25–3.2% (not included)."],
  ["MA", "Massachusetts", [B(1000000,0.05),B(top,0.09)], 0, "Flat 5% plus a 4% surtax over $1M."],
  ["MN", "Minnesota", [B(31690,0.0535),B(104090,0.068),B(193240,0.0785),B(top,0.0985)], 14575],
  ["MO", "Missouri", [B(1273,0),B(2546,0.02),B(3819,0.025),B(5092,0.03),B(6365,0.035),B(7638,0.04),B(8911,0.045),B(top,0.048)], 14600],
  ["MT", "Montana", [B(20500,0.047),B(top,0.059)], 14600],
  ["NE", "Nebraska", [B(3700,0.0246),B(22170,0.0351),B(35730,0.0501),B(top,0.0584)], 7900],
  ["NJ", "New Jersey", [B(20000,0.014),B(35000,0.0175),B(40000,0.035),B(75000,0.05525),B(500000,0.0637),B(1000000,0.0897),B(top,0.1075)], 0],
  ["NM", "New Mexico", [B(5500,0.017),B(11000,0.032),B(16000,0.047),B(210000,0.049),B(top,0.059)], 14600],
  ["ND", "North Dakota", [B(47150,0),B(238200,0.0195),B(top,0.025)], 14600],
  ["OK", "Oklahoma", [B(1000,0.0025),B(2500,0.0075),B(3750,0.0175),B(4900,0.0275),B(7200,0.0375),B(top,0.0475)], 6350],
  ["OR", "Oregon", [B(4300,0.0475),B(10750,0.0675),B(125000,0.0875),B(top,0.099)], 2745, "Excludes local transit taxes."],
  ["RI", "Rhode Island", [B(77450,0.0375),B(176050,0.0475),B(top,0.0599)], 10550],
  ["SC", "South Carolina", [B(3460,0),B(17330,0.03),B(top,0.064)], 14600],
  ["VT", "Vermont", [B(45400,0.0335),B(110050,0.066),B(229550,0.076),B(top,0.0875)], 14600],
  ["WV", "West Virginia", [B(10000,0.0236),B(25000,0.0315),B(40000,0.0354),B(60000,0.0472),B(top,0.0512)], 0],
];

let n = 0;
for (const [abbr, name, rate, std, note] of flat) {
  const obj = {
    _comment: `${name} flat income tax — best-effort 2024/2025. VERIFY vs state DoR for 2026.` + (note ? " " + note : ""),
    state: abbr, name, taxYear: 2026, verified: false,
    type: "flat", rate,
    standardDeduction: { single: std, married_jointly: std * 2, married_separately: std, head_of_household: std },
  };
  writeFileSync(resolve(OUT, `${abbr.toLowerCase()}.json`), JSON.stringify(obj, null, 2) + "\n");
  n++;
}
for (const [abbr, name, brackets, std, note] of prog) {
  if (abbr.endsWith("_SKIP")) continue;
  const obj = {
    _comment: `${name} progressive income tax — best-effort 2024 single-filer brackets. MFJ approximated via single. VERIFY vs state DoR for 2026.` + (note ? " " + note : ""),
    state: abbr, name, taxYear: 2026, verified: false,
    type: "progressive",
    standardDeduction: { single: std, married_jointly: std * 2, married_separately: std, head_of_household: std },
    brackets: { single: brackets },
    bracketFallback: "single",
  };
  writeFileSync(resolve(OUT, `${abbr.toLowerCase()}.json`), JSON.stringify(obj, null, 2) + "\n");
  n++;
}
console.log(`wrote ${n} state files`);
