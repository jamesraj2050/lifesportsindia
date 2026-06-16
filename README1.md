# Life Sports India — UX Redesign (Work Summary so far)

This file is a **handoff/context document for agents** working in this repo.  
Scope: **UX redesign only** (layout, typography, motion, imagery, spacing). **Content + information architecture** are preserved and/or updated only where the user explicitly provided replacement copy.

---

## Current state

- **Framework**: Next.js **15.5.19**, React 19, TypeScript, App Router
- **Styling**: Tailwind v4 + shadcn UI base styles
- **Motion / UX**: Framer Motion + Lenis smooth scrolling
- **Icons**: lucide-react
- **Images**: Next/Image, local assets in `public/`
- **Build**: `npm run build` succeeds

---

## Folder rename note (LifesportsOrg → LifesportsIndia)

- This project was originally worked on under a folder named `LifesportsOrg` and later renamed to `LifesportsIndia`.
- If you see any old absolute paths in past notes/scripts, update them to the new folder name.

Example rename command:

```bash
mv "LifesportsOrg" "LifesportsIndia"
```

---

## What was implemented

### Pages (routes)

Navigation labels and ordering are preserved:

- `/` (Home)
- `/about-us`
- `/why-sport-matters`
- `/what-we-do`
- `/growing-impact`
- `/gallery`
- `/partner-with-us`
- `/contact-us`

### Home (`src/app/page.tsx`)

- **Hero**: cinematic image background + Slate overlay + big heading
- **Under-banner section**: **image-only mosaic** (no text on images) as requested
- **Copy**: uses the user-provided paragraph additions (Shillong/Bangalore/Punjab line)

### About Us (`src/app/about-us/page.tsx`)

- Editorial split layout (image + text)
- Premium 4 panels: Vision / Mission / Values / Strategy (Slate background, hover lift)
- Tagline included: “Developing Leaders . Strengthening Communities . Building Character”

### Why Sport Matters (`src/app/why-sport-matters/page.tsx`)

- Storytelling layout, dark section rhythm
- Mandela quote block

### What We Do (`src/app/what-we-do/page.tsx`)

- Section label is **“What We Do”** (removes “initiatives” language)
- Uses the **exact program copy** provided by the user (Tournaments, Clinics, etc.)

### Growing Impact (`src/app/growing-impact/page.tsx`)

- “Recent Impact” section preserved
- Adds **“Future Initiatives”** title + the user-provided expanded copy for:
  - Women in Sports
  - Rural Development Program
  - Career & Skill Development Program

### Gallery (`src/app/gallery/page.tsx`)

- **Masonry layout** (CSS columns)
- **Hover treatment**: grayscale → color + gentle zoom
- Auto-loads image lists from `public/gallery/`** via `src/content/gallery.ts`

### Shared layout

- **Header** (`src/components/site-header.tsx`):
  - Transparent on hero, sticky, blur after scroll
  - Mobile menu (drawer-like section)
  - Uses logo from `public/brand/logo.png`
- **Footer** (`src/components/site-footer.tsx`):
  - Dark Slate footer, nav links, newsletter form, contact links

### Brand + typography tokens

- Brand colors in `src/app/globals.css`:
  - `--lsi-slate: #163444`
  - `--lsi-bronze: #983e18`
  - `--lsi-terracotta: #df9869`
  - `--lsi-ivory: #efe9d4`
  - `--lsi-ink: #0b0f12`
- Fonts set in `src/app/layout.tsx`:
  - Body: **Nunito Sans**
  - Heading: **Oswald** (placeholder “sharp” condensed heading).  
  Note: user requested “sharp like allstarsacademy”; swap later once the exact font/source is confirmed.

---

## Key commands (and why)

> Excludes Node.js installation commands by request.  
> **Note**: Terminal history wasn’t available in the current Cursor terminal logs, so this is a **reconstructed runbook** based on the repo state + packages/assets present on disk.

### Bootstrap the Next.js app (one-time)

```bash
cd "/Users/apple/Documents/AI Business related/LifesportsIndia"
npx create-next-app@latest web --ts --tailwind --eslint --app --src-dir --use-npm
```

- **Action**: creates a Next.js App Router project in `web/` (this repo matches that structure).

### Enter the app folder

```bash
cd "/Users/apple/Documents/AI Business related/LifesportsIndia/web"
```

- **Action**: moves into the Next.js app (the git repo is inside `web/`).

### Install dependencies

```bash
npm install
```

- **Action**: installs `node_modules` from `package-lock.json`.

### Initialize shadcn UI (one-time)

```bash
npx shadcn@latest init --defaults --base radix --yes --css-variables --no-rtl --force
```

- **Action**: writes `components.json`, wires shadcn to Tailwind v4 globals, and enables adding shadcn components consistently.

### Add the shadcn `Button` component

```bash
npx shadcn@latest add button --yes
```

- **Action**: generates `src/components/ui/button.tsx` used across the site.

### Add UX libraries (motion/scroll/icons)

```bash
npm install framer-motion lenis lucide-react react-countup
```

- **Action**: adds motion primitives (Framer Motion), smooth scroll (Lenis), icons (Lucide), and count-up support.

### Run the dev server

```bash
npm run dev
```

- **Action**: starts local development server (usually at `http://localhost:3000`).

### Lint (optional)

```bash
npm run lint
```

- **Action**: runs ESLint (note build ignores ESLint; see “ESLint during build” below).

### Production build (TypeScript validation)

```bash
npm run build
```

- **Action**: validates types and ensures the app can ship (Next production build).

### Start the production server (optional)

```bash
npm run start
```

- **Action**: serves the production build locally (useful to verify prod behavior).

### Upgrade/downgrade Next to v15 (when required)

```bash
npm install next@15 eslint-config-next@15
```

- **Action**: aligns the stack to the requirement: **Next.js 15** (only needed if you drift versions).

---

## Asset setup (what exists on disk)

### Logo

- `public/brand/logo.png` (copied from workspace `Logo.png`)

### Home/About photos (hero/mosaic/splits)

- `public/photos/hero.jpg`
- `public/photos/mosaic-1.jpg`
- `public/photos/mosaic-2.jpg`
- `public/photos/mosaic-3.jpg`
- `public/photos/about-hero.jpg`
- `public/photos/about-split.jpg`

### Gallery photos

- `public/gallery/football/`*
- `public/gallery/basketball/`*
- `public/gallery/women/*`

`src/content/gallery.ts` reads these folders at build-time (Node `fs`) and exports URL lists for the gallery page.

### Asset folder creation + copy commands (reproducible)

If you’re redoing assets from the project root folder (the one that contains `Logo.png` and the `images/` folder), these are the typical commands:

```bash
mkdir -p "web/public/brand" "web/public/photos" "web/public/gallery/football" "web/public/gallery/basketball" "web/public/gallery/women"
cp "Logo.png" "web/public/brand/logo.png"
cp -R "images/Football Pictures for the gallery/"* "web/public/gallery/football/"
cp -R "images/Gallery Basketball/"* "web/public/gallery/basketball/"
cp -R "images/Women in sports/"* "web/public/gallery/women/"
```

- **Action**: creates the required `public/` folders and copies logo + gallery images into the `web/` app.

---

## Notable implementation details / gotchas

### ESLint during build

In Next 15, the repo hit ESLint flat-config resolution issues. To keep builds unblocked:

- `next.config.ts` sets:
  - `eslint.ignoreDuringBuilds = true`

Linting can still be run separately with `npm run lint`.

### Lenis options typing

Lenis v1 types do not include `smoothTouch`. The smooth scroll wrapper removed that option to satisfy TypeScript:

- `src/components/smooth-scroll.tsx`

---

## Files to look at first

- **Brand + fonts**: `src/app/layout.tsx`, `src/app/globals.css`
- **Nav structure**: `src/components/site-nav.ts`
- **Header/Footer**: `src/components/site-header.tsx`, `src/components/site-footer.tsx`
- **Motion wrapper**: `src/components/reveal.tsx`, `src/components/smooth-scroll.tsx`
- **Gallery content**: `src/content/gallery.ts`, `src/app/gallery/page.tsx`

