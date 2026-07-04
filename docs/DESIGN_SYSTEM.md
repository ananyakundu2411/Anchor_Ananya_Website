# DESIGN_SYSTEM.md

## Palette (Tailwind tokens in tailwind.config.ts)
- ink #0B0B0F (bg), ink-soft #101017, ink-card #14141C, ink-line #26262F
- gold #D4AF6A, gold-light #E8CF9C, gold-deep #A8873F (gradient "gold-sheen")
- ivory #F6F1E7, ivory-dim #CFC8B8, blush #E8B4A0 (errors/accents), beige #B8A88A

## Type
- Display: Cormorant Garamond (400–700, italics) — headlines, quotes, card titles
- Body/UI: Jost (300–600) — sans, tracking-wide for eyebrows/CTAs
- Eyebrow pattern: 11px uppercase tracking-0.3em gold

## Core utilities (globals.css)
.container-site, .glass, .gold-text(-animated), .eyebrow, .card-premium (hover lift+glow),
.btn / .btn-gold / .btn-ghost / .btn-whatsapp, .divider-gold, .spotlight-top, .input-premium,
.masonry, .hero-kenburns(-alt), .hero-vignette, .marquee-track

## Rules
- WhatsApp green #1FA855 reserved exclusively for WhatsApp actions
- One primary CTA per viewport; gold = secondary brand action
- Overlays must never obscure Ananya — text sits beside/below imagery on mobile
- Motion: reveal-on-scroll (Reveal.tsx), 0.5–0.9s ease-outs, always reduced-motion safe
- Images: pre-optimized ≤1600px JPEG q78 in public/media/<category>/; portraits crop 3/4, landscape 4/3, reels 9/16; object-position top for stage shots
- Section rhythm: eyebrow → display heading (one gold em) → sub → divider-gold
