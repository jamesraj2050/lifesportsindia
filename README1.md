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
| **Gallery** | Section titles: **Football**, **Basketball**, **Women in Sports**; masonry + mobile color sync |
| **Contact** | Form wired to Turso; full message history in admin |
| **Newsletter** | Footer form wired to Turso; unsubscribe link flow |
| **Admin** | `/admin` login; newsletter export + messages; **© footer link** + **Home icons** on admin pages |
| **Deploy** | `main` live on **Vercel** — https://lifesportsindia.org |

---

## Current state (production live)

| Item | Value |
|------|--------|
| **Repo path** | `/Users/apple/Documents/AI Business related/LifesportsIndia/web` |
| **Git remote** | https://github.com/jamesraj2050/lifesportsindia |
| **Active branch** | `main` (all work merged) |
| **Latest commit** | `2ef84fa` — *Final touch: mosaic, content polish, hero overlay, and admin nav.* |
| **Framework** | Next.js **15.5.19**, React 19, TypeScript, App Router |
| **Database** | Turso (libSQL) via Drizzle ORM |
| **Hosting** | Vercel (auto-deploy on push to `main`) |
| **Production URL** | https://lifesportsindia.org |
| **Secrets** | `.env.local` locally + Vercel env vars — never committed; see `.env.example` |

### Production URLs

| Page | URL |
|------|-----|
| Home | https://lifesportsindia.org |
| Contact | https://lifesportsindia.org/contact-us |
| Admin login | https://lifesportsindia.org/admin |
| Admin (discreet) | Footer **©** symbol on any page → `/admin` |
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

## Final touch (`final-touch` → merged to `main`)

### What changed

| Area | Change |
|------|--------|
| **Home mosaic** | Removed huddle photo; 3 **equal** columns (`md:grid-cols-3`); football left, Chandigarh center, basketball right; `-mt-8` spacing |
| **Hero overlay** | Slate wash **40% → 30%** (`bg-[color:var(--lsi-slate)]/30` in `hero-cinematic.tsx`) |
| **About Us** | Strategy lists: `list-disc`, `pl-5` indent |
| **Growing Impact** | Recent Impact: 5 items as disc bullets (includes closing sentence) |
| **Gallery** | Headings shortened to Football / Basketball / Women in Sports |
| **Partner With Us** | Removed duplicate h2 in box; “Whether you are:” bold + larger; `ChevronRight` bullets; removed terracotta line under Support the Mission |
| **Admin nav** | Footer **©** → `/admin`; Home icon on login + admin nav (back to `/`) |

### Mosaic assets (current)

| Position | File |
|----------|------|
| Left | `public/photos/mosaic-2.jpg` (football) |
| Center | `public/photos/impact/chandigarh-university-ezek.png` |
| Right | `public/photos/mosaic-basketball.jpg` (DSC06623; `object-[center_42%]` for logo) |

Legacy files `mosaic-1.jpg`, `mosaic-3.jpg` remain on disk but are **not used**.

### Deploy commands (completed)

```bash
cd "/Users/apple/Documents/AI Business related/LifesportsIndia/web"
git checkout final-touch
# ... edits ...
git add -A && git commit -m "Final touch: ..."
git push origin final-touch

git checkout main && git pull origin main
git merge final-touch
git push origin main   # Vercel auto-deploys
```

---

## Phase 0 — UX redesign (completed)

- UX work on `customer-update1`, merged to `main`
- Custom domain **lifesportsindia.org** on Vercel

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
| Discreet link | Click **©** in site footer on any page |
| Return home | **Home** icon on `/admin` login and admin nav bar |

Newsletter unsubscribe URL template:

```text
https://lifesportsindia.org/unsubscribe?token=UNIQUE_TOKEN_PER_SUBSCRIBER
```

### Key admin / DB files

| File | Purpose |
|------|---------|
| `src/db/schema.ts`, `src/db/client.ts` | Drizzle + Turso |
| `src/app/api/newsletter/route.ts` | Newsletter POST |
| `src/app/api/contact/route.ts` | Contact POST |
| `src/app/admin/**` | Login, newsletter, messages |
| `src/components/admin/**` | Nav, login form, export |
| `src/components/site-footer.tsx` | Newsletter + © admin link |
| `src/components/contact-form.tsx` | Contact form |
| `drizzle.config.ts` | `npm run db:push` |

---

## Feature detail — page-by-page

### Home (`src/app/page.tsx` + hero components)

- **Hero animation:** unchanged logic in `home-hero.tsx`, `hero-cinematic.tsx`
- **Overlay:** `--lsi-slate` at **30%** opacity over cycling backgrounds
- **Mosaic:** 3 equal tiles below hero (see Final touch table above)

**Hero overlay line** (`hero-cinematic.tsx`):

```tsx
<div className="absolute inset-0 bg-[color:var(--lsi-slate)]/30" />
```

### About Us

- VMV editorial layout; Strategy section with **bulleted** Training / Resources / Events lists

### Growing Impact

- Recent Impact: 5 bullet points in one `<ul>`
- 4 impact event cards + Future Initiatives dark section

### Partner With Us

- Intro card: chevron list, no duplicate “Partner With Us” h2
- `SupportMissionSection`: expandable donate tiers; **no line** under heading

### Gallery

- Section h2 titles: **Football**, **Basketball**, **Women in Sports**
- Masonry via `gallery-masonry.tsx`; images from `src/content/gallery.ts`

### Contact Us

- Form → Turso via `POST /api/contact`

### Header + footer

- Header: sticky, logo 66px, slate hover on nav
- Footer: newsletter (Turso), **© links to `/admin`**

---

## Files affected (master list)

### App pages

| File | Notes |
|------|-------|
| `src/app/page.tsx` | Home mosaic grid + spacing |
| `src/app/about-us/page.tsx` | Strategy section |
| `src/app/growing-impact/page.tsx` | Recent Impact bullets |
| `src/app/gallery/page.tsx` | Short section titles |
| `src/app/partner-with-us/page.tsx` | Partner card + Support Mission |
| `src/app/contact-us/page.tsx` | Wired contact form |
| `src/app/admin/page.tsx` | Login + Home icon |

### Components

| File | Notes |
|------|-------|
| `src/components/home/hero-cinematic.tsx` | Overlay 30%, animation |
| `src/components/about/strategy-section.tsx` | Disc bullets |
| `src/components/partner/support-mission-section.tsx` | No underline |
| `src/components/admin/admin-nav.tsx` | Home icon, Link tabs |
| `src/components/site-footer.tsx` | Newsletter + © admin |
| `src/components/gallery-masonry.tsx` | Masonry + mobile color |

### Public assets

| Path | Notes |
|------|-------|
| `public/photos/mosaic-2.jpg` | Home mosaic left |
| `public/photos/mosaic-basketball.jpg` | Home mosaic right |
| `public/photos/impact/chandigarh-university-ezek.png` | Home mosaic center |
| `public/photos/hero-*.png`, `hero.jpg` | Cinematic hero |
| `public/gallery/*` | Gallery libraries |

---

## Key commands

### Daily development

```bash
cd "/Users/apple/Documents/AI Business related/LifesportsIndia/web"
npm run dev
npm run build
npm run db:push    # after schema changes; source .env.local first
```

### Git workflow

```bash
git checkout main
git pull origin main
git checkout -b my-feature-branch
# edit, commit, push
git checkout main && git merge my-feature-branch && git push origin main
```

### Database push

```bash
set -a && source .env.local && set +a
npm run db:push
```

### Clean rebuild

```bash
rm -rf .next && npm run build
```

---

## Notable gotchas

| Issue | Resolution |
|-------|------------|
| Hero overlay too dark/light | Edit `/30` vs `/40` in `hero-cinematic.tsx` |
| Mosaic basketball logo clipped | Adjust `object-[center_42%]` on right tile in `page.tsx` |
| ESLint breaks build | `eslint.ignoreDuringBuilds: true` in `next.config.js` |
| Admin auth | `requireAdmin()` on protected pages; middleware sets `noindex` only |
| Git branch names | No spaces — use `final-touch`, not `Final touch` |

---

## Files to open first (for agents)

- `src/app/page.tsx` — home mosaic
- `src/components/home/hero-cinematic.tsx` — hero overlay + animation
- `src/components/site-footer.tsx` — newsletter + admin © link
- `src/app/admin/page.tsx`, `src/components/admin/admin-nav.tsx` — admin UI
- `src/db/schema.ts`, `src/app/api/newsletter/route.ts` — database layer

---

## Folder rename note

Project folder was renamed from `LifesportsOrg` to `LifesportsIndia`. Git repo lives inside `web/`.

```bash
mv "LifesportsOrg" "LifesportsIndia"
```
