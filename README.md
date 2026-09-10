# Jaya Madhuri — Portfolio

Personal portfolio and technical knowledge site for **enterprise banking frontend work** (Angular CBX web, Cordova mobility) and **personal full-stack projects**. Built with **React 18** and **Vite**, with a tech blog, AI prompt vault, dual themes, and validated contact flow.

**Live focus:** Frontend Developer · Intellect Design Arena Ltd — Indian Bank CBX, IDFC First Bank & Bank of Baroda mobility (maintained).

---

## Tech stack

| Area | Tools |
|------|--------|
| UI | React 18, Tailwind CSS, Framer Motion, Lucide icons |
| Build | Vite 5 |
| Routing | React Router v6 (`/`, `/blog`, `/blog/:slug`, `/ai-vault`) |
| Content | Markdown blog (`react-markdown`, `remark-gfm`), PrismJS code blocks |
| Forms | React Hook Form + [EmailJS](https://www.emailjs.com/) |
| SEO | `react-helmet-async` (title, description, Open Graph) |

---

## Features

- **Hero** — Profile photo, SPOT Award highlight, resume download (PDF validation), client trust line, metrics
- **About & skills** — Banking-domain narrative and skill pills
- **Experience timeline** — Theme-aware illustrative mockups (web login + Android login), SPOT Award highlighting
- **Work & projects** — Featured Indian Bank CBX summary (NDA-safe) + filterable grid; personal projects with **live demos**, docs, and **GitHub**
- **Education**, **Design thinking**, **AI & design tooling** (certifications, tools grid, prompt-engineering notes)
- **Tech blog** — Searchable/filterable articles with detail pages and TOC
- **AI Vault** — Searchable prompts and keyboard shortcuts (`/ai-vault`)
- **Contact** — Validated form (EmailJS or demo mode without keys)
- **UX** — Dark / light theme, custom scroll rail, skip link, responsive layout (mobile profile card)

---

## Personal projects (linked in app)

| Project | Demo | GitHub |
|---------|------|--------|
| Web Performance Analyzer | [Live](https://web-performance-analyzer-f257b.web.app/) | [Performance-analyzer](https://github.com/Jayamadhuri263/Performance-analyzer) |
| ChatterJoy | [Live](https://chat-app-9601c.web.app/home/) | [ChatterJoy](https://github.com/Jayamadhuri263/ChatterJoy) |

Professional banking cards intentionally omit client demos (confidential work).

---

## Getting started

**Requirements:** Node.js 18+ and npm.

```bash
git clone https://github.com/Jayamadhuri263/jaya-portfolio.git
cd jaya-portfolio
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Production build

```bash
npm run build
npm run preview
```

Output is in `dist/`.

---

## Configuration

### EmailJS (contact form)

1. Create a free account at [emailjs.com](https://www.emailjs.com/).
2. Copy `.env.example` to **`.env.local`** (gitignored).
3. Set:

   ```env
   VITE_EMAILJS_SERVICE_ID=service_xxxxx
   VITE_EMAILJS_TEMPLATE_ID=template_xxxxx
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. Restart `npm run dev`. For production, set the same `VITE_*` variables in your host’s build environment and rebuild.

If keys are missing, the form runs in **demo mode** (logs payload, shows success UI for local testing).

### Static assets

| Path | Purpose |
|------|---------|
| `public/images/profile.jpg` | Hero profile photo |
| `public/resume/jaya-madhuri-resume.pdf` | Resume download (`Jayamadhuri_Resume.pdf` filename in browser) |
| `public/images/experience/*.svg` | Light/dark experience illustrations |
| `public/icons/ai/*` | AI tooling logos |

---

## Deploy (SPA)

Client-side routes need a fallback to `index.html`.

- **Firebase Hosting** — `firebase.json` included (`firebase deploy` after `npm run build`).
- **Netlify / similar** — `public/_redirects` → `/* /index.html 200` (copied into `dist` on build).

Ensure `public/resume/` and `public/images/profile.jpg` are present before building so downloads and photos work in production.

---

## Project structure

```
src/
├── components/
│   ├── ai-vault/        # Prompt search & shortcuts widget
│   ├── blog/            # Cards, markdown, code blocks, TOC
│   ├── contact/         # Contact form
│   ├── education/       # Education section
│   ├── experience/      # Timeline
│   ├── home/            # Hero, About, Design Thinking, AI section
│   ├── layout/          # Navbar, footer, scroll helpers, scroll rail
│   ├── portfolio/       # Project grid
│   └── seo/             # Helmet meta tags
├── context/             # ThemeProvider (dark / light)
├── data/                # Experience, projects, blog articles, AI prompts, contact
├── pages/               # Home, Blog, BlogDetail, AIVault
└── utils/               # Resume download, helpers, SPOT award highlight

public/
├── images/              # Profile, experience art
├── icons/ai/            # Tool logos
├── resume/              # PDF resume
└── _redirects           # SPA fallback for static hosts
```

Content is mostly **data-driven** (`src/data/*.js`) so copy and projects can be updated without touching layout code.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server (port 5173) |
| `npm run build` | Production bundle to `dist/` |
| `npm run preview` | Serve `dist/` locally |

---

## License

Private — © Jaya Madhuri. All rights reserved.
