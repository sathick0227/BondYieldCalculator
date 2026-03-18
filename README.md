# Bond Yield Calculator

## Project Overview
Bond Yield Calculator is a React Native mobile app built with TypeScript that helps users evaluate a plain-vanilla bond using a clean, interview-ready structure. The app separates UI components from calculation logic so the formulas are easy to explain, verify, and extend during a live discussion.

## Features
- Capture bond inputs for face value, coupon rate, market price, years to maturity, and coupon frequency
- Validate user input with clear, user-friendly messages
- Calculate current yield, yield to maturity, total interest earned, and price indicator
- Generate a detailed cash flow schedule for each coupon period
- Reset to demo-friendly default values instantly
- Keep business logic isolated in utilities for easier testing and future enhancements

## Inputs and Outputs
### Inputs
- Face Value
- Annual Coupon Rate (%)
- Market Price
- Years to Maturity
- Coupon Frequency: Annual or Semi-annual

### Outputs
- Current Yield (%)
- Yield to Maturity (%)
- Total Interest Earned
- Price Indicator: Premium, Discount, or Par
- Cash Flow Schedule with period number, payment date, coupon payment, cumulative interest, and remaining principal

## Formula Explanation
### Current Yield
Current yield measures the annual coupon income relative to the bond's current market price.

`currentYield = (annualCoupon / marketPrice) * 100`

### Total Interest
Total interest is the coupon payment per period multiplied by the total number of coupon periods.

`couponPayment = (faceValue * annualCouponRate / 100) / frequency`

`totalInterest = couponPayment * (yearsToMaturity * frequency)`

### Yield to Maturity (Binary Search)
Yield to maturity is approximated numerically instead of using a closed-form formula.

1. Start with a lower and upper YTM bound.
2. Pick the midpoint as the current YTM guess.
3. Price the bond using that guessed YTM.
4. Compare the estimated bond price to the market price.
5. If the estimated price is too high, the YTM guess is too low, so move the lower bound up.
6. If the estimated price is too low, the YTM guess is too high, so move the upper bound down.
7. Repeat until the estimated price is close enough to the market price or the max iteration limit is reached.

This keeps the implementation simple, readable, and easy to explain in an interview.

## How to Run Project
### Prerequisites
- Node.js 22.11.0 or later
- React Native CLI development environment
- Android Studio and/or Xcode configured for React Native Community CLI

### Install dependencies
```bash
npm install
```

### Start Metro
```bash
npm start
```

### Run on Android
```bash
npm run android
```

### Run on iOS
```bash
npm run ios
```

### Run tests
```bash
npm test
```

### Run TypeScript check
```bash
npx tsc --noEmit
```

## Sample Demo Values
- Face Value: 1000
- Annual Coupon Rate: 8
- Market Price: 950
- Years to Maturity: 5
- Frequency: Semi-annual

With these defaults, the app computes a discount bond with an approximate YTM near 9.28% and total interest of $400.00.

## Design Decisions
- Business logic lives in `src/utils/bondCalculations.ts` to keep formulas independent from the UI.
- Formatting helpers live in `src/utils/formatters.ts` for consistency across the app.
- Validation lives in `src/utils/validation.ts` so input rules remain easy to expand.
- Reusable UI pieces such as `InputField`, `ResultCard`, and `SectionCard` keep the screen easy to modify.
- The current structure makes it straightforward to add more coupon frequencies later without rewriting the screen.

## Future Enhancements
- Add quarterly coupon frequency support
- Export the cash flow schedule to CSV or PDF
- Add date picking for settlement date instead of always using the current date
- Show additional fixed-income metrics such as duration or accrued interest
- Add snapshot and unit tests for more edge cases
