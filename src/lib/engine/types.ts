export type FilingStatus =
  | "single"
  | "married_jointly"
  | "married_separately"
  | "head_of_household";

export type PayFrequency =
  | "annual"
  | "monthly"
  | "semimonthly"
  | "biweekly"
  | "weekly";

export interface Bracket {
  /** Upper bound of this bracket (inclusive of income up to here); null = top bracket. */
  upTo: number | null;
  rate: number;
}

export interface FederalConfig {
  taxYear: number;
  standardDeduction: Record<FilingStatus, number>;
  brackets: Record<FilingStatus, Bracket[]>;
  fica: {
    socialSecurity: { rate: number; wageBase: number };
    medicare: {
      rate: number;
      additionalRate: number;
      additionalThreshold: Record<FilingStatus, number>;
    };
  };
  /** IRS flat method for bonuses and other supplemental wages. */
  supplementalWithholding: { rate: number; highRate: number; highThreshold: number };
  /** Section 199A qualified business income deduction (self-employed). */
  qbi: {
    rate: number;
    threshold: Record<FilingStatus, number>;
    /** Taxable income where the deduction is fully phased out (no W-2 wages / property). */
    phaseInEnd: Record<FilingStatus, number>;
    minimumDeduction: number;
    minimumQbi: number;
  };
  /** "No tax on overtime" deduction (Schedule 1-A Part III). */
  overtimeDeduction: {
    firstYear: number;
    lastYear: number;
    cap: Record<FilingStatus, number>;
    phaseOutStart: Record<FilingStatus, number>;
    reductionPerThousand: number;
  };
}

export interface StateConfig {
  state: string;
  name: string;
  type: "none" | "flat" | "progressive";
  rate?: number; // for flat
  standardDeduction?: Partial<Record<FilingStatus, number>>;
  brackets?: Partial<Record<FilingStatus, Bracket[]>>;
  /** Filing status whose brackets to reuse when a status is missing. */
  bracketFallback?: FilingStatus;
  /** State-specific facts shown on the state page. */
  notes?: string[];
  /** Employee payroll premiums withheld by the state (e.g. WA Cares, paid leave). */
  payrollTaxes?: { name: string; rate: number; wageBase?: number }[];
  /** Payroll deductions the estimate leaves out, shown next to the result. */
  notIncluded?: string;
}

export const PERIODS_PER_YEAR: Record<PayFrequency, number> = {
  annual: 1,
  monthly: 12,
  semimonthly: 24,
  biweekly: 26,
  weekly: 52,
};
