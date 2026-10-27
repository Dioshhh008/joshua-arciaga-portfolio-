import { useEffect, useState } from 'react'

/**
 * Tracks which section is currently in view so the sidebar can highlight it.
 * Uses a root margin biased toward the top of the viewport: a section counts as
 * active once its heading reaches roughly a third of the way down the screen.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string>(ids[0] ?? '')

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (!elements.length || typeof IntersectionObserver === 'undefined') return

    const visible = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio)
          else visible.delete(entry.target.id)
        }
        if (!visible.size) return
        const [best] = [...visible.entries()].sort((a, b) => b[1] - a[1])
        if (best) setActive(best[0])
      },
      { rootMargin: '-18% 0px -62% 0px', threshold: [0, 0.15, 0.4, 0.75, 1] },
    )

    for (const el of elements) observer.observe(el)
    return () => observer.disconnect()
  }, [ids])

  return active
}
