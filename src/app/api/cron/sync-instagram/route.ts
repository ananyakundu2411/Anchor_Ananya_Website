import { NextRequest, NextResponse } from "next/server";
import { dbConfigured, upsert, log } from "@/lib/db";

/**
 * Daily cron: pulls latest media via the official Instagram Graph API.
 * Requires INSTAGRAM_ACCESS_TOKEN + INSTAGRAM_IG_USER_ID (+ DB for storage).
 * Gracefully no-ops when unconfigured. NEVER scrapes.
 */
export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ ok: false, reason: "unauthorized" }, { status: 401 });
  }

  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const igUser = process.env.INSTAGRAM_IG_USER_ID;
  if (!token || !igUser) {
    return NextResponse.json({ ok: false, reason: "instagram_not_configured" });
  }

  try {
    const fields = "id,media_type,media_url,thumbnail_url,permalink,caption,timestamp";
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${igUser}/media?fields=${fields}&limit=24&access_token=${token}`,
      { cache: "no-store" }
    );
    const json = await res.json();
    if (!res.ok || !Array.isArray(json?.data)) {
      if (dbConfigured) await log("sync_instagram", false, { status: res.status, error: json?.error });
      return NextResponse.json({ ok: false, reason: "graph_api_error", status: res.status });
    }

    const rows = json.data.map((m: Record<string, string>) => ({
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

    let stored = 0;
    if (dbConfigured && rows.length) {
      const r = await upsert("social_posts", rows, "id");
      stored = r.ok ? rows.length : 0;
      await log("sync_instagram", r.ok, { fetched: rows.length, stored });
    }

    // Best-effort long-lived token refresh awareness (logged only)
    return NextResponse.json({ ok: true, fetched: rows.length, stored, db: dbConfigured });
  } catch (e) {
    if (dbConfigured) await log("sync_instagram", false, { error: (e as Error).message });
    return NextResponse.json({ ok: false, reason: (e as Error).message });
  }
}
