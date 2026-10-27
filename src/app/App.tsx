import { useEffect, useState } from 'react'

import { navItems, profile } from '../data/site'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Hero } from './components/Hero'
import { Icon } from './components/icons'
import { Projects } from './components/Projects'
import { Services } from './components/Services'
import { Sidebar, SidebarContent } from './components/Sidebar'
import { Skills } from './components/Skills'
import { Stats } from './components/Stats'
import { useActiveSection } from './hooks/useActiveSection'

function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg">
      <span className="absolute -left-40 -top-40 size-[520px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.22),transparent_65%)] blur-2xl" />
      <span className="absolute -right-32 top-24 size-[460px] rounded-full bg-[radial-gradient(circle,rgba(79,125,255,0.16),transparent_65%)] blur-2xl" />
      <span className="absolute bottom-0 left-1/3 size-[500px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.09),transparent_65%)] blur-2xl" />
      <div className="absolute inset-0 blueprint" />
      <div className="absolute inset-x-0 top-0 h-[420px] bg-[linear-gradient(180deg,rgba(7,10,18,0),rgba(7,10,18,0.9))]" />
    </div>
  )
}

function MobileBar({ onOpen }: { onOpen: () => void }) {
  return (
    <header className="sticky top-0 z-30 border-b border-line/80 bg-[#070a12]/85 backdrop-blur-xl lg:hidden">
      <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <a href="#home" className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-neon via-neon-deep to-azure font-display text-[13px] text-white">
            JA
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-[14.5px] leading-tight text-fg">{profile.name}</span>
            <span className="block text-[10px] text-faint">Web Dev &amp; Data Analytics</span>
          </span>
        </a>
        <button
          type="button"
          onClick={onOpen}
          aria-label="Open navigation"
          className="grid size-10 place-items-center rounded-xl border border-line bg-white/[0.03] text-fg transition hover:border-neon/40 hover:text-neon"
        >
          <Icon.menu className="size-5" />
        </button>
      </div>
    </header>
  )
}

function MobileDrawer({ open, onClose, active }: { open: boolean; onClose: () => void; active: string }) {
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
      aria-hidden={!open}
    >
      <button
        type="button"
        tabIndex={open ? 0 : -1}
        aria-label="Close navigation"
        onClick={onClose}
        className={`absolute inset-0 bg-black/65 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className={`absolute inset-y-0 left-0 flex w-[288px] max-w-[86vw] flex-col border-r border-line bg-[#080c15] shadow-[24px_0_60px_-30px_rgba(0,0,0,1)] transition-transform duration-300 ease-out ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-5 pb-1 pt-4">
          <span className="eyebrow text-[10px]">Menu</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="grid size-9 place-items-center rounded-lg border border-line bg-white/[0.03] text-muted transition hover:text-fg"
          >
            <Icon.close className="size-4" />
          </button>
        </div>
        <div className="flex min-h-0 flex-1 flex-col">
          <SidebarContent active={active} onNavigate={onClose} />
        </div>
      </div>
    </div>
  )
}

const sectionIds = navItems.map((item) => item.id)

export function App() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const active = useActiveSection(sectionIds)

  return (
    <div className="relative min-h-screen">
      <Backdrop />
      <Sidebar active={active} />
      <MobileBar onOpen={() => setDrawerOpen(true)} />
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} active={active} />

      <main className="lg:pl-[286px]">
        <div className="mx-auto w-full max-w-[1180px] px-4 pb-12 pt-8 sm:px-7 sm:pt-10 lg:px-9 lg:pt-12 xl:px-12">
          <div className="space-y-16 sm:space-y-20 lg:space-y-24">
            <Hero />
            <Stats />
            <About />
            <Services />
            <Projects />
            <Skills />
            <Contact />
          </div>

          <footer className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-line/70 pt-6 text-[11.5px] text-faint sm:flex-row sm:items-center">
            <p>
              © {new Date().getFullYear()} {profile.name}. Built with React &amp; Tailwind CSS.
            </p>
            <div className="flex items-center gap-4">
              <span className="hidden items-center gap-1.5 sm:flex">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                {profile.shortLocation}, PH
              </span>
              <a href="#home" className="inline-flex items-center gap-1.5 text-muted transition hover:text-neon">
                Back to top
                <Icon.arrowUpRight className="size-3.5" />
              </a>
            </div>
          </footer>
        </div>
      </main>
    </div>
  )
}
