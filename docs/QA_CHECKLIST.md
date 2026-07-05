# QA_CHECKLIST.md — run before every release

## Hero video (V6)
- [ ] Montage autoplays muted + loops on mobile AND desktop (playsinline on iOS)
- [ ] Poster shows instantly before video (no black flash); video fades in
- [ ] Ananya's face/mic/gestures visible in every cut at 360px and 1440px widths
- [ ] Headline + WhatsApp CTA + proof strip inside first mobile viewport
- [ ] "Watch Showreel" opens modal (sound on, controls); Esc/backdrop/X close; hero resumes
- [ ] prefers-reduced-motion: static poster, no video download
- [ ] With JS disabled: poster + real trust numbers visible in HTML

## Mobile (primary)
- [ ] Sticky bottom bar visible on all pages; "Check Date on WhatsApp" opens correct prefill
- [ ] Tap targets ≥44px; no horizontal scroll anywhere
- [ ] Gallery filters usable with thumb; lightbox swipe/arrows + close work; videos play with sound
- [ ] College & Campus section visible on homepage without searching
- [ ] Video Moments cards open lightbox and play with sound

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

## Admin (/admin — when ADMIN_TOKEN + Supabase set)
- [ ] Wrong token → rejected; right token → posts/reviews lists load
- [ ] Approve/feature/category toggles persist after reload (rows update in Supabase)
- [ ] Without ADMIN_TOKEN: page explains setup, API returns 503 (no data leak)
- [ ] /admin excluded in robots.txt and noindexed

## Performance / SEO / a11y
- [ ] Stats show real numbers with JS disabled (view-source)
- [ ] No layout shift scrolling gallery (fixed aspect crops)
- [ ] Hero image loads instantly (fetchpriority=high), below-fold media lazy
- [ ] sitemap.xml + robots.txt reachable; canonical = NEXT_PUBLIC_SITE_URL; JSON-LD valid (Person/LocalBusiness/Service)
- [ ] Keyboard: menu, filters, lightbox (Esc/arrows), form all operable; focus rings visible
- [ ] prefers-reduced-motion: no marquee/kenburns/counters animation
- [ ] Lighthouse mobile: run and record Perf/A11y/BP/SEO
