import { stats } from '../../data/site'
import type { IconName } from './icons'
import { Icon } from './icons'

const statIcons: Record<string, IconName> = {
  code: 'code',
  chart: 'chart',
  layers: 'layers',
}

export function Stats() {
  return (
    <section aria-label="At a glance" className="relative overflow-hidden rounded-[26px] glass halo">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px hairline"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -left-16 top-1/2 size-48 -translate-y-1/2 rounded-full bg-neon/20 blur-3xl"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 bottom-0 size-40 rounded-full bg-azure/15 blur-3xl"
      />

      <div className="relative grid divide-y divide-line/70 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {stats.map((stat) => {
          const Glyph = Icon[statIcons[stat.icon] ?? 'chart']
          return (
            <div key={stat.label} className="group flex items-center gap-4 px-6 py-5 sm:px-5 sm:py-6">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-neon transition group-hover:border-neon/40 group-hover:text-white">
                <Glyph className="size-[18px]" />
              </span>
              <div className="min-w-0">
                <p className="font-display text-[26px] leading-none text-fg">
                  {stat.value}
                  <span className="ml-2 align-middle text-[12px] font-medium tracking-[0.02em] text-fg/70">{stat.label}</span>
                </p>
                <p className="mt-1.5 truncate text-[11px] text-faint">{stat.detail}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
