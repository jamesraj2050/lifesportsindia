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
- **Active feature branch**: `customer-update1` (customer-requested hero/logo/copy updates; **not merged to `main` yet** as of last edit)

---

## Customer update 1 (`customer-update1`) — work summary for agents

> **Branch rule**: User requested all changes stay on `customer-update1` until told otherwise.  
> **Do not edit the plan files** in `.cursor/plans/` when implementing.

### Git / branch

```bash
cd "/Users/apple/Documents/AI Business related/LifesportsIndia/web"
git branch --show-current   # should be customer-update1 while this work is in progress
```

- Branch created from `main` after gallery mobile color commit (`0e2c0c2`).
- Customer-update1 changes were **uncommitted** at time of this README update — run `git status` to confirm.

### Logo + header

| Item | Detail |
|---|---|
| **File** | `public/brand/logo.png`, `src/components/site-header.tsx` |
| **Change** | Replaced logo with customer-provided circular Life Sports India logo |
| **Size** | Header logo container **44px → 66px** (~50% bigger); removed extra `scale-[1.18]` crop |

### Home hero — copy changes

| Item | Detail |
|---|---|
| **Files** | `src/components/home/home-hero.tsx`, `src/components/home/hero-cinematic.tsx` |
| **3 animated phrases** | `Build Character` → **Developing Leaders**; `Create Community` → **Strengthening Communities**; `Inspire Hope` → **Building Character** (colors unchanged: white / terracotta / white) |
| **Removed from hero body** | Repeated `Transforming Lives Through Sport` line; static `Developing Leaders . Strengthening Communities . Building Character` line |
| **Moved to About Us** | Shillong / Bangalore / Punjab paragraph now under **Who We Are** in `src/app/about-us/page.tsx` |
| **Removed from About hero** | Tagline under “About Us” h1 (`Developing Leaders . …`) |

### Home hero — animation (images + phrases)

| Item | Detail |
|---|---|
| **Preload gate** | `useHeroBackgroundsReady()` in `hero-cinematic.tsx` — animation **does not start** until all 4 hero backgrounds load: `hero-1.png`, `hero-2.png`, `hero-3.png`, `hero.jpg` |
| **Phrase reveal** | Newest phrase reveals **letter-by-letter** over **1.35s** (synced to image crossfade); older phrases stay static |
| **Image crossfade** | **1.35s**, ease `[0.21, 0.8, 0.24, 1]` — exported as `HERO_IMAGE_CROSSFADE_S` / `HERO_IMAGE_CROSSFADE_EASE` |
| **Controller timing** | Word reveal starts **with** image index change (no extra `preWordMs` delay for words) |

### Home hero — “LIFE SPORTS INDIA” wordmark

| Item | Detail |
|---|---|
| **When shown** | `imageIndex === 3` (4th background: `hero.jpg`) |
| **Font** | **Oswald** (`font-heading`), left-aligned; **SPORTS** in terracotta |
| **Letter spacing** | `tracking-[0.06em]` / `sm:tracking-[0.07em]` |
| **Text shadow** | `0 1px 2px rgb(0 0 0 / 0.85)` |
| **Fade in (total 4s)** | **0.5s** at 0% opacity → **2s** fade 0→100% → **1.5s** hold at 100% (keyframes in `home-hero.tsx`) |
| **Fade out** | **1.35s**, synced with image transition when cycle restarts (`imageIndex` 3→0) |
| **Removed** | Slow opacity pulse loop; separate `taglineVisible` fade (was out of sync) |

Constants in `hero-cinematic.tsx`:

- `HERO_WORDMARK_FADE_IN_S = 4`
- `HERO_WORDMARK_FADE_IN_DELAY_S = 0.5`
- `HERO_WORDMARK_FADE_IN_DURATION_S = 2`

### Home hero — overlays + readability

| Item | Detail |
|---|---|
| **Slate wash** | `bg-[color:var(--lsi-slate)]/40` (was `/60`) — photo more visible |
| **3 phrases shadow** | Same as body: `0 1px 2px` @ 85% + `0 2px 10px` @ 55% black |
| **Body paragraph shadow** | Same dual text-shadow; text `text-[color:var(--lsi-ivory)]` (100%) |
| **Body paragraph size** | `text-[1.05rem] leading-8` → `sm:text-[1.15rem] sm:leading-9` (reverted from brief 1-step bump) |
| **Body paragraph layout** | Full-width `text-justify` with `[text-align-last:left]`; `hyphens-auto`, `text-pretty`, `lang="en"` |
| **Heading spacing** | `h1` uses `mt-4 mb-6 sm:mt-6 sm:mb-8`; hero container `pt-3 sm:pt-4` (balanced gap above/below heading) |

### Gallery (already on `main`)

| Item | Detail |
|---|---|
| **File** | `src/components/gallery-masonry.tsx`, `src/app/gallery/page.tsx` |
| **Mobile** | Image **nearest viewport center** auto-decolorizes; others stay grayscale |
| **Desktop** | Hover-to-color unchanged |

### Files touched on `customer-update1`

- `public/brand/logo.png`
- `src/components/site-header.tsx`
- `src/components/home/hero-cinematic.tsx` — preload, letter animation, wordmark, overlay, timing constants
- `src/components/home/home-hero.tsx` — copy, spacing, wordmark fade keyframes, body paragraph
- `src/app/about-us/page.tsx` — moved paragraph; removed hero tagline; Strategy section; 3 VMV rows
- `src/components/about/strategy-section.tsx`
- `src/app/growing-impact/page.tsx` — 4 impact event cards
- `src/content/growing-impact-events.ts`
- `src/components/growing-impact/impact-event-card.tsx`
- `public/photos/impact/*.png` (4 event photos)

### Quick revert commands (if customer dislikes a change)

**Wordmark styling only** (restore Nunito + centered badge look):

```bash
git checkout -- src/components/home/hero-cinematic.tsx src/components/home/home-hero.tsx
```

**Single file** (example — body paragraph only):

```bash
git checkout -- src/components/home/home-hero.tsx
```

**Entire branch work** (after commit, use commit hash):

```bash
git log --oneline -5
git revert <commit-hash>
```

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

### Home (`src/app/page.tsx` + `src/components/home/home-hero.tsx`)

- **Hero**: cinematic **4-image** background cycle + Slate overlay + big heading
- **Animated tagline**: Developing Leaders / Strengthening Communities / Building Character (letter-by-letter, synced to images)
- **Wordmark beat**: LIFE **SPORTS** INDIA on 4th image (`hero.jpg`)
- **Body copy**: single justified paragraph (Shillong line **moved to About Us**)
- **Under-banner section**: **image-only mosaic** (no text on images) as requested

### About Us (`src/app/about-us/page.tsx`)

- Editorial split layout (image + text)
- Premium 4 panels: Vision / Mission / Values / Strategy (Slate background, hover lift)
- **Who We Are** includes Shillong / Bangalore / Punjab paragraph (moved from Home hero)
- Hero overlay tagline **removed** (no duplicate “Developing Leaders …” under h1)

### Why Sport Matters (`src/app/why-sport-matters/page.tsx`)

- Storytelling layout, dark section rhythm
- Mandela quote block

### What We Do (`src/app/what-we-do/page.tsx`)

- Section label is **“What We Do”** (removes “initiatives” language)
- Uses the **exact program copy** provided by the user (Tournaments, Clinics, etc.)

### Growing Impact (`src/app/growing-impact/page.tsx`)

- “Recent Impact” section preserved
- **4 event highlight cards** below Recent Impact (`md:grid-cols-2`): image + caption per event
- Data: `src/content/growing-impact-events.ts`; images in `public/photos/impact/`
- Component: `src/components/growing-impact/impact-event-card.tsx`
- Adds **“Future Initiatives”** title + the user-provided expanded copy for:
  - Women in Sports
  - Rural Development Program
  - Career & Skill Development Program

### Gallery (`src/app/gallery/page.tsx`)

- **Masonry layout** (CSS columns) via `src/components/gallery-masonry.tsx`
- **Desktop hover**: grayscale → color + gentle zoom
- **Mobile**: image **closest to screen center** becomes color; others grayscale (scroll-synced)
- Auto-loads image lists from `public/gallery/` via `src/content/gallery.ts`

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
- `public/gallery/women/`*

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
- **Home hero (animation + copy)**: `src/components/home/home-hero.tsx`, `src/components/home/hero-cinematic.tsx`
- **Motion wrapper**: `src/components/reveal.tsx`, `src/components/smooth-scroll.tsx`
- **Gallery content**: `src/content/gallery.ts`, `src/app/gallery/page.tsx`, `src/components/gallery-masonry.tsx`

---

## Command log — after last README1.md update (`customer-update1`)

> **Cut-off**: commands run **after** the **Customer update 1 — work summary for agents** section was first added to this file (user request: *“add the work done with summary to readme1.md”*).  
> **Branch**: all work stayed on `customer-update1`. **No new commits** in this window (still uncommitted as of this append).  
> **Note**: many UI changes in this window were applied via direct file edits (no shell); only **terminal commands** are listed below.

### Git / inspection

```bash
cd "/Users/apple/Documents/AI Business related/LifesportsIndia/web"
git branch --show-current && git diff --stat main...HEAD 2>/dev/null || git diff --stat
```

- **Action**: confirmed active branch `customer-update1` and summarized which files differ from `main` before refreshing README1.

```bash
git status --short && git log main..HEAD --oneline 2>/dev/null; git log -3 --oneline
```

- **Action**: listed uncommitted modified/untracked files and recent commits (`0e2c0c2` gallery mobile color still latest on branch).

```bash
git branch --show-current && git status --short && git log --oneline -5
```

- **Action**: re-checked branch, working tree, and commit history before appending this command log.

### Assets — Growing Impact event photos

```bash
mkdir -p "/Users/apple/Documents/AI Business related/LifesportsIndia/web/public/photos/impact"
```

- **Action**: created folder for Growing Impact event images.

```bash
cp "/Users/apple/.cursor/projects/Users-apple-Documents-AI-Business-related-LifesportsIndia/assets/Isaiah_Kharmawphlang-32cae88d-0aa8-4ea3-9a23-e27fd40a2825.png" \
   "/Users/apple/Documents/AI Business related/LifesportsIndia/web/public/photos/impact/isaiah-kharmawphlang-sunny-mawlong.png"
cp "/Users/apple/.cursor/projects/Users-apple-Documents-AI-Business-related-LifesportsIndia/assets/Brandon_Slay-5a80921f-bf8b-4df9-9e73-52beb531f921.png" \
   "/Users/apple/Documents/AI Business related/LifesportsIndia/web/public/photos/impact/brandon-slay.png"
cp "/Users/apple/.cursor/projects/Users-apple-Documents-AI-Business-related-LifesportsIndia/assets/Wesley_Fluellen2004-9349a12e-05b2-4562-9cd0-90dd5485f3a2.png" \
   "/Users/apple/Documents/AI Business related/LifesportsIndia/web/public/photos/impact/wesley-fluellen.png"
cp "/Users/apple/.cursor/projects/Users-apple-Documents-AI-Business-related-LifesportsIndia/assets/Chandigarh_University-f1eeb618-7ca0-430b-b8f0-7ec4f6002baa.png" \
   "/Users/apple/Documents/AI Business related/LifesportsIndia/web/public/photos/impact/chandigarh-university-ezek.png"
```

- **Action**: saved 4 customer-provided photos with descriptive filenames (Isaiah/Sunny, Brandon Slay, Wesley Fluellen, Ezek at Chandigarh University).

```bash
ls -la "/Users/apple/Documents/AI Business related/LifesportsIndia/web/public/photos/impact/"
```

- **Action**: verified all 4 PNGs exist and sizes look correct (~113–171 KB each).

### Build verification

```bash
cd "/Users/apple/Documents/AI Business related/LifesportsIndia/web"
npm run build
```

- **Action**: production build after Growing Impact + other `customer-update1` edits; **compiled successfully**, types valid, 12 static pages generated, **exit code 0** (run ~Jun 21–22 2026 session).

### Work completed in this window (no shell — for agent context)

| Area | Change |
|---|---|
| **Home (large screens)** | `lg:min-h-[80vh]` on hero; mosaic tiles `lg:h-80` / `xl:h-96` |
| **Home hero image 4** | `objectPositionLg: 50% 18%` + gentler Ken Burns on lg for `hero.jpg` |
| **About Us** | Strategy moved to full-width section below photo; VMV = 3 stacked rows; removed LSI labels + accent lines; photo stretch + `md:scale-110`; VMV body `text-base` |
| **Growing Impact** | 4 event cards (2×2 grid); content in `growing-impact-events.ts`; removed **NEXT** label + card underlines in Future Initiatives |
| **Contact** | Removed intro *“Design should feel premium and minimal.”*; removed underlines under Send Message / Information headings |

### Files touched in this window (add to list above)

- `src/app/page.tsx` — mosaic heights on lg/xl
- `src/app/contact-us/page.tsx` — heading underlines + intro removed
- `public/photos/impact/*.png` (4 new)

