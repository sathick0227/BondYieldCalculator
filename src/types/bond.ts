export type CouponFrequency = 1 | 2;

export interface BondInput {
  faceValue: number;
  annualCouponRate: number;
  marketPrice: number;
  yearsToMaturity: number;
  frequency: CouponFrequency;
}

export type PriceIndicator = 'Premium' | 'Discount' | 'Par';

export interface CashFlowRow {
  period: number;
  paymentDate: string;
  couponPayment: number;
  cumulativeInterest: number;
  remainingPrincipal: number;
}

export interface BondResult {
  currentYield: number;
  yieldToMaturity: number;
  totalInterestEarned: number;
  priceIndicator: PriceIndicator;
  cashFlowSchedule: CashFlowRow[];
}

export interface BondValidationErrors {
  faceValue?: string;
  annualCouponRate?: string;
  marketPrice?: string;
  yearsToMaturity?: string;
}

export interface BondValidationResult {
  errors: BondValidationErrors;
  isValid: boolean;
}
