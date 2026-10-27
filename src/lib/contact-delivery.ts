// Shared contact-form server logic. Used by the Cloudflare Worker
// (src/worker/index.ts) and the Netlify Function (netlify/functions/contact.ts)
// so both hosts validate and deliver messages identically: the form validates
// in the browser as well, but never trust the client — re-check here.

import { contactEmail } from '../data/site'

export type ContactBody = { name?: string; email?: string; message?: string }

/** Status codes the contact endpoint may answer with. */
export type ContactErrorStatus = 400 | 502 | 503

export type ContactPayload = { name: string; email: string; message: string }

export type DeliveryRuntime = {
  /** Resend API key. When missing, delivery reports `not_configured`. */
  apiKey?: string
  /** Optional override for the receiving inbox. */
  recipient?: string
}

export function validateContact(
  body: ContactBody,
): { ok: true; payload: ContactPayload } | { ok: false; error: string; status: ContactErrorStatus } {
  const name = body.name?.trim() ?? ''
  const email = body.email?.trim() ?? ''
  const message = body.message?.trim() ?? ''

  if (name.length < 2) return { ok: false, status: 400, error: 'Please add your name.' }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, status: 400, error: 'Enter a valid email address.' }
  if (message.length < 10) return { ok: false, status: 400, error: 'Tell me a little more about the project.' }

  return { ok: true, payload: { name, email, message } }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&#38;')
    .replace(/</g, '&#60;')
    .replace(/>/g, '&#62;')
    .replace(/"/g, '&#34;')
    .replace(/'/g, '&#39;')
}

export type DeliveryResult = 'sent' | 'not_configured' | 'failed'

// Delivers to my inbox on the server via the Resend HTTP API — the visitor
// never leaves the page. Requirements: RESEND_API_KEY from a Resend account
// whose own email matches the recipient, because the onboarding@resend.dev
// sender may only deliver to the account owner.
export async function deliverContactMessage(env: DeliveryRuntime, payload: ContactPayload): Promise<DeliveryResult> {
  const apiKey = env.apiKey
  if (!apiKey) {
    console.warn('RESEND_API_KEY not set — contact message could not be delivered.')
    return 'not_configured'
  }

  const recipient = env.recipient?.trim() || contactEmail
  const subject = `Portfolio message from ${payload.name}`

  const text = [
    'New message from the portfolio contact form:',
    '',
    `Name:    ${payload.name}`,
    `Email:   ${payload.email}`,
    '',
    payload.message,
  ].join('\n')

  const html = [
    '<p style="font-family:Segoe UI,Arial,sans-serif;margin:0 0 12px">New message from the <strong>portfolio contact form</strong>:</p>',
    '<p style="font-family:Segoe UI,Arial,sans-serif;margin:0;line-height:1.6">',
    `  <strong>Name:</strong> ${escapeHtml(payload.name)}<br>`,
    `  <strong>Email:</strong> ${escapeHtml(payload.email)}`,
    '</p>',
    '<hr style="border:none;border-top:1px solid #e2e8f0;margin:14px 0">',
    `<p style="font-family:Segoe UI,Arial,sans-serif;margin:0;line-height:1.6;white-space:pre-line">${escapeHtml(payload.message)}</p>`,
  ].join('')

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: [recipient],
        reply_to: payload.email,
        subject,
        text,
        html,
      }),
    })

    if (response.ok) return 'sent'

    // Log provider detail for observability.
    const detail = await response.text().catch(() => '')
    console.error(`Resend delivery failed (${response.status}): ${detail.slice(0, 400)}`)
    return 'failed'
  } catch (error) {
    console.error(`Resend delivery error: ${error instanceof Error ? error.message : String(error)}`)
    return 'failed'
  }
}

// Friendly, visitor-facing error copy for a failed delivery attempt
// (`not_configured` → key still missing; `failed` → provider hiccup).
const directLine = ` You can also reach me directly at ${contactEmail}.`

export function contactFailureResponse(delivery: 'not_configured' | 'failed' | DeliveryResult): {
  body: { ok: false; error: string }
  status: ContactErrorStatus
} {
  const notConfigured = delivery === 'not_configured'
  return {
    body: {
      ok: false,
      error: notConfigured
        ? `Message delivery is not configured yet.${directLine}`
        : `Something went wrong sending your message. Please try again in a moment.${directLine}`,
    },
    status: notConfigured ? 503 : 502,
  }
}
