# PROJECT_BRIEF.md — Anchor Ananya Kundu Website v6

## Product
Premium, cinematic, mobile-first, **video-led** portfolio + booking site for professional anchor/emcee Ananya Kundu. Live: https://anchor-ananya-website-8sbm.vercel.app/
Reference energy: marieforleo.com (personality-led homepage, cinematic hero video, confident personal brand) — inspiration only, zero copying of brand/layout/colours.

## North-star priorities (in order)
1. Mobile experience first (hero = premium vertical showreel)
2. WhatsApp booking first ("Check Availability" flow, prefilled availability message)
3. Ananya clearly visible + video-led hero (fast-cut montage of real hosting footage; overlays never hide her)
4. College events surfaced high on the homepage (dedicated section + hero cuts)
5. Curated, premium gallery (balanced first screen, not a dump)
6. Verified-feeling social proof (Google-style review cards)
7. Auto-updating Instagram + Google reviews via OFFICIAL APIs only (cron + webhook + /admin curation + fallbacks). NO scraping.

## Homepage flow (v6)
Cinematic video hero (montage + Watch Showreel modal + proof strip) → stats → Meet Ananya intro → Where You've Seen Her Host tiles → Video Moments (6 reels, lightbox) → College & Campus → Weddings & Celebrations → Services showcase (6 cards) → Reviews (#reviews) → Instagram → Booking steps → Final CTA.

## Positioning copy (canonical)
- H1: "Premium Anchor & Emcee for Weddings, College Fests, Brand Launches & Corporate Events"
- Sub: "Ananya Kundu brings seamless flow, powerful crowd engagement, and polished stage presence to unforgettable events across India."
- Primary CTA: "Check Availability on WhatsApp" · Secondary: "Watch Showreel" (modal, no redirect)
- Proof strip (SSR-real numbers): 250+ Events Hosted · 5.0 Google Rated · Hosted Across India · Weddings · College Fests · Corporate · Brand Launches
- Final CTA: "Ready to Make Your Event Unforgettable?" → "Check Date on WhatsApp"

## WhatsApp (canonical)
Number +91 97658 27880 → wa.me/919765827880. Availability prefill:
"Hi Ananya, I'd like to check your availability for an event.\nEvent type:\nDate:\nCity:\nAudience size:\nI found you through your website."
Per-category prefills: wedding/college/corporate/brand/cultural/private/award/haldi/sangeet/engagement/newyear/live/gallery/contact/showreel — see src/config/site.ts.

## Aesthetic
Editorial luxury events: charcoal #0B0B0F, champagne gold #D4AF6A, ivory #F6F1E7; Fraunces display + Jost body; cinematic real footage, generous spacing, restrained glass + glow, lightweight motion (reduced-motion respected). Full rules: DESIGN_SYSTEM.md.

## Tech
Next.js 15 App Router + TS + Tailwind 3.4 + Framer Motion. Deployed on Vercel (auto-deploy from GitHub main: ananyakundu2411/Anchor_Ananya_Website). SSG + serverless API routes (cron/webhook/lead/admin). DB: Supabase (optional; site fully functional without it — config fallbacks). Owner curation: /admin (ADMIN_TOKEN) + src/config/content.config.ts.

## Non-negotiables
No scraping. No client-side secrets. Site never breaks when APIs/creds are missing. Keep changes modular + documented.
