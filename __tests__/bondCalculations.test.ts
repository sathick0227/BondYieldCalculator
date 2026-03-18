import {DEFAULT_BOND_INPUT} from '../src/constants/defaults';
import {calculateBondMetrics} from '../src/utils/bondCalculations';

describe('calculateBondMetrics', () => {
  test('calculates expected values for demo inputs', () => {
    const result = calculateBondMetrics(DEFAULT_BOND_INPUT);

    expect(result.currentYield).toBeCloseTo(8.42, 2);
    expect(result.yieldToMaturity).toBeCloseTo(9.27, 2);
    expect(result.totalInterestEarned).toBe(400);
    expect(result.priceIndicator).toBe('Discount');
    expect(result.cashFlowSchedule).toHaveLength(10);
    expect(result.cashFlowSchedule[0].couponPayment).toBe(40);
    expect(result.cashFlowSchedule[9].remainingPrincipal).toBe(0);
  });
});
