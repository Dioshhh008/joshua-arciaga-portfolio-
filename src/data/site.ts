// All copy and content lives here so the sections stay presentational.

/** Every message from the site should land in this inbox. */
export const contactEmail = 'joshuaarciaga008@gmail.com'

/**
 * Gmail compose window with Joshua's address already in "To" ("su" = subject,
 * "body" = pre-filled message). Used instead of mailto: so the user is taken
 * straight to Gmail.
 */
export const gmailComposeUrl = (opts: { subject?: string; body?: string } = {}) => {
  const parts = [
    'view=cm',
    'fs=1',
    `to=${encodeURIComponent(contactEmail)}`,
    opts.subject ? `su=${encodeURIComponent(opts.subject)}` : null,
    opts.body ? `body=${encodeURIComponent(opts.body)}` : null,
  ].filter(Boolean)
  return `https://mail.google.com/mail/?${parts.join('&')}`
}

/**
 * Shared bio copy: the hero subheader ("intro") and the About me section
 * ("about") carry these exact sentences — joined for the hero, one paragraph
 * each in About.
 */
const bioSentences = [
  "I'm a self-taught career shifter with a background in Computer Science and an interest in building practical software solutions and extracting meaningful insights from data.",
  'I combine analytical thinking with application development to create solutions that are useful, understandable, and maintainable.',
] as const

export const profile = {
  name: 'Joshua Arciaga',
  firstName: 'Joshua',
  lastName: 'Arciaga',
  role: 'Full-Stack Web Developer & Data Analytics Enthusiast',
  location: 'Tanza, Cavite, Philippines',
  shortLocation: 'Tanza, Cavite',
  email: contactEmail,
  intro: bioSentences.join(' '),
  about: [...bioSentences],
  availability: 'Available for freelance',
  socials: [
    { label: 'GitHub', short: 'GitHub', href: 'https://github.com/Dioshhh008' },
    { label: 'LinkedIn', short: 'LinkedIn', href: 'https://www.linkedin.com/in/josharciaga' },
    { label: 'Telegram', short: '@Diosh8', href: 'https://t.me/Diosh8' },
    { label: 'Email', short: 'Email', href: gmailComposeUrl() },
  ],
}

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
] as const

export type NavId = (typeof navItems)[number]['id']

export const stats = [
  { value: '1', label: 'Web Project', detail: 'Vue 2 · Laravel 8 · MySQL', icon: 'code' },
  { value: '2', label: 'Data Analytics Projects', detail: 'Cleaning & visualisation, Python / Jupyter', icon: 'chart' },
  { value: '10+', label: 'Core Technologies', detail: 'Front-end, back-end, databases & BI', icon: 'layers' },
] as const

export const services = [
  {
    icon: 'code',
    accent: 'violet',
    title: 'Full-Stack Web Development',
    body: 'End-to-end web applications: component-driven interfaces, authenticated APIs and a database behind them — built to ship and stay maintainable.',
    tech: ['Vue.js', 'Node.js', 'Laravel', 'JavaScript', 'HTML/CSS'],
  },
  {
    icon: 'chart',
    accent: 'azure',
    title: 'Data Analytics & Visualization',
    body: 'From raw spreadsheet to a clear story: cleaning, exploratory analysis, and dashboards or charts that make the finding obvious at a glance.',
    tech: ['Excel', 'Jupyter Notebook', 'Tableau', 'Matplotlib', 'Seaborn'],
  },
  {
    icon: 'database',
    accent: 'cyan',
    title: 'Database Design & Management',
    body: 'Relational schemas, normalisation and queries written for the questions the business actually asks — in MySQL and Microsoft SQL Server.',
    tech: ['MySQL', 'MSSQL', 'SQL', 'Schema design'],
  },
] as const

export type ProjectCategory = 'Web Development' | 'Data Analytics'

/** One screenshot shown in a project's detail view. */
export interface ProjectFigure {
  src: string
  label: string
  text?: string
}

/** A numbered step in an analytics project's cleaning → visualization process. */
export interface ProjectStep {
  stage: string
  text: string
  src?: string
  caption?: string
}

/** Rich content shown when a project card is clicked open. */
export interface ProjectDetail {
  /** What the build is for (web) / what the analysis explores (analytics). */
  description: string
  /** Web project: page-by-page walkthrough. */
  pages?: ProjectFigure[]
  /** Analytics: data cleaning → visualization walkthrough. */
  steps?: ProjectStep[]
}

export interface Project {
  slug: string
  title: string
  category: ProjectCategory
  kicker: string
  summary: string
  tags: string[]
  accent: [string, string]
  art: 'web' | 'dashboard' | 'trend' | 'segments' | 'funnel' | 'inventory'
  // Optional screenshot. Drop a file in public/images and add its path here to
  // replace the generated artwork on the card.
  cover?: string
  // Optional case study opened when the card is clicked.
  detail?: ProjectDetail
}

export const projects: Project[] = [
  {
    slug: 'amaya3-health-center',
    title: 'Amaya 3 Patient Monitoring & Inventory System',
    category: 'Web Development',
    kicker: 'Barangay health center · Laravel 8 + Vue 2',
    summary:
      'A barangay health-center suite: patient check-ups whose prescriptions auto-deduct stock, EPI immunization and maternity tracking, a stock ledger with an audited movement trail, multi-item supply requests with an approval flow, role-based access for staff vs residents, and a live dashboard of demographics, immunization coverage, consultations and stock levels.',
    tags: ['Laravel 8', 'Vue 2', 'Vuetify 2', 'MySQL', 'Token auth'],
    accent: ['#7c3aed', '#4f7dff'],
    art: 'web',
    cover: '/images/amaya3-dashboard.png',
    detail: {
      description:
        "Built for Barangay Amaya 3's health center: BHW/Admin staff log patient consultations in a Laravel 8 REST API + Vue 2 SPA over MySQL, and any prescribed medicine automatically deducts inventory stock and writes an audited ledger entry. The same system tracks EPI immunization and prenatal/maternity records, derives stock status automatically from level and expiry, and gives residents a role-restricted portal to browse stock and file multi-item supply requests that staff review and approve. Role gating works in the router itself — restricted pages redirect, they are not merely hidden.",
      pages: [
        {
          src: '/images/detail-amaya3-01-login.jpg',
          label: 'Login',
          text: "Single token-based entry for every user — the server response decides the role (no role selector), and 'Remember me' controls token expiry.",
        },
        {
          src: '/images/detail-amaya3-02-dashboard.jpg',
          label: 'Dashboard (BHW)',
          text: 'One-glance live overview: patients, immunizations, monthly consultations and pending follow-ups, plus demographics, immunization-coverage and consultation-trend charts.',
        },
        {
          src: '/images/detail-amaya3-03-checkups.jpg',
          label: 'Patient check-up list',
          text: 'A log of every consultation — the starting point of all patient records — with live search, male/female stat cards and pending follow-ups.',
        },
        {
          src: '/images/detail-amaya3-04-new-checkup.jpg',
          label: 'Dialog: New check-up',
          text: 'Captures the consultation and its prescription in one save — on submit, prescribed medicines automatically deduct stock and write a ledger entry.',
        },
        {
          src: '/images/detail-amaya3-05-records.jpg',
          label: 'Patient records',
          text: 'Folder-style cards per patient that already show check-up counts, prescriptions and whether a follow-up is due; opening one reveals the full history dialog.',
        },
        {
          src: '/images/detail-amaya3-06-immunization.jpg',
          label: 'EPI immunization records',
          text: 'Childhood immunization register per child — vaccine, and where it was given (Amaya 3, Government, Private, Other LGU) — with filters and .xlsx export.',
        },
        {
          src: '/images/detail-amaya3-07-maternity.jpg',
          label: 'Pregnant women tracking',
          text: 'Prenatal monitoring: trimester, gestation weeks and due date are auto-computed from the LMP date; TT doses are tracked and counts broken down per trimester.',
        },
        {
          src: '/images/detail-amaya3-08-inventory.jpg',
          label: 'Inventory (BHW)',
          text: 'Stock ledger with expiry tracking and filters; In Stock / Low Stock / Out of Stock / Expired badges are derived automatically from stock level and expiry.',
        },
        {
          src: '/images/detail-amaya3-09-add-item.jpg',
          label: 'Dialog: Add inventory item',
          text: 'Registers a new medicine or supply — name, category, dosage, quantity, low-stock threshold and expiry — with status flipping to Expired automatically once the date passes.',
        },
        {
          src: '/images/detail-amaya3-10-stock-adjust.jpg',
          label: 'Dialog: Stock adjustment',
          text: 'The only way stock moves without editing an item — Add/Deduct/Set with unit-conversion preview and a required Reason, each save writing an audited ledger row.',
        },
        {
          src: '/images/detail-amaya3-11-requests.jpg',
          label: 'Supply requests (BHW)',
          text: "Where staff review residents' multi-item requests — the expanded row shows requested vs available per item (red when short) with status chips.",
        },
        {
          src: '/images/detail-amaya3-12-review.jpg',
          label: 'Dialog: Review & approve',
          text: 'Final review before stock leaves the shelf — Approve deducts stock and notifies the requester; Reject records a reason and notifies as well.',
        },
        {
          src: '/images/detail-amaya3-13-users.jpg',
          label: 'User management',
          text: 'Admin-only account administration with manual creation, a forced password reset on next login, deletion, and a Patients Without Account tab.',
        },
        {
          src: '/images/detail-amaya3-14-resident-dash.jpg',
          label: 'Dashboard (Resident)',
          text: 'The same live dashboard with resident-level access — restricted routes redirect instead of merely hiding menus — plus a notification bell for request updates.',
        },
        {
          src: '/images/detail-amaya3-15-resident-stock.jpg',
          label: 'Inventory (Resident)',
          text: 'Read-only stock view for residents with a single Request Medicine / Supply click-to-action opening the multi-item request form.',
        },
        {
          src: '/images/detail-amaya3-16-my-requests.jpg',
          label: 'My supply requests',
          text: 'A resident sees only their own requests with status chips, and View Details opens the read-only record.',
        },
        {
          src: '/images/detail-amaya3-17-mobile.jpg',
          label: 'Mobile layout',
          text: 'Responsiveness proof at 390×844 — cards collapse into one column and the sidebar becomes a hamburger menu, matching how field BHWs use the system.',
        },
      ],
    },
  },
  {
    slug: 'chocolate-sales-analysis',
    title: 'Chocolate Sales Performance Analysis',
    category: 'Data Analytics',
    kicker: 'Trend & ranking · Jupyter Notebook',
    summary:
      'Profiled 1,094 chocolate transactions worth 6.19M with ranked bar charts, a monthly trend line and a boxes-vs-amount scatter coloured by country. Revenue is healthily diversified across markets and products — the real performance gap sits between salespeople (a 2.3× spread), and revenue is essentially uncorrelated with boxes shipped (−0.02).',
    tags: ['Jupyter Notebook', 'Python', 'Pandas', 'Seaborn'],
    accent: ['#f59e0b', '#4f7dff'],
    art: 'trend',
    cover: '/images/data-chocolate-sales.png',
    detail: {
      description:
        'Examines 1,094 chocolate sales transactions from 2022 — 6.19M in revenue across 177,007 boxes — to find the strongest markets, products and sales people, check the monthly trend, and test whether order value relates to shipment volume.',
      steps: [
        {
          stage: 'Data cleaning',
          text: 'Loaded the Excel file onto a defensive copy of the original, converted the Date column to datetime and derived a Month column for the time trend.',
          src: '/images/detail-choco-cleaning.jpg',
          caption: 'Date → datetime + Month column',
        },
        {
          stage: 'Visualization',
          text: 'Total sales by country — revenue is evenly spread, Australia 1.14M at the top down to New Zealand 0.95M, all within ~20%.',
          src: '/images/detail-choco-1-country.jpg',
          caption: 'Sales by country',
        },
        {
          stage: 'Visualization',
          text: 'Top 10 products — closely matched: Smooth Sliky Salty 349,692 vs 70% Dark Bites 211,610; no single hero product.',
          src: '/images/detail-choco-2-products.jpg',
          caption: 'Top products',
        },
        {
          stage: 'Visualization',
          text: "Top sales people — the real performance gap sits here: Ches Bonnell 320,901 vs Wilone O'Kielt 138,523, a 2.3× spread.",
          src: '/images/detail-choco-3-sellers.jpg',
          caption: 'Top sales people',
        },
        {
          stage: 'Visualization',
          text: 'Monthly sales trend — fluctuating in a narrow 674k–896k band with no sustained trend; January peaks, April dips.',
          src: '/images/detail-choco-4-trend.jpg',
          caption: 'Monthly trend',
        },
      ],
    },
  },
  {
    slug: 'netflix-titles-analysis',
    title: 'Netflix Titles Availability Analysis',
    category: 'Data Analytics',
    kicker: 'Exploratory analysis · Jupyter Notebook',
    summary:
      'Explored a 50-title best-rated catalogue with rating distributions, top-10 bars and availability visuals: only 38% of titles are on Netflix, availability has nothing to do with IMDB rating (8.76 vs 8.66) but rises strongly with recency (r = 0.43) — flagging missing classics like The Sopranos as clear acquisition candidates.',
    tags: ['Jupyter Notebook', 'Python', 'Matplotlib', 'Pandas'],
    accent: ['#ef4444', '#7c3aed'],
    art: 'segments',
    cover: '/images/data-netflix-analysis.png',
    detail: {
      description:
        'Explores a catalogue of 50 top-rated TV titles — their age ratings, release years and, most importantly, how many are actually available on Netflix (50 rows × 5 columns, no missing values or duplicates — the dataset needed no cleaning).',
      steps: [
        {
          stage: 'Data cleaning',
          text: 'Verified the 50 row × 5 column shape and confirmed no missing values or duplicates — no cleaning rules were needed.',
          src: '/images/detail-netflix-cleaning.jpg',
          caption: 'Completeness check',
        },
        {
          stage: 'Visualization',
          text: 'Titles by rating — the catalogue skews mature: 27 rated 18+, 19 rated 16+, and only 4 rated 7+.',
          src: '/images/detail-netflix-1-ratings.jpg',
          caption: 'Titles by rating',
        },
        {
          stage: 'Visualization',
          text: 'IMDB rating distribution — tightly clustered between 8.0 and 9.5 (mean 8.72): a best-of list, not the full spectrum.',
          src: '/images/detail-netflix-2-imdb.jpg',
          caption: 'IMDB distribution',
        },
        {
          stage: 'Visualization',
          text: 'IMDB rating by Netflix availability — availability is not driven by rating: non-Netflix titles average slightly higher (8.76 vs 8.66).',
          src: '/images/detail-netflix-3-rating-box.jpg',
          caption: 'Rating by availability',
        },
        {
          stage: 'Visualization',
          text: 'Netflix availability — exactly 38% of the titles (19 of 50) are on Netflix; the 62% missing titles flag clear acquisition candidates.',
          src: '/images/data-netflix-analysis.png',
          caption: 'Availability split',
        },
      ],
    },
  },
]

export const projectFilters = ['All', 'Web Development', 'Data Analytics'] as const

export const skillGroups = [
  {
    icon: 'layout',
    title: 'Front-end',
    items: [
      { name: 'HTML / CSS', level: 'Advanced' },
      { name: 'JavaScript', level: 'Advanced' },
      { name: 'Vue.js 2', level: 'Advanced' },
    ],
  },
  {
    icon: 'server',
    title: 'Back-end',
    items: [
      { name: 'Laravel 8', level: 'Proficient' },
      { name: 'Node.js', level: 'Proficient' },
    ],
  },
  {
    icon: 'chart',
    title: 'Data & BI',
    items: [
      { name: 'Python', level: 'Proficient' },
      { name: 'Jupyter Notebook', level: 'Advanced' },
      { name: 'Tableau', level: 'Proficient' },
      { name: 'Matplotlib / Seaborn', level: 'Advanced' },
      { name: 'Excel', level: 'Advanced' },
    ],
  },
  {
    icon: 'database',
    title: 'Databases',
    items: [
      { name: 'MySQL', level: 'Proficient' },
      { name: 'MSSQL', level: 'Proficient' },
      { name: 'SQL querying', level: 'Proficient' },
    ],
  },
] as const

export const highlights = [
  { label: 'Focus', value: 'Full-stack web & analytics' },
  { label: 'Location', value: 'Tanza, Cavite, PH' },
  { label: 'Availability', value: 'Open to freelance' },
  { label: 'Core stack', value: 'Vue · Laravel · Python · SQL' },
] as const
