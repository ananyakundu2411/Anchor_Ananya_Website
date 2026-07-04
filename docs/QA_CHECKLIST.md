# QA_CHECKLIST.md — run before every release

## Mobile (primary)
- [ ] Hero: Ananya fully visible, face/mic clear, no overlay on her, no crop-out at 360px width
- [ ] Sticky bottom bar visible on all pages; "Check Date on WhatsApp" opens correct prefill
- [ ] Tap targets ≥44px; no horizontal scroll anywhere
- [ ] Gallery filters usable with thumb; lightbox swipe/arrows + close work; videos play with sound
- [ ] College & Campus section visible on homepage without searching

## WhatsApp
- [ ] Every CTA opens wa.me/919765827880 with correct per-category prefilled message (check wedding card, college card/section, corporate, brand, gallery lightbox, contact, sticky, hero)
- [ ] Prefill line breaks render correctly in WhatsApp

## Forms & leads
- [ ] Enquiry form validation errors show; honeypot invisible
- [ ] With form env vars: email arrives at ananyakundu2411@gmail.com; success state renders
- [ ] Without env vars: WhatsApp fallback opens with structured message
- [ ] With DB configured: lead row appears in leads table

## Social proof
- [ ] Rating header card shows 5.0 + link to Google profile; review cards look verified-style; pinned first

## Automation (when creds set)
- [ ] GET /api/cron/sync-instagram with Bearer CRON_SECRET → ok:true, rows in social_posts, sync_logs entry
- [ ] GET /api/cron/sync-google-reviews → ok:true, rows in google_reviews
- [ ] GET /api/webhooks/instagram?hub.mode=subscribe&hub.verify_token=<token>&hub.challenge=x → echoes x
- [ ] All routes return ok:false (not 500) when creds missing

## Performance / SEO / a11y
- [ ] Stats show real numbers with JS disabled (view-source)
- [ ] No layout shift scrolling gallery (fixed aspect crops)
- [ ] Hero image loads instantly (fetchpriority=high), below-fold media lazy
- [ ] sitemap.xml + robots.txt reachable; canonical = NEXT_PUBLIC_SITE_URL; JSON-LD valid (Person/LocalBusiness/Service)
- [ ] Keyboard: menu, filters, lightbox (Esc/arrows), form all operable; focus rings visible
- [ ] prefers-reduced-motion: no marquee/kenburns/counters animation
- [ ] Lighthouse mobile: run and record Perf/A11y/BP/SEO
