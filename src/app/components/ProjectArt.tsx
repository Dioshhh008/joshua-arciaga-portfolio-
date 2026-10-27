import { useState } from 'react'

import type { Project } from '../../data/site'

/**
 * Generated card artwork. Each project can override this with a real screenshot
 * by adding `cover` to its entry in src/data/site.ts.
 */
export function ProjectArt({ project }: { project: Project }) {
  const [from, to] = project.accent
  // Card covers eager-load (+ one fade) so no card ever flashes an empty box.
  const [ready, setReady] = useState(false)

  return (
    <div className="relative size-full overflow-hidden">
      <span
        aria-hidden
        className="absolute inset-0"
        style={{ backgroundImage: `radial-gradient(120% 100% at 15% 0%, ${from}3d 0%, transparent 55%), linear-gradient(150deg, ${to}26, #080b13 72%)` }}
      />
      <span
        aria-hidden
        className="absolute inset-0 opacity-[0.5] [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_50%_40%,black,transparent_78%)]"
      />
      <span
        aria-hidden
        className="absolute -left-6 top-1/2 size-32 rounded-full blur-3xl"
        style={{ background: from, opacity: 0.35 }}
      />

      <div className="relative grid size-full place-items-center px-7">
        {project.cover ? (
          <img
            src={project.cover}
            alt={`${project.title} preview`}
            onLoad={() => setReady(true)}
            onError={() => setReady(true)}
            className={[
              'size-full object-cover transition-opacity duration-500',
              ready ? 'opacity-100' : 'opacity-0',
            ].join(' ')}
          />
        ) : (
          <ProjectSketch variant={project.art} from={from} to={to} />
        )}
      </div>
    </div>
  )
}

function ProjectSketch({ variant, from, to }: { variant: Project['art']; from: string; to: string }) {
  const uid = `${variant}-${from.replace('#', '')}`
  const line = 'rgba(255,255,255,0.28)'
  const faint = 'rgba(255,255,255,0.14)'

  if (variant === 'web') {
    return (
      <svg viewBox="0 0 300 170" className="w-full max-w-[300px] drop-shadow-[0_18px_30px_rgba(0,0,0,0.55)]" role="presentation">
        <rect x="12" y="8" width="276" height="154" rx="10" fill="#0b1120" stroke="rgba(255,255,255,0.13)" />
        <rect x="12" y="8" width="276" height="22" rx="10" fill="rgba(255,255,255,0.045)" />
        {[24, 34, 44].map((cx) => (
          <circle key={cx} cx={cx} cy="19" r="2.6" fill="rgba(255,255,255,0.22)" />
        ))}
        <rect x="60" y="14" width="150" height="10" rx="5" fill="rgba(255,255,255,0.07)" />
        <rect x="24" y="42" width="62" height="106" rx="7" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" />
        {[54, 68, 82, 96].map((y, i) => (
          <rect key={y} x="34" y={y} width={i === 0 ? 42 : 32} height="5" rx="2.5" fill={i === 0 ? from : faint} />
        ))}
        <rect x="96" y="42" width="176" height="30" rx="7" fill="rgba(255,255,255,0.05)" />
        <rect x="106" y="52" width="70" height="5" rx="2.5" fill={line} />
        <rect x="106" y="62" width="44" height="4" rx="2" fill={faint} />
        <rect x="96" y="80" width="84" height="68" rx="7" fill={`url(#web-a-${uid})`} stroke="rgba(255,255,255,0.1)" />
        <rect x="188" y="80" width="84" height="68" rx="7" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" />
        {[94, 106, 118].map((y, i) => (
          <rect key={y} x="198" y={y} width={i === 0 ? 56 : 44} height="4" rx="2" fill={faint} />
        ))}
        <rect x="198" y="128" width="34" height="9" rx="4.5" fill={to} opacity="0.85" />
        <defs>
          <linearGradient id={`web-a-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={from} stopOpacity="0.55" />
            <stop offset="100%" stopColor={to} stopOpacity="0.18" />
          </linearGradient>
        </defs>
      </svg>
    )
  }

  if (variant === 'trend') {
    return (
      <svg viewBox="0 0 300 170" className="w-full max-w-[300px]" role="presentation">
        <rect x="18" y="14" width="264" height="142" rx="10" fill="rgba(8,12,20,0.55)" stroke="rgba(255,255,255,0.1)" />
        {[44, 72, 100, 128].map((y) => (
          <line key={y} x1="32" y1={y} x2="268" y2={y} stroke="rgba(255,255,255,0.06)" />
        ))}
        <path
          d="M32 118 L70 104 L108 112 L146 82 L184 90 L222 58 L268 40"
          fill="none"
          stroke={from}
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M32 118 L70 104 L108 112 L146 82 L184 90 L222 58 L268 40 L268 128 L32 128 Z"
          fill={`url(#trend-${uid})`}
        />
        {[70, 146, 222].map((x) => (
          <circle key={x} cx={x} cy={x === 70 ? 104 : x === 146 ? 82 : 58} r="3" fill="#0b1120" stroke={to} strokeWidth="2" />
        ))}
        <rect x="32" y="30" width="46" height="6" rx="3" fill="rgba(255,255,255,0.28)" />
        <rect x="32" y="41" width="26" height="4" rx="2" fill="rgba(255,255,255,0.14)" />
        <defs>
          <linearGradient id={`trend-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={to} stopOpacity="0.4" />
            <stop offset="100%" stopColor={to} stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    )
  }

  if (variant === 'segments') {
    return (
      <svg viewBox="0 0 300 170" className="w-full max-w-[300px]" role="presentation">
        <rect x="18" y="26" width="122" height="118" rx="10" fill="rgba(8,12,20,0.55)" stroke="rgba(255,255,255,0.1)" />
        <circle cx="79" cy="85" r="38" fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="14" />
        <circle
          cx="79"
          cy="85"
          r="38"
          fill="none"
          stroke={from}
          strokeWidth="14"
          strokeDasharray="150 239"
          strokeLinecap="round"
          transform="rotate(-90 79 85)"
        />
        <circle
          cx="79"
          cy="85"
          r="38"
          fill="none"
          stroke={to}
          strokeWidth="14"
          strokeDasharray="55 239"
          strokeLinecap="round"
          transform="rotate(140 79 85)"
        />
        <rect x="152" y="26" width="130" height="118" rx="10" fill="rgba(8,12,20,0.4)" stroke="rgba(255,255,255,0.08)" />
        {[
          { y: 46, w: 96 },
          { y: 66, w: 72 },
          { y: 86, w: 108 },
          { y: 106, w: 58 },
          { y: 126, w: 84 },
        ].map((bar, i) => (
          <g key={bar.y}>
            <rect x="164" y={bar.y} width="106" height="8" rx="4" fill="rgba(255,255,255,0.05)" />
            <rect x="164" y={bar.y} width={bar.w} height="8" rx="4" fill={i % 2 ? to : from} opacity={0.55 + i * 0.07} />
          </g>
        ))}
      </svg>
    )
  }

  if (variant === 'funnel') {
    const stages = [
      { w: 236, label: 'Visits' },
      { w: 190, label: 'Leads' },
      { w: 138, label: 'Qualified' },
      { w: 84, label: 'Won' },
    ]
    return (
      <svg viewBox="0 0 300 170" className="w-full max-w-[300px]" role="presentation">
        <rect x="18" y="14" width="264" height="142" rx="10" fill="rgba(8,12,20,0.5)" stroke="rgba(255,255,255,0.1)" />
        {stages.map((stage, i) => (
          <g key={stage.label}>
            <rect
              x={(300 - stage.w) / 2}
              y={30 + i * 28}
              width={stage.w}
              height="20"
              rx="6"
              fill={i === 3 ? to : from}
              opacity={0.75 - i * 0.13}
            />
            <text
              x="150"
              y={43 + i * 28}
              textAnchor="middle"
              className="fill-white/80"
              style={{ font: '600 8px Inter, sans-serif', letterSpacing: '0.16em' }}
            >
              {stage.label.toUpperCase()}
            </text>
          </g>
        ))}
        <rect x="126" y="142" width="48" height="4" rx="2" fill="rgba(255,255,255,0.16)" />
      </svg>
    )
  }

  if (variant === 'inventory') {
    return (
      <svg viewBox="0 0 300 170" className="w-full max-w-[300px]" role="presentation">
        <rect x="18" y="14" width="264" height="142" rx="10" fill="rgba(8,12,20,0.5)" stroke="rgba(255,255,255,0.1)" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const h = [40, 66, 52, 84, 60, 96, 72, 88][i]!
          return (
            <g key={i}>
              <rect x={36 + i * 30} y={132 - h} width="14" height={h} rx="4" fill={i % 2 ? to : from} opacity={0.42 + (i % 3) * 0.14} />
              <rect x={36 + i * 30} y={132 - h - 6} width="14" height="3" rx="1.5" fill="rgba(255,255,255,0.22)" />
            </g>
          )
        })}
        <line x1="30" y1="134" x2="270" y2="134" stroke="rgba(255,255,255,0.14)" />
        <rect x="36" y="28" width="52" height="6" rx="3" fill="rgba(255,255,255,0.26)" />
        <rect x="36" y="40" width="30" height="4" rx="2" fill="rgba(255,255,255,0.12)" />
      </svg>
    )
  }

  // dashboard
  return (
    <svg viewBox="0 0 300 170" className="w-full max-w-[300px]" role="presentation">
      <rect x="18" y="14" width="264" height="142" rx="10" fill="rgba(8,12,20,0.52)" stroke="rgba(255,255,255,0.1)" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={32 + i * 82} y="28" width="70" height="34" rx="7" fill="rgba(255,255,255,0.045)" stroke="rgba(255,255,255,0.08)" />
          <rect x={42 + i * 82} y="38" width="22" height="4" rx="2" fill="rgba(255,255,255,0.16)" />
          <rect x={42 + i * 82} y="48" width={i === 1 ? 40 : 30} height="7" rx="3.5" fill={i === 1 ? to : from} opacity="0.8" />
        </g>
      ))}
      <rect x="32" y="74" width="236" height="68" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" />
      <path
        d="M46 126 L74 112 L102 118 L130 96 L158 104 L186 84 L214 92 L252 70"
        fill="none"
        stroke={to}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {[74, 130, 186, 252].map((x, i) => (
        <circle key={x} cx={x} cy={[112, 96, 84, 70][i]} r="2.6" fill={from} />
      ))}
      <line x1="46" y1="134" x2="252" y2="134" stroke="rgba(255,255,255,0.08)" />
    </svg>
  )
}
