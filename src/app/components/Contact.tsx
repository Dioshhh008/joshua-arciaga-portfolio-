import { useState } from 'react'

import { gmailComposeUrl, profile } from '../../data/site'
import type { IconName } from './icons'
import { Icon } from './icons'
import { SectionHeading } from './SectionHeading'

const socialIcons: Record<string, IconName> = {
  GitHub: 'github',
  LinkedIn: 'linkedin',
  Telegram: 'telegram',
  Email: 'mail',
}

type Status = 'idle' | 'sending' | 'sent' | 'error'

const fields = [
  { name: 'name', label: 'Your name', type: 'text', placeholder: 'Juan Dela Cruz', autoComplete: 'name' },
  { name: 'email', label: 'Email address', type: 'email', placeholder: 'you@company.com', autoComplete: 'email' },
] as const

export function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending') return

    const form = event.currentTarget
    const data = new FormData(form)
    const payload = {
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      message: String(data.get('message') ?? '').trim(),
    }

    setStatus('sending')
    setMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const body = (await response.json().catch(() => ({}))) as { error?: string }

      if (!response.ok) {
        // Delivering to my inbox happens on the server (Resend). If that is
        // not configured or fails, show a friendly error — no redirects.
        // The worker's error text is complete and visitor-facing.
        setStatus('error')
        setMessage(body.error ?? `Something went wrong sending your message. You can reach me directly at ${profile.email}.`)
        return
      }

      setStatus('sent')
      setMessage('Thanks — your message is in. I usually reply within 24 hours.')
      form.reset()
    } catch {
      setStatus('error')
      setMessage(
        `Could not reach the server. Check your connection and try again, or mail me directly at ${profile.email}.`,
      )
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-28">
      <SectionHeading
        index="05"
        eyebrow="Contact"
        title={<span id="contact-title">Let&apos;s work together!</span>}
        description="Have a website to build or a dataset to untangle? Send a message and I'll get back to you."
      />

      <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="flex flex-col gap-3">
          <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-gradient-to-br from-neon-deep/70 via-[#4c22a3]/60 to-azure/55 p-6 halo">
            <span
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-12 size-40 rounded-full bg-white/25 blur-3xl"
            />
            <span className="relative inline-flex items-center gap-2 rounded-full bg-black/25 px-2.5 py-1 text-[10px] tracking-[0.12em] text-white/90 uppercase ring-1 ring-white/20 ring-inset">
              <span className="size-1.5 animate-pulse-soft rounded-full bg-emerald-300" />
              {profile.availability}
            </span>
            <p className="relative mt-4 font-display text-[20px] leading-snug text-white">
              Have a project in mind? Let&apos;s make it real.
            </p>
            <div className="relative mt-5 space-y-2.5">
              <a
                href={gmailComposeUrl({ subject: 'Hello Joshua — project inquiry' })}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl bg-white/[0.12] px-3.5 py-3 text-[12.5px] text-white ring-1 ring-white/20 ring-inset transition hover:bg-white/20"
              >
                <Icon.mail className="size-4 shrink-0" />
                <span className="truncate">{profile.email}</span>
                <Icon.arrowUpRight className="ml-auto size-3.5 shrink-0 opacity-70" />
              </a>
              <div className="flex items-center gap-3 rounded-xl bg-black/20 px-3.5 py-3 text-[12.5px] text-white/85 ring-1 ring-white/10 ring-inset">
                <Icon.pin className="size-4 shrink-0" />
                {profile.location}
              </div>
            </div>
          </div>

          <div className="glass rounded-[22px] p-5">
            <p className="eyebrow">Find me online</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {profile.socials.map((social) => {
                const Glyph = Icon[socialIcons[social.label] ?? 'globe']
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="flex items-center gap-2 rounded-xl border border-line bg-white/[0.025] px-3 py-2.5 text-[12px] text-muted transition hover:-translate-y-0.5 hover:border-neon/40 hover:text-fg"
                  >
                    <Glyph className="size-3.5" />
                    {social.short}
                    <Icon.arrowUpRight className="ml-auto size-3 text-faint" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="glass rounded-[22px] p-5 sm:p-6">
          <div className="grid gap-3.5 sm:grid-cols-2">
            {fields.map((field) => (
              <div key={field.name}>
                <label htmlFor={`contact-${field.name}`} className="mb-1.5 block text-[11px] tracking-[0.06em] text-faint uppercase">
                  {field.label}
                </label>
                <input
                  id={`contact-${field.name}`}
                  name={field.name}
                  type={field.type}
                  required
                  autoComplete={field.autoComplete}
                  placeholder={field.placeholder}
                  className="w-full rounded-xl border border-line bg-[#0a0f1a]/80 px-3.5 py-2.5 text-[13px] text-fg placeholder:text-faint/70 transition focus:border-neon/60 focus:bg-[#0b1220] focus:outline-none focus:ring-2 focus:ring-neon/20"
                />
              </div>
            ))}
          </div>

          <div className="mt-3.5">
            <label htmlFor="contact-message" className="mb-1.5 block text-[11px] tracking-[0.06em] text-faint uppercase">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              placeholder="Tell me about the project, the data, or the role…"
              className="w-full resize-y rounded-xl border border-line bg-[#0a0f1a]/80 px-3.5 py-3 text-[13px] leading-relaxed text-fg placeholder:text-faint/70 transition focus:border-neon/60 focus:bg-[#0b1220] focus:outline-none focus:ring-2 focus:ring-neon/20"
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-neon to-azure px-5 py-3 text-[13px] font-semibold text-white shadow-[0_16px_40px_-18px_rgba(124,58,237,0.95)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Message sent' : 'Send Message'}
              <Icon.send className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
            <p className="text-[11px] text-faint">Usually replies within 24 hours.</p>
          </div>

          <div aria-live="polite" className="min-h-0">
            {message && (
              <p
                role={status === 'error' ? 'alert' : 'status'}
                className={[
                  'mt-3 flex items-start gap-2 rounded-xl border px-3.5 py-2.5 text-[12px]',
                  status === 'error'
                    ? 'border-rose-400/25 bg-rose-400/10 text-rose-200'
                    : 'border-emerald-400/25 bg-emerald-400/10 text-emerald-200',
                ].join(' ')}
              >
                {status === 'error' ? <Icon.close className="mt-0.5 size-3.5 shrink-0" /> : <Icon.check className="mt-0.5 size-3.5 shrink-0" />}
                {message}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}
