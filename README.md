# Anchor Ananya Kundu — Official Website

Premium personal brand website for professional anchor/emcee Ananya Kundu.
Built with Next.js 15, TypeScript, Tailwind CSS and Framer Motion. Fully static
export — deployable to any static host.

## 1. Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## 2. Build

```bash
npm run build      # outputs static site to ./out
```

## 3. Deploy

- **Vercel (recommended):** import the repo, framework = Next.js, no extra config. Add env vars in Project Settings.
- **Netlify:** build command `npm run build`, publish directory `out`.
- **Any static host:** upload the contents of `out/` after building.

## 4. Add / edit photos & videos

1. Optimized site media lives in `public/media/<category>/` (hero, about, weddings, corporate, cultural, college, brand, private, reels, reviews, videos).
2. Resize photos to max ~1600px JPEG before adding (keeps the site fast).
3. Register each gallery item in `src/config/gallery.ts` (path, category, caption, alt text).
4. Hero video: replace `public/media/hero/hero.mp4` + `hero-poster.jpg` (keep it short, muted-friendly and compressed).

## 5. WhatsApp configuration

Number + prefilled message live in `src/config/site.ts` → `whatsapp`. Everything (buttons, floating bubble, sticky bar, form fallback) reads from there.

## 6. Enquiry form email provider

The form posts to `NEXT_PUBLIC_FORM_ENDPOINT`. Without it, the form gracefully
falls back to opening WhatsApp with the filled-in details (no enquiry lost).

**Web3Forms (recommended, free):**
1. Get an access key at web3forms.com using `ananyakundu2411@gmail.com`.
2. In `.env.local`:
   ```
   NEXT_PUBLIC_FORM_ENDPOINT=https://api.web3forms.com/submit
   NEXT_PUBLIC_FORM_ACCESS_KEY=your-access-key
   ```
3. Rebuild & redeploy.

**Formspree:** create a form for the same email, then set
`NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/<form-id>` (no access key).

**Server option (Resend/Nodemailer):** requires removing `output: 'export'`
from `next.config.mjs` and adding an API route — see `INTEGRATIONS.md` in the
project root folder.

## 7. Instagram embeds / API

- Add real post/reel URLs to `src/config/instagram.ts` → `instagramPosts`.
- The section currently shows Ananya's own hosted reels (safe default, no credentials).
- For automatic feeds, use Meta's official Instagram Graph API/oEmbed with `INSTAGRAM_ACCESS_TOKEN`. **Never scrape Instagram.**

## 8. Google Reviews (Places API)

- Currently: curated testimonial cards + "View Google Reviews" button (safe default).
- To show live reviews: enable Places API (New) in Google Cloud, set `GOOGLE_MAPS_API_KEY` and `GOOGLE_PLACE_ID`, and fetch `https://places.googleapis.com/v1/places/{PLACE_ID}?fields=rating,reviews`. Show Google attribution as required. **Never scrape Google.**
- Find the Place ID with Google's Place ID Finder using the business profile.

## 9. Environment variables

See `.env.example`. Only `NEXT_PUBLIC_*` variables are exposed to the browser —
keep all other keys server-side and never commit `.env.local`.

## 10. Known limitations

- Instagram section uses locally hosted reels until real post URLs / API creds are added.
- Google reviews are curated fallback cards until Places API creds are added.
- Homepage stats in `src/config/site.ts` should be confirmed with Ananya.
- Legal pages need professional legal review before publication.

## 11. Deployment checklist

- [ ] Set `NEXT_PUBLIC_SITE_URL` to the live domain
- [ ] Configure form endpoint (Web3Forms/Formspree) and test an enquiry
- [ ] Confirm WhatsApp number works via the hero button on mobile
- [ ] Replace placeholder Instagram post URLs with real ones
- [ ] Confirm stats and About copy with Ananya
- [ ] Add real Google review text to `src/config/testimonials.ts`
- [ ] Run `npm run build` cleanly
- [ ] Submit `sitemap.xml` in Google Search Console
- [ ] Test on a real phone (hero video, sticky CTA, gallery lightbox)
