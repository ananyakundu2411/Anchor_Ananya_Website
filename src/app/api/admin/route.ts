import { NextRequest, NextResponse } from "next/server";
import { dbConfigured, select, update } from "@/lib/db";

/**
 * Owner curation API for the /admin page. Token-protected (ADMIN_TOKEN).
 * GET  ?kind=posts|reviews          → list synced rows for curation
 * POST { table, id, fields }        → flip approval/featured/category flags
 *
 * Without ADMIN_TOKEN or Supabase credentials it degrades gracefully —
 * the /admin page then points the owner to content.config.ts curation.
 */

/** Whitelisted tables and their editable columns / id columns. */
const TABLES: Record<string, { idColumn: string; fields: string[] }> = {
  social_posts: { idColumn: "id", fields: ["is_approved", "is_featured", "category"] },
  google_reviews: { idColumn: "review_id", fields: ["is_approved", "is_featured"] },
};

function unauthorized(reason: string, status: number) {
  return NextResponse.json({ ok: false, reason }, { status });
}

function checkAuth(req: NextRequest): NextResponse | null {
  const token = process.env.ADMIN_TOKEN;
  if (!token) return unauthorized("admin_not_configured", 503);
  if (req.headers.get("authorization") !== `Bearer ${token}`) {
    return unauthorized("unauthorized", 401);
  }
  return null;
}

export async function GET(req: NextRequest) {
  const authError = checkAuth(req);
  if (authError) return authError;
  if (!dbConfigured) return NextResponse.json({ ok: false, reason: "db_not_configured" });

  const kind = req.nextUrl.searchParams.get("kind");
  if (kind === "posts") {
    const rows = await select(
      "social_posts?order=timestamp.desc&limit=100" +
        "&select=id,media_type,thumbnail_url,media_url,permalink,caption,category,is_approved,is_featured,timestamp"
    );
    return NextResponse.json({ ok: true, rows: rows ?? [] });
  }
  if (kind === "reviews") {
    const rows = await select(
      "google_reviews?order=create_time.desc&limit=100" +
        "&select=review_id,reviewer_display_name,star_rating,comment,create_time,is_approved,is_featured"
    );
    return NextResponse.json({ ok: true, rows: rows ?? [] });
  }
  return unauthorized("unknown_kind", 400);
}

export async function POST(req: NextRequest) {
  const authError = checkAuth(req);
  if (authError) return authError;
  if (!dbConfigured) return NextResponse.json({ ok: false, reason: "db_not_configured" });

  let body: { table?: string; id?: string; fields?: Record<string, unknown> };
  try {
    body = await req.json();
  } catch {
    return unauthorized("bad_json", 400);
  }

  const table = TABLES[body.table ?? ""];
  if (!table || !body.id || !body.fields) return unauthorized("bad_request", 400);

  const fields: Record<string, unknown> = {};
  for (const key of table.fields) {
    if (key in body.fields) fields[key] = body.fields[key];
  }
  if (!Object.keys(fields).length) return unauthorized("no_valid_fields", 400);

  const result = await update(
    body.table!,
    `${table.idColumn}=eq.${encodeURIComponent(body.id)}`,
    fields
  );
  return NextResponse.json({ ok: result.ok, reason: result.reason });
}
