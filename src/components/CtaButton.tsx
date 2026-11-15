export const SUNNE_CTA_URL =
  'https://sunne.economia.sunne.com.br/?_gl=1*1lvyhli*_gcl_au*MzM0MDQ1MTU2LjE3OTQ2MjU3ODY.*_ga*NjU3MzM3MTIuMTc5NDYyNTc4Nw..*_ga_47BBPVJZY0*czE3OTQ2NzA5MzYkbzIkZzAkdDE3OTQ2NzA5MzYkajYwJGwwJGgw'

type CtaButtonProps = {
  className?: string
}

export function CtaButton({ className = '' }: CtaButtonProps) {
  return (
    <a
      className={`inline-flex min-h-11 w-full items-center justify-center rounded-full bg-sunne-orange px-8 py-3 text-center font-semibold text-sunne-plum transition-colors hover:bg-sunne-orange-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sunne-plum ${className}`.trim()}
      href={SUNNE_CTA_URL}
    >
      Quero economizar
    </a>
  )
}
