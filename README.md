# Joshua Arciaga — Portfolio

**Live: https://joshuaarciaga.netlify.app** — hosted on Netlify (static client +
Netlify Function for the contact form), auto-rebuilt from GitHub on every push.

A single-page portfolio for a full-stack web developer and data analyst: a fixed
sidebar dashboard on desktop, a slide-in drawer on mobile, glassmorphism cards and
neon purple/blue accents on a deep slate canvas.

Sections: hero, stats, about, services, filterable projects (the Amaya 3 health
center system plus two Jupyter notebook analytics studies), skills and
contact (with a working `/api/contact` endpoint that delivers to Gmail).

## Run it

```sh
bun install
bun run dev        # http://localhost:3000
bun run build      # dist/client (assets) + dist/portfolio/index.js (Worker)
```

## Contact form email delivery

The form posts to the Worker at `/api/contact` (validation happens in the
browser and is re-checked server-side). Pressing **Send** delivers the message
**directly** to **joshuaarciaga008@gmail.com** on the server through the Resend
HTTP API — the visitor never leaves the page. The visitor's address is set as
`reply_to`, so replying from the inbox goes straight back to the sender.

If the API key is missing or the provider hiccups, the form shows a friendly
error (plus the direct address) instead of redirecting anywhere.

The one-off setup, once, on the deployed host:

1. Sign up at resend.com using **joshuaarciaga008@gmail.com** (the free
   `onboarding@resend.dev` sender may only deliver to the account owner's own
   email — which is exactly this inbox).
2. Create an API key and set it as an environment variable on the deployed
   host: **Netlify** → Site configuration → Environment variables (or
   `npx netlify-cli env:set RESEND_API_KEY "re_…" --secret`).
3. Optional: override the receiving inbox with a `CONTACT_TO_EMAIL` variable.

Every *other* email touchpoint on the page — the hero "Let's Talk" button, the
contact card's email pill and the Email social icons — links directly to Gmail
compose (`view=cm`) with Joshua's address pre-filled in the **To** field.

## Make it yours

- `src/data/site.ts` holds all copy and content: profile, nav, stats, services,
  projects, skills and highlights. The email and the Gmail compose helper live
  there too (`contactEmail`, `gmailComposeUrl`).
- **Profile photo:** `public/images/profile.jpg` (generated from `profile1.png`
  at 900px, JPEG quality 88). Swap the file and the hero avatar updates; delete
  it and the hero falls back to a glowing "JA" monogram.
- **Project cards:** the web-development card shows the real Amaya 3 dashboard
  screenshot (`public/images/amaya3-dashboard.png`); each analytics card shows
  a real notebook screenshot from `DataAnalysisProject/…/screenshots` (copied
  into `public/images`). To change a cover, drop a new file in `public/images`
  and update the `cover` path in `src/data/site.ts` — the generated artwork is
  still there as a fallback when `cover` is omitted.
- **CV:** the sidebar button is marked "Coming soon". Drop the PDF in `public/`
  and swap the button for an `<a download>` when it is ready.
- **Social links:** GitHub / LinkedIn / Facebook are still placeholders
  (`href: '#'`) — update them in `profile.socials`.
- `src/styles.css` holds the tokens: colours, glass and glow utilities, motion.
  Motion respects `prefers-reduced-motion`.

## Deploy to Netlify

The live site runs on Netlify: the static client from `vite build` plus a
Netlify Function (`netlify/functions/contact.ts`, exposed at `/api/contact`
via `config.path`) that hosts the contact endpoint — same-origin for the form,
no CORS setup. The client build publishes from `dist/client` (`netlify.toml`).

```sh
npx netlify-cli login            # one-time browser sign-in
npx netlify-cli deploy --build --prod
```

After the first deploy, set `RESEND_API_KEY` as an environment variable
(UI: Site configuration → Environment variables, or the CLI command above),
then test the contact form on the live URL. Connecting the GitHub repo in
the Netlify UI gives automatic rebuilds on every push.

A Cloudflare Worker (`src/worker/index.ts`) still works as a backup host —
it shares the exact same validation + delivery code (`src/lib/contact-delivery.ts`).
