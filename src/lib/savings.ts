import type { SavingsResult } from '../types/index.ts'

export const AVERAGE_DISCOUNT_RATE = 0.2

export const MAX_MONTHLY_BILL = 100_000

export function calculateSavings(monthlyBill: number): SavingsResult | null {
  if (
    !Number.isFinite(monthlyBill) ||
    monthlyBill <= 0 ||
    monthlyBill > MAX_MONTHLY_BILL
  ) {
    return null
  }

  const monthlySavings = monthlyBill * AVERAGE_DISCOUNT_RATE

  return {
    monthlySavings,
    annualSavings: monthlySavings * 12,
    newMonthlyBill: monthlyBill - monthlySavings,
  }
}
