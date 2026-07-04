# ENVIRONMENT_VARIABLES.md
Set in Vercel → Project → Settings → Environment Variables. NEVER commit real values. `NEXT_PUBLIC_*` are exposed to the browser — everything else is server-only.

## Core
- NEXT_PUBLIC_SITE_URL — canonical site URL (e.g. https://anchor-ananya-website-8sbm.vercel.app or custom domain). Drives SEO/sitemap/OG.

## Enquiry form (ACTIVE PATH — set these first)
- NEXT_PUBLIC_FORM_ENDPOINT=https://api.web3forms.com/submit (or Formspree URL)
- NEXT_PUBLIC_FORM_ACCESS_KEY=<web3forms key> (omit for Formspree)
- WEB3FORMS_ACCESS_KEY=<same key, server-side> — lets /api/lead send email server-side

## Database (optional — enables leads storage, review/post sync, tracking)
- SUPABASE_URL=https://<project>.supabase.co
- SUPABASE_SERVICE_ROLE_KEY=<service role key>  (server-only; NEVER NEXT_PUBLIC)

## Cron protection
- CRON_SECRET=<random string> — Vercel automatically sends it for scheduled invocations

## Instagram (optional)
- INSTAGRAM_ACCESS_TOKEN=<long-lived Graph API token>
- INSTAGRAM_IG_USER_ID=<numeric IG business user id>
- INSTAGRAM_WEBHOOK_VERIFY_TOKEN=<random string you choose>
- META_APP_SECRET=<Meta app secret, for webhook signature verification>

## Google Business Profile (optional; API access approval-gated)
- GOOGLE_OAUTH_CLIENT_ID / GOOGLE_OAUTH_CLIENT_SECRET / GOOGLE_OAUTH_REFRESH_TOKEN
- GBP_ACCOUNT_ID / GBP_LOCATION_ID
- (legacy fallback vars GOOGLE_MAPS_API_KEY / GOOGLE_PLACE_ID retained for a future Places-API rating widget)

## After adding/changing any variable: Deployments → ⋯ → Redeploy.
