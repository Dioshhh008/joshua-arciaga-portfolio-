// Netlify Function port of the portfolio contact endpoint (POST /api/contact).
// It shares the exact same validation + Resend delivery code as the Cloudflare
// Worker (src/lib/contact-delivery.ts), so the contact form behaves identically
// on every host that serves this site.
//
// `config.path` below publishes this function at /api/contact — the same path
// the form already calls — so it stays same-origin: no CORS setup needed.

import {
  contactFailureResponse,
  deliverContactMessage,
  validateContact,
  type ContactBody,
} from '../../src/lib/contact-delivery'

// Netlify injects secrets (RESEND_API_KEY, CONTACT_TO_EMAIL) as Node runtime
// environment variables. Only server bundles import this file.
declare const process: { env: Record<string, string | undefined> }

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })

export default async function handler(req: Request) {
  if (req.method !== 'POST') return json({ error: 'Method not allowed.' }, 405)

  const body = (await req.json().catch(() => ({}))) as ContactBody

  const check = validateContact(body)
  if (!check.ok) return json({ error: check.error }, check.status)

  const delivery = await deliverContactMessage(
    { apiKey: process.env.RESEND_API_KEY, recipient: process.env.CONTACT_TO_EMAIL },
    check.payload,
  )

  if (delivery === 'sent') return json({ ok: true })

  const failure = contactFailureResponse(delivery)
  return json(failure.body, failure.status)
}

export const config = { path: '/api/contact' }
