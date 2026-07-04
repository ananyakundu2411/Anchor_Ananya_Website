# TASKS.md — v2 work log & backlog

## Done in v2
- [x] Hero rebuilt: split editorial layout, portrait card (Ananya fully visible, zero overlay on her, mobile image-first), new H1/sub/CTAs, compact proof strip
- [x] WhatsApp system: availability prefill, per-category messages (wedding/college/corporate/brand/cultural/private/contact/lightbox), click tracking, sticky bar "Check Date on WhatsApp"
- [x] Homepage: curated Featured Events grid (6 categories, 1 each) replacing wedding-heavy preview
- [x] Homepage: dedicated "College & Campus Events" section (images + reel + Book for College Event CTA)
- [x] Gallery: event-specific captions + location/context fields; lightbox shows category/location/context + category WhatsApp CTA
- [x] Social proof: verified-style Google review cards (initials avatar, event tag, G badge, rating header card, pinned-first)
- [x] Stats render real numbers in HTML (SSR), animate on view
- [x] Automation backend: /api/lead, /api/track, /api/cron/sync-instagram, /api/cron/sync-google-reviews, /api/webhooks/instagram (challenge + HMAC), Supabase REST layer, vercel.json crons, content.config.ts curation
- [x] Docs: PROJECT_BRIEF, DESIGN_SYSTEM, AUTOMATION_ARCHITECTURE, ENVIRONMENT_VARIABLES, QA_CHECKLIST, TASKS

## Blocked on accounts/credentials (owner action)
- [ ] Web3Forms key → NEXT_PUBLIC_FORM_ENDPOINT/ACCESS_KEY (+ WEB3FORMS_ACCESS_KEY)
- [ ] Supabase project + run SQL from AUTOMATION_ARCHITECTURE.md → SUPABASE_* vars
- [ ] IG Business account link + Meta app + long-lived token → INSTAGRAM_* vars
- [ ] GBP API access request approval → GOOGLE_OAUTH_* + GBP_* vars
- [ ] Custom domain + NEXT_PUBLIC_SITE_URL
- [ ] Confirm stats (250+, years) with Ananya; real review texts

## Backlog / nice-to-have
- [ ] WebP/AVIF variants for gallery images (keep JPEG originals for OG)
- [ ] Protected /admin route replacing content.config.ts curation
- [ ] Homepage sections read from DB when configured (currently config-driven by design)
- [ ] Lighthouse mobile run + budget doc (needs live URL access from CI)
- [ ] Instagram oEmbed rendering for instagramPosts[] URLs
- [ ] Review schema JSON-LD once real synced reviews exist (compliance: only real, unedited reviews)
