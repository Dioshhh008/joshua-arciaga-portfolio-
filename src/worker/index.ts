import { Hono } from 'hono'

import {
  contactFailureResponse,
  deliverContactMessage,
  validateContact,
  type ContactBody,
} from '../lib/contact-delivery'

type Env = {
  ASSETS: Fetcher
  /** Resend API key (Sites → Secrets). When missing, the form falls back to Gmail compose. */
  RESEND_API_KEY?: string
  /** Optional override for the receiving inbox. */
  CONTACT_TO_EMAIL?: string
}

const app = new Hono<{ Bindings: Env }>()

app.get('/api/health', (c) => c.json({ ok: true }))

// Contact form on the Worker (Cloudflare host). Validation and Resend delivery
// live in the shared module — the Netlify Function (netlify/functions/contact.ts)
// exposes the exact same endpoint, so every host behaves identically and the
// visitor never leaves the page.
app.post('/api/contact', async (c) => {
  const body = await c.req.json<ContactBody>().catch(() => ({}) as ContactBody)

  const check = validateContact(body)
  if (!check.ok) return c.json({ error: check.error }, check.status)

  const delivery = await deliverContactMessage(
    { apiKey: c.env.RESEND_API_KEY, recipient: c.env.CONTACT_TO_EMAIL },
    check.payload,
  )

  if (delivery === 'sent') return c.json({ ok: true })

  const failure = contactFailureResponse(delivery)
  return c.json(failure.body, failure.status)
})

app.all('*', (c) => c.env.ASSETS.fetch(c.req.raw))

export default app
