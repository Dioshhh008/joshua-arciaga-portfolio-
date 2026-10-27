import { useState } from 'react'

import { gmailComposeUrl, profile } from '../../data/site'
import { Icon } from './icons'

function Avatar() {
  const [failed, setFailed] = useState(false)

  return (
    <div className="relative mx-auto w-full max-w-[360px] sm:max-w-[400px]">
      {/* neon bloom behind the frame */}
      <span
        aria-hidden
        className="absolute inset-2 animate-pulse-soft rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.55),rgba(79,125,255,0.22)_45%,transparent_70%)] blur-2xl"
      />
      <span
        aria-hidden
        className="absolute -inset-6 rounded-full bg-[radial-gradient(circle_at_70%_30%,rgba(34,211,238,0.16),transparent_58%)]"
      />

      <div className="relative aspect-square">
        {/* rotating conic ring */}
        <div
          aria-hidden
          className="absolute inset-0 animate-spin-slow rounded-full opacity-80 [mask-image:radial-gradient(circle,transparent_66%,black_67%,black_71%,transparent_72%)]"
          style={{
            background: 'conic-gradient(from 90deg, #22d3ee, #4f7dff, #a855f7, #ec4899, #22d3ee)',
          }}
        />
        <div
          aria-hidden
          className="absolute inset-[3.5%] rounded-full border border-white/12 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.10),rgba(10,14,24,0.9))] backdrop-blur-sm"
        />

        <div className="absolute inset-[7%] overflow-hidden rounded-full border border-white/10 bg-[#0a0e18]">
          {failed ? (
            <div className="relative grid size-full place-items-center">
              <span
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(circle_at_35%_25%,rgba(168,85,247,0.35),transparent_60%),radial-gradient(circle_at_70%_80%,rgba(79,125,255,0.3),transparent_60%)]"
              />
              <span
                aria-hidden
                className="absolute inset-0 opacity-30 [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.12)_0px,transparent_1px,transparent_4px)]"
              />
              <span className="relative font-display text-[clamp(3rem,12vw,4.5rem)] text-white/90">JA</span>
            </div>
          ) : (
            <img
              src="/images/profile.jpg"
              alt={`${profile.name}, web developer and data analyst based in Tanza, Cavite`}
              onError={() => setFailed(true)}
              className="size-full object-cover object-[50%_18%]"
              loading="eager"
            />
          )}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(7,10,18,0.55)_100%)]"
          />
          <span aria-hidden className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/10 ring-inset" />
        </div>

        {/* floating chips */}
        <div className="absolute -right-2 top-[14%] animate-float rounded-2xl border border-white/10 bg-[#0b101b]/90 px-3.5 py-2.5 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.9)] backdrop-blur">
          <span className="flex items-center gap-2 text-[11.5px] text-fg">
            <span className="grid size-5 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
              <Icon.check className="size-3" />
            </span>
            Open to work
          </span>
        </div>

        <div className="absolute -left-3 bottom-[16%] animate-float-slow rounded-2xl border border-white/10 bg-[#0b101b]/90 px-3.5 py-2.5 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.9)] backdrop-blur">
          <span className="flex items-center gap-2 text-[11.5px] text-fg">
            <span className="grid size-5 place-items-center rounded-full bg-neon/20 text-neon">
              <Icon.chart className="size-3" />
            </span>
            Data → Insight
          </span>
        </div>
      </div>
    </div>
  )
}

const stack = ['Vue.js', 'Laravel', 'Python', 'MySQL', 'Tableau']

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="scroll-mt-28 pt-2 lg:pt-6">
      <div className="grid items-center gap-10 lg:grid-cols-[1.06fr_0.94fr] lg:gap-8">
        <div className="animate-fade-up">
          <p className="eyebrow flex items-center gap-2">
            <span aria-hidden className="h-px w-7 bg-gradient-to-r from-neon to-transparent" />
            Hello, I&apos;m
          </p>

          <h1 id="hero-title" className="mt-4 font-display text-[clamp(2.6rem,7vw,3.65rem)] leading-[0.98] text-fg">
            Joshua <span className="text-gradient">{profile.lastName}</span>
          </h1>

          <p className="mt-3 text-[clamp(1rem,2.1vw,1.2rem)] font-medium leading-snug text-fg/90">
            Full-Stack Web Developer <span className="text-faint">&amp;</span> Data Analytics Enthusiast
          </p>

          <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3 py-1.5 text-[12px] text-muted">
            <Icon.pin className="size-3.5 text-neon/80" />
            {profile.location}
          </p>

          <p className="mt-5 max-w-[46ch] text-[14px] leading-relaxed text-muted">{profile.intro}</p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#portfolio"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-neon to-azure px-5 py-3 text-[13px] font-semibold text-white shadow-[0_16px_40px_-18px_rgba(124,58,237,0.95)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_50px_-18px_rgba(124,58,237,1)]"
            >
              View My Work
              <Icon.arrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
            <a
              href={gmailComposeUrl({ subject: "Hello Joshua — let's talk" })}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] px-5 py-3 text-[13px] font-medium text-fg transition hover:-translate-y-0.5 hover:border-neon/45 hover:bg-white/[0.07]"
            >
              Let&apos;s Talk
              <Icon.arrowUpRight className="size-4 text-muted transition group-hover:text-neon" />
            </a>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-line/70 pt-5">
            <span className="text-[10.5px] font-medium tracking-[0.18em] text-faint uppercase">Working with</span>
            {stack.map((tech) => (
              <span key={tech} className="text-[11.5px] font-medium text-muted/85">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="animate-fade-up [animation-delay:120ms]">
          <Avatar />
        </div>
      </div>
    </section>
  )
}
