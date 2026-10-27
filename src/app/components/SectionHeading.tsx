import type { ReactNode } from 'react'

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  aside,
}: {
  index: string
  eyebrow: string
  title: ReactNode
  description?: string
  aside?: ReactNode
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-xl">
        <p className="eyebrow flex items-center gap-2">
          <span className="text-neon/70">{index}</span>
          <span aria-hidden className="h-px w-6 bg-gradient-to-r from-neon/70 to-transparent" />
          {eyebrow}
        </p>
        <h2 className="mt-3 font-display text-[clamp(1.65rem,3.2vw,2.15rem)] text-fg">{title}</h2>
        {description && <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">{description}</p>}
      </div>
      {aside}
    </div>
  )
}
