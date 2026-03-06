# SpectraCodex

A curated drop-based directory of vibe-coded apps and tools. Built with Next.js, Tailwind CSS, and zero backend.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding a listing

Edit `data/listings.json` and add an entry:

```json
{
  "slug": "your-tool-slug",
  "title": "Your Tool Name",
  "pitch": "One-sentence description. Max 120 chars.",
  "audience": "Who specifically this tool is for.",
  "problem": "One sentence: what painful thing does it solve?",
  "ctaLink": "https://yourtool.com",
  "ctaLabel": "Try it free",
  "priceModel": "free",
  "thumbnail": "https://example.com/thumbnail.png",
  "screenshots": [
    "https://example.com/screenshot-1.png",
    "https://example.com/screenshot-2.png"
  ],
  "demoScript": [
    "Step 1 of the core flow.",
    "Step 2 of the core flow.",
    "Step 3 of the core flow.",
    "Step 4 of the core flow."
  ],
  "contact": "you@example.com",
  "tags": ["tool", "productivity"],
  "dateAdded": "2026-03-05",
  "featured": false
}
```

Rules:
- `slug`: lowercase alphanumeric and hyphens only
- `pitch`: max 120 characters
- `priceModel`: must be `free`, `freemium`, or `paid`
- `screenshots`: at least 1 entry
- `demoScript`: at least 2 entries
- `dateAdded`: ISO date string (`YYYY-MM-DD`)

## Creating a drop

Edit `data/drops.json` and add an entry:

```json
{
  "slug": "drop-2026-04-01",
  "title": "SpectraCodex Drop #2",
  "date": "2026-04-01",
  "description": "A brief description of this drop's theme.",
  "listingSlugs": ["your-tool-slug", "another-tool-slug"],
  "published": true
}
```

Set `published: false` to keep a draft drop hidden until it's ready.

## Validating data

```bash
npm run validate
```

Checks all required fields, pitch length, priceModel values, array minimums, and cross-references between drops and listings. Exits 0 on success.

## Building for production

```bash
npm run validate
npm run build
```

Output is in the `/out` directory — a fully static site, no server required.

## Deploying

### Vercel (recommended)
1. Push to GitHub
2. Import the repo in Vercel
3. Vercel auto-detects Next.js; the static export config handles the rest

### Cloudflare Pages / GitHub Pages
- Build command: `npm run build`
- Output directory: `out`

## Newsletter setup

`components/NewsletterForm.tsx` uses a Google Form for zero-backend email collection:

1. Create a Google Form with an email field
2. Find the form action URL and entry field name from the form's HTML source
3. Replace `REPLACE_WITH_FORM_ID` and `REPLACE_WITH_ENTRY_ID` in `NewsletterForm.tsx`

## Submit URL

`app/submit/page.tsx` links to a GitHub Issue template. Replace `OWNER` with your GitHub username.

## Project structure

```
spectracodex/
├── app/
│   ├── about/
│   ├── browse/
│   ├── drops/[slug]/
│   ├── jam/
│   ├── listing/[slug]/
│   ├── submit/
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── page.tsx
├── components/
│   ├── CopyButton.tsx
│   ├── DropCard.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── ListingCard.tsx
│   ├── NewsletterForm.tsx
│   ├── SearchBar.tsx
│   └── TagFilter.tsx
├── data/
│   ├── listings.json
│   └── drops.json
├── lib/
│   └── data.ts
├── public/
│   └── favicon.svg
├── scripts/
│   └── validate-data.js
└── templates/
    └── posting-kit.md
```
