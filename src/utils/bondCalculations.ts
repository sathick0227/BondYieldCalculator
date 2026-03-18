import {YTM_MAX_ITERATIONS, YTM_TOLERANCE} from '../constants/defaults';
import {
  BondInput,
  BondResult,
  CashFlowRow,
  PriceIndicator,
} from '../types/bond';
import {formatDate} from './formatters';

const getCouponPaymentPerPeriod = (input: BondInput): number => {
  return (input.faceValue * input.annualCouponRate) / 100 / input.frequency;
};

const getAnnualCoupon = (input: BondInput): number => {
  return (input.faceValue * input.annualCouponRate) / 100;
};

const getTotalPeriods = (input: BondInput): number => {
  return Math.round(input.yearsToMaturity * input.frequency);
};

const getPriceIndicator = (
  faceValue: number,
  marketPrice: number,
): PriceIndicator => {
  if (marketPrice > faceValue) {
    return 'Premium';
  }

  if (marketPrice < faceValue) {
    return 'Discount';
  }

  return 'Par';
};

export const calculateBondPriceFromYtm = (
  input: BondInput,
  annualYtmPercent: number,
): number => {
  const totalPeriods = getTotalPeriods(input);
  const couponPayment = getCouponPaymentPerPeriod(input);
  const periodRate = annualYtmPercent / 100 / input.frequency;
  let presentValue = 0;

  for (let period = 1; period <= totalPeriods; period += 1) {
    const discountedCoupon = couponPayment / (1 + periodRate) ** period;
    presentValue += discountedCoupon;
  }

  return presentValue + input.faceValue / (1 + periodRate) ** totalPeriods;
};

export const approximateYieldToMaturity = (input: BondInput): number => {
  let lowerBound = 0;
  let upperBound = 100;
  let bestGuess = 0;

  for (let iteration = 0; iteration < YTM_MAX_ITERATIONS; iteration += 1) {
    const midpoint = (lowerBound + upperBound) / 2;
    const estimatedPrice = calculateBondPriceFromYtm(input, midpoint);
    const difference = estimatedPrice - input.marketPrice;

    bestGuess = midpoint;

    if (Math.abs(difference) < YTM_TOLERANCE) {
      break;
    }

    if (estimatedPrice > input.marketPrice) {
      lowerBound = midpoint;
    } else {
      upperBound = midpoint;
    }
  }

  return bestGuess;
};

export const generateCashFlowSchedule = (input: BondInput): CashFlowRow[] => {
  const couponPayment = getCouponPaymentPerPeriod(input);
  const totalPeriods = getTotalPeriods(input);
  const monthsPerPeriod = 12 / input.frequency;
  const startDate = new Date();
  const rows: CashFlowRow[] = [];

  for (let period = 1; period <= totalPeriods; period += 1) {
    const paymentDate = new Date(startDate);
    paymentDate.setMonth(startDate.getMonth() + period * monthsPerPeriod);

    rows.push({
      period,
      paymentDate: formatDate(paymentDate),
      couponPayment,
      cumulativeInterest: couponPayment * period,
      remainingPrincipal: period === totalPeriods ? 0 : input.faceValue,
    });
  }

  return rows;
};

export const calculateBondMetrics = (input: BondInput): BondResult => {
  const annualCoupon = getAnnualCoupon(input);
  const currentYield = (annualCoupon / input.marketPrice) * 100;
  const totalPeriods = getTotalPeriods(input);
  const couponPayment = getCouponPaymentPerPeriod(input);

  return {
    currentYield,
    yieldToMaturity: approximateYieldToMaturity(input),
    totalInterestEarned: couponPayment * totalPeriods,
    priceIndicator: getPriceIndicator(input.faceValue, input.marketPrice),
    cashFlowSchedule: generateCashFlowSchedule(input),
  };
};
