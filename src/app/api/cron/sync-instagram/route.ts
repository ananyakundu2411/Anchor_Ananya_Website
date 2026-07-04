import { NextRequest, NextResponse } from "next/server";
import { dbConfigured, upsert, select, log, getSetting, setSetting } from "@/lib/db";

/**
 * Daily Instagram sync — OFFICIAL Meta Graph API only. NEVER scrapes.
 *
 * Behaviour:
 * - New posts land with is_approved=false (nothing appears on the site
 *   automatically — approve in Supabase or a future admin UI).
 * - Auto-categorises from caption keywords (Wedding / College Event /
 *   Corporate / Brand Launch / Cultural / Private Event).
 * - Re-syncs refresh content fields ONLY — manual curation
 *   (is_approved / is_featured / category) is never overwritten.
 * - Long-lived token refresh: attempts refresh when the stored token is
 *   older than 45 days; rotated token is persisted in app_settings and
 *   preferred over the env var thereafter.
 * - Gracefully no-ops without credentials.
 */

const CATEGORY_RULES: [RegExp, string][] = [
  [/wedding|shaadi|vivah|sangeet|haldi|mehndi|mehendi|engagement|reception|bride|groom|baraat/i, "Wedding"],
  [/college|campus|annual day|fest|farewell|fresher|university|school|students?|prize distribution/i, "College Event"],
  [/corporate|conference|town ?hall|award night|awards|family day|offsite|summit|company/i, "Corporate"],
  [/launch|brand|vivo|product|showroom|unveiling|store opening/i, "Brand Launch"],
  [/cultural|durga|puja|navratri|diwali|garba|dandiya|festival|republic|independence|community/i, "Cultural"],
  [/birthday|baby shower|godh bharai|naming|anniversar|house ?warming|private|new year/i, "Private Event"],
];

function categorise(caption: string): string | null {
  for (const [re, cat] of CATEGORY_RULES) if (re.test(caption)) return cat;
  return null;
}

async function currentToken(): Promise<string | null> {
  return (await getSetting("instagram_access_token")) || process.env.INSTAGRAM_ACCESS_TOKEN || null;
}

/** Refresh a long-lived token (both official flavours, guarded). */
async function maybeRefreshToken(token: string): Promise<void> {
  const last = await getSetting("instagram_token_refreshed_at");
  const ageDays = last ? (Date.now() - Date.parse(last)) / 86400000 : 999;
  if (ageDays < 45) return;

  // Flavour A: Instagram Login long-lived token
  try {
    const r = await fetch(
      `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`,
      { cache: "no-store" }
    );
    const j = await r.json();
    if (r.ok && j.access_token) {
      await setSetting("instagram_access_token", j.access_token);
      await setSetting("instagram_token_refreshed_at", new Date().toISOString());
      await log("instagram_token_refresh", true, { flavour: "ig_refresh_token", expires_in: j.expires_in });
      return;
    }
  } catch { /* try flavour B */ }

  // Flavour B: Facebook Login long-lived exchange (needs app credentials)
  const appId = process.env.META_APP_ID;
  const appSecret = process.env.META_APP_SECRET;
  if (appId && appSecret) {
    try {
      const r = await fetch(
        `https://graph.facebook.com/v21.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${token}`,
        { cache: "no-store" }
      );
      const j = await r.json();
      if (r.ok && j.access_token) {
        await setSetting("instagram_access_token", j.access_token);
        await setSetting("instagram_token_refreshed_at", new Date().toISOString());
        await log("instagram_token_refresh", true, { flavour: "fb_exchange_token" });
        return;
      }
    } catch { /* logged below */ }
  }
  await log("instagram_token_refresh", false, { note: "refresh attempted but no new token" });
}

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ ok: false, reason: "unauthorized" }, { status: 401 });
  }

  const igUser = process.env.INSTAGRAM_IG_USER_ID;
  const token = await currentToken();
  if (!token || !igUser) {
    return NextResponse.json({ ok: false, reason: "instagram_not_configured" });
  }

  try {
    const fields = "id,media_type,media_url,thumbnail_url,permalink,caption,timestamp";
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${igUser}/media?fields=${fields}&limit=25&access_token=${token}`,
      { cache: "no-store" }
    );
    const json = await res.json();
    if (!res.ok || !Array.isArray(json?.data)) {
      if (dbConfigured) await log("sync_instagram", false, { status: res.status, error: json?.error?.message });
      return NextResponse.json({ ok: false, reason: "graph_api_error", status: res.status });
    }

    type Media = Record<string, string>;
    const media: Media[] = json.data;

    let inserted = 0;
    let updated = 0;

    if (dbConfigured && media.length) {
      const existing = new Set(
        ((await select<{ id: string }>("social_posts?select=id&limit=1000")) || []).map((r) => r.id)
      );

      const newRows = media
        .filter((m) => !existing.has(m.id))
        .map((m) => ({
          id: m.id,
          media_type: m.media_type,
          media_url: m.media_url || null,
          thumbnail_url: m.thumbnail_url || m.media_url || null,
          permalink: m.permalink,
          caption: (m.caption || "").slice(0, 2000),
          timestamp: m.timestamp,
          category: categorise(m.caption || ""),
          is_approved: false, // approval-gated: nothing goes live automatically
          is_featured: false,
          source: "instagram_graph",
        }));

      // content-only refresh for existing rows — curation fields untouched
      const contentRows = media
        .filter((m) => existing.has(m.id))
        .map((m) => ({
          id: m.id,
          media_type: m.media_type,
          media_url: m.media_url || null,
          thumbnail_url: m.thumbnail_url || m.media_url || null,
          permalink: m.permalink,
          caption: (m.caption || "").slice(0, 2000),
          timestamp: m.timestamp,
          source: "instagram_graph",
          updated_at: new Date().toISOString(),
        }));

      if (newRows.length) {
        const r = await upsert("social_posts", newRows, "id");
        if (r.ok) inserted = newRows.length;
      }
      if (contentRows.length) {
        const r = await upsert("social_posts", contentRows, "id");
        if (r.ok) updated = contentRows.length;
      }
      await log("sync_instagram", true, { fetched: media.length, inserted, updated });
    }

    await maybeRefreshToken(token);

    return NextResponse.json({
      ok: true,
      fetched: media.length,
      inserted,
      updated,
      db: dbConfigured,
      note: "new posts require approval (is_approved) before they appear on the site",
    });
  } catch (e) {
    if (dbConfigured) await log("sync_instagram", false, { error: (e as Error).message });
    return NextResponse.json({ ok: false, reason: (e as Error).message });
  }
}
