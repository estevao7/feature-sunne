import { useState } from 'react'
import { AverageDisclaimer } from './AverageDisclaimer.tsx'
import { BillInput } from './BillInput.tsx'
import { CtaButton } from './CtaButton.tsx'
import { ResultCard } from './ResultCard.tsx'
import { calculateSavings } from '../lib/savings.ts'

export function SavingsCalculator() {
  const [monthlyBill, setMonthlyBill] = useState('')
  const result = calculateSavings(Number(monthlyBill))

  return (
    <main className="min-h-screen bg-sunne-mist px-4 py-10 text-sunne-plum">
      <section className="mx-auto w-full max-w-5xl rounded-3xl border border-sunne-border bg-white p-5 sm:p-8">
        <h1 className="text-2xl font-semibold">
          Quanto você pode economizar com a Sunne?
        </h1>

        <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:items-start">
          <div className="grid gap-6">
            <BillInput value={monthlyBill} onChange={setMonthlyBill} />
          </div>

          <div className="grid gap-6">
            <section aria-label="Resultado da economia" aria-live="polite">
              {result ? (
                <div className="grid gap-4 md:grid-cols-2">
                  <ResultCard
                    title="Economia mensal estimada"
                    value={result.monthlySavings}
                  />
                  <ResultCard
                    title="Economia anual estimada"
                    value={result.annualSavings}
                  />
                  <AverageDisclaimer className="md:col-span-2" />
                </div>
              ) : (
                <p className="text-sm text-sunne-plum-soft">
                  Informe o valor da sua conta para ver a economia estimada.
                </p>
              )}
            </section>

            <CtaButton />
          </div>
        </div>
      </section>
    </main>
  )
}
