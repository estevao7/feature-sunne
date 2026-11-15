import { useState } from 'react'
import { AverageDisclaimer } from './AverageDisclaimer.tsx'
import { BillInput } from './BillInput.tsx'
import { CtaButton } from './CtaButton.tsx'
import { ProfileToggle } from './ProfileToggle.tsx'
import { ResultCard } from './ResultCard.tsx'
import { calculateSavings } from '../lib/savings.ts'
import type { Profile } from '../types/index.ts'

export function SavingsCalculator() {
  const [monthlyBill, setMonthlyBill] = useState('')
  const [profile, setProfile] = useState<Profile>('home')
  const result = calculateSavings(Number(monthlyBill), profile)

  return (
    <main className="min-h-screen bg-sunne-mist px-4 py-10 text-sunne-plum">
      <section className="mx-auto w-full max-w-5xl rounded-3xl border border-sunne-border bg-white p-6">
        <h1 className="text-2xl font-semibold">
          Quanto você pode economizar com a Sunne?
        </h1>

        <div className="mt-6 grid gap-6">
          <BillInput value={monthlyBill} onChange={setMonthlyBill} />
          <ProfileToggle value={profile} onChange={setProfile} />

          <section aria-label="Resultado da economia" aria-live="polite">
            {result ? (
              <div className="grid gap-4">
                <ResultCard
                  title="Economia mensal estimada"
                  value={result.monthlySavings}
                />
                <ResultCard
                  title="Economia anual estimada"
                  value={result.annualSavings}
                />
                <AverageDisclaimer />
              </div>
            ) : (
              <p className="text-sm text-sunne-plum-soft">
                Informe o valor da sua conta para ver a economia estimada.
              </p>
            )}
          </section>

          <CtaButton />
        </div>
      </section>
    </main>
  )
}
