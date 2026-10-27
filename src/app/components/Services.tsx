import { services } from '../../data/site'
import type { IconName } from './icons'
import { Icon } from './icons'
import { SectionHeading } from './SectionHeading'

const serviceIcons: Record<string, IconName> = {
  code: 'code',
  chart: 'chart',
  database: 'database',
}

const accents: Record<string, { tile: string; glow: string; ring: string }> = {
  violet: {
    tile: 'from-neon/85 to-neon-deep',
    glow: 'bg-neon/25',
    ring: 'group-hover:border-neon/40',
  },
  azure: {
    tile: 'from-azure to-[#3b5bdb]',
    glow: 'bg-azure/25',
    ring: 'group-hover:border-azure/40',
  },
  cyan: {
    tile: 'from-cyan/80 to-[#0e7490]',
    glow: 'bg-cyan/20',
    ring: 'group-hover:border-cyan/40',
  },
}

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="scroll-mt-28">
      <SectionHeading
        index="02"
        eyebrow="What I do"
        title={<span id="services-title">Services &amp; core capabilities</span>}
        description="Two disciplines that share the same goal: turn messy inputs into something useful, fast and reliable."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {services.map((service, index) => {
          const accent = accents[service.accent] ?? accents.violet!
          const Glyph = Icon[serviceIcons[service.icon] ?? 'code']

          return (
            <article
              key={service.title}
              className={`group relative flex flex-col overflow-hidden rounded-[24px] glass card-lift p-6 ${accent.ring}`}
            >
              <span
                aria-hidden
                className={`pointer-events-none absolute -right-10 -top-12 size-32 rounded-full blur-3xl transition-opacity duration-500 ${accent.glow} opacity-40 group-hover:opacity-80`}
              />
              <div className="relative flex items-start justify-between">
                <span
                  className={`grid size-12 place-items-center rounded-[15px] bg-gradient-to-br text-white shadow-[0_14px_30px_-16px_rgba(0,0,0,0.9)] ${accent.tile}`}
                >
                  <Glyph className="size-[21px]" />
                </span>
                <span className="font-display text-[12px] tracking-[0.1em] text-faint/60">0{index + 1}</span>
              </div>

              <h3 className="relative mt-5 font-display text-[17px] leading-snug text-fg">{service.title}</h3>
              <p className="relative mt-2.5 text-[12.5px] leading-relaxed text-muted">{service.body}</p>

              <ul className="relative mt-5 flex flex-wrap gap-1.5 border-t border-line/70 pt-4">
                {service.tech.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md border border-white/[0.07] bg-white/[0.035] px-2 py-1 text-[10.5px] text-fg/75"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="relative mt-5 inline-flex items-center gap-1.5 text-[11.5px] font-medium text-fg/60 transition group-hover:gap-2.5 group-hover:text-fg"
              >
                Let&apos;s build this
                <Icon.arrowRight className="size-3.5" />
              </a>
            </article>
          )
        })}
      </div>
    </section>
  )
}
