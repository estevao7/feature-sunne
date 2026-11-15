import { useId } from 'react'
import type { Profile } from '../types/index.ts'

type ProfileToggleProps = {
  value: Profile
  onChange: (profile: Profile) => void
}

export function ProfileToggle({ value, onChange }: ProfileToggleProps) {
  const groupName = useId()
  const homeId = `${groupName}-home`
  const businessId = `${groupName}-business`

  return (
    <fieldset className="w-full">
      <legend className="mb-2 text-sm font-medium text-sunne-plum">
        Tipo de perfil
      </legend>
      <div className="grid grid-cols-2 gap-3">
        <label
          className="flex min-h-11 cursor-pointer items-center"
          htmlFor={homeId}
        >
          <input
            className="peer sr-only"
            id={homeId}
            type="radio"
            name={groupName}
            value="home"
            checked={value === 'home'}
            onChange={() => onChange('home')}
          />
          <span className="flex min-h-11 w-full items-center justify-center rounded-xl border border-sunne-border px-4 text-sm font-medium text-sunne-plum transition-colors peer-checked:border-sunne-orange peer-checked:bg-sunne-orange/10 peer-focus-visible:ring-2 peer-focus-visible:ring-sunne-orange peer-focus-visible:ring-offset-2">
            Casa
          </span>
        </label>
        <label
          className="flex min-h-11 cursor-pointer items-center"
          htmlFor={businessId}
        >
          <input
            className="peer sr-only"
            id={businessId}
            type="radio"
            name={groupName}
            value="business"
            checked={value === 'business'}
            onChange={() => onChange('business')}
          />
          <span className="flex min-h-11 w-full items-center justify-center rounded-xl border border-sunne-border px-4 text-sm font-medium text-sunne-plum transition-colors peer-checked:border-sunne-orange peer-checked:bg-sunne-orange/10 peer-focus-visible:ring-2 peer-focus-visible:ring-sunne-orange peer-focus-visible:ring-offset-2">
            Negócio
          </span>
        </label>
      </div>
    </fieldset>
  )
}
