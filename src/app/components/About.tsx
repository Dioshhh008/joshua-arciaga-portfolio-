import { highlights, profile } from '../../data/site'
import { Icon } from './icons'
import { SectionHeading } from './SectionHeading'

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-28">
      <SectionHeading
        index="01"
        eyebrow="About me"
        title={
          <span id="about-title">
            Developer by craft, <span className="text-gradient">analyst by curiosity</span>
          </span>
        }
      />

      <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="glass card-lift rounded-[24px] p-6 sm:p-7">
          <div className="space-y-4 text-[13.5px] leading-[1.75] text-muted">
            {profile.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {['Career shifter', 'Self-taught', 'Computer Science'].map((trait) => (
              <span
                key={trait}
                className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1 text-[11px] text-fg/80"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <div className="rounded-[24px] border border-emerald-300/15 bg-emerald-300/[0.055] p-5">
            <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.14em] text-emerald-300/90 uppercase">
              <span className="size-1.5 animate-pulse-soft rounded-full bg-emerald-300" />
              Open for work
            </span>
            <p className="mt-2.5 text-[13px] leading-relaxed text-fg/85">
              Taking on freelance builds and analytics work, remote or around Cavite.
            </p>
            <a
              href="#contact"
              className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-medium text-emerald-200 transition hover:gap-2.5"
            >
              Start a conversation
              <Icon.arrowRight className="size-3.5" />
            </a>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/[0.025] p-5">
            <dl className="space-y-3">
              {highlights.slice(0, 3).map((item) => (
                <div key={item.label} className="flex items-baseline justify-between gap-4 border-b border-line/60 pb-2.5 last:border-0 last:pb-0">
                  <dt className="text-[11px] tracking-[0.06em] text-faint uppercase">{item.label}</dt>
                  <dd className="text-right text-[12.5px] text-fg/85">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
