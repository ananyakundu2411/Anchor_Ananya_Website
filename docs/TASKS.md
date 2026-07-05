# TASKS.md — work log & backlog

## Done in v6 (cinematic video hero + Marie Forleo-inspired homepage)
- [x] Hero rebuilt as full-bleed video montage: 10 fast cuts (0.8–1.5s) of real hosting footage — sangeet opener, haldi stage, private party, smoke-entry, college (2 cuts), corporate, brand launch, cultural, elegant closer
- [x] Two montage edits: tall 720×1280 (mobile, vertical-reel feel) + wide 1280×720 (desktop), ~11.5s, ≤3.4MB each, warm grade, watermarks cropped/delogo'd out
- [x] "Watch Showreel" modal (ShowreelModal.tsx): 26s showreel with sound, WhatsApp CTA, no redirect
- [x] New homepage flow: hero → stats → Meet Ananya → Where You've Seen Her Host → Video Moments (6 reels in lightbox) → College & Campus → Celebrations → Services showcase → Reviews (#reviews anchor) → Instagram → Booking Steps → Final CTA
- [x] College & Campus section restored high on homepage with college WhatsApp CTA
- [x] Services showcase: 6 visual cards with benefit line + per-category WhatsApp CTA
- [x] Gallery: curated first screen (balanced category mix via firstSet in gallery.ts)
- [x] waMessages.showreel prefill; "Reviews" nav link; FinalCTA "Check Date on WhatsApp"
- [x] /admin owner panel (ADMIN_TOKEN + Supabase): approve/hide/feature Instagram posts, categorise, approve/pin reviews; robots noindex + disallow
- [x] /api/admin (GET list / POST update, whitelisted tables+fields); db.ts update() helper
- [x] .env.example + ENVIRONMENT_VARIABLES.md complete (incl. ADMIN_TOKEN)
- [x] Showreel registered as first Instagram-section reel (promo-2 backlog item cleared)

## Done in v2–v5 (earlier)
- [x] WhatsApp system: availability prefill, per-category messages, click tracking, sticky bar
- [x] Gallery captions + location/context + lightbox category WhatsApp CTA
- [x] Verified-style Google review cards + rating header card
- [x] Stats render real numbers in HTML (SSR), animate on view
- [x] Automation backend: /api/lead, /api/track, /api/cron/sync-instagram (approval gate, auto-categorise, token refresh), /api/cron/sync-google-reviews, /api/webhooks/instagram, Supabase REST layer, vercel.json crons
- [x] Instagram homepage section reads approved+featured DB posts (1h ISR), falls back to local reels
- [x] Instagram oEmbed proxy route (/api/instagram/oembed)

## Blocked on accounts/credentials (owner action)
- [ ] Web3Forms key → NEXT_PUBLIC_FORM_ENDPOINT/ACCESS_KEY (+ WEB3FORMS_ACCESS_KEY)
- [ ] Supabase project + run SQL from AUTOMATION_ARCHITECTURE.md → SUPABASE_* vars
- [ ] ADMIN_TOKEN (any long random string) → enables /admin
- [ ] IG Business account link + Meta app + long-lived token → INSTAGRAM_* vars
- [ ] GBP API access request approval → GOOGLE_OAUTH_* + GBP_* vars
- [ ] Custom domain + NEXT_PUBLIC_SITE_URL
- [ ] Confirm stats (250+, years) with Ananya; real review texts

## Backlog / nice-to-have
- [ ] WebM (VP9) variants of hero montages for extra ~25% savings
- [ ] WebP/AVIF variants for gallery images (keep JPEG originals for OG)
- [ ] Lighthouse mobile run + budget doc (needs live URL access from CI)
- [ ] Review schema JSON-LD once real synced reviews exist (compliance: only real, unedited reviews)
- [ ] Hero/gallery selection inside /admin (currently content.config.ts)
