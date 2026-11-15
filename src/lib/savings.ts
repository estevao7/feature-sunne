import type { Profile, SavingsResult } from '../types/index.ts'

export const AVERAGE_DISCOUNT_RATE: Record<Profile, number> = {
  home: 0.2,
  business: 0.2,
}

export const MAX_MONTHLY_BILL = 100_000

export function calculateSavings(
  monthlyBill: number,
  profile: Profile,
): SavingsResult | null {
  if (
    !Number.isFinite(monthlyBill) ||
    monthlyBill <= 0 ||
    monthlyBill > MAX_MONTHLY_BILL ||
    (profile !== 'home' && profile !== 'business')
  ) {
    return null
  }

  const monthlySavings = monthlyBill * AVERAGE_DISCOUNT_RATE[profile]

  return {
    monthlySavings,
    annualSavings: monthlySavings * 12,
    newMonthlyBill: monthlyBill - monthlySavings,
  }
}
