import {BondInput, CouponFrequency} from '../types/bond';

export const DEFAULT_BOND_INPUT: BondInput = {
  faceValue: 1000,
  annualCouponRate: 8,
  marketPrice: 950,
  yearsToMaturity: 5,
  frequency: 2,
};

export const FREQUENCY_OPTIONS: Array<{
  label: string;
  value: CouponFrequency;
}> = [
  {label: 'Annual', value: 1},
  {label: 'Semi-annual', value: 2},
];

export const YTM_MAX_ITERATIONS = 100;
export const YTM_TOLERANCE = 0.000001;
