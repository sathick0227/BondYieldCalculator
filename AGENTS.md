# AGENTS.md

## Project: Bond Yield Calculator
React Native + TypeScript

---

## 🎯 Goal
Build an interview-ready mobile application that calculates bond metrics and displays a detailed cash flow schedule.

The code must be:
- Clean
- Readable
- Well-structured
- Easy to explain
- Easy to modify during a live interview

---

## 🧱 Tech Stack
- React Native (Community CLI)
- TypeScript
- Functional components + React Hooks

---

## 🏗️ Architecture Rules

- Separate UI and business logic strictly
- All calculations must be in utility files
- Use reusable components
- Avoid large monolithic files
- Prefer small, focused functions
- Use clear and descriptive naming
- Keep components simple and maintainable

---

## 📁 Folder Structure

src/
  components/
    InputField.tsx
    FrequencySelector.tsx
    ResultCard.tsx
    CashFlowTable.tsx
    SectionCard.tsx
  utils/
    bondCalculations.ts
    formatters.ts
    validation.ts
  types/
    bond.ts
  constants/
    defaults.ts

App.tsx

---

## 📥 Inputs

- Face Value
- Annual Coupon Rate (%)
- Market Price
- Years to Maturity
- Coupon Frequency:
  - Annual (1)
  - Semi-annual (2)

---

## 📤 Outputs

- Current Yield (%)
- Yield to Maturity (YTM) (%)
- Total Interest Earned
- Price Indicator:
  - Premium
  - Discount
  - Par

---

## 📊 Cash Flow Schedule

Each row must contain:
- Period
- Payment Date
- Coupon Payment
- Cumulative Interest
- Remaining Principal

---

## 🧮 Calculation Rules

### Coupon Payment Per Period
coupon = (faceValue * annualCouponRate / 100) / frequency

### Annual Coupon
annualCoupon = faceValue * annualCouponRate / 100

### Current Yield
currentYield = annualCoupon / marketPrice

### Total Periods
totalPeriods = yearsToMaturity * frequency

### Total Interest
totalInterest = coupon * totalPeriods

### Price Indicator
- marketPrice > faceValue → Premium
- marketPrice < faceValue → Discount
- equal → Par

---

## 📈 YTM Implementation (IMPORTANT)

- Implement Yield to Maturity using numerical approximation
- Use binary search method
- Steps:
  1. Guess a YTM value
  2. Calculate bond price using that YTM
  3. Compare with market price
  4. Adjust guess
  5. Repeat until close enough

- Requirements:
  - Max iterations: ~100
  - Keep logic simple and readable
  - Avoid complex math libraries
  - Ensure code is easy to explain in interview

---

## 📅 Cash Flow Logic

- Generate rows for all periods
- Coupon payment remains constant
- Cumulative interest increases each period
- Remaining principal:
  - stays equal to face value until final period
  - becomes 0 at maturity
- Payment dates:
  - start from current date
  - increment by (12 / frequency) months per period

---

## ✅ Validation Rules

- Prevent empty inputs
- Prevent zero or negative values (where invalid)
- Coupon rate cannot be negative
- Years must be > 0
- Market price must be > 0
- Show user-friendly validation messages
- Disable calculation if invalid

---

## 🎨 UI Guidelines

- Clean and minimal design
- Mobile-friendly layout
- Scrollable screen
- Proper spacing and alignment
- Input fields with labels
- Frequency selector (buttons/toggle)
- “Calculate” button
- “Reset” button
- Result cards for outputs
- Scrollable cash flow table

---

## 🔧 Utilities

- Keep all business logic in:
  - bondCalculations.ts
- Create helpers:
  - formatCurrency(value)
  - formatPercent(value)
- Add validation helper

---

## 🧾 TypeScript

Create types for:
- BondInput
- BondResult
- CashFlowRow

Use strong typing across the project.

---

## 🎯 Default Demo Values

- Face Value: 1000
- Coupon Rate: 8
- Market Price: 950
- Years to Maturity: 5
- Frequency: Semi-annual

---

## 📦 Code Quality Rules

- Avoid duplication
- Keep functions small
- Use meaningful variable names
- Add comments only when necessary
- Avoid overengineering
- Ensure easy readability

---

## 🚀 Interview Optimization

The code should:
- Be easy to explain
- Be easy to modify quickly
- Clearly separate concerns
- Allow quick feature additions (e.g., quarterly frequency)

---

## 🧠 Extensibility Requirement

Make it easy to:
- Add quarterly frequency (4)
- Modify calculation formulas
- Adjust UI layout quickly

---

## 📄 README Requirements

Generate README.md with:
- Project Overview
- Features
- Inputs & Outputs
- Formula Explanation
- YTM Explanation (binary search)
- How to Run
- Sample Inputs
- Design Decisions
- Future Enhancements

---

## ✅ Final Checks

Before finishing:
- Ensure TypeScript compiles
- Ensure app runs without errors
- Validate calculations
- Verify UI usability
- Ensure code is interview-ready