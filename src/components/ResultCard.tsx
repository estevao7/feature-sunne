import { formatCurrency } from '../lib/format.ts'

type ResultCardProps = {
  title: string
  value: number
}

export function ResultCard({ title, value }: ResultCardProps) {
  return (
    <div className="rounded-2xl bg-sunne-plum p-6 text-white">
      <h3 className="text-sm font-medium text-white/80">{title}</h3>
      <p className="mt-2 text-2xl font-semibold text-sunne-orange">
        {formatCurrency(value)}
      </p>
    </div>
  )
}
