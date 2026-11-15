import assert from 'node:assert/strict'
import test from 'node:test'
import { formatCurrency } from '../src/lib/format.ts'
import { calculateSavings, MAX_MONTHLY_BILL } from '../src/lib/savings.ts'

test('calculates 20% savings for home and business profiles', () => {
  for (const profile of ['home', 'business']) {
    assert.deepEqual(calculateSavings(300, profile), {
      monthlySavings: 60,
      annualSavings: 720,
      newMonthlyBill: 240,
    })
  }
})

test('accepts the maximum monthly bill', () => {
  assert.deepEqual(calculateSavings(MAX_MONTHLY_BILL, 'home'), {
    monthlySavings: 20_000,
    annualSavings: 240_000,
    newMonthlyBill: 80_000,
  })
})

test('does not calculate invalid amounts or profiles', () => {
  for (const amount of [0, -1, MAX_MONTHLY_BILL + 1, Number.NaN, Infinity]) {
    assert.equal(calculateSavings(amount, 'home'), null)
  }

  assert.equal(calculateSavings(300, 'personal'), null)
})

test('formats values as Brazilian real', () => {
  assert.equal(formatCurrency(1234.56), 'R$\u00a01.234,56')
})
