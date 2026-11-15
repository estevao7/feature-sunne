type AverageDisclaimerProps = {
  className?: string
}

export function AverageDisclaimer({ className = '' }: AverageDisclaimerProps) {
  return (
    <p
      className={`text-sm leading-6 text-sunne-plum-soft ${className}`.trim()}
      role="note"
    >
      O desconto é uma <strong>média</strong> e os valores são uma{' '}
      <strong>estimativa</strong>. A economia real pode variar conforme seu
      consumo e sua distribuidora.
    </p>
  )
}
