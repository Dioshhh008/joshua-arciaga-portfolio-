import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'

import type { Project, ProjectCategory } from '../../data/site'
import { projectFilters, projects } from '../../data/site'
import { Icon } from './icons'
import { ProjectArt } from './ProjectArt'
import { ProjectDetail } from './ProjectDetail'
import { SectionHeading } from './SectionHeading'

type Filter = 'All' | ProjectCategory

export function Projects() {
  const [filter, setFilter] = useState<Filter>('All')
  const [selected, setSelected] = useState<Project | null>(null)

  const counts = useMemo(
    () => ({
      All: projects.length,
      'Web Development': projects.filter((p) => p.category === 'Web Development').length,
      'Data Analytics': projects.filter((p) => p.category === 'Data Analytics').length,
    }),
    [],
  )

  const visible = filter === 'All' ? projects : projects.filter((project) => project.category === filter)

  return (
    <section id="portfolio" aria-labelledby="portfolio-title" className="scroll-mt-28">
      <SectionHeading
        index="03"
        eyebrow="Selected work"
        title={<span id="portfolio-title">Featured projects</span>}
        description="One shipped web application plus two real Jupyter notebook studies covering data cleaning, exploration and visualisation."
        aside={
          <div
            role="group"
            aria-label="Filter projects by category"
            className="no-bar flex w-full gap-1 overflow-x-auto rounded-xl border border-line bg-white/[0.025] p-1 sm:w-auto"
          >
            {projectFilters.map((tab) => {
              const isActive = filter === tab
              return (
                <button
                  key={tab}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setFilter(tab)}
                  className={[
                    'relative shrink-0 rounded-lg px-3.5 py-2 text-[12px] font-medium whitespace-nowrap transition-colors',
                    isActive ? 'text-white' : 'text-muted hover:text-fg',
                  ].join(' ')}
                >
                  {isActive && (
                    <motion.span
                      layoutId="project-filter-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-neon/90 to-azure/85 shadow-[0_10px_26px_-12px_rgba(124,58,237,0.95)]"
                    />
                  )}
                  <span className="flex items-center gap-1.5">
                    {tab}
                    <span className={isActive ? 'text-white/70' : 'text-faint'}>{counts[tab]}</span>
                  </span>
                </button>
              )
            })}
          </div>
        }
      />

      <motion.div layout className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project) => (
            <ProjectCard key={project.slug} project={project} onOpen={() => setSelected(project)} />
          ))}
        </AnimatePresence>
      </motion.div>

      <p className="mt-5 flex items-center gap-2 text-[11.5px] text-faint">
        <Icon.sparkle className="size-3.5 text-neon/70" />
        Click any card for the full case study — web builds walk through their pages, analytics studies walk through data cleaning and visualization.
      </p>

      <AnimatePresence>
        {selected && <ProjectDetail project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.97, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97, y: -6 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      role="button"
      tabIndex={0}
      aria-label={`${project.title} — open case study`}
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.target === event.currentTarget && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault()
          onOpen()
        }
      }}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-[22px] glass card-lift focus-visible:outline focus-visible:outline-2 focus-visible:outline-neon/70"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-white/[0.06]">
        <ProjectArt project={project} />
        <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/45 px-2.5 py-1 text-[10px] font-medium tracking-[0.06em] text-white/85 backdrop-blur">
          {project.category}
        </span>
        <span className="absolute right-3 top-3 grid size-8 place-items-center rounded-full border border-white/15 bg-black/40 text-white/80 opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100">
          <Icon.arrowUpRight className="size-3.5" />
        </span>
        {/* hover hint */}
        <span className="pointer-events-none absolute bottom-3 left-3 translate-y-1.5 rounded-full border border-white/15 bg-black/55 px-3 py-1.5 text-[10.5px] font-medium tracking-[0.04em] text-white/90 opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          View case study
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[10.5px] tracking-[0.14em] text-faint uppercase">{project.kicker}</p>
        <h3 className="mt-2 font-display text-[15.5px] leading-snug text-fg">{project.title}</h3>
        <p className="mt-2 flex-1 text-[12px] leading-relaxed text-muted">{project.summary}</p>

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
      </div>
    </motion.article>
  )
}
