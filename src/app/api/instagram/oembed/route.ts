import { NextRequest, NextResponse } from "next/server";

/**
 * Official Instagram oEmbed proxy — for embedding PUBLIC posts/reels only.
 * Requires META_APP_ID + META_APP_SECRET (app access token: "id|secret").
 * Keeps the app secret server-side; responses cached for 24h.
 * Returns { ok:false } (not 500) when unconfigured — client falls back to a plain link.
 */
export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url") || "";
  if (!/^https:\/\/(www\.)?instagram\.com\/(p|reel|tv)\//.test(url)) {
    return NextResponse.json({ ok: false, reason: "invalid_instagram_url" }, { status: 400 });
  }

  const appId = process.env.META_APP_ID;
  const appSecret = process.env.META_APP_SECRET;
  if (!appId || !appSecret) {
    return NextResponse.json({ ok: false, reason: "oembed_not_configured" });
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/instagram_oembed?url=${encodeURIComponent(url)}&omitscript=true&access_token=${appId}|${appSecret}`,
      { next: { revalidate: 86400 } }
    );
    const json = await res.json();
    if (!res.ok) {
      return NextResponse.json({ ok: false, reason: json?.error?.message || "oembed_error" });
    }
    return NextResponse.json(
      { ok: true, html: json.html, thumbnail_url: json.thumbnail_url, author_name: json.author_name },
      { headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200" } }
    );
  } catch (e) {
    return NextResponse.json({ ok: false, reason: (e as Error).message });
  }
}
