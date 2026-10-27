# 🧭 PROJECT MAP — Joshua Arciaga Portfolio

Gabay para madaling makapag-navigate at makapag-debug ang proyektong ito.
Huling update: 2026-10-27 (pagkatapos ng 3-project trim + case-study modal feature).

---

## 1. Ang ginamit na lengwahe / stack

| Tulong | Gamit | Saan |
|---|---|---|
| **TypeScript** — ang programming language ng buong site | UI, logic, API — lahat `.ts` / `.tsx` | `src/` |
| **React 19** | UI library (components, hooks) | `package.json` |
| **Tailwind CSS v4** | Styling — utility classes + theme tokens | `src/styles.css` |
| **Vite 8** | Dev server (hot reload) + production bundler | `vite.config.ts` |
| **Hono** | API routing framework sa backend (Cloudflare host) | `src/worker/index.ts` |
| **Netlify Functions** | Live host ng `/api/contact` endpoint (serverless) | `netlify/functions/contact.ts` |
| **Cloudflare Workers** (+ wrangler, `@cloudflare/vite-plugin`) | Backup/optional host — parehong shared logic ang gamit | `src/worker/index.ts` |
| **motion** (framer-motion) | Animations — filter pill, modal, floating chips | `motion/react` |

Isang linya: **TypeScript ang wika ng buong proyekto** — React sa front-end,
Hono API sa Cloudflare Worker sa back-end, Tailwind CSS sa styling.

---

## 2. Daloy ng app (entry points)

```
index.html
  └─ src/main.tsx            → React bootstrap (createRoot + StrictMode)
       └─ src/app/App.tsx    → page shell — binubuo ang buong pahina

src/worker/index.ts          → Cloudflare Worker host ng API (backup/optional)
netlify/functions/contact.ts → Netlify Function host ng API (live site: /api/contact)
src/lib/contact-delivery.ts ⭐ → SHARED logic — validation + Resend delivery
                                (ginagamit ng dalawang host sabay)
```

Pagkakasunod ng sections sa `App.tsx`:
**Hero → Stats → About → Services → Projects → Skills → Contact** + footer.

---

## 3. Kumpletong mapa ng folder

```
portfolio3/
├── index.html                     HTML shell (may <div id="root">)
├── package.json                   scripts: dev / build / typecheck / preview
├── vite.config.ts                 plugins: react + tailwindcss + cloudflare; port 3000
├── README.md                      dokumentasyon + Resend/email setup
├── scripts/postbuild.mjs          tumatakbo pagkatapos ng vite build
│
├── public/images/                 LAHAT NG IMAHE (30 file ngayon)
│   ├── profile.jpg                avatar (720×900 portrait, galing sa profile1.png)
│   ├── amaya3-dashboard.png       cover ng Amaya 3 card
│   ├── data-chocolate-sales.png   cover ng Chocolate Sales card
│   ├── data-netflix-analysis.png  cover ng Netflix card
│   ├── detail-amaya3-01..17.jpg   17 page screenshots — Amaya 3 case study
│   ├── detail-choco-*.jpg         5 notebook screenshots — Chocolate case study
│   └── detail-netflix-*.jpg       4 notebook screenshots — Netflix case study
│
├── profile1.png / profile1nobg.png  ORIHINAL NA SOURCE ng avatar — huwag burahin
│
├── Amaya3PatientMonitoringandInventorySystem/
│   └── README.md + 25 screenshots   SOURCE ng web-project case study content
│
├── DataAnalysisProject/            SOURCES ng 6 notebook studies (may natanggal na
│   └── <folder>/DOCUMENTATION.md     project sa site, pero nananatili ang sources)
│      + screenshots/NN.png
│
├── netlify.toml                    Netlify config — build command (npm run build →
│                                   dist/client), SPA redirect, local dev block
├── netlify/functions/contact.ts ⭐ NETLIFY FUNCTION — nag-eexpose ng POST
│                                   /api/contact sa live site (via `config.path`);
│                                   same-origin ang form fetch → walang CORS;
│                                   nagbabasa sa env vars: RESEND_API_KEY +
│                                   optional CONTACT_TO_EMAIL (Netlify UI/CLI)
└── src/
    ├── main.tsx                   React entry — i-mount ang <App/> sa #root
    ├── styles.css        ⭐ TEMA DITO: neon/azure color tokens, glass card,
    │                            blueprint background, animate-* keyframes, fonts
    │
    ├── data/
    │   └── site.ts       ⭐⭐ SINGLE SOURCE OF TRUTH — lahat ng CONTENT dito:
    │                          contactEmail (joshuaarciaga008@gmail.com)
    │                          gmailComposeUrl({subject, body}) — Gmail compose na
    │                            may prefilled To:
    │                          profile — name, intro (hero subheader), about[]
    │                            paragraphs, socials[] (GitHub/LinkedIn/Telegram/
    │                            Email + totoong URLs)
    │                          stats — 1 Web Project · 2 Data Analytics · 10+ Tech
    │                          services, skillGroups, highlights, navItems
    │                          projects[] — 3 entries lang ngayon (Amaya 3,
    │                            Chocolate, Netflix), bawat isa may cover +
    │                            detail { description, pages[] (web) o
    │                            steps[] (analytics) — ang case study content }
    │
    ├── app/
    │   ├── App.tsx                page shell: Backdrop, Sidebar, MobileBar,
    │   │                          MobileDrawer, section order, footer
    │   │                          NOTE: ang MobileDrawer ("Site navigation") ay
    │   │                          isa pang role="dialog" sa DOM — makikita ito
    │   │                          sa browser QA kaya i-scope ang selectors
    │   │                          sa aria-label ng project dialog
    │   ├── hooks/
    │   │   └── useActiveSection.ts   scroll-spy — aling nav item ang aktibo
    │   │
    │   └── components/
    │       ├── Hero.tsx           greeting + subheader bio + circular avatar
    │       │                        (ang <img> ay may object-[50%_18%] — kaunting
    │       │                        space sa itaas ng ulo sa loob ng bilog)
    │       │                        + "Let's Talk" = Gmail compose link (target _blank)
    │       ├── Stats.tsx          3 stat cards (babasa sa site.ts `stats`)
    │       ├── About.tsx          2 paragraph na About Me + 3 badges
    │       │                        (Career shifter · Self-taught · Computer Science)
    │       ├── Services.tsx       3 service cards galing sa site.ts `services`
    │       ├── Projects.tsx   ⭐  filter tabs (All 3 / Web Dev 1 / Data 2 — awtomatik
    │       │                        ang bilang) + project grid; ang mga card ay
    │       │                        role="button" — clickable, may Enter/Space support
    │       │                        at hover hint na "View case study"
    │       ├── ProjectDetail.tsx ⭐  case study modal — buong-screen dialog
    │       │                        · Escape / × button / backdrop click = isara
    │       │                        · naka-lock ang body scroll habang bukas
    │       │                        · web project → "Pages of the build" — 17
    │       │                          figure, kada isa may label + kung para saan
    │       │                        · analytics → "Summary of findings" +
    │       │                          "Data cleaning → visualization" — 5 numbered
    │       │                          steps na may totoong notebook screenshots
    │       ├── ProjectArt.tsx     card art — nagre-render ng `cover` img kapag
    │       │                        may cover (lahat ng 3 project may cover ngayon,
    │       │                        kaya hindi ginagamit ang SVG sketch fallback —
    │       │                        pero naka-code pa rin ito bilang fallback)
    │       ├── Skills.tsx         skill groups + antas (galing `skillGroups`)
    │       ├── Contact.tsx    ⭐  email form — POST /api/contact, DIREKTANG
    │       │                        paghahatid (walang Gmail redirect sa bisita);
    │       │                        green success note o red friendly error;
    │       │                        kasama rito ang email chip + "Find me online" grid
    │       ├── Sidebar.tsx        desktop rail nav + FOLLOW ME social icon buttons
    │       ├── icons.tsx          custom SVG icon set (github, linkedin, telegram,
    │       │                        mail, chart, code, database, …)
    │       └── SectionHeading.tsx numbered header (01 / 02 / 03… + eyebrow + title)
    │
    ├── lib/
    │   └── contact-delivery.ts ⭐ SHARED SERVER LOGIC — ginagamit ng Worker AT ng
    │                              Netlify Function: validateContact() (re-check
    │                              server-side), deliverContactMessage() (Resend
    │                              HTTP API), contactFailureResponse() (friendly
    │                              error copy) — isang code path, parehong
    │                              behavior kahit saang host
    │
    └── worker/
        └── index.ts      ⭐ Cloudflare Worker host (backup/optional):
                           POST /api/contact → shared validate + deliver
                           → joshuaarciaga008@gmail.com
                           · RESEND_API_KEY = secret; kapag wala → 503 na may
                             friendly error (NEVER nagre-redirect ang bisita)
                           · CONTACT_TO_EMAIL = optional secret override;
                             default ay ang contactEmail sa site.ts
                           · reply_to = email ng visitor (para ang reply ay
                             deretso sa kanila)
```

---

## 4. Paano i-debug

### Patakbuhin / beripikasyon
```bash
bun run dev          # http://localhost:3000 — hot reload
bun run typecheck    # tsc --noEmit — TypeScript checker
bun run build        # vite build && node scripts/postbuild.mjs → production bundle
bun run preview      # i-preview ang built bundle nang lokal
```

### Kadalasang problema
| Problema | Saan tingnan | Paano i-fix |
|---|---|---|
| "Port 3000 is in use" | stale node process | `Get-CimInstance Win32_Process -Filter "Name='node.exe'"` → hanapin ang may `vite` sa CommandLine → `Stop-Process -Id <pid> -Force` |
| Maling text/copy | `src/data/site.ts` | dito LAHAT ng content — isang file lang ang kailangan hanapan |
| Hindi nag-load ang imahe | path sa `site.ts` vs `public/images/` | dapat eksakto `/images/<filename>` at naroon ang file sa `public/images` |
| Kulay/layout | `src/styles.css` | theme tokens dito (neon family #7c3aed, azure, glass treatment) |
| TypeScript error | `bun run typecheck` | laging dapat pumasa bago mag-deploy |
| "delivery not configured" sa form | `RESEND_API_KEY` env var | NORMAL sa LOCAL dev (walang key sa lokal); live sa Netlify: Site configuration → Environment variables (o `npx netlify-cli env:set RESEND_API_KEY "re_…" --secret`); Cloudflare backup: `wrangler secret put` |
| compatibility date warning | workers runtime sa desktop | warning lang, walang epekto sa deployment |

### Pinakamahalagang 2 file
1. **`site.ts`** — lahat ng text, projects, stats, socials. Bawat project entry:
   `{ slug, title, category, kicker, summary, tags, accent, art, cover, detail }`
2. **`src/lib/contact-delivery.ts`** — shared email flow + validation; ito ang
   ginagamit ng parehong Worker at Netlify Function.

---

## 5. Email flow (buod)

```
Visitor nag-fill ng form  →  POST /api/contact (same-origin — walang CORS)
     │
     ├─ LIVE SITE (Netlify):    netlify/functions/contact.ts
     └─ BACKUP (Cloudflare):    src/worker/index.ts (Hono)
     │
     →  validateContact()       ─┐
     →  deliverContactMessage() ─┴─ shared: src/lib/contact-delivery.ts
     →  Resend HTTP API
     →  joshuaarciaga008@gmail.com
        (reply_to = email ng visitor)
```
- May key pero pumalya ang send → **502** + friendly error.
- Walang key → **503** + friendly error na kasama ang email sa note (walang redirect).
- Lahat ng IBA pang email touchpoints — Hero "Let's Talk", email chip, "Email" social
  icon — Gmail compose link (`view=cm`) na may prefilled **To:**.

---

## 6. Deployment — Netlify (bago)

Ang live site ay **Netlify** (free plan): static client + Netlify Function para sa
`/api/contact` — kaya 100% gumagana ang email sa live URL, walang CORS, at walang
dependensya sa Cloudflare.

1. **Account** — mag-sign up sa netlify.com (free; pwede ang GitHub login).
2. **I-deploy** (alinman):
   - CLI lang, walang GitHub: `npx netlify-cli login` (bubukas ang browser) →
     `npx netlify-cli deploy --build --prod`
   - O i-connect ang GitHub repo sa Netlify UI → awtomatik na magre-rebuild
     sa bawat push (pinakamaganda kung ipupush ang repo)
3. **Email secret** — pagkatapos ng unang deploy:
   `npx netlify-cli env:set RESEND_API_KEY "re_…" --secret`
   (o Site configuration → Environment variables sa Netlify UI).
   Optional: `CONTACT_TO_EMAIL` override.
4. **Test** — buksan ang live URL, i-submit ang form, i-verify ang inbox.

---

## 7. Estado ng mga nagawa (hanggang 2026-10-27)

- ✅ **3 projects lang**: Amaya 3 (web) · Chocolate Sales · Netflix Titles — tinanggal
  ang HR, Customer Segmentation, Marketing Campaign, Average Time Spent (kasama ang
  kanilang 22 unused image files)
- ✅ **Clickable cards + case study modal** na may totoong screenshots
  (17 Amaya pages · 5 choco figures · 4 netflix figures) — lahat verified na
  naglo-load, 0 broken
- ✅ **Socials**: GitHub `Dioshhh008` · LinkedIn `josharciaga` · Telegram `@Diosh8`
- ✅ **Bio text**: kapareho sa hero subheader at About Me (isang shared source:
  `bioSentences` sa site.ts)
- ✅ **Avatar**: buong 720×900 portrait sa `public/images/profile.jpg`; may kaunting
  headroom sa itaas ng ulo via `object-[50%_18%]` sa `Hero.tsx` (walang binago sa
  mismong file)
- ✅ **Contact form**: direkta ang paghahatid (Resend) — walang Gmail redirect;
  kailangan lang ng `RESEND_API_KEY` sa production para 100% gumana
- ✅ **Netlify-ready**: shared logic (`src/lib/contact-delivery.ts`) + Netlify
  Function (`netlify/functions/contact.ts`) + `netlify.toml` + `.gitignore` —
  naka-QA na ang form flow (tsc / vite build / live form submit sa local dev)
- ✅ `tsc` / `vite build` / postbuild: lahat pumasa; 0 console errors sa QA

---

## 8. Estado ng hosting — Netlify (code TAPos na, pending ang account + deploy)

Pinili ang **Netlify** bilang host (mas maganda kaysa GitHub Pages dito dahil may
Netlify Functions — server-side na talaga, hindi pure static). Eto ang estado:

**Tapos na (2026-10-27):**
- ✅ `src/lib/contact-delivery.ts` — shared validation + Resend delivery
- ✅ `netlify/functions/contact.ts` — Function na nag-eexpose ng `/api/contact`
  (same-origin ang form; walang CORS setup)
- ✅ `netlify.toml` — build (`npm run build` → `dist/client`), SPA redirect,
  at `[dev]` block (tumatakbo ang vite + functions sa `npx netlify-cli dev`)
- ✅ `.gitignore` — node_modules / dist / .netlify / .wrangler / env files
- ✅ `src/worker/index.ts` — na-refactor para gamitin ang shared logic;
  nananatiling "Cloudflare backup host" kung ever kailangan
- ✅ QA: form submit → validasyon + friendly 503 sa local (inexpect, walang
  local key); `tsc` at `vite build` pumasa

**Natitira (lahat button/login lang — walang kulang na code):**
1. Netlify account → `npx netlify-cli login` (o GitHub sign-in sa UI)
2. I-deploy: `npx netlify-cli deploy --build --prod` — o i-connect ang GitHub
   repo para awtomatik na mag-rebuild sa bawat push
3. I-set ang `RESEND_API_KEY` env var sa Netlify (UI o CLI)
4. I-test ang form sa live URL — dapat pumasok sa inbox

*(Wakas ng dokumento — balikan ito sa pag-deploy at mga susunod na update.)*
