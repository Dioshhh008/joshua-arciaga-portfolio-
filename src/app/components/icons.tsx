import type { SVGProps } from 'react'

// Small inline icon set so the site carries no icon-library dependency.
type IconProps = SVGProps<SVGSVGElement>

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

export const Icon = {
  home: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.8V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.8" />
    </svg>
  ),
  user: (p: IconProps) => (
    <svg {...base} {...p}>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M4.5 20.5c.9-3.8 3.8-5.8 7.5-5.8s6.6 2 7.5 5.8" />
    </svg>
  ),
  layers: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3.5 12.3 8.5 4.7 8.5-4.7" />
      <path d="m3.5 16.6 8.5 4.7 8.5-4.7" />
    </svg>
  ),
  folder: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M3 7.5A1.5 1.5 0 0 1 4.5 6h4.2l2 2.4h8.8A1.5 1.5 0 0 1 21 10v8.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5v-11Z" />
    </svg>
  ),
  code: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="m8.5 8-4.2 4 4.2 4" />
      <path d="m15.5 8 4.2 4-4.2 4" />
      <path d="M13.4 5.2 10.6 18.8" />
    </svg>
  ),
  mail: (p: IconProps) => (
    <svg {...base} {...p}>
      <rect x="2.8" y="5" width="18.4" height="14" rx="2.2" />
      <path d="m3.6 7 8.4 6 8.4-6" />
    </svg>
  ),
  download: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M12 3.5v11" />
      <path d="m7.5 10.5 4.5 4.5 4.5-4.5" />
      <path d="M4.5 19.5h15" />
    </svg>
  ),
  pin: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M12 21s6.5-5.6 6.5-10.5a6.5 6.5 0 1 0-13 0C5.5 15.4 12 21 12 21Z" />
      <circle cx="12" cy="10.3" r="2.4" />
    </svg>
  ),
  arrowUpRight: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M7 17 17 7" />
      <path d="M8.4 7H17v8.6" />
    </svg>
  ),
  arrowRight: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M4 12h15" />
      <path d="m13.5 6.5 5.5 5.5-5.5 5.5" />
    </svg>
  ),
  menu: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M4 7h16M4 12h16M4 17h11" />
    </svg>
  ),
  close: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  ),
  send: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M21 3 10.5 13.5" />
      <path d="M21 3l-6.6 18-3.9-7.5L3 9.6 21 3Z" />
    </svg>
  ),
  check: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  ),
  chart: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M4 20V4" />
      <path d="M4 20h16" />
      <path d="M8 16.5v-5" />
      <path d="M12.5 16.5V8" />
      <path d="M17 16.5v-7" />
    </svg>
  ),
  trend: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M4 17.5 9 11l3.6 3.2L20 5.5" />
      <path d="M15.5 5.5H20v4.5" />
    </svg>
  ),
  database: (p: IconProps) => (
    <svg {...base} {...p}>
      <ellipse cx="12" cy="6" rx="7.5" ry="3" />
      <path d="M4.5 6v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6" />
      <path d="M4.5 12v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-6" />
    </svg>
  ),
  server: (p: IconProps) => (
    <svg {...base} {...p}>
      <rect x="3" y="4" width="18" height="7" rx="2" />
      <rect x="3" y="13" width="18" height="7" rx="2" />
      <path d="M7 7.5h.01M7 16.5h.01" />
    </svg>
  ),
  layout: (p: IconProps) => (
    <svg {...base} {...p}>
      <rect x="3" y="4" width="18" height="16" rx="2.2" />
      <path d="M3 9.5h18" />
      <path d="M9.5 9.5V20" />
    </svg>
  ),
  sparkle: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z" />
      <path d="M18.5 15.5 19.4 18l2.5.9-2.5.9-.9 2.5-.9-2.5-2.5-.9 2.5-.9.9-2.5Z" />
    </svg>
  ),
  github: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  ),
  linkedin: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
      <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5ZM3 9.5h4v11H3v-11Zm6.5 0h3.8v1.5h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75v5.7h-4v-5.05c0-1.2-.02-2.75-1.7-2.75-1.7 0-1.96 1.3-1.96 2.66v5.14h-4v-11Z" />
    </svg>
  ),
  telegram: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.245-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  ),
  globe: (p: IconProps) => (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3.5 9.5h17M3.5 14.5h17" />
      <path d="M12 3c2.4 2.6 3.6 5.6 3.6 9s-1.2 6.4-3.6 9c-2.4-2.6-3.6-5.6-3.6-9S9.6 5.6 12 3Z" />
    </svg>
  ),
}

export type IconName = keyof typeof Icon

export function IconByName({ name, ...rest }: { name: IconName } & IconProps) {
  const Render = Icon[name]
  return <Render {...rest} />
}
