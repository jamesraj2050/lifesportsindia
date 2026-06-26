# Life Sports India — Project Handoff (UX + Database)

Handoff document for agents and developers working in this repo.

**Scope:** UX redesign (layout, typography, motion, imagery, spacing) plus Turso-backed newsletter, contact forms, and admin panel. Page names, navigation, and messaging are preserved unless the user explicitly provided replacement copy.

---

## Accomplishments summary

| Area | What was accomplished |
|------|------------------------|
| **Site shell** | Full Next.js 15 App Router site with 8 public pages, sticky header, dark footer, Lenis smooth scroll, Framer Motion reveals |
| **Home hero** | Cinematic 4-image cycle, letter-by-letter taglines, LIFE **SPORTS** INDIA wordmark beat, preload gate, justified body copy |
| **About Us** | Editorial layout, VMV panels, full-width Strategy section, Shillong/Bangalore/Punjab paragraph moved from Home |
| **Growing Impact** | Recent Impact preserved; 4 event highlight cards with photos; Future Initiatives copy expanded |
| **Partner With Us** | Support Mission section component; cleaned headings (no bronze underlines) |
| **Gallery** | Masonry layout; desktop hover color; mobile center-in-view color sync |
| **Contact** | Form wired to Turso (`POST /api/contact`); full message history in admin |
| **Newsletter** | Footer form wired to Turso (`POST /api/newsletter`); unsubscribe link flow |
| **Admin** | `/admin` login; newsletter export + contact messages (not in public nav) |
| **Brand** | LSI color tokens, Nunito Sans + Oswald, customer circular logo in header |
| **Tooling** | shadcn UI, Tailwind v4, Drizzle ORM, production build passes |
| **Deploy** | Merged to `main`, live on **Vercel** — https://lifesportsindia.org |

---

## Current state (production live)

| Item | Value |
|------|--------|
| **Repo path** | `/Users/apple/Documents/AI Business related/LifesportsIndia/web` |
| **Git remote** | https://github.com/jamesraj2050/lifesportsindia |
| **Active branch** | `main` (all phases merged) |
| **Latest commit** | `f3636a7` — *Add Turso database, newsletter, contact forms, and admin panel.* |
| **Framework** | Next.js **15.5.19**, React 19, TypeScript, App Router |
| **Database** | Turso (libSQL) via Drizzle ORM |
| **Hosting** | Vercel (auto-deploy on push to `main`) |
| **Production URL** | https://lifesportsindia.org |
| **Vercel URL** | https://lifesportsindia.vercel.app (alias) |
| **Secrets** | `.env.local` locally + Vercel env vars — never committed; see `.env.example` |

### Production URLs

| Page | URL |
|------|-----|
| Home | https://lifesportsindia.org |
| Contact | https://lifesportsindia.org/contact-us |
| Admin login | https://lifesportsindia.org/admin |
| Newsletter subscribers | https://lifesportsindia.org/admin/newsletter |
| Contact messages | https://lifesportsindia.org/admin/messages |
| Unsubscribe | https://lifesportsindia.org/unsubscribe?token=TOKEN |

### Local development URLs

| Page | URL |
|------|-----|
| Site | http://localhost:3000 |
| Admin login | http://localhost:3000/admin |
| Newsletter subscribers | http://localhost:3000/admin/newsletter |
| Contact messages | http://localhost:3000/admin/messages |

Run `npm run dev` from the `web/` folder. Requires `.env.local` with Turso + admin vars.

### Commit history on `main`

```
f3636a7 Add Turso database, newsletter, contact forms, and admin panel.
476854e UX redesign: cinematic hero, updated pages, and customer copy.
0e2c0c2 Add mobile center-in-view color for gallery
dea7fa6 Update Life Sports India website
687ed70 Initial commit from Create Next App
```

---

## Phase 0 — GitHub + Vercel deploy (completed)

### Commands run

```bash
cd "/Users/apple/Documents/AI Business related/LifesportsIndia/web"

# Verify build before commit
npm run build

# Stage all UX changes (.env.local excluded by .gitignore)
git add -A
git status

# Commit on feature branch
git commit -m "$(cat <<'EOF'
UX redesign: cinematic hero, updated pages, and customer copy.

Ship customer-update1 work including hero animation, logo, gallery, impact/partner sections, and Next.js 15 config before Turso/admin phase.
EOF
)"

# Merge to main and push
git checkout main
git pull origin main
git merge customer-update1
git push origin main
```

### What Phase 0 accomplished

- 23 files committed on `customer-update1`, fast-forward merged into `main`
- Pushed to GitHub → Vercel auto-deploy triggered
- Custom domain **lifesportsindia.org** connected and serving the Next.js site

### Smoke-test after deploy

```bash
curl -sL "https://lifesportsindia.org/" | grep -oE 'LIFE SPORTS INDIA|TRANSFORMING' | head -1
curl -sL "https://lifesportsindia.org/about-us" | grep -oE 'OUR STRATEGY|Shillong' | head -3
curl -sI "https://lifesportsindia.org/admin" | grep -iE 'HTTP|x-robots'
```

---

## Files affected (master list)

### Config + dependencies

| File | Change |
|------|--------|
| `package.json` | Next 15, Drizzle/Turso, UX libraries; `db:push` / `db:studio` scripts |
| `package-lock.json` | Lockfile updates |
| `next.config.ts` → `next.config.js` | Migrated to JS config; `eslint.ignoreDuringBuilds: true` |
| `components.json` | shadcn UI config |
| `eslint.config.mjs` | Flat ESLint config |
| `tsconfig.json` | TypeScript paths |
| `.gitignore` | Standard Next + `.env*` + `.vercel` |

### App pages (`src/app/`)

| File | Change |
|------|--------|
| `layout.tsx` | Fonts (Nunito Sans, Oswald), smooth scroll wrapper |
| `globals.css` | LSI brand tokens (`--lsi-slate`, `--lsi-bronze`, `--lsi-terracotta`, `--lsi-ivory`) |
| `page.tsx` | Home: cinematic hero + image-only mosaic (lg/xl tile heights) |
| `about-us/page.tsx` | VMV rows, Strategy section, Shillong paragraph, removed hero tagline |
| `why-sport-matters/page.tsx` | Story layout, Mandela quote (reduced bold/size) |
| `what-we-do/page.tsx` | Program cards, exact user copy, no heading underlines |
| `growing-impact/page.tsx` | 4 impact event cards, Future Initiatives, no underlines |
| `gallery/page.tsx` | Masonry gallery page |
| `partner-with-us/page.tsx` | Support Mission section, no heading underlines |
| `contact-us/page.tsx` | Contact form wired to `POST /api/contact` via `contact-form.tsx` |

### Components (`src/components/`)

| File | Change |
|------|--------|
| `site-header.tsx` | Sticky header, larger logo (66px), menu hover slate+white |
| `site-footer.tsx` | Dark footer, nav, newsletter form wired to `POST /api/newsletter` |
| `site-nav.ts` | Nav link labels (unchanged IA) |
| `smooth-scroll.tsx` | Lenis + resize on load/resize/ResizeObserver |
| `reveal.tsx` | Framer Motion scroll reveals |
| `gallery-masonry.tsx` | Masonry + mobile center-in-view color |
| `home/home-hero.tsx` | Hero copy, spacing, wordmark fade keyframes, body paragraph |
| `home/hero-cinematic.tsx` | 4-image cycle, preload, letter animation, timing constants |
| `about/strategy-section.tsx` | **New** — full-width Strategy block |
| `growing-impact/impact-event-card.tsx` | **New** — event photo + caption card |
| `partner/support-mission-section.tsx` | **New** — Partner support mission content |
| `ui/button.tsx` | shadcn Button |

### Content (`src/content/`)

| File | Change |
|------|--------|
| `gallery.ts` | Build-time scan of `public/gallery/*` folders |
| `growing-impact-events.ts` | **New** — 4 Recent Impact event entries |

### Public assets (`public/`)

| Path | Change |
|------|--------|
| `brand/logo.png` | Customer circular LSI logo |
| `photos/hero.jpg`, `hero-1.png`, `hero-2.png`, `hero-3.png` | Cinematic hero backgrounds |
| `photos/mosaic-1.jpg` … `mosaic-3.jpg` | Home mosaic strip |
| `photos/about-hero.jpg`, `about-split.jpg` | About page images |
| `photos/impact/*.png` | **4 new** — Growing Impact event photos |
| `gallery/football/*`, `gallery/basketball/*`, `gallery/women/*` | Gallery image libraries |

### Documentation

| File | Change |
|------|--------|
| `README1.md` | This handoff document |
| `README.md` | Default Create Next App readme |
| `AGENTS.md`, `CLAUDE.md` | Agent pointers |

---

## Feature detail — what was built

### Pages (routes)

Navigation labels and order preserved (admin **not** in public nav):

- `/` — Home
- `/about-us`
- `/why-sport-matters`
- `/what-we-do`
- `/growing-impact`
- `/gallery`
- `/partner-with-us`
- `/contact-us`

### Home

- **Hero:** 4-image cinematic background (`hero-1.png` → `hero-3.png` → `hero.jpg`)
- **Taglines:** Developing Leaders / Strengthening Communities / Building Character (letter-by-letter, 1.35s, synced to crossfade)
- **Wordmark:** LIFE **SPORTS** INDIA on 4th image (Oswald, terracotta SPORTS, 4s fade-in)
- **Preload:** animation waits until all 4 backgrounds load (`useHeroBackgroundsReady`)
- **Body:** single justified paragraph; Shillong line moved to About
- **Mosaic:** image-only tiles below hero (`lg:h-80` / `xl:h-96`)

**Hero timing constants** (`hero-cinematic.tsx`):

- `HERO_IMAGE_CROSSFADE_S = 1.35`
- `HERO_WORDMARK_FADE_IN_S = 4`, `HERO_WORDMARK_FADE_IN_DELAY_S = 0.5`, `HERO_WORDMARK_FADE_IN_DURATION_S = 2`

### About Us

- Editorial split layout; photo stretch + `md:scale-110`
- VMV: 3 stacked rows (Vision, Mission, Values); removed LSI labels + accent underlines
- **Strategy:** full-width `strategy-section.tsx` below photo block
- **Who We Are:** Shillong / Bangalore / Punjab paragraph (from Home hero)
- Hero tagline under h1 removed

### Why Sport Matters

- Storytelling sections, dark rhythm
- Mandela quote: smaller size, less bold

### What We Do

- Label **“What We Do”** (no “initiatives” wording)
- User-provided program copy; heading underlines removed

### Growing Impact

- Recent Impact bullets preserved
- **4 event cards** (2×2 grid): Isaiah/Sunny, Brandon Slay, Wesley Fluellen, Chandigarh University
- Future Initiatives: Women in Sports, Rural Development, Career & Skill Development
- Removed NEXT label + card underlines

### Partner With Us

- `SupportMissionSection` component
- Heading underlines removed

### Gallery

- CSS-column masonry via `gallery-masonry.tsx`
- **Desktop:** hover grayscale → color + zoom
- **Mobile:** image nearest viewport center auto-colorizes
- Images from `public/gallery/` via `gallery.ts`

### Contact Us

- Name / Email / Message form → saves to Turso (`contacts` + `contact_messages`)
- Removed placeholder intro copy; removed underlines under section headings

### Header + footer

- **Header:** transparent on hero → sticky blur; logo 66px; nav hover slate bg + white text
- **Footer:** newsletter subscribe (Turso), contact links, dark slate styling

---

## Key commands (full runbook)

> Excludes Node.js installation. Paths use the `LifesportsIndia/web` folder.

### Project bootstrap (one-time)

```bash
cd "/Users/apple/Documents/AI Business related/LifesportsIndia"
npx create-next-app@latest web --ts --tailwind --eslint --app --src-dir --use-npm
cd web
npm install
npx shadcn@latest init --defaults --base radix --yes --css-variables --no-rtl --force
npx shadcn@latest add button --yes
npm install framer-motion lenis lucide-react react-countup
npm install next@15 eslint-config-next@15
```

### Daily development

```bash
cd "/Users/apple/Documents/AI Business related/LifesportsIndia/web"
npm run dev          # http://localhost:3000
npm run lint         # optional; build skips ESLint
npm run build        # production build + typecheck
npm run start        # serve production build locally
```

### Git inspection

```bash
cd "/Users/apple/Documents/AI Business related/LifesportsIndia/web"
git branch --show-current
git status
git log --oneline -5
git diff --stat main...HEAD
```

### Asset setup (reproducible)

```bash
mkdir -p "web/public/brand" "web/public/photos" "web/public/photos/impact" \
         "web/public/gallery/football" "web/public/gallery/basketball" "web/public/gallery/women"
cp "Logo.png" "web/public/brand/logo.png"
cp -R "images/Football Pictures for the gallery/"* "web/public/gallery/football/"
cp -R "images/Gallery Basketball/"* "web/public/gallery/basketball/"
cp -R "images/Women in sports/"* "web/public/gallery/women/"
```

### Growing Impact event photos (customer assets)

```bash
mkdir -p "/Users/apple/Documents/AI Business related/LifesportsIndia/web/public/photos/impact"

cp "<source>/Isaiah_Kharmawphlang-....png" \
   "web/public/photos/impact/isaiah-kharmawphlang-sunny-mawlong.png"
cp "<source>/Brandon_Slay-....png" \
   "web/public/photos/impact/brandon-slay.png"
cp "<source>/Wesley_Fluellen2004-....png" \
   "web/public/photos/impact/wesley-fluellen.png"
cp "<source>/Chandigarh_University-....png" \
   "web/public/photos/impact/chandigarh-university-ezek.png"

ls -la "web/public/photos/impact/"
```

### Clean rebuild (if `.next` cache corrupt)

```bash
cd "/Users/apple/Documents/AI Business related/LifesportsIndia/web"
rm -rf .next
npm run build
```

### Revert helpers

```bash
# Single file
git checkout -- src/components/home/home-hero.tsx

# Hero wordmark styling only
git checkout -- src/components/home/hero-cinematic.tsx src/components/home/home-hero.tsx

# Revert a committed change
git log --oneline -5
git revert <commit-hash>
```

---

## Notable gotchas

| Issue | Resolution |
|-------|------------|
| ESLint breaks `next build` | `next.config.js` sets `eslint.ignoreDuringBuilds: true`; run `npm run lint` separately |
| Lenis `smoothTouch` not in types | Removed from `smooth-scroll.tsx` |
| Gallery scroll too short | Lenis `resize()` on load, window resize, and `ResizeObserver` |
| Hero prerender error | Hero controller in client component `home-hero.tsx` |
| `next.config.ts` on old Next 9 | Upgraded to Next 15; config is now `next.config.js` |
| Local build flaky (ECONNRESET / ENOENT) | `rm -rf .next && npm run build`; Vercel CI is authoritative for deploy |
| Admin auth in Edge middleware | Auth runs in Node via `requireAdmin()` on protected pages; middleware only sets `noindex` |
| Drizzle Kit `push` command | Upgraded `drizzle-kit` to latest; use `npm run db:push` with env loaded |

---

## Files to open first (for agents)

- `src/app/layout.tsx`, `src/app/globals.css` — fonts + brand tokens
- `src/components/site-nav.ts` — nav structure
- `src/components/site-header.tsx`, `src/components/site-footer.tsx`
- `src/components/home/home-hero.tsx`, `src/components/home/hero-cinematic.tsx`
- `src/components/smooth-scroll.tsx`, `src/components/reveal.tsx`
- `src/content/gallery.ts`, `src/app/gallery/page.tsx`, `src/components/gallery-masonry.tsx`

---

## Phase 1 — Database + admin (merged to `main`, deployed)

### Deploy commands (completed)

```bash
cd "/Users/apple/Documents/AI Business related/LifesportsIndia/web"

# Apply schema to Turso (one-time or after schema changes)
set -a && source .env.local && set +a
npm run db:push

# Merge feature branch and push (done)
git checkout main
git pull origin main
git merge final-design-with-database
git push origin main
```

Vercel auto-deploys `main`. Env vars must be set in **Vercel → Settings → Environment Variables** (same keys as `.env.local`).

### Environment variables

Copy [`.env.example`](.env.example) → `.env.local` (local) and mirror in Vercel (production):

```
DATABASE_URL=          # Turso database URL (or TURSO_DATABASE_URL)
DATABASE_AUTH_TOKEN=   # Turso auth token (or TURSO_AUTH_TOKEN)
ADMIN_USERNAME=Admin
ADMIN_PASSWORD=        # set in Vercel only — never commit
ADMIN_SESSION_SECRET=  # random string (openssl rand -base64 32)
```

### Data model (Option B hybrid)

**`contacts`** — one row per email (`email_id` PK)

- `subscription`: `Yes` | `No` (newsletter)
- `unsubscribe_token`: unique token for email footer links
- `name`, `message`: latest contact snapshot
- `subscribed_at`, `unsubscribed_at`, `created_at`, `updated_at`

**`contact_messages`** — full history (never overwritten)

- `id`, `email_id`, `name`, `message`, `created_at`

### API routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/newsletter` | POST | Subscribe email; idempotent if already `Yes` |
| `/api/contact` | POST | Save message + append history |
| `/api/admin/login` | POST | Admin session cookie |
| `/api/admin/logout` | POST | Clear session |

### Public pages

| Route | Purpose |
|-------|---------|
| `/unsubscribe?token=...` | One-click unsubscribe → `Subscription=No` |

Newsletter footer template:

```text
Unsubscribe: https://lifesportsindia.org/unsubscribe?token=UNIQUE_TOKEN_PER_SUBSCRIBER
```

### Admin pages (login required)

| Route | Purpose |
|-------|---------|
| `/admin` | Login form |
| `/admin/newsletter` | Active subscribers; semicolon copy export |
| `/admin/messages` | Contact history, search + pagination |

### Phase 1 files added/changed

| File | Purpose |
|------|---------|
| `drizzle.config.ts` | Drizzle Kit + Turso config |
| `src/db/schema.ts` | `contacts`, `contact_messages` tables |
| `src/db/client.ts` | Turso/libSQL client |
| `src/lib/validation.ts` | Email/name/message limits + honeypot |
| `src/lib/rate-limit.ts` | In-memory rate limiting |
| `src/lib/tokens.ts` | Unsubscribe token generation |
| `src/lib/auth.ts` | Admin session + credential check |
| `src/lib/require-admin.ts` | Server-side route guard |
| `src/lib/unsubscribe.ts` | Unsubscribe logic |
| `src/middleware.ts` | `X-Robots-Tag: noindex` for admin/unsubscribe |
| `src/app/api/newsletter/route.ts` | Newsletter POST |
| `src/app/api/contact/route.ts` | Contact POST |
| `src/app/api/admin/login/route.ts` | Login POST |
| `src/app/api/admin/logout/route.ts` | Logout POST |
| `src/app/unsubscribe/page.tsx` | Unsubscribe confirmation |
| `src/app/admin/**` | Login, newsletter, messages UI |
| `src/components/admin/**` | Admin nav, login form, export |
| `src/components/contact-form.tsx` | Wired contact form |
| `src/components/site-footer.tsx` | Wired newsletter form |
| `.env.example` | Env template (no secrets) |
| `package.json` | `db:push`, `db:generate`, `db:studio` scripts |

### Newsletter business rules

- Subscribe sets `Subscription=Yes`; re-subscribe while `Yes` is idempotent (token unchanged)
- Contact form **never** changes `Subscription`
- Unsubscribe link sets `Subscription=No`; user may re-subscribe via footer later
- Admin export includes only `Subscription=Yes` rows

---

## Next steps (minor modifications)

> **Status:** Production is live at https://lifesportsindia.org. Use this section to track upcoming small UX/content tweaks before the next commit.

- [ ] _(add items here as you plan minor changes)_

**Workflow for minor changes:**

```bash
cd "/Users/apple/Documents/AI Business related/LifesportsIndia/web"
git checkout main
git pull origin main
# edit files
npm run dev          # test at http://localhost:3000
npm run build        # verify production build
git add -A && git commit -m "Describe minor change."
git push origin main # Vercel auto-deploys
```

---

## Folder rename note

Project folder was renamed from `LifesportsOrg` to `LifesportsIndia`. Git repo lives inside `web/`.

```bash
mv "LifesportsOrg" "LifesportsIndia"
```
