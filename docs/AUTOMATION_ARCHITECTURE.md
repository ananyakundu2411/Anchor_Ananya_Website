# AUTOMATION_ARCHITECTURE.md

## Overview
Credential-optional automation. Every integration degrades gracefully to curated config fallbacks (site NEVER breaks without creds).

Rendering: SSG pages + serverless API routes on Vercel (v2 removed `output: 'export'`).

## Endpoints
- POST /api/lead — validates + stores lead in DB (if configured) + forwards email via Web3Forms (if configured). Client falls back to WhatsApp handoff if request fails.
- POST /api/track — lightweight conversion-event logging (whatsapp_click, form_submit, gallery_cta, instagram_click, review_click) → sync_logs. No-op without DB.
- GET /api/cron/sync-instagram — Meta Graph API `/{ig-user-id}/media` fetch → upsert social_posts. Auth: `Authorization: Bearer ${CRON_SECRET}` (Vercel cron sends it automatically when CRON_SECRET is set).
- GET /api/cron/sync-google-reviews — Google Business Profile API reviews fetch (OAuth refresh-token flow) → upsert google_reviews + rating summary.
- GET/POST /api/webhooks/instagram — GET: hub.challenge verification (INSTAGRAM_WEBHOOK_VERIFY_TOKEN). POST: X-Hub-Signature-256 HMAC check (META_APP_SECRET), logs event, best-effort re-sync.

## Cron (vercel.json)
- sync-instagram daily 03:00 UTC; sync-google-reviews daily 03:30 UTC (Hobby plan = max 2 daily crons — exactly used).

## Database (Supabase Postgres via REST — optional)
Env: SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (server-only). Helper: src/lib/db.ts (PostgREST fetch, upserts with on_conflict).

```sql
create table if not exists social_posts (
  id text primary key, media_type text, media_url text, embed_html text,
  thumbnail_url text, permalink text, caption text, "timestamp" timestamptz,
  category text, is_featured boolean default false, is_approved boolean default false,
  source text default 'instagram_graph', created_at timestamptz default now(), updated_at timestamptz default now());
create table if not exists app_settings (
  key text primary key, value text, updated_at timestamptz default now());
create table if not exists google_reviews (
  review_id text primary key, reviewer_display_name text, reviewer_profile_photo_url text,
  star_rating int, comment text, create_time timestamptz, update_time timestamptz,
  review_reply text, review_media_items jsonb, is_featured boolean default false,
  is_approved boolean default true, source text default 'gbp_api',
  created_at timestamptz default now(), updated_at timestamptz default now());
create table if not exists gallery_items (
  id bigint generated always as identity primary key, src text, poster text, type text,
  category text, caption text, location text, context text, orientation text,
  is_featured boolean default false, sort int default 0, created_at timestamptz default now());
create table if not exists leads (
  id bigint generated always as identity primary key, name text, phone text, email text,
  event_type text, event_date text, location text, audience_size text, message text,
  source text, created_at timestamptz default now());
create table if not exists sync_logs (
  id bigint generated always as identity primary key, kind text, ok boolean,
  detail jsonb, created_at timestamptz default now());
```

## Auto-publish rules (reviews)
Default-publish only star_rating >= 4 AND non-empty safe text; curation via src/config/content.config.ts (pin/hide/feature IDs, pinned first, then update_time desc). Same config file curates Instagram posts, featured gallery, hero media, college-featured flags — this IS the "admin" (simplest safe form; a protected admin route is a future task in TASKS.md).

## Instagram setup path (official; NO scraping)
1. Convert IG account to Business/Creator; link to a Facebook Page.
2. Meta developer app → add Instagram Graph API product.
3. Generate long-lived token (60d) for the IG user; store as INSTAGRAM_ACCESS_TOKEN + INSTAGRAM_IG_USER_ID.
4. Cron keeps content fresh. TOKEN REFRESH (implemented): when the stored token is >45 days old the cron attempts (a) graph.instagram.com/refresh_access_token (Instagram Login flavour) then (b) graph.facebook.com oauth fb_exchange_token (needs META_APP_ID+META_APP_SECRET). A rotated token is persisted in app_settings and preferred over the env var on later runs; every attempt is logged to sync_logs.
4b. APPROVAL GATE: synced posts land with is_approved=false and auto-mapped category (Wedding / College Event / Corporate / Brand Launch / Cultural / Private Event via caption keywords). Homepage shows only is_approved=true AND is_featured=true. Re-syncs update content fields only — manual curation is never overwritten. Approve/feature by flipping booleans in Supabase (or content.config.ts hiddenIds).
4c. oEmbed (implemented): GET /api/instagram/oembed?url=<public post/reel URL> proxies the official instagram_oembed endpoint using the app access token (META_APP_ID|META_APP_SECRET) server-side, cached 24h. For embedding public posts only.
5. Optional webhooks: subscribe app to `instagram` topic; set callback to /api/webhooks/instagram with INSTAGRAM_WEBHOOK_VERIFY_TOKEN; Meta app review may be required for production webhooks — cron fallback covers this.
6. Public embeds alternative: Instagram oEmbed (requires app token) — endpoint documented in ENVIRONMENT_VARIABLES.md.

## Google Business Profile setup path (official)
1. Verified Business Profile required.
2. Google Cloud project → enable "Google My Business API" family (access is APPROVAL-GATED: submit GBP API access request form; Google typically grants to profile owners).
3. OAuth consent + Desktop/Web client → obtain refresh token with scope https://www.googleapis.com/auth/business.manage
4. Env: GOOGLE_OAUTH_CLIENT_ID/SECRET/REFRESH_TOKEN, GBP_ACCOUNT_ID, GBP_LOCATION_ID.
5. Cron pulls reviews (v4 accounts/{a}/locations/{l}/reviews), stores + summarizes; UI shows curated cards; full list stays in DB.
6. Fallback while awaiting approval: curated cards in src/config/testimonials.ts + "View Google Reviews" link (ACTIVE today).

## Failure policy
Every route: try/catch → sync_logs (or console in dev) → 200 {ok:false,reason} — never throws to user; pages render from config fallbacks regardless of API state.
