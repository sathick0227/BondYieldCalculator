import {
  BondValidationErrors,
  BondValidationResult,
  CouponFrequency,
} from '../types/bond';

interface BondFormValues {
  faceValue: string;
  annualCouponRate: string;
  marketPrice: string;
  yearsToMaturity: string;
  frequency: CouponFrequency;
}

const isBlank = (value: string) => value.trim().length === 0;
const isPositiveNumber = (value: string) =>
  Number.isFinite(Number(value)) && Number(value) > 0;
const isNonNegativeNumber = (value: string) =>
  Number.isFinite(Number(value)) && Number(value) >= 0;

export const validateBondInput = (
  values: BondFormValues,
): BondValidationResult => {
  const errors: BondValidationErrors = {};

  if (isBlank(values.faceValue)) {
    errors.faceValue = 'Face value is required.';
  } else if (!isPositiveNumber(values.faceValue)) {
    errors.faceValue = 'Face value must be greater than 0.';
  }

  if (isBlank(values.annualCouponRate)) {
    errors.annualCouponRate = 'Coupon rate is required.';
  } else if (!isNonNegativeNumber(values.annualCouponRate)) {
    errors.annualCouponRate = 'Coupon rate cannot be negative.';
  }

  if (isBlank(values.marketPrice)) {
    errors.marketPrice = 'Market price is required.';
  } else if (!isPositiveNumber(values.marketPrice)) {
    errors.marketPrice = 'Market price must be greater than 0.';
  }

  if (isBlank(values.yearsToMaturity)) {
    errors.yearsToMaturity = 'Years to maturity is required.';
  } else if (!isPositiveNumber(values.yearsToMaturity)) {
    errors.yearsToMaturity = 'Years to maturity must be greater than 0.';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
