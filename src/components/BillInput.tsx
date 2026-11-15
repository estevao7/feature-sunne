import { useId } from 'react'
import { MAX_MONTHLY_BILL } from '../lib/savings.ts'

type BillInputProps = {
  value: string
  onChange: (value: string) => void
}

export function BillInput({ value, onChange }: BillInputProps) {
  const inputId = useId()
  const hintId = `${inputId}-hint`
  const errorId = `${inputId}-error`
  const amount = Number(value)
  const isInvalid =
    value !== '' &&
    (!Number.isFinite(amount) || amount <= 0 || amount > MAX_MONTHLY_BILL)

  const errorMessage =
    amount > MAX_MONTHLY_BILL
      ? 'O valor máximo permitido é R$ 100.000,00.'
      : 'Informe um valor maior que zero.'

  return (
    <div className="w-full">
      <label
        className="mb-2 block text-sm font-medium text-sunne-plum"
        htmlFor={inputId}
      >
        Quanto você paga de energia por mês?
      </label>
      <div
        className={`flex min-h-11 items-center rounded-xl border bg-white px-4 focus-within:ring-2 focus-within:ring-sunne-orange ${
          isInvalid ? 'border-red-600' : 'border-sunne-border'
        }`}
      >
        <span className="mr-2 text-sunne-plum-soft" aria-hidden="true">
          R$
        </span>
        <input
          className="min-w-0 flex-1 bg-transparent py-2 text-sunne-plum outline-none"
          id={inputId}
          type="number"
          inputMode="numeric"
          min="0.01"
          max={MAX_MONTHLY_BILL}
          step="0.01"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={isInvalid}
          aria-describedby={`${hintId}${isInvalid ? ` ${errorId}` : ''}`}
        />
      </div>
      <p className="mt-1 text-xs text-sunne-plum-soft" id={hintId}>
        Valor entre R$ 0,01 e R$ 100.000,00.
      </p>
      {isInvalid && (
        <p className="mt-1 text-sm text-red-700" id={errorId}>
          {errorMessage}
        </p>
      )}
    </div>
  )
}
