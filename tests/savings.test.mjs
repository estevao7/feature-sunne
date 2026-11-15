import assert from 'node:assert/strict'
import test from 'node:test'
import { formatCurrency } from '../src/lib/format.ts'
import { calculateSavings, MAX_MONTHLY_BILL } from '../src/lib/savings.ts'

test('calculates 20% savings', () => {
  assert.deepEqual(calculateSavings(300), {
    monthlySavings: 60,
    annualSavings: 720,
    newMonthlyBill: 240,
  })
})

test('accepts the maximum monthly bill', () => {
  assert.deepEqual(calculateSavings(MAX_MONTHLY_BILL), {
    monthlySavings: 20_000,
    annualSavings: 240_000,
    newMonthlyBill: 80_000,
  })
})

test('does not calculate invalid amounts', () => {
  for (const amount of [0, -1, MAX_MONTHLY_BILL + 1, Number.NaN, Infinity]) {
    assert.equal(calculateSavings(amount), null)
  }
})

test('formats values as Brazilian real', () => {
  assert.equal(formatCurrency(1234.56), 'R$\u00a01.234,56')
})
