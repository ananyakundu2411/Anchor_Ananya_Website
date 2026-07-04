# PROJECT_BRIEF.md — Anchor Ananya Kundu Website v2

## Product
Premium, editorial, mobile-first portfolio + booking site for professional anchor/emcee Ananya Kundu. Live: https://anchor-ananya-website-8sbm.vercel.app/

## North-star priorities (in order)
1. Mobile experience first
2. WhatsApp booking first ("Check Availability" flow, prefilled availability message)
3. Ananya clearly visible in hero (portrait-first, never hidden by overlays)
4. Curated, premium gallery (Featured Events grid, not a dump)
5. College events surfaced on the homepage (dedicated section)
6. Verified-feeling social proof (Google-style review cards)
7. Auto-updating Instagram + Google reviews via OFFICIAL APIs only (cron + webhook + fallbacks). NO scraping.

## Positioning copy (canonical)
- H1: "Premium Anchor & Emcee for Weddings, College Fests, Brand Launches & Corporate Events"
- Sub: "Elegant flow, high-energy crowd engagement, and seamless stage presence for unforgettable events across India."
- Primary CTA: "Check Availability on WhatsApp" · Secondary: "View Real Events"
- Proof strip: 250+ Events Hosted · 5-Star Rated · Weddings · College Fests · Corporate · Brand Launches

## WhatsApp (canonical)
Number +91 97658 27880 → wa.me/919765827880. Availability prefill:
"Hi Ananya, I'd like to check your availability for an event.\nEvent type:\nDate:\nCity:\nAudience size:\nI found you through your website."
Per-category prefills for wedding/college/corporate/brand/contact/lightbox — see src/config/site.ts.

## Aesthetic
Editorial luxury events: charcoal #0B0B0F, champagne gold #D4AF6A, ivory #F6F1E7; Cormorant Garamond display + Jost body; cinematic imagery, generous spacing, restrained glass + glow, lightweight motion (reduced-motion respected).

## Tech
Next.js 15 App Router + TS + Tailwind 3.4 + Framer Motion. Deployed on Vercel (auto-deploy from GitHub main: ananyakundu2411/Anchor_Ananya_Website). v2 switches from static export to standard SSG + serverless API routes to enable cron/webhook/lead capture. DB: Supabase (optional; site fully functional without it — config fallbacks).

## Non-negotiables
No scraping. No client-side secrets. Site never breaks when APIs/creds are missing. Keep changes modular + documented.
