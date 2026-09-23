# Life Sports India — Project Handoff (UX + Database)

Handoff document for agents and developers working in this repo.

**Scope:** UX redesign (layout, typography, motion, imagery, spacing) plus Turso-backed newsletter, contact forms, and admin panel. Page names, navigation, and messaging are preserved unless the user explicitly provided replacement copy.

---

## Accomplishments summary

| Area | What was accomplished |
|------|------------------------|
| **Site shell** | Full Next.js 15 App Router site with 8 public pages, sticky header, dark footer, Lenis smooth scroll, Framer Motion reveals |
| **Home hero** | Cinematic 4-image cycle, letter-by-letter taglines, LIFE **SPORTS** INDIA wordmark; slate overlay **30%** |
| **Home mosaic** | 3 equal-width tiles: football, Chandigarh impact photo, outdoor basketball (logo visible) |
| **About Us** | VMV + OUR STRATEGY cards with **disc bullets** on Training / Resources / Events lists |
| **Growing Impact** | Recent Impact as **5 bullet points**; 4 event photo cards; Future Initiatives |
| **Partner With Us** | “Whether you are:” bold; chevron bullets; Support Mission (no underline); Stay Connected |
| **Gallery** | **Football**, **Basketball**, **Wrestling**, **Workshop** (12 photos); masonry + mobile color sync |
| **Contact** | Form wired to Turso; full message history in admin |
| **Newsletter** | Footer form wired to Turso; unsubscribe link flow |
| **Admin** | `/admin` login; newsletter export + messages; **© footer link** + **Home icons** on admin pages |
| **Deploy** | `main` live on **Vercel** — https://www.lifesportsindia.org |

---

## Current state (production live)

| Item | Value |
|------|--------|
| **Repo path** | `/Users/apple/Documents/AI Business related/LifesportsIndia/web` |
| **Git remote** | https://github.com/jamesraj2050/lifesportsindia |
| **Branches** | **`main` only** (local + `origin/main`; feature branches cleaned up) |
| **Latest commit** | `94a043b` — *Add Wrestling gallery and Workshop photos 5–12.* (2026-09-09) |
| **Framework** | Next.js **15.5.19**, React 19, TypeScript, App Router |
| **Database** | Turso (libSQL) via Drizzle ORM |
| **Hosting** | Vercel (auto-deploy on push to `main`) |
| **Production URL** | https://www.lifesportsindia.org (`lifesportsindia.org` redirects to www) |
| **Vercel preview** | https://lifesportsindia.vercel.app |
| **Secrets** | `.env.local` locally + Vercel env vars — never committed; see `.env.example` |

### Production URLs

| Page | URL |
|------|-----|
| Home | https://www.lifesportsindia.org |
| Gallery | https://www.lifesportsindia.org/gallery |
| Contact | https://www.lifesportsindia.org/contact-us |
| Admin login | https://www.lifesportsindia.org/admin |
| Admin (discreet) | Footer **©** symbol on any page → `/admin` |
| Newsletter subscribers | https://www.lifesportsindia.org/admin/newsletter |
| Contact messages | https://www.lifesportsindia.org/admin/messages |
| Unsubscribe | https://www.lifesportsindia.org/unsubscribe?token=TOKEN |

### Local development URLs

| Page | URL |
|------|-----|
| Site | http://localhost:3000 |
| Gallery | http://localhost:3000/gallery |
| Admin login | http://localhost:3000/admin |

Run `npm run dev` from the `web/` folder. Requires `.env.local` with Turso + admin vars.

### Commit history on `main`

```
94a043b Add Wrestling gallery and Workshop photos 5–12.
e5207c1 Downscale oversized gallery originals to 2560px.
0725af4 Exclude public/ from serverless function tracing.
63fcc84 Add basketball gallery photos and improve color-on-scroll.
1813753 Replace Women in Sports gallery with Workshops section.
2ef84fa Final touch: mosaic, content polish, hero overlay, and admin nav.
737ad5f Add discreet admin link on footer © and Home icons on admin pages.
f85f277 Update home mosaic: football left, Chandigarh center, new basketball right.
f3636a7 Add Turso database, newsletter, contact forms, and admin panel.
476854e UX redesign: cinematic hero, updated pages, and customer copy.
0e2c0c2 Add mobile center-in-view color for gallery
dea7fa6 Update Life Sports India website
687ed70 Initial commit from Create Next App
```

---

## Session log — Gallery Wrestling + Workshop 5–12 (2026-09-09)

### What changed

| Item | Detail |
|------|--------|
| **Wrestling** | New gallery heading below Basketball; 18 images from `public/gallery/Wrestling/` |
| **Workshop** | Heading renamed **Workshops** → **Workshop**; added `Workshop-5` … `Workshop-12` (12 total with existing 1–4) |
| **Sort** | Numeric filename order (`1`→`N`; `Workshop-N`; prefer `11.jpg` before `11 (2).jpg`) |
| **Typo fix** | Renamed `Worskshop-7.jpeg` → `Workshop-7.jpeg` |

### Commands run

```bash
# Local preview
cd "/Users/apple/Documents/AI Business related/LifesportsIndia/web"
npm run dev
# → http://localhost:3000  (gallery: http://localhost:3000/gallery)

# Downscale oversized Wrestling originals (longest side → 2560px)
# Files resized: 11.jpg, 11 (2).jpg, 12.jpg, 6.jpeg, 8.jpg
sips -Z 2560 "public/gallery/Wrestling/<file>"

# Fix Workshop-7 filename typo
mv "public/gallery/workshops/Worskshop-7.jpeg" "public/gallery/workshops/Workshop-7.jpeg"

# Commit + push (triggers Vercel production deploy)
git add src/app/gallery/page.tsx src/content/gallery.ts \
  public/gallery/Wrestling \
  public/gallery/workshops/Workshop-{5,6,7,8,9,10,11,12}.jpeg
git commit -m "Add Wrestling gallery and Workshop photos 5–12."
git push origin main
```

### Files affected

| Path | Change |
|------|--------|
| `src/app/gallery/page.tsx` | Added **Wrestling** section; renamed heading to **Workshop** |
| `src/content/gallery.ts` | Added `gallery.wrestling`; numeric sort for `N.*` and `Workshop-N.*` |
| `public/gallery/Wrestling/*` | **18** new images (oversized ones downscaled to 2560px) |
| `public/gallery/workshops/Workshop-5.jpeg` … `Workshop-12.jpeg` | **8** new workshop images |
| `public/gallery/workshops/Workshop-7.jpeg` | Renamed from `Worskshop-7.jpeg` |

### GitHub + Vercel deployment

| Item | Value |
|------|--------|
| **GitHub repo** | https://github.com/jamesraj2050/lifesportsindia |
| **Branch** | `main` |
| **Commit** | `94a043b` (`94a043b9481f808cbbbb8f6bc05f82df1cc23bb1`) |
| **Message** | Add Wrestling gallery and Workshop photos 5–12. |
| **Pushed** | `e5207c1..94a043b  main → main` (2026-09-09 ~17:25 AEST) |
| **Deploy trigger** | Vercel auto-deploy on push to `main` (no manual CLI deploy) |
| **Production** | https://www.lifesportsindia.org |
| **Gallery live** | https://www.lifesportsindia.org/gallery |
| **Vercel app URL** | https://lifesportsindia.vercel.app |

Verify after deploy:

```bash
curl -sL "https://www.lifesportsindia.org/gallery" | grep -oE 'Wrestling|Workshop|Football|Basketball' | sort -u
```

---

## Gallery sections (current)

| Section | Folder | Notes |
|---------|--------|-------|
| **Football** | `public/gallery/football/` | Auto-loaded via `gallery.ts`; masonry reorder for layout |
| **Basketball** | `public/gallery/basketball/` | Auto-loaded |
| **Wrestling** | `public/gallery/Wrestling/` | 18 images; numeric filename order |
| **Workshop** | `public/gallery/workshops/` | 12 images: `workshop-1.jpg` … `workshop-4.jpg` + `Workshop-5.jpeg` … `Workshop-12.jpeg` |

**Removed from site:** “Women in Sports” section (legacy folder `public/gallery/women/` may still exist on disk but is **not referenced**).

**Code:**

- [`src/content/gallery.ts`](src/content/gallery.ts) — `gallery.football` / `basketball` / `wrestling` / `workshops`
- [`src/app/gallery/page.tsx`](src/app/gallery/page.tsx) — section order: Football → Basketball → Wrestling → Workshop

---

## Final touch (merged to `main`)

| Area | Change |
|------|--------|
| **Home mosaic** | 3 equal columns; football / Chandigarh / basketball |
| **Hero overlay** | Slate wash **30%** (`/30` in `hero-cinematic.tsx`) |
| **About Us** | Strategy lists with disc bullets |
| **Growing Impact** | Recent Impact: 5 bullet points |
| **Partner With Us** | Chevron bullets; Support Mission line removed |
| **Admin nav** | Footer **©** → `/admin`; Home icons on admin pages |

### Home mosaic assets

| Position | File |
|----------|------|
| Left | `public/photos/mosaic-2.jpg` |
| Center | `public/photos/impact/chandigarh-university-ezek.png` |
| Right | `public/photos/mosaic-basketball.jpg` |

---

## Phase 1 — Database + admin (completed)

### Environment variables

Copy [`.env.example`](.env.example) → `.env.local` and mirror in Vercel:

```
DATABASE_URL=
DATABASE_AUTH_TOKEN=
ADMIN_USERNAME=Admin
ADMIN_PASSWORD=
ADMIN_SESSION_SECRET=
```

### Data model (Option B hybrid)

- **`contacts`** — email, subscription Yes/No, unsubscribe_token, timestamps
- **`contact_messages`** — full contact history (append-only)

### API routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/newsletter` | POST | Subscribe (idempotent if already Yes) |
| `/api/contact` | POST | Save message + history |
| `/api/admin/login` | POST | Admin session |
| `/api/admin/logout` | POST | Clear session |

### Admin access

| Method | Detail |
|--------|--------|
| Direct URL | `/admin` |
| Discreet link | Click **©** in site footer |
| Return home | **Home** icon on `/admin` login and admin nav |

Newsletter unsubscribe URL:

```text
https://www.lifesportsindia.org/unsubscribe?token=UNIQUE_TOKEN_PER_SUBSCRIBER
```

---

## Feature detail — page-by-page

### Home

- Cinematic hero (`home-hero.tsx`, `hero-cinematic.tsx`); overlay **30%**
- 3-tile mosaic below hero (`src/app/page.tsx`)

### About Us

- VMV layout; OUR STRATEGY with bulleted Training / Resources / Events

### Growing Impact

- Recent Impact bullets; 4 event cards; Future Initiatives

### Partner With Us

- Chevron list; Support Mission expandable section

### Gallery

- **Football** → **Basketball** → **Wrestling** → **Workshop**
- Masonry: `gallery-masonry.tsx`; content: `gallery.ts`

### Contact Us

- Form → Turso via `POST /api/contact`

### Header + footer

- Footer newsletter + **©** admin link

---

## Files affected (key paths)

| File | Notes |
|------|-------|
| `src/app/page.tsx` | Home mosaic |
| `src/app/gallery/page.tsx` | Football / Basketball / Wrestling / Workshop |
| `src/content/gallery.ts` | Image loaders + numeric sort |
| `src/components/home/hero-cinematic.tsx` | Hero overlay 30% |
| `src/components/site-footer.tsx` | Newsletter + © admin |
| `src/app/admin/**` | Admin UI |
| `src/db/schema.ts` | Turso schema |

### Public assets

| Path | Notes |
|------|-------|
| `public/gallery/football/*` | Football gallery |
| `public/gallery/basketball/*` | Basketball gallery |
| `public/gallery/Wrestling/*` | Wrestling gallery (18 images) |
| `public/gallery/workshops/workshop-1.jpg` … `workshop-4.jpg` | Workshop 1–4 |
| `public/gallery/workshops/Workshop-5.jpeg` … `Workshop-12.jpeg` | Workshop 5–12 |
| `public/photos/mosaic-*.jpg`, `impact/*` | Home mosaic |

---

## Key commands

### Daily development

```bash
cd "/Users/apple/Documents/AI Business related/LifesportsIndia/web"
npm run dev
npm run build
```

### Git workflow (single `main` branch)

```bash
git checkout main
git pull origin main
# edit files
git add -A && git commit -m "Describe change."
git push origin main    # Vercel auto-deploys production
```

### Add gallery images

```bash
# Drop new images into the appropriate folder, then commit + push:
public/gallery/football/
public/gallery/basketball/
public/gallery/Wrestling/
public/gallery/workshops/
```

Images are picked up at build time by `src/content/gallery.ts` (`readdirSync`).  
If longest side > 2560px, downscale first: `sips -Z 2560 path/to/image.jpg`

### Database push

```bash
set -a && source .env.local && set +a
npm run db:push
```

### Verify production deploy

```bash
curl -sL "https://www.lifesportsindia.org/gallery" | grep -oE 'Wrestling|Workshop|Football|Basketball' | sort -u
```

---

## Notable gotchas

| Issue | Resolution |
|-------|------------|
| Domain redirect | Use **www.lifesportsindia.org** for production checks |
| Hero overlay | Edit `/30` vs `/40` in `hero-cinematic.tsx` |
| Gallery not updating | New images need commit + push → Vercel rebuild |
| ESLint breaks build | `eslint.ignoreDuringBuilds: true` in `next.config.js` |
| Admin auth | `requireAdmin()` on protected pages |
| Git branch names | No spaces in branch names |

---

## Files to open first (for agents)

- `src/app/page.tsx` — home mosaic
- `src/app/gallery/page.tsx`, `src/content/gallery.ts` — gallery
- `src/components/home/hero-cinematic.tsx` — hero overlay
- `src/components/site-footer.tsx` — newsletter + admin © link
- `src/app/admin/page.tsx`, `src/components/admin/admin-nav.tsx` — admin
- `src/db/schema.ts` — database

---

## Folder rename note

Project folder was renamed from `LifesportsOrg` to `LifesportsIndia`. Git repo lives inside `web/`.

```bash
mv "LifesportsOrg" "LifesportsIndia"
```
