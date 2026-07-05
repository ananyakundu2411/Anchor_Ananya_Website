# DESIGN_SYSTEM.md

## Palette (Tailwind tokens in tailwind.config.ts)
- ink #0B0B0F (bg), ink-soft #101017, ink-card #14141C, ink-line #26262F
- gold #D4AF6A, gold-light #E8CF9C, gold-deep #A8873F (gradient "gold-sheen")
- ivory #F6F1E7, ivory-dim #CFC8B8, blush #E8B4A0 (errors/accents), beige #B8A88A
- WhatsApp green #1FA855 — reserved exclusively for WhatsApp actions

## Typography
- Display: **Fraunces** (400–700, italics) — headlines, quotes, card titles (Cormorant Garamond kept as fallback)
- Body/UI: **Jost** (300–600) — sans, tracking-wide for eyebrows/CTAs
- Eyebrow pattern: 11px uppercase tracking-0.3em gold
- Hero H1: 2.1rem mobile → 6xl desktop, one gold-shimmer phrase max

## Buttons
- `.btn-whatsapp` (green, glow) = conversion actions only; one per viewport
- `.btn-gold` (gold sheen) = brand/secondary destination CTAs
- `.btn-ghost` (gold border) = tertiary; add `bg-ink/40 backdrop-blur-sm` over video
- Press state: translateY(1px) scale(.985)

## Hero video treatment (V6)
- Full-bleed fast-cut montage: ~11.5s, 10 cuts of 0.8–1.5s, hard cuts, 25fps
- Two edits: `hero-montage-tall.mp4` 720×1280 (mobile) / `hero-montage-wide.mp4` 1280×720 (desktop ≥1024px), each ≤3.5MB, muted, autoplay/loop/playsinline
- SSR renders `<picture>` poster (LCP); video mounts client-side and fades in; reduced-motion = poster only
- Warm grade: eq contrast 1.05 / sat 1.10, warm curves, mild vignette + unsharp
- Overlay rule: gradient from bottom (mobile) / from left (desktop) only — Ananya's face, mic and gestures stay clear; never a flat full-frame dim
- Source hygiene: crop/`delogo` any Instagram-export watermarks out of every cut

## Video cards & showreel
- Reels/cards 9:16, poster + center gold play chip, `preload="none"`, lazy posters
- ShowreelModal: ink/95 backdrop, Esc/backdrop close, native controls, sound on (user-initiated), WhatsApp CTA underneath — never navigate away

## Image treatment
- Pre-optimized ≤1600px JPEG q78 in public/media/<category>/
- Crops: portraits 3/4, landscape 4/3 or 16/10 (service cards), reels 9/16, tiles 1/1
- `object-position: top` for stage shots; `.img-grade` warm grade over all photography
- Titles over images: `.card-scrim` + white bold + drop shadow (sunlight-proof)

## Cards
- `.card-premium`: rounded-2xl, ink-card, hover lift + gold glow (disable lift with `!translate-y-0` where hover is meaningless)
- Always-visible captions/CTAs on touch — never hover-only

## Section rhythm & spacing
- eyebrow → display heading (one gold em) → sub → content; py-24 sections, py-14/16 for bands
- Homepage order: hero → stats → Meet Ananya → Where Seen → Video Moments → College → Celebrations → Services → Reviews (#reviews) → Instagram → Booking Steps → Final CTA

## Mobile behaviour
- Hero = vertical reel: copy bottom-anchored, CTA + proof strip inside first viewport (pb-28 clears sticky bar)
- Sticky bottom bar: "Check Date on WhatsApp" + "Send Enquiry" (glass, z-40) on every page
- Grids collapse 2-col; nav collapses to hamburger with WhatsApp CTA on top

## Motion guidelines
- Reveal-on-scroll (Reveal.tsx), 0.5–0.9s custom ease-outs, stagger ≤0.1s
- Counters render real numbers server-side, animate on view only
- Everything honours `prefers-reduced-motion` (video → poster, marquee/anims off)

## Trust & numbers
- Stats/proof figures must exist as real text in server HTML (SEO/no-JS) — animation is enhancement only
- Google blue #4285F4 only inside the white "G" badge
