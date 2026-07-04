import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { dbConfigured, log } from "@/lib/db";

/**
 * Instagram webhook endpoint (official Meta webhooks).
 * GET  → subscription verification (hub.challenge echo).
 * POST → signed event notifications; verified with X-Hub-Signature-256.
 * Real-time is a bonus — the daily cron remains the reliable sync path.
 */
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const mode = sp.get("hub.mode");
  const token = sp.get("hub.verify_token");
  const challenge = sp.get("hub.challenge");
  const expected = process.env.INSTAGRAM_WEBHOOK_VERIFY_TOKEN;

  if (mode === "subscribe" && expected && token === expected && challenge) {
    return new NextResponse(challenge, { status: 200 });
  }
  return NextResponse.json({ ok: false, reason: "verification_failed" }, { status: 403 });
}

export async function POST(req: NextRequest) {
  try {
    const raw = await req.text();
    const secret = process.env.META_APP_SECRET;
    if (secret) {
      const sig = req.headers.get("x-hub-signature-256") || "";
      const expected =
        "sha256=" + crypto.createHmac("sha256", secret).update(raw).digest("hex");
      const valid =
        sig.length === expected.length &&
        crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
      if (!valid) {
        if (dbConfigured) await log("webhook_instagram", false, { reason: "bad_signature" });
        return NextResponse.json({ ok: false }, { status: 401 });
      }
    }
    if (dbConfigured) {
      await log("webhook_instagram", true, { body: JSON.parse(raw || "{}") });
    }
    // Note: fire-and-forget resync could be triggered here; cron covers freshness.
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, reason: (e as Error).message }, { status: 200 });
  }
}
