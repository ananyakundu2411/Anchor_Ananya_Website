import { NextRequest, NextResponse } from "next/server";
import { dbConfigured, upsert, log } from "@/lib/db";

/**
 * Daily cron: pulls reviews via the official Google Business Profile API
 * (OAuth refresh-token flow). Access to this API is approval-gated by Google —
 * until credentials exist this route safely reports not_configured and the
 * site renders curated fallback cards. NEVER scrapes.
 */
const STAR_MAP: Record<string, number> = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };

async function accessToken(): Promise<string | null> {
  const id = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const secret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const refresh = process.env.GOOGLE_OAUTH_REFRESH_TOKEN;
  if (!id || !secret || !refresh) return null;
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: id,
      client_secret: secret,
      refresh_token: refresh,
      grant_type: "refresh_token",
    }),
  });
  const json = await res.json();
  return res.ok ? json.access_token : null;
}

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ ok: false, reason: "unauthorized" }, { status: 401 });
  }

  const account = process.env.GBP_ACCOUNT_ID;
  const location = process.env.GBP_LOCATION_ID;
  if (!account || !location) {
    return NextResponse.json({ ok: false, reason: "gbp_not_configured" });
  }

  try {
    const token = await accessToken();
    if (!token) return NextResponse.json({ ok: false, reason: "oauth_failed" });

    const res = await fetch(
      `https://mybusiness.googleapis.com/v4/accounts/${account}/locations/${location}/reviews?pageSize=50`,
      { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" }
    );
    const json = await res.json();
    if (!res.ok) {
      if (dbConfigured) await log("sync_google_reviews", false, { status: res.status, error: json?.error });
      return NextResponse.json({ ok: false, reason: "gbp_api_error", status: res.status });
    }

    const reviews = (json.reviews || []).map((r: Record<string, unknown>) => ({
      review_id: (r.reviewId || r.name) as string,
      reviewer_display_name: (r.reviewer as Record<string, string>)?.displayName || "Google User",
      reviewer_profile_photo_url: (r.reviewer as Record<string, string>)?.profilePhotoUrl || null,
      star_rating: STAR_MAP[r.starRating as string] || null,
      comment: String(r.comment || "").slice(0, 4000),
      create_time: r.createTime,
      update_time: r.updateTime,
      review_reply: (r.reviewReply as Record<string, string>)?.comment || null,
      source: "gbp_api",
      updated_at: new Date().toISOString(),
    }));

    let stored = 0;
    if (dbConfigured && reviews.length) {
      const up = await upsert("google_reviews", reviews, "review_id");
      stored = up.ok ? reviews.length : 0;
      await log("sync_google_reviews", up.ok, {
        fetched: reviews.length,
        stored,
        averageRating: json.averageRating,
        totalReviewCount: json.totalReviewCount,
      });
    }
    return NextResponse.json({
      ok: true,
      fetched: reviews.length,
      stored,
      averageRating: json.averageRating,
      totalReviewCount: json.totalReviewCount,
      db: dbConfigured,
    });
  } catch (e) {
    if (dbConfigured) await log("sync_google_reviews", false, { error: (e as Error).message });
    return NextResponse.json({ ok: false, reason: (e as Error).message });
  }
}
