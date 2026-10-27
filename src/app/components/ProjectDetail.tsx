import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

import type { Project } from '../../data/site'
import { Icon } from './icons'
import { ProjectArt } from './ProjectArt'

/**
 * Full case study for one project, opened as a dialog on top of the page.
 * Mathing data: project.detail (src/data/site.ts) — web projects walk through
 * their pages, analytics projects walk through the cleaning → visualization
 * process.
 */
export function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  // Escape closes, page scroll is locked behind the dialog.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [onClose])

  const [from, to] = project.accent
  const isAnalytics = project.category === 'Data Analytics'

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto overscroll-contain p-3 sm:p-6" role="presentation">
      {/* backdrop */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#04060c]/85 backdrop-blur-sm"
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        initial={{ opacity: 0, y: 26, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative my-auto w-full max-w-[880px] overflow-hidden rounded-[24px] border border-white/10 bg-[#0a0e18] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]"
      >
        {/* cover banner */}
        <div className="relative h-44 overflow-hidden border-b border-white/[0.06] sm:h-56">
          <ProjectArt project={project} />
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute right-3.5 top-3.5 z-10 grid size-9 place-items-center rounded-full border border-white/15 bg-black/55 text-white/80 backdrop-blur transition hover:bg-black/75 hover:text-white"
        >
          <Icon.close className="size-4" />
        </button>

        <div className="p-5 sm:p-8">
          <p className="eyebrow">
            <span aria-hidden className="h-px w-7 bg-gradient-to-r from-neon to-transparent" />
            {project.category} · {project.kicker}
          </p>

          <h3 className="mt-3 font-display text-[22px] leading-tight text-fg sm:text-[26px]">{project.title}</h3>

          <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md border border-white/[0.07] bg-white/[0.035] px-2 py-1 text-[10px] text-fg/70"
              >
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-6 space-y-6">
            <p className="text-[13.5px] leading-[1.75] text-muted">{project.detail?.description}</p>

            {/* what the build is FOR (web) */}
            {!isAnalytics && (
              <Section title="Pages of the build">
                <div className="grid items-start gap-3 sm:grid-cols-2">
                  {project.detail?.pages?.map((page) => (
                    <Figure key={page.src + page.label} {...page} />
                  ))}
                </div>
              </Section>
            )}

            {/* analytics: description block + the summary findings */}
            {isAnalytics && (
              <Section title="Summary of findings">
                <p className="text-[13px] leading-[1.75] text-fg/85">{project.summary}</p>
              </Section>
            )}

            {/* analytics: cleaning → visualization process */}
            {isAnalytics && project.detail?.steps && (
              <Section title="Data cleaning → visualization">
                <ol className="space-y-5">
                  {project.detail.steps.map((step, index) => (
                    <li key={step.stage + index} className="relative pl-10">
                      <span
                        className="absolute left-0 top-0.5 grid size-7 place-items-center rounded-full text-[11px] font-semibold text-white shadow-[0_0_0_3px_rgba(10,14,24,1)]"
                        style={{ backgroundImage: `linear-gradient(135deg, ${from}, ${to})` }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <p className="text-[12px] font-semibold tracking-[0.1em] text-fg/90 uppercase">{step.stage}</p>
                      <p className="mt-1.5 text-[13px] leading-[1.7] text-muted">{step.text}</p>
                      {step.src && (
                        <Figure
                          src={step.src}
                          label={step.caption ?? step.stage}
                          className="mt-3"
                          style={{ backgroundImage: `linear-gradient(150deg, ${to}14, transparent)` }}
                        />
                      )}
                    </li>
                  ))}
                </ol>
              </Section>
            )}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-[12.5px] font-medium text-fg/85 transition hover:border-neon/40 hover:text-fg"
            >
              Back to projects
              <Icon.close className="size-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.18em] text-faint uppercase">
        {title}
        <span aria-hidden className="h-px flex-1 bg-white/[0.07]" />
      </h4>
      <div className="mt-3">{children}</div>
    </div>
  )
}

function Figure({
  src,
  label,
  text,
  className,
  style,
}: {
  src: string
  label: string
  text?: string
  className?: string
  style?: React.CSSProperties
}) {
  // Eager-load everything: lazy loading made fast scrolling flash empty,
  // broken-looking panels inside the dialog (worst on mobile), so every
  // screenshot starts downloading once the dialog opens and fades in over
  // an intentional dark panel when ready. onError also reveals the img so a
  // genuinely missing file is visible as such instead of an invisible hole.
  const [ready, setReady] = useState(false)
  return (
    <figure
      className={[
        'overflow-hidden rounded-xl border border-white/10 bg-black/25',
        className ?? '',
      ].join(' ')}
      style={style}
    >
      <img
        src={src}
        alt={`${label} screenshot`}
        onLoad={() => setReady(true)}
        onError={() => setReady(true)}
        className={[
          'w-full object-cover transition-opacity duration-500',
          ready ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
      />
      <figcaption className="border-t border-white/[0.06] px-3.5 py-2.5 text-[12px] leading-snug">
        <span className="font-medium text-fg/90">{label}</span>
        {text && <span className="text-muted"> — {text}</span>}
      </figcaption>
    </figure>
  )
}
