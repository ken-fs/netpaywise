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
}

export const PERIODS_PER_YEAR: Record<PayFrequency, number> = {
  annual: 1,
  monthly: 12,
  semimonthly: 24,
  biweekly: 26,
  weekly: 52,
};
