# MiniModding Website — Claude Code Project Brief

## What this site is

A personal mods showcase site for MiniModding (BeamNG.drive mods). Each mod gets its own dedicated page. The site has a mods listing page, individual mod pages, a dark/light mode toggle, changelogs, image carousels, and download links. No user accounts. No comments. Just a clean presentation layer.

---

## Hosting: GitHub Pages

The site is hosted on GitHub Pages, which serves **static files only**. This means:

- No Node.js server running in production
- No secret API keys can be hidden server-side at runtime
- Everything is baked into static HTML/CSS/JS at build time OR fetched client-side from a public API

### Deployment approach

Use **Next.js with `output: 'export'`** (fully static). This gives:
- File-based routing
- Easy component structure
- Static export that GitHub Pages can serve
- A GitHub Actions workflow to auto-build and deploy on push to `main`

---

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Next.js (static export) | Claude Code knows it well, great ecosystem |
| Styling | Tailwind CSS | Fast, consistent, dark mode built-in |
| Content | JSON files in `/content/mods/` | No backend needed, edit files to update site |
| Images | Supabase Storage (public bucket) | Free, CDN-backed, avoids bloating the git repo |
| Changelog history | JSON per mod | Versioned, stored in the same content files |
| Icons | Lucide React | Clean, no emojis, consistent |
| Deployment | GitHub Actions → GitHub Pages | Automatic on every push |

---

## API Keys Situation

### Short answer: You only need ONE key, and it's safe to expose.

| Service | Key type | Safe to expose? | Used for |
|---------|----------|-----------------|----------|
| Supabase | `anon` key | YES — it's public by design | Reading images/data from public bucket |
| Supabase | `service_role` key | NO — never put in frontend | Only for admin writes — use Supabase dashboard instead |

Because all image hosting goes through a **public Supabase Storage bucket**, the anon key (which is read-only for public buckets) is fine in the frontend code. You never need the service role key in the site itself.

Store the anon key in a `.env.local` file locally and as a GitHub Actions secret. Next.js bakes `NEXT_PUBLIC_` prefixed vars into the static bundle at build time — this is expected and fine for public Supabase keys.

### Environment variables needed

```
NEXT_PUBLIC_SUPABASE_URL=https://yourproject.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

These go in:
- `.env.local` (local dev, gitignored)
- GitHub repo Settings → Secrets and variables → Actions (for the build pipeline)

---

## Content Structure

All mod content lives in `/content/mods/` as JSON files. One file per mod.

### Example: `/content/mods/mini-mega-car-pack.json`

```json
{
  "id": "mini-mega-car-pack",
  "name": "Mini's Mega Car Pack",
  "slug": "mini-mega-car-pack",
  "tagline": "130+ cars. Every one tested. Every one configured.",
  "featured": true,
  "isPaid": false,
  "starred": true,
  "game": "BeamNG.drive",
  "coverImage": "https://yourproject.supabase.co/storage/v1/object/public/mod-images/mmcp/cover.jpg",
  "images": [
    "https://yourproject.supabase.co/storage/v1/object/public/mod-images/mmcp/shot1.jpg",
    "https://yourproject.supabase.co/storage/v1/object/public/mod-images/mmcp/shot2.jpg",
    "https://yourproject.supabase.co/storage/v1/object/public/mod-images/mmcp/shot3.jpg"
  ],
  "description": "The most curated car pack for BeamNG.drive. Every vehicle is individually tested, configured from scratch, and given custom thumbnails. No broken mods. No filler.",
  "downloads": [
    {
      "label": "Free Download (Modsfire)",
      "url": "https://modsfire.com/yourlink",
      "type": "free"
    },
    {
      "label": "Subscriber Download (Google Drive)",
      "url": "https://drive.google.com/yourlink",
      "type": "paid"
    }
  ],
  "changelogs": [
    {
      "version": "2.5",
      "date": "2025-06-08",
      "notes": [
        "Added 15 new vehicles",
        "Replaced broken Trabant 601 with working alternative",
        "Custom thumbnails for all 130 cars",
        "All default presets removed — custom configs for every car"
      ]
    },
    {
      "version": "2.4",
      "date": "2024-12-01",
      "notes": [
        "Added Porsche and Volvo packs",
        "Fixed config issues on 8 vehicles"
      ]
    }
  ]
}
```

### Mods listing index: `/content/mods/index.json`

A lightweight list used for the mods page (avoids loading full JSON for every mod).

```json
[
  {
    "id": "mini-mega-car-pack",
    "name": "Mini's Mega Car Pack",
    "slug": "mini-mega-car-pack",
    "starred": true,
    "isPaid": false,
    "coverImage": "https://...",
    "tagline": "130+ cars. Every one tested. Every one configured."
  }
]
```

---

## Site Pages

### `/` — Homepage
- Minimal. Brand name, short description, link to mods page.
- Featured mod highlight (the one with `"featured": true`).
- Dark by default.

### `/mods` — Mods listing
- Grid of mod cards.
- Star icon on cards where `"starred": true` — visually distinct (gold star) to signal premium/notable mods.
- Filter or just visual separation between free and paid via the star system.

### `/mods/[slug]` — Individual mod page
- Image carousel at top (arrow navigation, dots indicator).
- Mod name, tagline, description.
- Download links section (styled differently for free vs paid).
- Changelog section: shows latest version, collapsible arrow to see older versions.

---

## Dark/Light Mode

- **Default: dark mode**
- Toggle button in the navbar
- Button text: "Switch to light mode" (when in dark) / "Switch to dark mode" (when in light)
- Icon: moon (dark mode) / sun (light mode)
- Use `next-themes` package for persistence via `localStorage`
- Tailwind's `darkMode: 'class'` strategy

---

## Image Carousel Requirements

- Supports 1 or more images
- Arrow buttons left/right (hidden if only 1 image)
- Dot indicators below
- Keyboard navigation (left/right arrow keys)
- No autoplay — user-controlled only
- The cover image is always index 0

---

## Changelog Component Requirements

- Shows the most recent version by default
- Version number + date displayed prominently
- Bullet list of changes
- A small arrow/chevron button below to expand and show previous versions
- Previous versions shown in reverse chronological order
- Collapse back down with same button

---

## Star System (Free vs Paid distinction)

On the `/mods` listing page:
- A star icon (Lucide `Star`) appears on mod cards where `"starred": true`
- This is the visual indicator for mods you want to highlight — in practice, this means paid/premium mods or your flagship release
- A small legend at the top of the mods page: "Starred mods require a subscription"
- No login, no paywall on the site itself — download links handle that externally

---

## Folder Structure (for Claude Code)

```
minimodding-site/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions build + deploy
├── content/
│   └── mods/
│       ├── index.json           # Lightweight list for /mods page
│       └── mini-mega-car-pack.json
├── public/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout, theme provider
│   │   ├── page.tsx             # Homepage
│   │   └── mods/
│   │       ├── page.tsx         # Mods listing
│   │       └── [slug]/
│   │           └── page.tsx     # Individual mod page
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── ModCard.tsx
│   │   ├── ImageCarousel.tsx
│   │   ├── ChangelogAccordion.tsx
│   │   └── DownloadButton.tsx
│   └── lib/
│       └── mods.ts              # Helper to read mod JSON files
├── .env.local                   # gitignored
├── .env.example                 # committed — shows required vars without values
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## GitHub Actions Deploy Workflow

Save this as `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./out
      - id: deployment
        uses: actions/deploy-pages@v4
```

---

## next.config.ts settings required for GitHub Pages

```ts
const nextConfig = {
  output: 'export',        // Static export
  trailingSlash: true,     // Required for GitHub Pages routing
  images: {
    unoptimized: true,     // Required for static export (no image optimization server)
  },
}
```

---

## Supabase Storage Setup (one-time, manual)

1. Go to Supabase dashboard → Storage
2. Create a bucket named `mod-images`
3. Set it to **Public**
4. Upload images folder by folder (e.g. `mmcp/cover.jpg`, `mmcp/shot1.jpg`)
5. Copy the public URL format: `https://[project].supabase.co/storage/v1/object/public/mod-images/[path]`
6. Paste those URLs into your mod JSON files

No Supabase client library needed in the site itself if you're just using direct image URLs. The anon key is only needed if you ever query the Supabase database directly.

---

## Design Direction

- Dark mode default, minimal, no emojis anywhere
- Typography: something with personality — not Inter or system fonts
- Color accent: consider a deep amber or electric blue against dark backgrounds
- Clean card grid on the mods page
- Generous whitespace
- The star icon should feel intentional, not decorative — use filled gold star vs empty star outline
- No animations that feel gratuitous — subtle hover lifts, smooth theme transitions

---

## What you do NOT need

- No authentication system
- No database (content is JSON files)
- No server-side API routes
- No user accounts or comments
- No analytics API (can add simple privacy-respecting analytics later)
- No payment integration on the site (handled externally via BuyMeACoffee/Stripe)

---

## First steps for Claude Code session

1. `npx create-next-app@latest minimodding-site --typescript --tailwind --app --src-dir`
2. Install: `npm install next-themes lucide-react`
3. Set up `next.config.ts` for static export
4. Create the content JSON structure
5. Build components in order: Navbar → ThemeToggle → ModCard → ImageCarousel → ChangelogAccordion → DownloadButton
6. Wire up pages
7. Set up GitHub Actions workflow
8. Add secrets to GitHub repo
