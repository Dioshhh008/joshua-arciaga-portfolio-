import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import { navItems, profile } from '../../data/site'
import type { IconName } from './icons'
import { Icon } from './icons'

const navIcons: Record<string, IconName> = {
  home: 'home',
  about: 'user',
  services: 'layers',
  portfolio: 'folder',
  skills: 'code',
  contact: 'mail',
}

const socialIcons: Record<string, IconName> = {
  GitHub: 'github',
  LinkedIn: 'linkedin',
  Telegram: 'telegram',
  Email: 'mail',
}

interface SidebarContentProps {
  active: string
  onNavigate?: () => void
}

export function SidebarContent({ active, onNavigate }: SidebarContentProps) {
  const [notice, setNotice] = useState(false)

  useEffect(() => {
    if (!notice) return
    const timer = window.setTimeout(() => setNotice(false), 3200)
    return () => window.clearTimeout(timer)
  }, [notice])

  return (
    <>
      <div className="flex h-full min-h-0 flex-col gap-7 overflow-y-auto px-5 py-6 no-bar">
        <a href="#home" onClick={onNavigate} className="group flex items-center gap-3 rounded-2xl">
          <span className="relative grid size-11 shrink-0 place-items-center rounded-[14px] bg-gradient-to-br from-neon via-neon-deep to-azure font-display text-[17px] text-white glow-neon">
            JA
            <span className="absolute inset-0 rounded-[14px] ring-1 ring-white/25 ring-inset" />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-[17px] text-fg">{profile.name}</span>
            <span className="mt-0.5 block truncate text-[11px] tracking-[0.02em] text-faint">
              Web Dev &amp; Data Analytics
            </span>
          </span>
        </a>

        <nav aria-label="Sections" className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = active === item.id
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={onNavigate}
                aria-current={isActive ? 'page' : undefined}
                className={[
                  'group relative flex items-center gap-3 rounded-xl px-2.5 py-2 text-[13.5px] transition-colors duration-300',
                  isActive ? 'text-fg' : 'text-muted hover:bg-white/[0.035] hover:text-fg',
                ].join(' ')}
              >
                {isActive && (
                  <span
                    aria-hidden
                    className="absolute inset-0 -z-10 rounded-xl border border-white/10 bg-gradient-to-r from-neon/22 via-neon/10 to-transparent"
                  />
                )}
                {isActive && (
                  <span
                    aria-hidden
                    className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-gradient-to-b from-neon to-azure shadow-[0_0_12px_rgba(168,85,247,0.9)]"
                  />
                )}
                <span
                  className={[
                    'grid size-8 shrink-0 place-items-center rounded-[10px] transition-all duration-300',
                    isActive
                      ? 'bg-gradient-to-br from-neon/85 to-azure/80 text-white shadow-[0_8px_20px_-8px_rgba(124,58,237,0.95)]'
                      : 'bg-white/[0.04] text-faint ring-1 ring-white/[0.06] ring-inset group-hover:text-fg',
                  ].join(' ')}
                >
                  {(() => {
                    const Glyph = Icon[navIcons[item.id] ?? 'home']
                    return <Glyph className="size-[15px]" />
                  })()}
                </span>
                {item.label}
              </a>
            )
          })}
        </nav>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-neon-deep/85 via-[#5b2bb8]/80 to-azure/70 p-5 halo">
          <span
            aria-hidden
            className="pointer-events-none absolute -right-8 -top-10 size-28 rounded-full bg-white/25 blur-2xl"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_80%_15%,rgba(255,255,255,0.45),transparent_55%)]"
          />
          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/25 px-2.5 py-1 text-[10px] font-medium tracking-[0.12em] text-white/90 uppercase ring-1 ring-white/20 ring-inset">
              <span className="size-1.5 animate-pulse-soft rounded-full bg-emerald-300" />
              Available
            </span>
            <p className="mt-3 font-display text-[17px] leading-snug text-white">Available for Freelance Projects</p>
            <p className="mt-1.5 text-[12px] leading-relaxed text-white/70">Let&apos;s build something amazing together.</p>
            <a
              href="#contact"
              onClick={onNavigate}
              className="mt-4 flex items-center justify-between gap-2 rounded-xl bg-white/[0.14] px-3.5 py-2.5 text-[12.5px] font-medium text-white ring-1 ring-white/25 ring-inset backdrop-blur-sm transition hover:bg-white/20"
            >
              Hire Me
              <Icon.arrowRight className="size-4" />
            </a>
          </div>
        </div>

        <div className="mt-auto space-y-6">
          <div>
            <p className="eyebrow text-[10px]">Download CV</p>
            <button
              type="button"
              onClick={() => setNotice(true)}
              className="group mt-2.5 flex w-full items-center gap-2.5 rounded-xl border border-line bg-white/[0.025] px-3 py-2.5 text-left transition hover:border-neon/40 hover:bg-white/[0.05]"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-white/[0.05] text-faint group-hover:text-neon">
                <Icon.download className="size-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[12.5px] text-fg/90">Joshua_Arciaga_CV.pdf</span>
                <span className="block text-[10.5px] text-faint">Coming soon</span>
              </span>
              <span className="rounded-full border border-amber-300/25 bg-amber-300/10 px-2 py-0.5 text-[9px] font-medium tracking-[0.1em] text-amber-200/90 uppercase">
                Soon
              </span>
            </button>
          </div>

          <div>
            <p className="eyebrow text-[10px]">Follow me</p>
            <div className="mt-2.5 flex items-center gap-2">
              {profile.socials.map((social) => {
                const Glyph = Icon[socialIcons[social.label] ?? 'globe']
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="grid size-8 place-items-center rounded-lg border border-line bg-white/[0.025] text-muted transition hover:-translate-y-0.5 hover:border-neon/45 hover:text-neon"
                  >
                    <Glyph className="size-3.5" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {typeof document !== 'undefined' &&
        createPortal(
          <div
            aria-live="polite"
            className={[
              'pointer-events-none fixed inset-x-0 bottom-6 z-[80] flex justify-center px-4 transition-all duration-300',
              notice ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
            ].join(' ')}
          >
            <div className="flex items-center gap-2 rounded-full border border-neon/30 bg-[#120c22]/95 px-4 py-2.5 text-[12.5px] text-fg shadow-[0_18px_50px_-18px_rgba(124,58,237,0.9)] backdrop-blur">
              <Icon.sparkle className="size-4 text-neon" />
              CV is on the way — check back soon.
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}

export function Sidebar({ active }: { active: string }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[286px] flex-col border-r border-line/80 bg-[#080c15]/95 lg:flex">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_20%_0%,rgba(124,58,237,0.18),transparent_70%)]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5] [background-image:radial-gradient(rgba(255,255,255,0.055)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]"
      />
      <div className="relative flex min-h-0 flex-1 flex-col">
        <SidebarContent active={active} />
      </div>
    </aside>
  )
}
