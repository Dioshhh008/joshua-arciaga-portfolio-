import { skillGroups } from '../../data/site'
import type { IconName } from './icons'
import { Icon } from './icons'
import { SectionHeading } from './SectionHeading'

const groupIcons: Record<string, IconName> = {
  layout: 'layout',
  server: 'server',
  chart: 'trend',
  database: 'database',
}

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="scroll-mt-28">
      <SectionHeading
        index="04"
        eyebrow="Toolkit"
        title={<span id="skills-title">Skills &amp; technologies</span>}
        description="The stack I reach for when a project needs an interface, an API, or a dataset that finally makes sense."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {skillGroups.map((group) => {
          const Glyph = Icon[groupIcons[group.icon] ?? 'code']
          return (
            <div key={group.title} className="glass card-lift rounded-[22px] p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-[11px] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] text-neon">
                  <Glyph className="size-4" />
                </span>
                <h3 className="font-display text-[15.5px] text-fg">{group.title}</h3>
                <span className="ml-auto text-[10.5px] text-faint">{group.items.length} skills</span>
              </div>

              <ul className="mt-4 space-y-2">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-center justify-between gap-3 rounded-lg border border-transparent px-2 py-1.5 transition hover:border-white/[0.08] hover:bg-white/[0.03]"
                  >
                    <span className="flex items-center gap-2.5 text-[12.5px] text-fg/85">
                      <span className="size-1.5 rounded-full bg-gradient-to-br from-neon to-azure" />
                      {item.name}
                    </span>
                    <span
                      className={[
                        'rounded-full border px-2 py-0.5 text-[9.5px] tracking-[0.06em] uppercase',
                        item.level === 'Advanced'
                          ? 'border-neon/25 bg-neon/10 text-neon'
                          : 'border-white/[0.08] bg-white/[0.02] text-faint',
                      ].join(' ')}
                    >
                      {item.level}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </section>
  )
}
