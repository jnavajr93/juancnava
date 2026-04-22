# juancnava.com — Project State

_Last updated: 2026-04-22_

---

## Stack

- **Framework**: Next.js 16.2.3 (App Router) + React 19.2.4
- **Styling**: Tailwind CSS v4 + custom theme (dark bg `#0f0e0d`, cream `#f2ead8`, terracotta `#c17a5a`)
- **Fonts**: Playfair Display (serif) + DM Sans (sans) — both via `next/font/google` with `display: swap`
- **Deployment**: Vercel → juancnava.com
- **Analytics**: @vercel/analytics
- **Email**: Resend (`resend` package installed; `RESEND_API_KEY` needed in `.env.local`)
- **Payments**: Stripe (`stripe` package installed; keys set in `.env.local`, price IDs still needed)

---

## Pages

| Route | Status | Notes |
|---|---|---|
| `/` | Done | Hero, gallery preview, prints CTA, sessions CTA, testimonials, email signup |
| `/gallery` | Done | Masonry grid, lightbox, keyboard nav (arrows + esc), image protection; `priority` on first 3 images; `sizes` prop set |
| `/shop` | Done | Limited editions, open editions placeholder, coming-soon products |
| `/prints` | Done | Browse all 4 limited edition prints |
| `/prints/[id]` | Done | Detail pages; Product JSON-LD added; OG image now uses actual print image |
| `/prints/success` | Done | noindex set — should not be crawled |
| `/writing` | Done | Essay index with email signup |
| `/writing/[slug]` | Done | 3 published essays; BlogPosting JSON-LD added; params awaited (Next.js 16) |
| `/book` | Done | Sessions overview page |
| `/book/[slug]` | Done | 6 session types; Service JSON-LD added; Resend-backed booking widget |
| `/about` | Done | `preload` bug fixed → `priority`; portrait now loads eagerly |
| `/policies` | Done | Shipping, returns, privacy — all real content |
| `404` | Done | Custom not-found page |

---

## API Routes

| Route | Status | Notes |
|---|---|---|
| `POST /api/checkout` | Ready — needs price IDs | Stripe API version updated to `2026-03-25.dahlia`; TS clean |
| `POST /api/subscribe` | Scaffolded | Logs to console only; ConvertKit/Mailchimp/Beehiiv stubs commented in |
| `POST /api/book` | Ready — needs `RESEND_API_KEY` | Sends notification + confirmation emails via Resend |

---

## Content

| Section | Count | Status |
|---|---|---|
| Limited edition prints | 4 | Done (phoenix-dusk, the-wait, unnamed-road-maricopa, nogales) |
| Gallery images | 12 | Alt texts updated with keywords; **image files may be missing from `public/gallery/`** |
| Session types | 6 | Done (headshots, portraits, maternity, graduations, weddings, events) |
| Essays | 3 | Published and live |
| Testimonials | 6 | Done (3 sessions, 3 prints) |
| Coming-soon products | 3 | UI done; not launched (2026 Calendar, Postcard Sets, Photobook) |
| Open edition prints | — | Referenced in shop; details pending |

---

## Components

| Component | Status | Notes |
|---|---|---|
| `SiteNav` | Done | Fixed top, desktop + mobile hamburger drawer; Book link added |
| `SiteFooter` | Done | Email, Instagram, YouTube, policies link |
| `FadeInSection` | Done | Intersection Observer scroll animations |
| `BookingWidget` | Done | 3-step flow: calendar → time → form → POST /api/book; loading + error states |
| `PrintBuyWidget` | Done | Size selector + Stripe checkout trigger |
| `PrintCard` | Done | Preview card with buy button and waitlist for sold-out |
| `GalleryGrid` | Done | Masonry + lightbox + keyboard nav; `sizes` + `priority` optimized |
| `EmailSignup` | Done | Inline and block variants |
| `NotifyMeButton` | Done | Modal notify-me form for coming-soon items |
| `ProtectedImage` | Done | Drag/context-menu protection + fade-in on load |

---

## SEO & Infrastructure

| Item | Status |
|---|---|
| `sitemap.ts` | Done — now includes all 6 `/book/[slug]` session routes (was missing) |
| `robots.ts` | Done — blocks `/api/*` only; correct |
| JSON-LD — root (`LocalBusiness`) | Done — upgraded to `["LocalBusiness", "Photographer"]`; added `areaServed` (Phoenix, Scottsdale, Tempe, Mesa, Chandler, Tucson, AZ); prices on all offers |
| JSON-LD — print pages (`Product`) | Done — `Product` schema with per-size `Offer`, stock status, price |
| JSON-LD — essay pages (`BlogPosting`) | Done — author, publisher, datePublished, articleSection |
| JSON-LD — session pages (`Service`) | Done — provider, areaServed, priceSpecification |
| Canonical URLs | Done — all major pages now have `alternates.canonical` |
| Open Graph metadata | Done — all pages now have OG images; print pages use actual print image |
| Print OG image | Done — was using generic saguaro; now uses `print.src` per print |
| `prints/success` noindex | Done — order confirmation page excluded from indexing |
| Vercel Analytics | Done — no overhead (uses deferred loading) |

---

## SEO — Page Titles (after audit)

| Page | Title |
|---|---|
| `/` | Juan C. Nava — Documentary Photography \| Phoenix, AZ |
| `/gallery` | Photo Gallery — Documentary Photography — Juan C. Nava Photography |
| `/shop` | Shop — Fine Art Photography Prints & Objects — Juan C. Nava Photography |
| `/prints` | Limited Edition Fine Art Prints — Phoenix Documentary Photography — Juan C. Nava Photography |
| `/prints/[id]` | {Print Title} — Limited Edition Fine Art Print — Juan C. Nava Photography |
| `/writing` | Writing — Essays on Photography & Visual Storytelling — Juan C. Nava Photography |
| `/writing/[slug]` | {Essay Title} — Juan C. Nava Photography |
| `/book` | Book a Session — Phoenix Portrait & Wedding Photographer — Juan C. Nava Photography |
| `/book/[slug]` | {Session Name} Photographer Phoenix AZ — Juan C. Nava Photography |
| `/about` | About — Phoenix Documentary Photographer — Juan C. Nava Photography |
| `/policies` | Policies — Juan C. Nava Photography |

---

## Done

- Full page routing and layouts
- SEO + performance audit — all issues fixed (see below)
- Resend booking system (`/api/book`) — sends notification + confirmation emails
- BookingWidget replaced: submits to API, loading state, error state
- `Book` added to site navigation
- `writing/[slug]` params bug fixed — async/await per Next.js 16
- Stripe API version updated to `2026-03-25.dahlia`; TS fully clean
- Stripe package installed; secret key + publishable key set in `.env.local`
- `resend` package installed; `RESEND_API_KEY` placeholder in `.env.local`
- Interactive booking widget (calendar, time slots, contact form)
- Gallery lightbox with keyboard navigation
- Image drag/right-click protection
- Mobile responsive navigation (hamburger drawer)
- Film grain overlay and scroll fade-in animations
- Complete essay system with static generation
- Waitlist / notify-me modals for sold-out or coming-soon items
- TypeScript strict mode throughout (zero TS errors)
- Dynamic sitemap and robots.txt
- Professional metadata and OG tags
- Custom favicon: `public/favicon.ico` (32×32 + 16×16), `public/favicon.png` (32×32), `public/apple-touch-icon.png` (180×180) — all generated from `Website Favicon.png`; `<link rel="icon">` and `<link rel="apple-touch-icon">` wired via `metadata.icons` in `app/layout.tsx`

---

## Deployment

| Environment | URL | Status |
|---|---|---|
| Preview | https://juancnava-ggthr3rnb-jnavajr93-1787s-projects.vercel.app | ✓ Live |
| Production | https://juancnava.com | Not yet promoted |

- Project linked to Vercel: `juancnava` (org: `jnavajr93-1787s-projects`)
- 31 pages built; all routes confirmed READY
- `.env.local` is covered by `.gitignore` (`.env*` rule on line 34) — safe
- Stripe test keys are in `.env.local` locally; **add them to Vercel dashboard** (Settings → Environment Variables) before next deploy so they aren't bundled in the upload
- To promote to production: `vercel --prod` (will ask for confirmation)

---

## In Progress

- _Nothing actively in progress_

---

## Needs To Be Done Before Launch

- [ ] Add Stripe keys + all `STRIPE_PRICE_*` vars to **Vercel dashboard** (Settings → Environment Variables) — currently only in local `.env.local`
- [ ] Create 11 Stripe products in test mode → fill in `STRIPE_PRICE_*` vars
- [ ] Test full Stripe checkout → success flow with test card `4242 4242 4242 4242`
- [ ] Add `RESEND_API_KEY` to `.env.local` and Vercel dashboard (resend.com/api-keys — free, 3,000 emails/mo)
- [ ] Verify `bookings@juancnava.com` sender domain in Resend dashboard (or use `onboarding@resend.dev` for local testing)
- [ ] Add actual image files to `public/gallery/` (paths in `lib/gallery.ts`)
- [ ] Add real product images to print detail pages (currently empty placeholder divs)
- [ ] Add real product images to shop hero
- [ ] Connect email service to `/api/subscribe` (stubs for ConvertKit/Mailchimp/Beehiiv are in the file)
- [ ] Decide on open edition prints content (referenced in shop but not yet defined)
- [ ] Update `dateToIso` map in `writing/[slug]/page.tsx` when adding new essays
- [ ] Replace generic OG image on print pages once real print photos are uploaded (`print.src` → `/gallery/*.jpg`)

---

## Backlog / Future

- Launch coming-soon products (2026 Calendar, Postcard Sets, Photobook)
- Add more essays
- Add more limited edition prints
- Add order tracking or print fulfillment integration
- Add `Review`/`AggregateRating` schema to session and print pages once reviews are collected
