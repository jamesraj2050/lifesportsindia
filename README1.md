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
| **Gallery** | **Football**, **Basketball**, **Workshops** (4 photos); masonry + mobile color sync |
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
| **Latest commit** | `1813753` — *Replace Women in Sports gallery with Workshops section.* |
| **Framework** | Next.js **15.5.19**, React 19, TypeScript, App Router |
| **Database** | Turso (libSQL) via Drizzle ORM |
| **Hosting** | Vercel (auto-deploy on push to `main`) |
| **Production URL** | https://www.lifesportsindia.org (`lifesportsindia.org` redirects to www) |
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

## Gallery sections (current)

| Section | Folder | Notes |
|---------|--------|-------|
| **Football** | `public/gallery/football/` | Auto-loaded via `gallery.ts`; masonry reorder for layout |
| **Basketball** | `public/gallery/basketball/` | Auto-loaded |
| **Workshops** | `public/gallery/workshops/` | 4 images: `workshop-1.jpg` … `workshop-4.jpg` |

**Removed from site:** “Women in Sports” section (legacy folder `public/gallery/women/` may still exist on disk but is **not referenced**).

**Code:**

- [`src/content/gallery.ts`](src/content/gallery.ts) — `gallery.workshops` replaces former `gallery.women`
- [`src/app/gallery/page.tsx`](src/app/gallery/page.tsx) — third section title **Workshops**

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

- **Football** → **Basketball** → **Workshops**
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
| `src/app/gallery/page.tsx` | Football / Basketball / Workshops |
| `src/content/gallery.ts` | `workshops` image loader |
| `src/components/home/hero-cinematic.tsx` | Hero overlay 30% |
| `src/components/site-footer.tsx` | Newsletter + © admin |
| `src/app/admin/**` | Admin UI |
| `src/db/schema.ts` | Turso schema |

### Public assets

| Path | Notes |
|------|-------|
| `public/gallery/football/*` | Football gallery |
| `public/gallery/basketball/*` | Basketball gallery |
| `public/gallery/workshops/workshop-1.jpg` … `workshop-4.jpg` | Workshops gallery |
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
# Drop new images into the appropriate folder, then rebuild/redeploy:
public/gallery/football/
public/gallery/basketball/
public/gallery/workshops/
```

Images are picked up at build time by `src/content/gallery.ts` (`readdirSync`).

### Database push

```bash
set -a && source .env.local && set +a
npm run db:push
```

### Verify production deploy

```bash
curl -sL "https://www.lifesportsindia.org/gallery" | grep -oE 'Workshops|Football|Basketball' | sort -u
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
